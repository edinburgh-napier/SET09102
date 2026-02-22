import { jwtVerify } from "jose";
import type { Env } from "../types";

function secretToBytes(secret: string): Uint8Array {
  return new TextEncoder().encode(secret);
}

/**
 * Call at the top of any protected handler.
 * Returns the authenticated userId on success, or a ready-to-return 401 Response on failure.
 *
 * Usage:
 *   const auth = await requireAuth(c);
 *   if (auth instanceof Response) return auth;
 *   const userId = auth;
 */
export async function requireAuth(c: any): Promise<number | Response> {
  const authHeader = c.req.header("Authorization") as string | undefined;
  if (!authHeader?.startsWith("Bearer ")) {
    return c.json({ error: "Unauthorized", message: "Missing or invalid Authorization header" }, 401);
  }

  const token = authHeader.slice(7);
  try {
    const secret = secretToBytes((c.env as Env).JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    if (!payload.sub) {
      return c.json({ error: "Unauthorized", message: "Invalid token payload" }, 401);
    }

    return Number(payload.sub);
  } catch {
    return c.json({ error: "Unauthorized", message: "Invalid or expired token" }, 401);
  }
}
