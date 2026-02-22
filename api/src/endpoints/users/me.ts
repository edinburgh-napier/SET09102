import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { getDb } from "../../db";
import { authMiddleware } from "../../auth/middleware";
import type { Env } from "../../types";

export class MeEndpoint extends OpenAPIRoute {
  schema = {
    tags: ["Users"],
    summary: "Get current user profile",
    security: [{ bearerAuth: [] }],
    responses: {
      "200": {
        description: "Current user profile",
        content: {
          "application/json": {
            schema: z.object({
              id: z.number(),
              email: z.string(),
              firstName: z.string(),
              lastName: z.string(),
              averageRating: z.number().nullable(),
              itemsListed: z.number(),
              rentalsCompleted: z.number(),
              createdAt: z.string(),
            }),
          },
        },
      },
      "401": {
        description: "Unauthorized",
        content: {
          "application/json": {
            schema: z.object({ error: z.string(), message: z.string() }),
          },
        },
      },
    },
  };

  middleware = [authMiddleware];

  async handle(c: any) {
    const userId = c.get("userId") as number;
    const sql = getDb(c.env as Env);

    const [user] = await sql`
      SELECT
        u.Id, u.Email, u.FirstName, u.LastName, u.CreatedAt,
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

    return c.json({
      id: user.id,
      email: user.email,
      firstName: user.firstname,
      lastName: user.lastname,
      averageRating: user.averagerating ? Number(user.averagerating) : null,
      itemsListed: Number(user.itemslisted),
      rentalsCompleted: Number(user.rentalscompleted),
      createdAt: user.createdat,
    });
  }
}
