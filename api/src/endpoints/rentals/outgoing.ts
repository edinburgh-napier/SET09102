import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { getDb } from "../../db";
import { requireAuth } from "../../auth/middleware";
import type { Env } from "../../types";

export class RentalsOutgoingEndpoint extends OpenAPIRoute {
  schema = {
    tags: ["Rentals"],
    summary: "List outgoing rental requests (items I want to rent)",
    security: [{ bearerAuth: [] }],
    request: {
      query: z.object({ status: z.string().optional() }),
    },
    responses: {
      "200": {
        description: "Outgoing rentals",
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
          i.OwnerId, ou.FirstName || ' ' || ou.LastName AS ownerName,
          ROUND(AVG(rv.Rating)::numeric, 2) AS ownerRating,
          r.StartDate, r.EndDate, r.Status, r.TotalPrice, r.CreatedAt
        FROM Rentals r
        JOIN Items i ON i.Id = r.ItemId
        JOIN Users ou ON ou.Id = i.OwnerId
        LEFT JOIN Reviews rv ON rv.RentalId = r.Id
        WHERE r.BorrowerId = ${userId} AND r.Status = ${status}
        GROUP BY r.Id, i.Title, i.OwnerId, ou.Id
        ORDER BY r.CreatedAt DESC
      `;
    } else {
      rows = await sql`
        SELECT
          r.Id, r.ItemId, i.Title AS itemTitle,
          i.OwnerId, ou.FirstName || ' ' || ou.LastName AS ownerName,
          ROUND(AVG(rv.Rating)::numeric, 2) AS ownerRating,
          r.StartDate, r.EndDate, r.Status, r.TotalPrice, r.CreatedAt
        FROM Rentals r
        JOIN Items i ON i.Id = r.ItemId
        JOIN Users ou ON ou.Id = i.OwnerId
        LEFT JOIN Reviews rv ON rv.RentalId = r.Id
        WHERE r.BorrowerId = ${userId}
        GROUP BY r.Id, i.Title, i.OwnerId, ou.Id
        ORDER BY r.CreatedAt DESC
      `;
    }

    return c.json({
      rentals: rows.map((r: any) => ({
        id: r.id,
        itemId: r.itemid,
        itemTitle: r.itemtitle,
        ownerId: r.ownerid,
        ownerName: r.ownername,
        ownerRating: r.ownerrating ? Number(r.ownerrating) : null,
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
