import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { getDb } from "../../db";
import type { Env } from "../../types";

// Hash password using Web Crypto PBKDF2 — works in Workers runtime (no native modules)
async function hashPassword(password: string, salt: string): Promise<string> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: enc.encode(salt), iterations: 100000, hash: "SHA-256" },
    keyMaterial,
    256
  );
  return btoa(String.fromCharCode(...new Uint8Array(bits)));
}

function generateSalt(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...bytes));
}

const registerSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/[A-Z]/, "Must contain uppercase letter")
    .regex(/[a-z]/, "Must contain lowercase letter")
    .regex(/[0-9]/, "Must contain number")
    .regex(/[^A-Za-z0-9]/, "Must contain special character"),
});

export class RegisterEndpoint extends OpenAPIRoute {
  schema = {
    tags: ["Auth"],
    summary: "Register a new user account",
    request: {
      body: {
        content: {
          "application/json": {
            schema: registerSchema,
          },
        },
      },
    },
    responses: {
      "201": {
        description: "User created successfully",
        content: {
          "application/json": {
            schema: z.object({
              id: z.number(),
              email: z.string(),
              firstName: z.string(),
              lastName: z.string(),
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

  async handle(c: any) {
    const data = await this.getValidatedData<typeof this.schema>();
    const body = data.body as z.infer<typeof registerSchema>;

    const sql = getDb(c.env as Env);

    // Check email uniqueness
    const existing = await sql`SELECT id FROM Users WHERE Email = ${body.email}`;
    if (existing.length > 0) {
      return c.json({ error: "Validation failed", message: "Email already exists" }, 400);
    }

    const salt = generateSalt();
    const hash = await hashPassword(body.password, salt);

    const [user] = await sql`
      INSERT INTO Users (FirstName, LastName, Email, PasswordHash, PasswordSalt)
      VALUES (${body.firstName}, ${body.lastName}, ${body.email}, ${hash}, ${salt})
      RETURNING Id, Email, FirstName, LastName, CreatedAt
    `;

    return c.json(
      {
        id: user.id,
        email: user.email,
        firstName: user.firstname,
        lastName: user.lastname,
        createdAt: user.createdat,
      },
      201
    );
  }
}
