// ============================================
// WHAT THIS FILE DOES (plain English):
// The checks behind the admin sign-in: does a typed password match
// the password set in Vercel, and is a sign-in cookie genuine and
// still fresh (good for 12 hours). One setting is enough: ADMIN_PASSWORD.
// (A one-way scrypt hash in ADMIN_PASSWORD_HASH also works, for anyone
// who prefers not to store the plain password.) The cookie is signed
// with a key made from that setting, so changing the password signs
// everyone out. No page code lives here, so it can be tested on its own.
// ============================================

import { createHash, createHmac, scryptSync, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE = "bj_admin";
export const SESSION_HOURS = 12;

export function adminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD_HASH);
}

const sha256 = (value: string) => createHash("sha256").update(value).digest();

// THIS SECTION DOES: check a typed password, in constant time
export function passwordMatches(password: string): boolean {
  const plain = process.env.ADMIN_PASSWORD;
  if (plain) return timingSafeEqual(sha256(password), sha256(plain));

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

// The key that signs the cookie: JWT_SECRET if set, otherwise made from the password setting.
function signingKey(): string {
  return process.env.JWT_SECRET || process.env.ADMIN_PASSWORD_HASH || process.env.ADMIN_PASSWORD || "";
}

function signature(expires: string): string {
  return createHmac("sha256", sha256(`admin-session|${signingKey()}`)).update(`admin.${expires}`).digest("hex");
}

// THIS SECTION DOES: make and check the signed cookie value
export function makeSession(now = Date.now()): { value: string; maxAge: number } {
  const expires = String(now + SESSION_HOURS * 3_600_000);
  return { value: `${expires}.${signature(expires)}`, maxAge: SESSION_HOURS * 3600 };
}

export function sessionValid(value: string | undefined, now = Date.now()): boolean {
  if (!value || !signingKey()) return false;
  const [expires, given] = value.split(".");
  if (!expires || !given || Number(expires) < now) return false;
  const expected = signature(expires);
  return expected.length === given.length && timingSafeEqual(Buffer.from(expected), Buffer.from(given));
}
