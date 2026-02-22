import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { getDb } from "../../db";
import { requireAuth } from "../../auth/middleware";
import type { Env } from "../../types";

const createReviewSchema = z.object({
  rentalId: z.number().int().positive(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(500).optional(),
});

export class ReviewCreateEndpoint extends OpenAPIRoute {
  schema = {
    tags: ["Reviews"],
    summary: "Submit a review for a completed rental",
    security: [{ bearerAuth: [] }],
    request: {
      body: {
        content: { "application/json": { schema: createReviewSchema } },
      },
    },
    responses: {
      "201": {
        description: "Review created",
        content: {
          "application/json": {
            schema: z.object({
              id: z.number(),
              rentalId: z.number(),
              reviewerId: z.number(),
              reviewerName: z.string(),
              rating: z.number(),
              comment: z.string().nullable(),
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
        description: "Already reviewed",
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
    const body = data.body as z.infer<typeof createReviewSchema>;
    const sql = getDb(c.env as Env);

    const [rental] = await sql`SELECT Id, BorrowerId, Status FROM Rentals WHERE Id = ${body.rentalId}`;
    if (!rental) {
      return c.json({ error: "Validation failed", message: "Rental not found" }, 400);
    }
    if (rental.status !== "Completed") {
      return c.json({ error: "Validation failed", message: "Rental must be Completed before leaving a review" }, 400);
    }
    if (rental.borrowerid !== userId) {
      return c.json({ error: "Forbidden", message: "You can only review rentals you were the borrower for" }, 403);
    }

    const existing = await sql`SELECT Id FROM Reviews WHERE RentalId = ${body.rentalId} AND ReviewerId = ${userId}`;
    if (existing.length > 0) {
      return c.json({ error: "Conflict", message: "You have already reviewed this rental" }, 409);
    }

    const [review] = await sql`
      INSERT INTO Reviews (RentalId, ReviewerId, Rating, Comment)
      VALUES (${body.rentalId}, ${userId}, ${body.rating}, ${body.comment ?? null})
      RETURNING Id, RentalId, ReviewerId, Rating, Comment, CreatedAt
    `;

    const [reviewer] = await sql`SELECT FirstName || ' ' || LastName AS name FROM Users WHERE Id = ${userId}`;

    return c.json(
      {
        id: review.id,
        rentalId: review.rentalid,
        reviewerId: review.reviewerid,
        reviewerName: reviewer.name,
        rating: review.rating,
        comment: review.comment,
        createdAt: review.createdat,
      },
      201
    );
  }
}
