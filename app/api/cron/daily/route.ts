// ============================================
// WHAT THIS FILE DOES (plain English):
// The once-a-day job (set in vercel.json). Shortly after midnight in
// Denver it refreshes the Writing page, the feed, the sitemap and
// llms.txt, so the post whose release day just arrived is listed right
// away. Vercel calls it with a secret; nobody else can.
// ============================================

import { revalidatePath, revalidateTag } from "next/cache";
import { WRITING_TAG } from "@/lib/writing/feeds";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return Response.json({ error: "Not allowed." }, { status: 401 });
  }
  revalidateTag(WRITING_TAG);
  const paths = ["/", "/writing", "/writing/archive", "/writing/feed.xml", "/llms.txt", "/llms-full.txt", "/sitemap.xml"];
  for (const path of paths) revalidatePath(path);
  return Response.json({ ok: true, refreshed: paths });
}
