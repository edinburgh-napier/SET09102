import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { getDb } from "../../db";
import { requireAuth } from "../../auth/middleware";
import type { Env } from "../../types";

export class RentalsIncomingEndpoint extends OpenAPIRoute {
  schema = {
    tags: ["Rentals"],
    summary: "List incoming rental requests (for items I own)",
    security: [{ bearerAuth: [] }],
    request: {
      query: z.object({ status: z.string().optional() }),
    },
    responses: {
      "200": {
        description: "Incoming rentals",
        content: {
          "application/json": {
            schema: z.object({
              rentals: z.array(z.any()),
              totalRentals: z.number(),
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

  async handle(c: any) {
    const auth = await requireAuth(c);
    if (auth instanceof Response) return auth;
    const userId = auth;

    const data = await this.getValidatedData<typeof this.schema>();
    const { status } = data.query as any;
    const sql = getDb(c.env as Env);

    let rows: any[];
    if (status) {
      rows = await sql`
        SELECT
          r.Id, r.ItemId, i.Title AS itemTitle,
          r.BorrowerId, u.FirstName || ' ' || u.LastName AS borrowerName,
          ROUND(AVG(rv.Rating)::numeric, 2) AS borrowerRating,
          r.StartDate, r.EndDate, r.Status, r.TotalPrice, r.CreatedAt
        FROM Rentals r
        JOIN Items i ON i.Id = r.ItemId
        JOIN Users u ON u.Id = r.BorrowerId
        LEFT JOIN Reviews rv ON rv.ReviewerId = r.BorrowerId
        WHERE i.OwnerId = ${userId} AND r.Status = ${status}
        GROUP BY r.Id, i.Title, u.Id
        ORDER BY r.CreatedAt DESC
      `;
    } else {
      rows = await sql`
        SELECT
          r.Id, r.ItemId, i.Title AS itemTitle,
          r.BorrowerId, u.FirstName || ' ' || u.LastName AS borrowerName,
          ROUND(AVG(rv.Rating)::numeric, 2) AS borrowerRating,
          r.StartDate, r.EndDate, r.Status, r.TotalPrice, r.CreatedAt
        FROM Rentals r
        JOIN Items i ON i.Id = r.ItemId
        JOIN Users u ON u.Id = r.BorrowerId
        LEFT JOIN Reviews rv ON rv.ReviewerId = r.BorrowerId
        WHERE i.OwnerId = ${userId}
        GROUP BY r.Id, i.Title, u.Id
        ORDER BY r.CreatedAt DESC
      `;
    }

    return c.json({
      rentals: rows.map((r: any) => ({
        id: r.id,
        itemId: r.itemid,
        itemTitle: r.itemtitle,
        borrowerId: r.borrowerid,
        borrowerName: r.borrowername,
        borrowerRating: r.borrowerrating ? Number(r.borrowerrating) : null,
        startDate: r.startdate,
        endDate: r.enddate,
        status: r.status,
        totalPrice: Number(r.totalprice),
        requestedAt: r.createdat,
      })),
      totalRentals: rows.length,
    });
  }
}
