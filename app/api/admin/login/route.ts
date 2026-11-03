// ============================================
// WHAT THIS FILE DOES (plain English):
// Checks the admin password and, if it is right, sets the signed
// sign-in cookie. It allows only a few tries a minute per visitor.
// ============================================

import { ADMIN_COOKIE, adminConfigured, makeSession, passwordMatches } from "@/lib/admin/session";
import { getClientIp, rateLimit } from "@/lib/utils/rate-limit";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!adminConfigured()) {
    return Response.json({ error: "Admin sign-in is not set up. Set ADMIN_PASSWORD_HASH and JWT_SECRET." }, { status: 503 });
  }
  if (!rateLimit(`admin-login:${getClientIp(request)}`, 5, 60_000).allowed) {
    return Response.json({ error: "Too many tries. Wait a minute." }, { status: 429 });
  }
  let password = "";
  try {
    const body = (await request.json()) as { password?: unknown };
    password = typeof body.password === "string" ? body.password.slice(0, 200) : "";
  } catch {
    return Response.json({ error: "That could not be read." }, { status: 400 });
  }
  if (!passwordMatches(password)) {
    return Response.json({ error: "That password is not right." }, { status: 401 });
  }
  const session = makeSession();
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return new Response(JSON.stringify({ ok: true }), {
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": `${ADMIN_COOKIE}=${session.value}; Path=/; Max-Age=${session.maxAge}; HttpOnly; SameSite=Strict${secure}`,
    },
  });
}
