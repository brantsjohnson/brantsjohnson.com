// ============================================
// WHAT THIS FILE DOES (plain English):
// Makes the value for the ADMIN_PASSWORD_HASH setting. Run it on your
// own computer, type the password you want, and paste the line it
// prints into Vercel (Settings, Environment Variables). The password
// itself is never saved anywhere.
//
//   node tools/admin/hash-password.mjs "your long password"
// ============================================

import { randomBytes, scryptSync } from "node:crypto";

const password = process.argv[2];
if (!password || password.length < 12) {
  console.error('Usage: node tools/admin/hash-password.mjs "a password of at least 12 characters"');
  process.exit(1);
}
const salt = randomBytes(16);
const hash = scryptSync(password, salt, 64);
console.log(`ADMIN_PASSWORD_HASH=scrypt$${salt.toString("hex")}$${hash.toString("hex")}`);
console.log("Also set JWT_SECRET to a long random string, for example:");
console.log(`JWT_SECRET=${randomBytes(32).toString("hex")}`);
