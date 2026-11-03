// ============================================
// WHAT THIS FILE DOES (plain English):
// This receives the small visitor events the browser sends (a page
// view, a click on a tracked link, how far someone scrolled), checks
// them, and saves them. It never stores an IP address: the visitor is
// a one-way code made from the IP, the browser and today's date, so
// it cannot be traced back to a person and it changes every day.
// Visitors who ask not to be tracked are skipped, bots are skipped,
// and the reply is always an empty "got it" so nothing slows a page.
// ============================================

import { createHash } from "node:crypto";
import { saveEvent, analyticsConfigured } from "@/lib/analytics/store";
import { SCROLL_STEPS, type Device, type EventType, type IncomingEvent } from "@/lib/analytics/types";
import { getClientIp, rateLimit } from "@/lib/utils/rate-limit";

export const runtime = "nodejs";

const BOT = /bot|crawl|spider|slurp|preview|facebookexternalhit|headless|lighthouse|pingdom|uptime|curl|wget|python-requests/i;
const TYPES: EventType[] = ["view", "click", "scroll"];
const DEVICES: Device[] = ["mobile", "tablet", "desktop"];
const NAME = /^[a-z0-9_:.\-/ +]{1,120}$/i;

const empty = () => new Response(null, { status: 204 });

function clean(value: unknown, limit: number): string | null {
  return typeof value === "string" && value.length > 0 && value.length <= limit ? value : null;
}

export async function POST(request: Request) {
  if (!analyticsConfigured()) return empty();
  const userAgent = request.headers.get("user-agent") ?? "";
  if (BOT.test(userAgent) || request.headers.get("dnt") === "1") return empty();

  const ip = getClientIp(request);
  if (!rateLimit(`track:${ip}`, 240, 60_000).allowed) return empty();

  let incoming: IncomingEvent;
  try {
    const text = await request.text();
    if (text.length > 6000) return empty();
    incoming = JSON.parse(text) as IncomingEvent;
  } catch {
    return empty();
  }

  if (!TYPES.includes(incoming.t)) return empty();
  const path = clean(incoming.p, 200);
  if (!path || !path.startsWith("/") || path.startsWith("/admin") || path.startsWith("/api")) return empty();

  const name = clean(incoming.n, 120);
  if (incoming.t === "click" && (!name || !NAME.test(name))) return empty();
  const depth = typeof incoming.d === "number" && (SCROLL_STEPS as readonly number[]).includes(incoming.d) ? incoming.d : null;
  if (incoming.t === "scroll" && depth === null) return empty();
  const seen = Array.isArray(incoming.s)
    ? incoming.s.filter((item): item is string => typeof item === "string" && NAME.test(item)).slice(0, 80)
    : null;

  const day = new Date().toISOString().slice(0, 10);
  const salt = process.env.ANALYTICS_SALT || process.env.JWT_SECRET || process.env.ADMIN_PASSWORD_HASH || process.env.ADMIN_PASSWORD || "brantsjohnson";
  const visitor = createHash("sha256").update(`${salt}|${day}|${ip}|${userAgent}`).digest("hex").slice(0, 16);

  await saveEvent({
    at: new Date().toISOString(),
    visitor,
    type: incoming.t,
    path,
    name: incoming.t === "click" ? name : null,
    referrer: incoming.t === "view" ? clean(incoming.r, 100) : null,
    seen: incoming.t === "view" ? seen : null,
    depth: incoming.t === "scroll" ? depth : null,
    device: incoming.t === "view" && incoming.v && DEVICES.includes(incoming.v) ? incoming.v : null,
    source: incoming.t === "view" ? clean(incoming.u, 40) : null,
    country: request.headers.get("x-vercel-ip-country"),
  });
  return empty();
}
