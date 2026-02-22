import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { getDb } from "../../db";
import type { Env } from "../../types";

export class ItemGetEndpoint extends OpenAPIRoute {
  schema = {
    tags: ["Items"],
    summary: "Get item details",
    request: {
      params: z.object({ id: z.coerce.number().int().positive() }),
    },
    responses: {
      "200": {
        description: "Item details with reviews",
        content: {
          "application/json": {
            schema: z.object({
              id: z.number(),
              title: z.string(),
              description: z.string().nullable(),
              dailyRate: z.number(),
              categoryId: z.number(),
              category: z.string(),
              ownerId: z.number(),
              ownerName: z.string(),
              ownerRating: z.number().nullable(),
              latitude: z.number().nullable(),
              longitude: z.number().nullable(),
              isAvailable: z.boolean(),
              averageRating: z.number().nullable(),
              totalReviews: z.number(),
              createdAt: z.string(),
              reviews: z.array(
                z.object({
                  id: z.number(),
                  reviewerId: z.number(),
                  reviewerName: z.string(),
                  rating: z.number(),
                  comment: z.string().nullable(),
                  createdAt: z.string(),
                })
              ),
            }),
          },
        },
      },
      "404": {
        description: "Item not found",
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
    const itemId = Number(id);
    const sql = getDb(c.env as Env);

    const [item] = await sql`
      SELECT
        i.Id, i.Title, i.Description, i.DailyRate, i.CategoryId, i.IsAvailable, i.CreatedAt,
        c.Name AS category,
        u.Id AS ownerId, u.FirstName || ' ' || u.LastName AS ownerName,
        ST_Y(i.Location::geometry) AS latitude,
        ST_X(i.Location::geometry) AS longitude,
        ROUND(AVG(ir.Rating)::numeric, 2) AS averageRating,
        COUNT(ir.Id) AS totalReviews,
        ROUND(AVG(or_.Rating)::numeric, 2) AS ownerRating
      FROM Items i
      JOIN Categories c ON c.Id = i.CategoryId
      JOIN Users u ON u.Id = i.OwnerId
      LEFT JOIN Rentals rent ON rent.ItemId = i.Id
      LEFT JOIN Reviews ir ON ir.RentalId = rent.Id
      LEFT JOIN Items oi ON oi.OwnerId = u.Id
      LEFT JOIN Rentals orent ON orent.ItemId = oi.Id
      LEFT JOIN Reviews or_ ON or_.RentalId = orent.Id
      WHERE i.Id = ${itemId}
      GROUP BY i.Id, c.Name, u.Id
    `;

    if (!item) {
      return c.json({ error: "Not found", message: "Item not found" }, 404);
    }

    const reviews = await sql`
      SELECT r.Id, r.Rating, r.Comment, r.CreatedAt,
             rv.Id AS reviewerId, rv.FirstName || ' ' || rv.LastName AS reviewerName
      FROM Reviews r
      JOIN Rentals rent ON rent.Id = r.RentalId
      JOIN Users rv ON rv.Id = r.ReviewerId
      WHERE rent.ItemId = ${itemId}
      ORDER BY r.CreatedAt DESC
      LIMIT 20
    `;

    return c.json({
      id: item.id,
      title: item.title,
      description: item.description,
      dailyRate: Number(item.dailyrate),
      categoryId: item.categoryid,
      category: item.category,
      ownerId: item.ownerid,
      ownerName: item.ownername,
      ownerRating: item.ownerrating ? Number(item.ownerrating) : null,
      latitude: item.latitude ? Number(item.latitude) : null,
      longitude: item.longitude ? Number(item.longitude) : null,
      isAvailable: item.isavailable,
      averageRating: item.averagerating ? Number(item.averagerating) : null,
      totalReviews: Number(item.totalreviews),
      createdAt: item.createdat,
      reviews: reviews.map((r: any) => ({
        id: r.id,
        reviewerId: r.reviewerid,
        reviewerName: r.reviewername,
        rating: r.rating,
        comment: r.comment,
        createdAt: r.createdat,
      })),
    });
  }
}
