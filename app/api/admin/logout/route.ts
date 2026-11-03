// ============================================
// WHAT THIS FILE DOES (plain English):
// Signs out of the admin pages by clearing the sign-in cookie.
// ============================================

import { ADMIN_COOKIE } from "@/lib/admin/session";

export const runtime = "nodejs";

export async function POST() {
  return new Response(JSON.stringify({ ok: true }), {
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": `${ADMIN_COOKIE}=; Path=/; Max-Age=0; HttpOnly; SameSite=Strict`,
    },
  });
}
