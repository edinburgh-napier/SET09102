import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { SignJWT } from "jose";
import { getDb } from "../../db";
import type { Env } from "../../types";

async function verifyPassword(password: string, salt: string, storedHash: string): Promise<boolean> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: enc.encode(salt), iterations: 100000, hash: "SHA-256" },
    keyMaterial,
    256
  );
  const hash = btoa(String.fromCharCode(...new Uint8Array(bits)));
  return hash === storedHash;
}

const tokenSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export class TokenEndpoint extends OpenAPIRoute {
  schema = {
    tags: ["Auth"],
    summary: "Login and receive JWT token",
    request: {
      body: {
        content: {
          "application/json": {
            schema: tokenSchema,
          },
        },
      },
    },
    responses: {
      "200": {
        description: "Authentication successful",
        content: {
          "application/json": {
            schema: z.object({
              token: z.string(),
              expiresAt: z.string(),
              userId: z.number(),
            }),
          },
        },
      },
      "401": {
        description: "Authentication failed",
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
    const body = data.body as z.infer<typeof tokenSchema>;
    const env = c.env as Env;

    const sql = getDb(env);
    const [user] = await sql`
      SELECT Id, PasswordHash, PasswordSalt
      FROM Users
      WHERE Email = ${body.email} AND IsActive = true AND DeletedAt IS NULL
    `;

    if (!user) {
      return c.json({ error: "Authentication failed", message: "Invalid email or password" }, 401);
    }

    const valid = await verifyPassword(body.password, user.passwordsalt, user.passwordhash);
    if (!valid) {
      return c.json({ error: "Authentication failed", message: "Invalid email or password" }, 401);
    }

    const expiryDays = parseInt(env.JWT_EXPIRY_DAYS ?? "7", 10);
    const expiresAt = new Date(Date.now() + expiryDays * 24 * 60 * 60 * 1000);
    const secret = new TextEncoder().encode(env.JWT_SECRET);

    const token = await new SignJWT({ sub: String(user.id) })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(expiresAt)
      .sign(secret);

    return c.json({ token, expiresAt: expiresAt.toISOString(), userId: user.id });
  }
}
