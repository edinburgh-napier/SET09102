import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { getDb } from "../../db";
import { requireAuth } from "../../auth/middleware";
import type { Env } from "../../types";

const updateItemSchema = z.object({
  title: z.string().min(5).max(100).optional(),
  description: z.string().max(1000).optional(),
  dailyRate: z.number().positive().max(1000).optional(),
  isAvailable: z.boolean().optional(),
});

export class ItemUpdateEndpoint extends OpenAPIRoute {
  schema = {
    tags: ["Items"],
    summary: "Update item details (owner only)",
    security: [{ bearerAuth: [] }],
    request: {
      params: z.object({ id: z.coerce.number().int().positive() }),
      body: {
        content: {
          "application/json": { schema: updateItemSchema },
        },
      },
    },
    responses: {
      "200": {
        description: "Item updated",
        content: {
          "application/json": {
            schema: z.object({
              id: z.number(),
              title: z.string(),
              description: z.string().nullable(),
              dailyRate: z.number(),
              isAvailable: z.boolean(),
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
    const auth = await requireAuth(c);
    if (auth instanceof Response) return auth;
    const userId = auth;

    const { id } = c.req.param();
    const itemId = Number(id);
    const data = await this.getValidatedData<typeof this.schema>();
    const body = data.body as z.infer<typeof updateItemSchema>;
    const sql = getDb(c.env as Env);

    const [existing] = await sql`SELECT Id, OwnerId, Title, Description, DailyRate, IsAvailable FROM Items WHERE Id = ${itemId}`;
    if (!existing) {
      return c.json({ error: "Not found", message: "Item not found" }, 404);
    }
    if (existing.ownerid !== userId) {
      return c.json({ error: "Forbidden", message: "You can only update your own items" }, 403);
    }

    const newTitle = body.title ?? existing.title;
    const newDescription = body.description !== undefined ? body.description : existing.description;
    const newDailyRate = body.dailyRate ?? Number(existing.dailyrate);
    const newIsAvailable = body.isAvailable !== undefined ? body.isAvailable : existing.isavailable;

    const [updated] = await sql`
      UPDATE Items
      SET Title = ${newTitle}, Description = ${newDescription},
          DailyRate = ${newDailyRate}, IsAvailable = ${newIsAvailable}
      WHERE Id = ${itemId}
      RETURNING Id, Title, Description, DailyRate, IsAvailable
    `;

    return c.json({
      id: updated.id,
      title: updated.title,
      description: updated.description,
      dailyRate: Number(updated.dailyrate),
      isAvailable: updated.isavailable,
    });
  }
}
