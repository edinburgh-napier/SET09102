import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { getDb } from "../../db";
import type { Env } from "../../types";

export class UserProfileEndpoint extends OpenAPIRoute {
  schema = {
    tags: ["Users"],
    summary: "View public profile of a user",
    request: {
      params: z.object({ id: z.coerce.number().int().positive() }),
    },
    responses: {
      "200": {
        description: "User public profile",
        content: {
          "application/json": {
            schema: z.object({
              id: z.number(),
              firstName: z.string(),
              lastName: z.string(),
              averageRating: z.number().nullable(),
              itemsListed: z.number(),
              rentalsCompleted: z.number(),
              reviews: z.array(
                z.object({
                  id: z.number(),
                  rating: z.number(),
                  comment: z.string().nullable(),
                  reviewerName: z.string(),
                  createdAt: z.string(),
                })
              ),
            }),
          },
        },
      },
      "404": {
        description: "User not found",
        content: {
          "application/json": {
            schema: z.object({ error: z.string(), message: z.string() }),
          },
        },
      },
    },
  };

  async handle(c: any) {
    const { id } = c.req.param();
    const userId = Number(id);
    const sql = getDb(c.env as Env);

    const [user] = await sql`
      SELECT
        u.Id, u.FirstName, u.LastName, u.CreatedAt,
        ROUND(AVG(r.Rating)::numeric, 2) AS averageRating,
        COUNT(DISTINCT i.Id) AS itemsListed,
        COUNT(DISTINCT CASE WHEN rent.Status = 'Completed' THEN rent.Id END) AS rentalsCompleted
      FROM Users u
      LEFT JOIN Items i ON i.OwnerId = u.Id
      LEFT JOIN Rentals rent ON rent.ItemId = i.Id
      LEFT JOIN Reviews r ON r.RentalId = rent.Id
      WHERE u.Id = ${userId} AND u.IsActive = true AND u.DeletedAt IS NULL
      GROUP BY u.Id
    `;

    if (!user) {
      return c.json({ error: "Not found", message: "User not found" }, 404);
    }

    const reviews = await sql`
      SELECT
        r.Id, r.Rating, r.Comment, r.CreatedAt,
        rv.FirstName || ' ' || rv.LastName AS reviewerName
      FROM Reviews r
      JOIN Rentals rent ON rent.Id = r.RentalId
      JOIN Items i ON i.Id = rent.ItemId
      JOIN Users rv ON rv.Id = r.ReviewerId
      WHERE i.OwnerId = ${userId}
      ORDER BY r.CreatedAt DESC
      LIMIT 10
    `;

    return c.json({
      id: user.id,
      firstName: user.firstname,
      lastName: user.lastname,
      averageRating: user.averagerating ? Number(user.averagerating) : null,
      itemsListed: Number(user.itemslisted),
      rentalsCompleted: Number(user.rentalscompleted),
      reviews: reviews.map((r: any) => ({
        id: r.id,
        rating: r.rating,
        comment: r.comment,
        reviewerName: r.reviewername,
        createdAt: r.createdat,
      })),
    });
  }
}
