// ============================================
// WHAT THIS FILE DOES (plain English):
// This reads the public site switches that must stay off until Brant
// sets them: the Substack publication URL and the public CV link.
// Both are read when a page is requested, so a value added later
// shows up without a new build. Neither function invents a URL.
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

// THIS SECTION DOES: return the public CV link only when CV_URL is set
export function publicCvUrl(): string | null {
  noStore();
  const url = process.env.CV_URL?.trim();
  if (!url || !/^https?:\/\//i.test(url)) return null;
  return url;
}
