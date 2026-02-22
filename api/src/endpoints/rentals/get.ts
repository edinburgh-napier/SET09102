import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { getDb } from "../../db";
import { requireAuth } from "../../auth/middleware";
import type { Env } from "../../types";

export class RentalGetEndpoint extends OpenAPIRoute {
  schema = {
    tags: ["Rentals"],
    summary: "Get rental details (owner or borrower only)",
    security: [{ bearerAuth: [] }],
    request: {
      params: z.object({ id: z.coerce.number().int().positive() }),
    },
    responses: {
      "200": {
        description: "Rental details",
        content: {
          "application/json": {
            schema: z.object({
              id: z.number(),
              itemId: z.number(),
              itemTitle: z.string(),
              itemDescription: z.string().nullable(),
              borrowerId: z.number(),
              borrowerName: z.string(),
              ownerId: z.number(),
              ownerName: z.string(),
              startDate: z.string(),
              endDate: z.string(),
              status: z.string(),
              totalPrice: z.number(),
              requestedAt: z.string(),
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
      "403": {
        description: "Forbidden",
        content: {
          "application/json": {
            schema: z.object({ error: z.string(), message: z.string() }),
          },
        },
      },
      "404": {
        description: "Rental not found",
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

    const { id } = c.req.param();
    const rentalId = Number(id);
    const sql = getDb(c.env as Env);

    const [rental] = await sql`
      SELECT
        r.Id, r.ItemId, r.BorrowerId, r.StartDate, r.EndDate, r.Status, r.TotalPrice, r.CreatedAt,
        i.Title AS itemTitle, i.Description AS itemDescription, i.OwnerId,
        bu.FirstName || ' ' || bu.LastName AS borrowerName,
        ou.FirstName || ' ' || ou.LastName AS ownerName
      FROM Rentals r
      JOIN Items i ON i.Id = r.ItemId
      JOIN Users bu ON bu.Id = r.BorrowerId
      JOIN Users ou ON ou.Id = i.OwnerId
      WHERE r.Id = ${rentalId}
    `;

    if (!rental) {
      return c.json({ error: "Not found", message: "Rental not found" }, 404);
    }
    if (rental.borrowerid !== userId && rental.ownerid !== userId) {
      return c.json({ error: "Forbidden", message: "Access denied" }, 403);
    }

    return c.json({
      id: rental.id,
      itemId: rental.itemid,
      itemTitle: rental.itemtitle,
      itemDescription: rental.itemdescription,
      borrowerId: rental.borrowerid,
      borrowerName: rental.borrowername,
      ownerId: rental.ownerid,
      ownerName: rental.ownername,
      startDate: rental.startdate,
      endDate: rental.enddate,
      status: rental.status,
      totalPrice: Number(rental.totalprice),
      requestedAt: rental.createdat,
    });
  }
}
