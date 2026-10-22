// ============================================
// WHAT THIS FILE DOES (plain English):
// This reads the public site switch that must stay off until Brant
// sets it: the Substack publication URL. It is read when a page is
// requested, so a value added later shows up without a new build.
// The function does not invent a URL.
// ============================================

import "server-only";
import { unstable_noStore as noStore } from "next/cache";

// THIS SECTION DOES: turn SUBSTACK_URL into the publication root.
// A pasted /feed or /subscribe address is trimmed back to that root.
export function substackBase(): string | null {
  noStore();
  const raw = process.env.SUBSTACK_URL?.trim();
  if (!raw || !/^https?:\/\//i.test(raw)) return null;
  return raw.replace(/\/+$/, "").replace(/\/(feed|subscribe)$/i, "");
}
