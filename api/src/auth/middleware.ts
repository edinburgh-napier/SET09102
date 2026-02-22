import { createMiddleware } from "hono/factory";
import { jwtVerify, importJWK } from "jose";
import type { Env } from "../types";

// Encode the raw secret string as a Uint8Array for jose
function secretToBytes(secret: string): Uint8Array {
  return new TextEncoder().encode(secret);
}

export const authMiddleware = createMiddleware<{ Bindings: Env; Variables: { userId: number } }>(
  async (c, next) => {
    const authHeader = c.req.header("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return c.json({ error: "Unauthorized", message: "Missing or invalid Authorization header" }, 401);
    }

    const token = authHeader.slice(7);

    try {
      const secret = secretToBytes(c.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);

      if (!payload.sub) {
        return c.json({ error: "Unauthorized", message: "Invalid token payload" }, 401);
      }

      c.set("userId", Number(payload.sub));
      await next();
    } catch {
      return c.json({ error: "Unauthorized", message: "Invalid or expired token" }, 401);
    }
  }
);
