// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the "refresh the site now" button for agents and automations.
// After a post goes out on Substack, or after a content change is
// merged, a call here makes the Writing page (and any page named)
// rebuild right away instead of waiting for the hourly refresh.
// It only works with the secret in the REVALIDATE_SECRET setting.
//
//   curl -X POST https://www.brantsjohnson.com/api/revalidate \
//     -H "x-revalidate-secret: $REVALIDATE_SECRET" \
//     -H "Content-Type: application/json" \
//     -d '{"paths":["/writing","/work/crew"]}'
//
// Leaving the body empty refreshes the writing feeds and the main pages.
// Add "indexnow": true to also notify search engines about every post right now.
// ============================================

import { timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { submitToIndexNow } from "@/lib/indexnow";
import { availablePosts } from "@/lib/posts/load";
import { siteOrigin } from "@/lib/site/origin";
import { WRITING_TAG } from "@/lib/writing/feeds";
import { getClientIp, rateLimit } from "@/lib/utils/rate-limit";

export const runtime = "nodejs";

const DEFAULT_PATHS = ["/", "/writing", "/work", "/events"];

function sameSecret(given: string, expected: string): boolean {
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected) {
    return Response.json({ error: "Refresh is not set up. Set REVALIDATE_SECRET." }, { status: 503 });
  }
  const limit = rateLimit(`revalidate:${getClientIp(request)}`, 20, 60_000);
  if (!limit.allowed) return Response.json({ error: "Too many requests." }, { status: 429 });
  if (!sameSecret(request.headers.get("x-revalidate-secret") ?? "", expected)) {
    return Response.json({ error: "Not allowed." }, { status: 401 });
  }

  let body: { paths?: unknown; indexnow?: unknown } = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }
  const asked = Array.isArray(body.paths) ? body.paths.filter((p): p is string => typeof p === "string") : [];
  const paths = (asked.length ? asked : DEFAULT_PATHS).filter((p) => p.startsWith("/") && p.length < 200).slice(0, 30);

  revalidateTag(WRITING_TAG);
  for (const path of paths) revalidatePath(path);
  for (const path of ["/writing/archive", "/llms.txt", "/llms-full.txt", "/sitemap.xml"]) revalidatePath(path);

  // With "indexnow": true, also tell search engines (and through Bing, AI search) about every available post now.
  let indexnow: Awaited<ReturnType<typeof submitToIndexNow>> | undefined;
  if (body.indexnow === true) {
    const origin = siteOrigin();
    indexnow = await submitToIndexNow(origin, [
      `${origin}/`,
      `${origin}/writing`,
      `${origin}/writing/archive`,
      ...availablePosts().map((post) => `${origin}/writing/${post.slug}`),
      ...paths.map((path) => `${origin}${path}`),
    ]);
  }
  return Response.json({ ok: true, refreshed: paths, tag: WRITING_TAG, indexnow });
}
