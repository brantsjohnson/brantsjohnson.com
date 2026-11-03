// ============================================
// WHAT THIS FILE DOES (plain English):
// Proves to IndexNow that this site owns its key by serving the key
// (the INDEXNOW_KEY setting) as plain text at /indexnow-key.txt.
// ============================================

import { indexNowKey } from "@/lib/indexnow";

export const dynamic = "force-dynamic";

export function GET() {
  const key = indexNowKey();
  if (!key) return new Response("Not found", { status: 404 });
  return new Response(key, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
