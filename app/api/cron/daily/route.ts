// ============================================
// WHAT THIS FILE DOES (plain English):
// The once-a-day job (set in vercel.json). Shortly after midnight in
// Denver it refreshes the Writing page, the feed, the sitemap and
// llms.txt, so the post whose release day just arrived is listed right
// away. It also makes one tiny database read to confirm the analytics
// database answers. Vercel calls it with a secret; nobody else can.
// ============================================

import { revalidatePath, revalidateTag } from "next/cache";
import { keepAlive } from "@/lib/analytics/store";
import { WRITING_TAG } from "@/lib/writing/feeds";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  // With CRON_SECRET set, Vercel sends it and it must match. Without it, only Vercel's own scheduler
  // (its user agent) is allowed. The job only refreshes pages, so this is a safe default.
  const secret = process.env.CRON_SECRET;
  const fromVercel = (request.headers.get("user-agent") ?? "").startsWith("vercel-cron/");
  const allowed = secret ? request.headers.get("authorization") === `Bearer ${secret}` : fromVercel;
  if (!allowed) {
    return Response.json({ error: "Not allowed." }, { status: 401 });
  }
  revalidateTag(WRITING_TAG);
  const paths = ["/", "/writing", "/writing/archive", "/writing/feed.xml", "/llms.txt", "/llms-full.txt", "/sitemap.xml"];
  for (const path of paths) revalidatePath(path);
  const database = await keepAlive(); // a tiny database read; reports if the database is down
  return Response.json({ ok: true, refreshed: paths, database });
}
