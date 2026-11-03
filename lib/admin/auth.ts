// ============================================
// WHAT THIS FILE DOES (plain English):
// Page-side sign-in for the private admin area. There is one user,
// Brant. After a correct password the browser holds a signed cookie
// for 12 hours (see lib/admin/session.ts). The password is never
// stored: the settings hold only a one-way hash of it, made with
// `node tools/admin/hash-password.mjs`. If ADMIN_PASSWORD_HASH or
// JWT_SECRET is missing, nobody can sign in. Server only.
// ============================================

import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, sessionValid } from "@/lib/admin/session";

export function isAdmin(): boolean {
  return sessionValid(cookies().get(ADMIN_COOKIE)?.value);
}

// THIS SECTION DOES: stop a page unless Brant is signed in
export function requireAdmin(): void {
  if (!isAdmin()) redirect("/admin/login");
}
