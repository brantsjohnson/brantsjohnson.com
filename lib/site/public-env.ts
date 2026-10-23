// ============================================
// WHAT THIS FILE DOES (plain English):
// This resolves the Substack publication URL for the writing feed
// and the newsletter signup link. SUBSTACK_URL can override the
// default. Values are read when a page is requested.
// ============================================

import "server-only";
import { unstable_noStore as noStore } from "next/cache";
import {
  substackBaseFromEnv,
  substackSubscribeUrlFromBase,
  SUBSTACK_PUBLICATION_URL,
} from "@/lib/site/substack-url";

export { SUBSTACK_PUBLICATION_URL };

// THIS SECTION DOES: turn SUBSTACK_URL into the publication root.
// A pasted /feed or /subscribe address is trimmed back to that root.
export function substackBase(): string {
  noStore();
  return substackBaseFromEnv(process.env.SUBSTACK_URL);
}

// THIS SECTION DOES: build the subscribe link the Writing page button uses
export function substackSubscribeUrl(): string {
  noStore();
  return substackSubscribeUrlFromBase(substackBase());
}
