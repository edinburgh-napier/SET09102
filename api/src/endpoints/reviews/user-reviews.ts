import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { getDb } from "../../db";
import type { Env } from "../../types";

export class UserReviewsEndpoint extends OpenAPIRoute {
  schema = {
    tags: ["Reviews"],
    summary: "Get all reviews for a user (as owner)",
    request: {
      params: z.object({ id: z.coerce.number().int().positive() }),
      query: z.object({
        page: z.coerce.number().int().positive().default(1),
        pageSize: z.coerce.number().int().positive().max(50).default(10),
      }),
    },
    responses: {
      "200": {
        description: "User reviews",
        content: {
          "application/json": {
            schema: z.object({
              reviews: z.array(z.any()),
              averageRating: z.number().nullable(),
              totalReviews: z.number(),
              page: z.number(),
              pageSize: z.number(),
              totalPages: z.number(),
            }),
          },
        },
      },
    },
  };

  async handle(c: any) {
    const { id } = c.req.param();
    const userId = Number(id);
    const data = await this.getValidatedData<typeof this.schema>();
    const { page, pageSize } = data.query as any;
    const sql = getDb(c.env as Env);

    const offset = (page - 1) * pageSize;

    const rows = await sql`
      SELECT r.Id, r.Rating, r.Comment, r.CreatedAt,
             i.Id AS itemId, i.Title AS itemTitle,
             rv.Id AS reviewerId, rv.FirstName || ' ' || rv.LastName AS reviewerName
      FROM Reviews r
      JOIN Rentals rent ON rent.Id = r.RentalId
      JOIN Items i ON i.Id = rent.ItemId
      JOIN Users rv ON rv.Id = r.ReviewerId
      WHERE i.OwnerId = ${userId}
      ORDER BY r.CreatedAt DESC
      LIMIT ${pageSize} OFFSET ${offset}
    `;

    const [agg] = await sql`
      SELECT COUNT(r.Id) AS total, ROUND(AVG(r.Rating)::numeric, 2) AS avg
      FROM Reviews r
      JOIN Rentals rent ON rent.Id = r.RentalId
      JOIN Items i ON i.Id = rent.ItemId
      WHERE i.OwnerId = ${userId}
    `;

    const total = Number(agg?.total ?? 0);

    return c.json({
      reviews: rows.map((r: any) => ({
        id: r.id,
        itemId: r.itemid,
        itemTitle: r.itemtitle,
        reviewerId: r.reviewerid,
        reviewerName: r.reviewername,
        rating: r.rating,
        comment: r.comment,
        createdAt: r.createdat,
      })),
      averageRating: agg?.avg ? Number(agg.avg) : null,
      totalReviews: total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    });
  }
}
