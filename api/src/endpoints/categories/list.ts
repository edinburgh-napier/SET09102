import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { getDb } from "../../db";
import type { Env } from "../../types";

export class CategoriesListEndpoint extends OpenAPIRoute {
  schema = {
    tags: ["Categories"],
    summary: "List all categories",
    responses: {
      "200": {
        description: "List of categories",
        content: {
          "application/json": {
            schema: z.object({
              categories: z.array(
                z.object({
                  id: z.number(),
                  name: z.string(),
                  slug: z.string(),
                  itemCount: z.number(),
                })
              ),
            }),
          },
        },
      },
    },
  };

  async handle(c: any) {
    const sql = getDb(c.env as Env);

    const categories = await sql`
      SELECT c.Id, c.Name, c.Slug, COUNT(i.Id) AS itemCount
      FROM Categories c
      LEFT JOIN Items i ON i.CategoryId = c.Id AND i.IsAvailable = true
      GROUP BY c.Id
      ORDER BY c.Name
    `;

    return c.json({
      categories: categories.map((cat: any) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        itemCount: Number(cat.itemcount),
      })),
    });
  }
}
