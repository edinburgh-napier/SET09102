import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { getDb } from "../../db";
import type { Env } from "../../types";

const itemSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  dailyRate: z.number(),
  categoryId: z.number(),
  category: z.string(),
  ownerId: z.number(),
  ownerName: z.string(),
  ownerRating: z.number().nullable(),
  isAvailable: z.boolean(),
  averageRating: z.number().nullable(),
  createdAt: z.string(),
});

export class ItemsListEndpoint extends OpenAPIRoute {
  schema = {
    tags: ["Items"],
    summary: "List all available items",
    request: {
      query: z.object({
        category: z.string().optional(),
        search: z.string().optional(),
        page: z.coerce.number().int().positive().default(1),
        pageSize: z.coerce.number().int().positive().max(100).default(20),
      }),
    },
    responses: {
      "200": {
        description: "Paginated list of items",
        content: {
          "application/json": {
            schema: z.object({
              items: z.array(itemSchema),
              totalItems: z.number(),
              page: z.number(),
              pageSize: z.number(),
              totalPages: z.number(),
            }),
          },
        },
      },
    },
  };

  async handle(c: any) {
    const data = await this.getValidatedData<typeof this.schema>();
    const { category, search, page, pageSize } = data.query as any;
    const sql = getDb(c.env as Env);

    const offset = (page - 1) * pageSize;

    // Build query conditionally
    let rows: any[];
    let countRows: any[];

    if (category && search) {
      rows = await sql`
        SELECT
          i.Id, i.Title, i.Description, i.DailyRate, i.CategoryId, i.IsAvailable, i.CreatedAt,
          c.Name AS category,
          u.Id AS ownerId, u.FirstName || ' ' || u.LastName AS ownerName,
          ROUND(AVG(or_.Rating)::numeric, 2) AS ownerRating,
          ROUND(AVG(ir.Rating)::numeric, 2) AS averageRating
        FROM Items i
        JOIN Categories c ON c.Id = i.CategoryId
        JOIN Users u ON u.Id = i.OwnerId
        LEFT JOIN Rentals rent ON rent.ItemId = i.Id
        LEFT JOIN Reviews ir ON ir.RentalId = rent.Id
        LEFT JOIN Items oi ON oi.OwnerId = u.Id
        LEFT JOIN Rentals orent ON orent.ItemId = oi.Id
        LEFT JOIN Reviews or_ ON or_.RentalId = orent.Id
        WHERE i.IsAvailable = true AND c.Slug = ${category}
          AND (i.Title ILIKE ${'%' + search + '%'} OR i.Description ILIKE ${'%' + search + '%'})
        GROUP BY i.Id, c.Name, u.Id
        ORDER BY i.CreatedAt DESC
        LIMIT ${pageSize} OFFSET ${offset}
      `;
      countRows = await sql`
        SELECT COUNT(DISTINCT i.Id) AS total
        FROM Items i JOIN Categories c ON c.Id = i.CategoryId
        WHERE i.IsAvailable = true AND c.Slug = ${category}
          AND (i.Title ILIKE ${'%' + search + '%'} OR i.Description ILIKE ${'%' + search + '%'})
      `;
    } else if (category) {
      rows = await sql`
        SELECT
          i.Id, i.Title, i.Description, i.DailyRate, i.CategoryId, i.IsAvailable, i.CreatedAt,
          c.Name AS category,
          u.Id AS ownerId, u.FirstName || ' ' || u.LastName AS ownerName,
          ROUND(AVG(or_.Rating)::numeric, 2) AS ownerRating,
          ROUND(AVG(ir.Rating)::numeric, 2) AS averageRating
        FROM Items i
        JOIN Categories c ON c.Id = i.CategoryId
        JOIN Users u ON u.Id = i.OwnerId
        LEFT JOIN Rentals rent ON rent.ItemId = i.Id
        LEFT JOIN Reviews ir ON ir.RentalId = rent.Id
        LEFT JOIN Items oi ON oi.OwnerId = u.Id
        LEFT JOIN Rentals orent ON orent.ItemId = oi.Id
        LEFT JOIN Reviews or_ ON or_.RentalId = orent.Id
        WHERE i.IsAvailable = true AND c.Slug = ${category}
        GROUP BY i.Id, c.Name, u.Id
        ORDER BY i.CreatedAt DESC
        LIMIT ${pageSize} OFFSET ${offset}
      `;
      countRows = await sql`
        SELECT COUNT(DISTINCT i.Id) AS total
        FROM Items i JOIN Categories c ON c.Id = i.CategoryId
        WHERE i.IsAvailable = true AND c.Slug = ${category}
      `;
    } else if (search) {
      rows = await sql`
        SELECT
          i.Id, i.Title, i.Description, i.DailyRate, i.CategoryId, i.IsAvailable, i.CreatedAt,
          c.Name AS category,
          u.Id AS ownerId, u.FirstName || ' ' || u.LastName AS ownerName,
          ROUND(AVG(or_.Rating)::numeric, 2) AS ownerRating,
          ROUND(AVG(ir.Rating)::numeric, 2) AS averageRating
        FROM Items i
        JOIN Categories c ON c.Id = i.CategoryId
        JOIN Users u ON u.Id = i.OwnerId
        LEFT JOIN Rentals rent ON rent.ItemId = i.Id
        LEFT JOIN Reviews ir ON ir.RentalId = rent.Id
        LEFT JOIN Items oi ON oi.OwnerId = u.Id
        LEFT JOIN Rentals orent ON orent.ItemId = oi.Id
        LEFT JOIN Reviews or_ ON or_.RentalId = orent.Id
        WHERE i.IsAvailable = true
          AND (i.Title ILIKE ${'%' + search + '%'} OR i.Description ILIKE ${'%' + search + '%'})
        GROUP BY i.Id, c.Name, u.Id
        ORDER BY i.CreatedAt DESC
        LIMIT ${pageSize} OFFSET ${offset}
      `;
      countRows = await sql`
        SELECT COUNT(*) AS total FROM Items i
        WHERE i.IsAvailable = true
          AND (i.Title ILIKE ${'%' + search + '%'} OR i.Description ILIKE ${'%' + search + '%'})
      `;
    } else {
      rows = await sql`
        SELECT
          i.Id, i.Title, i.Description, i.DailyRate, i.CategoryId, i.IsAvailable, i.CreatedAt,
          c.Name AS category,
          u.Id AS ownerId, u.FirstName || ' ' || u.LastName AS ownerName,
          ROUND(AVG(or_.Rating)::numeric, 2) AS ownerRating,
          ROUND(AVG(ir.Rating)::numeric, 2) AS averageRating
        FROM Items i
        JOIN Categories c ON c.Id = i.CategoryId
        JOIN Users u ON u.Id = i.OwnerId
        LEFT JOIN Rentals rent ON rent.ItemId = i.Id
        LEFT JOIN Reviews ir ON ir.RentalId = rent.Id
        LEFT JOIN Items oi ON oi.OwnerId = u.Id
        LEFT JOIN Rentals orent ON orent.ItemId = oi.Id
        LEFT JOIN Reviews or_ ON or_.RentalId = orent.Id
        WHERE i.IsAvailable = true
        GROUP BY i.Id, c.Name, u.Id
        ORDER BY i.CreatedAt DESC
        LIMIT ${pageSize} OFFSET ${offset}
      `;
      countRows = await sql`SELECT COUNT(*) AS total FROM Items WHERE IsAvailable = true`;
    }

    const totalItems = Number(countRows[0]?.total ?? 0);

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
        ownerRating: row.ownerrating ? Number(row.ownerrating) : null,
        isAvailable: row.isavailable,
        averageRating: row.averagerating ? Number(row.averagerating) : null,
        createdAt: row.createdat,
      })),
      totalItems,
      page,
      pageSize,
      totalPages: Math.ceil(totalItems / pageSize),
    });
  }
}
