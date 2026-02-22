import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { getDb } from "../../db";
import { requireAuth } from "../../auth/middleware";
import type { Env, RentalStatus } from "../../types";

type Actor = "owner" | "borrower";

// Valid transitions: [from, to, who_can_perform]
const TRANSITIONS: Array<[RentalStatus, RentalStatus, Actor]> = [
  ["Requested", "Approved", "owner"],
  ["Requested", "Rejected", "owner"],
  ["Approved", "Out for Rent", "owner"],
  ["Out for Rent", "Returned", "borrower"],
  ["Out for Rent", "Overdue", "owner"],
  ["Overdue", "Returned", "borrower"],
  ["Returned", "Completed", "owner"],
];

export class RentalUpdateStatusEndpoint extends OpenAPIRoute {
  schema = {
    tags: ["Rentals"],
    summary: "Update rental status (state machine)",
    security: [{ bearerAuth: [] }],
    request: {
      params: z.object({ id: z.coerce.number().int().positive() }),
      body: {
        content: {
          "application/json": {
            schema: z.object({ status: z.string() }),
          },
        },
      },
    },
    responses: {
      "200": {
        description: "Status updated",
        content: {
          "application/json": {
            schema: z.object({ id: z.number(), status: z.string(), updatedAt: z.string() }),
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
      "409": {
        description: "Invalid state transition",
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
    const data = await this.getValidatedData<typeof this.schema>();
    const { status: newStatus } = data.body as { status: string };
    const sql = getDb(c.env as Env);

    const [rental] = await sql`
      SELECT r.Id, r.Status, r.BorrowerId, i.OwnerId
      FROM Rentals r JOIN Items i ON i.Id = r.ItemId
      WHERE r.Id = ${rentalId}
    `;

    if (!rental) {
      return c.json({ error: "Not found", message: "Rental not found" }, 404);
    }

    const isOwner = rental.ownerid === userId;
    const isBorrower = rental.borrowerid === userId;

    if (!isOwner && !isBorrower) {
      return c.json({ error: "Forbidden", message: "Access denied" }, 403);
    }

    const fromStatus = rental.status as RentalStatus;
    const transition = TRANSITIONS.find(([from, to]) => from === fromStatus && to === newStatus);

    if (!transition) {
      return c.json(
        {
          error: "Invalid state transition",
          message: `Cannot transition from ${fromStatus} to ${newStatus}`,
        },
        409
      );
    }

    const [, , requiredActor] = transition;
    if (requiredActor === "owner" && !isOwner) {
      return c.json({ error: "Forbidden", message: `Only the owner can perform this transition` }, 403);
    }
    if (requiredActor === "borrower" && !isBorrower) {
      return c.json({ error: "Forbidden", message: `Only the borrower can perform this transition` }, 403);
    }

    const updatedAt = new Date().toISOString();
    await sql`UPDATE Rentals SET Status = ${newStatus} WHERE Id = ${rentalId}`;

    // When completed, mark item as available again
    if (newStatus === "Completed") {
      await sql`UPDATE Items SET IsAvailable = true WHERE Id = (SELECT ItemId FROM Rentals WHERE Id = ${rentalId})`;
    }
    // When approved, mark item as unavailable
    if (newStatus === "Approved") {
      await sql`UPDATE Items SET IsAvailable = false WHERE Id = (SELECT ItemId FROM Rentals WHERE Id = ${rentalId})`;
    }

    return c.json({ id: rentalId, status: newStatus, updatedAt });
  }
}
