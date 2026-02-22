import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { getDb } from "../../db";
import { authMiddleware } from "../../auth/middleware";
import type { Env } from "../../types";

const createItemSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().max(1000).optional(),
  dailyRate: z.number().positive().max(1000),
  categoryId: z.number().int().positive(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

export class ItemCreateEndpoint extends OpenAPIRoute {
  schema = {
    tags: ["Items"],
    summary: "Create a new item listing",
    security: [{ bearerAuth: [] }],
    request: {
      body: {
        content: {
          "application/json": { schema: createItemSchema },
        },
      },
    },
    responses: {
      "201": {
        description: "Item created",
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
              latitude: z.number(),
              longitude: z.number(),
              isAvailable: z.boolean(),
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
    },
  };

  middleware = [authMiddleware];

  async handle(c: any) {
    const data = await this.getValidatedData<typeof this.schema>();
    const body = data.body as z.infer<typeof createItemSchema>;
    const userId = c.get("userId") as number;
    const sql = getDb(c.env as Env);

    // Validate category exists
    const [cat] = await sql`SELECT Id, Name FROM Categories WHERE Id = ${body.categoryId}`;
    if (!cat) {
      return c.json({ error: "Validation failed", message: "Invalid categoryId" }, 400);
    }

    const [item] = await sql`
      INSERT INTO Items (OwnerId, CategoryId, Title, Description, DailyRate, Location)
      VALUES (
        ${userId}, ${body.categoryId}, ${body.title}, ${body.description ?? null}, ${body.dailyRate},
        ST_MakePoint(${body.longitude}, ${body.latitude})::geography
      )
      RETURNING Id, Title, Description, DailyRate, CategoryId, IsAvailable, CreatedAt
    `;

    const [owner] = await sql`SELECT FirstName || ' ' || LastName AS name FROM Users WHERE Id = ${userId}`;

    return c.json(
      {
        id: item.id,
        title: item.title,
        description: item.description,
        dailyRate: Number(item.dailyrate),
        categoryId: item.categoryid,
        category: cat.name,
        ownerId: userId,
        ownerName: owner.name,
        latitude: body.latitude,
        longitude: body.longitude,
        isAvailable: item.isavailable,
        createdAt: item.createdat,
      },
      201
    );
  }
}
