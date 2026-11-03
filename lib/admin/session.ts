// ============================================
// WHAT THIS FILE DOES (plain English):
// The checks behind the admin sign-in: does a typed password match the
// stored one-way hash (scrypt), and is a sign-in cookie genuine and
// still fresh (signed with JWT_SECRET, good for 12 hours). No page code
// lives here, so it can be tested on its own.
// ============================================

import { createHmac, scryptSync, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE = "bj_admin";
export const SESSION_HOURS = 12;

export function adminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD_HASH && process.env.JWT_SECRET);
}

// THIS SECTION DOES: check a typed password against the stored hash, in constant time
export function passwordMatches(password: string): boolean {
  const stored = process.env.ADMIN_PASSWORD_HASH ?? "";
  const [kind, salt, hash] = stored.split("$");
  if (kind !== "scrypt" || !salt || !hash) return false;
  try {
    const expected = Buffer.from(hash, "hex");
    const actual = scryptSync(password, Buffer.from(salt, "hex"), expected.length);
    return actual.length === expected.length && timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}

function signature(expires: string): string {
  return createHmac("sha256", process.env.JWT_SECRET ?? "").update(`admin.${expires}`).digest("hex");
}

// THIS SECTION DOES: make and check the signed cookie value
export function makeSession(now = Date.now()): { value: string; maxAge: number } {
  const expires = String(now + SESSION_HOURS * 3_600_000);
  return { value: `${expires}.${signature(expires)}`, maxAge: SESSION_HOURS * 3600 };
}

export function sessionValid(value: string | undefined, now = Date.now()): boolean {
  if (!value || !process.env.JWT_SECRET) return false;
  const [expires, given] = value.split(".");
  if (!expires || !given || Number(expires) < now) return false;
  const expected = signature(expires);
  return expected.length === given.length && timingSafeEqual(Buffer.from(expected), Buffer.from(given));
}
