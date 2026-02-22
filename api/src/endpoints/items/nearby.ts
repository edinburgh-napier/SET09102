import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { getDb } from "../../db";
import type { Env } from "../../types";

export class ItemsNearbyEndpoint extends OpenAPIRoute {
  schema = {
    tags: ["Items"],
    summary: "Find items near a location (PostGIS)",
    request: {
      query: z.object({
        lat: z.coerce.number().min(-90).max(90),
        lon: z.coerce.number().min(-180).max(180),
        radius: z.coerce.number().positive().max(50).default(5),
        category: z.string().optional(),
      }),
    },
    responses: {
      "200": {
        description: "Nearby items with distance",
        content: {
          "application/json": {
            schema: z.object({
              items: z.array(
                z.object({
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
                  distance: z.number(),
                  isAvailable: z.boolean(),
                  averageRating: z.number().nullable(),
                })
              ),
              searchLocation: z.object({ latitude: z.number(), longitude: z.number() }),
              radius: z.number(),
              totalResults: z.number(),
            }),
          },
        },
      },
      "400": {
        description: "Validation error",
        content: {
          "application/json": {
            schema: z.object({ error: z.string(), message: z.string() }),
          },
        },
      },
    },
  };

  async handle(c: any) {
    const data = await this.getValidatedData<typeof this.schema>();
    const { lat, lon, radius, category } = data.query as any;
    const sql = getDb(c.env as Env);

    const radiusMetres = radius * 1000;

    let rows: any[];
    if (category) {
      rows = await sql`
        SELECT
          i.Id, i.Title, i.Description, i.DailyRate, i.CategoryId, i.IsAvailable,
          c.Name AS category,
          u.Id AS ownerId, u.FirstName || ' ' || u.LastName AS ownerName,
          ST_Y(i.Location::geometry) AS latitude,
          ST_X(i.Location::geometry) AS longitude,
          ST_Distance(i.Location::geography, ST_MakePoint(${lon}, ${lat})::geography) / 1000.0 AS distance,
          ROUND(AVG(r.Rating)::numeric, 2) AS averageRating
        FROM Items i
        JOIN Categories c ON c.Id = i.CategoryId
        JOIN Users u ON u.Id = i.OwnerId
        LEFT JOIN Rentals rent ON rent.ItemId = i.Id
        LEFT JOIN Reviews r ON r.RentalId = rent.Id
        WHERE i.IsAvailable = true
          AND c.Slug = ${category}
          AND i.Location IS NOT NULL
          AND ST_DWithin(i.Location::geography, ST_MakePoint(${lon}, ${lat})::geography, ${radiusMetres})
        GROUP BY i.Id, c.Name, u.Id
        ORDER BY distance ASC
      `;
    } else {
      rows = await sql`
        SELECT
          i.Id, i.Title, i.Description, i.DailyRate, i.CategoryId, i.IsAvailable,
          c.Name AS category,
          u.Id AS ownerId, u.FirstName || ' ' || u.LastName AS ownerName,
          ST_Y(i.Location::geometry) AS latitude,
          ST_X(i.Location::geometry) AS longitude,
          ST_Distance(i.Location::geography, ST_MakePoint(${lon}, ${lat})::geography) / 1000.0 AS distance,
          ROUND(AVG(r.Rating)::numeric, 2) AS averageRating
        FROM Items i
        JOIN Categories c ON c.Id = i.CategoryId
        JOIN Users u ON u.Id = i.OwnerId
        LEFT JOIN Rentals rent ON rent.ItemId = i.Id
        LEFT JOIN Reviews r ON r.RentalId = rent.Id
        WHERE i.IsAvailable = true
          AND i.Location IS NOT NULL
          AND ST_DWithin(i.Location::geography, ST_MakePoint(${lon}, ${lat})::geography, ${radiusMetres})
        GROUP BY i.Id, c.Name, u.Id
        ORDER BY distance ASC
      `;
    }

    return c.json({
      items: rows.map((row: any) => ({
        id: row.id,
        title: row.title,
        description: row.description,
        dailyRate: Number(row.dailyrate),
        categoryId: row.categoryid,
        category: row.category,
        ownerId: row.ownerid,
        ownerName: row.ownername,
        latitude: Number(row.latitude),
        longitude: Number(row.longitude),
        distance: Math.round(Number(row.distance) * 10) / 10,
        isAvailable: row.isavailable,
        averageRating: row.averagerating ? Number(row.averagerating) : null,
      })),
      searchLocation: { latitude: lat, longitude: lon },
      radius,
      totalResults: rows.length,
    });
  }
}
