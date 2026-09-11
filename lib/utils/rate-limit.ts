// ============================================
// WHAT THIS FILE DOES (plain English):
// This is a simple "slow down" guard for public API routes. It counts
// how many requests each visitor (by IP address) makes in a short window
// and blocks them if they go over the limit. This protects against abuse
// and runaway AI costs. It keeps its count in memory, so it is a light,
// best-effort guard: it resets when the server restarts and is not shared
// across separate serverless instances. For a hard guarantee, swap this
// for a shared store (like Upstash Redis) later.
// ============================================

// THIS SECTION DOES: remember, per visitor, when their current window started
// and how many requests they have made in it
type Bucket = { count: number; windowStart: number };
const buckets = new Map<string, Bucket>();

// THIS SECTION DOES: check one visitor against the limit and record the hit.
// Returns whether the request is allowed plus how long until the window resets.
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): { allowed: boolean; remaining: number; retryAfterSeconds: number } {
  const now = Date.now();
  const bucket = buckets.get(key);

  // Start a fresh window if there is none or the old one has expired
  if (!bucket || now - bucket.windowStart >= windowMs) {
    buckets.set(key, { count: 1, windowStart: now });
    return { allowed: true, remaining: limit - 1, retryAfterSeconds: 0 };
  }

  // Still inside the window: allow until the limit, then block
  if (bucket.count < limit) {
    bucket.count += 1;
    return { allowed: true, remaining: limit - bucket.count, retryAfterSeconds: 0 };
  }

  const retryAfterSeconds = Math.ceil((bucket.windowStart + windowMs - now) / 1000);
  return { allowed: false, remaining: 0, retryAfterSeconds };
}

// THIS SECTION DOES: pull a best-effort visitor IP from the request headers
// that Vercel and other hosts set. Falls back to a shared bucket if unknown.
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}
