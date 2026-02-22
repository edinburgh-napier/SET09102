import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { getDb } from "../../db";
import { authMiddleware } from "../../auth/middleware";
import type { Env } from "../../types";

const createRentalSchema = z.object({
  itemId: z.number().int().positive(),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Must be yyyy-MM-dd"),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Must be yyyy-MM-dd"),
});

export class RentalCreateEndpoint extends OpenAPIRoute {
  schema = {
    tags: ["Rentals"],
    summary: "Create a rental request",
    security: [{ bearerAuth: [] }],
    request: {
      body: {
        content: { "application/json": { schema: createRentalSchema } },
      },
    },
    responses: {
      "201": {
        description: "Rental created",
        content: {
          "application/json": {
            schema: z.object({
              id: z.number(),
              itemId: z.number(),
              itemTitle: z.string(),
              borrowerId: z.number(),
              borrowerName: z.string(),
              ownerId: z.number(),
              ownerName: z.string(),
              startDate: z.string(),
              endDate: z.string(),
              status: z.string(),
              totalPrice: z.number(),
              createdAt: z.string(),
            }),
          },
        },
      },
      "400": {
        description: "Validation failed",
        content: {
          "application/json": {
            schema: z.object({ error: z.string(), message: z.string() }),
          },
        },
      },
      "409": {
        description: "Conflict",
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
    const data = await this.getValidatedData<typeof this.schema>();
    const body = data.body as z.infer<typeof createRentalSchema>;
    const borrowerId = c.get("userId") as number;
    const sql = getDb(c.env as Env);

    const start = new Date(body.startDate);
    const end = new Date(body.endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
      return c.json({ error: "Validation failed", message: "Start date must be today or in the future" }, 400);
    }
    if (end <= start) {
      return c.json({ error: "Validation failed", message: "End date must be after start date" }, 400);
    }

    const [item] = await sql`
      SELECT i.Id, i.Title, i.DailyRate, i.IsAvailable, i.OwnerId,
             u.FirstName || ' ' || u.LastName AS ownerName
      FROM Items i
      JOIN Users u ON u.Id = i.OwnerId
      WHERE i.Id = ${body.itemId}
    `;

    if (!item) {
      return c.json({ error: "Validation failed", message: "Item not found" }, 400);
    }
    if (!item.isavailable) {
      return c.json({ error: "Validation failed", message: "Item is not available" }, 400);
    }
    if (item.ownerid === borrowerId) {
      return c.json({ error: "Validation failed", message: "You cannot rent your own item" }, 400);
    }

    // Check for date conflicts with existing approved/active rentals
    const conflicts = await sql`
      SELECT Id FROM Rentals
      WHERE ItemId = ${body.itemId}
        AND Status IN ('Approved', 'Out for Rent')
        AND StartDate < ${body.endDate}
        AND EndDate > ${body.startDate}
    `;
    if (conflicts.length > 0) {
      return c.json({ error: "Conflict", message: "This item already has an approved rental for these dates" }, 409);
    }

    // Calculate total price (inclusive days)
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = days * Number(item.dailyrate);

    const [rental] = await sql`
      INSERT INTO Rentals (ItemId, BorrowerId, StartDate, EndDate, TotalPrice)
      VALUES (${body.itemId}, ${borrowerId}, ${body.startDate}, ${body.endDate}, ${totalPrice})
      RETURNING Id, ItemId, BorrowerId, StartDate, EndDate, Status, TotalPrice, CreatedAt
    `;

    const [borrower] = await sql`SELECT FirstName || ' ' || LastName AS name FROM Users WHERE Id = ${borrowerId}`;

    return c.json(
      {
        id: rental.id,
        itemId: rental.itemid,
        itemTitle: item.title,
        borrowerId: rental.borrowerid,
        borrowerName: borrower.name,
        ownerId: item.ownerid,
        ownerName: item.ownername,
        startDate: rental.startdate,
        endDate: rental.enddate,
        status: rental.status,
        totalPrice: Number(rental.totalprice),
        createdAt: rental.createdat,
      },
      201
    );
  }
}
