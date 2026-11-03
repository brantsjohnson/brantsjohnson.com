// ============================================
// WHAT THIS FILE DOES (plain English):
// This turns the raw stored events into the numbers on the admin
// page: visitors and page views per day, the top pages, where
// visitors came from, which links get clicked and which never do,
// and how far people scroll. It is plain math on a list, so it can
// be tested without a database.
// ============================================

import type { StoredEvent } from "@/lib/analytics/types";

export type Summary = {
  visitors: number;
  views: number;
  clicks: number;
  viewsPerVisitor: number;
  perDay: { date: string; visitors: number; views: number }[];
  pages: { path: string; views: number; visitors: number; avgDepth: number | null }[];
  referrers: { name: string; views: number }[];
  devices: { name: string; visitors: number }[];
  elements: { name: string; seen: number; clicks: number; rate: number }[];
  neverClicked: { name: string; seen: number }[];
};

// THIS SECTION DOES: give a referrer host a friendly group name
export function groupReferrer(host: string | null, source: string | null): string {
  const raw = (source || host || "").toLowerCase();
  if (!raw) return "Direct or unknown";
  if (raw.includes("substack")) return "Substack";
  if (raw.includes("linkedin") || raw.includes("lnkd")) return "LinkedIn";
  if (raw.includes("google")) return "Google";
  if (raw.includes("bing") || raw.includes("duckduckgo")) return "Search";
  if (raw === "t.co" || raw.includes("twitter") || raw.includes("x.com")) return "X";
  if (raw.includes("instagram")) return "Instagram";
  if (raw.includes("facebook") || raw.includes("fb.com")) return "Facebook";
  if (raw.includes("brantsjohnson")) return "This site";
  return raw;
}

const top = <T,>(items: T[], count: number) => items.slice(0, count);

// THIS SECTION DOES: build the whole summary from a list of events
export function summarize(events: StoredEvent[], minSeenForNeverClicked = 5): Summary {
  const visitors = new Set<string>();
  const dayVisitors = new Map<string, Set<string>>();
  const dayViews = new Map<string, number>();
  const pageViews = new Map<string, { views: number; visitors: Set<string>; depthTotal: number; depthCount: number }>();
  const referrers = new Map<string, number>();
  const deviceVisitors = new Map<string, Set<string>>();
  const seenCount = new Map<string, number>();
  const clickCount = new Map<string, number>();
  let views = 0;
  let clicks = 0;

  const page = (path: string) => {
    let entry = pageViews.get(path);
    if (!entry) {
      entry = { views: 0, visitors: new Set(), depthTotal: 0, depthCount: 0 };
      pageViews.set(path, entry);
    }
    return entry;
  };

  for (const event of events) {
    visitors.add(event.visitor);
    const day = event.at.slice(0, 10);
    if (event.type === "view") {
      views += 1;
      const dv = dayVisitors.get(day) ?? new Set<string>();
      dv.add(event.visitor);
      dayVisitors.set(day, dv);
      dayViews.set(day, (dayViews.get(day) ?? 0) + 1);
      const entry = page(event.path);
      entry.views += 1;
      entry.visitors.add(event.visitor);
      const group = groupReferrer(event.referrer, event.source);
      referrers.set(group, (referrers.get(group) ?? 0) + 1);
      if (event.device) {
        const set = deviceVisitors.get(event.device) ?? new Set<string>();
        set.add(event.visitor);
        deviceVisitors.set(event.device, set);
      }
      for (const name of Array.from(new Set(event.seen ?? []))) seenCount.set(name, (seenCount.get(name) ?? 0) + 1);
    } else if (event.type === "click" && event.name) {
      clicks += 1;
      clickCount.set(event.name, (clickCount.get(event.name) ?? 0) + 1);
    } else if (event.type === "scroll" && event.depth !== null) {
      const entry = page(event.path);
      entry.depthTotal += event.depth;
      entry.depthCount += 1;
    }
  }

  const perDay = Array.from(dayViews.keys())
    .sort()
    .map((date) => ({ date, visitors: dayVisitors.get(date)?.size ?? 0, views: dayViews.get(date) ?? 0 }));

  const pages = Array.from(pageViews.entries())
    .filter(([, entry]) => entry.views > 0)
    .map(([path, entry]) => ({
      path,
      views: entry.views,
      visitors: entry.visitors.size,
      avgDepth: entry.depthCount ? Math.round(entry.depthTotal / entry.depthCount) : null,
    }))
    .sort((a, b) => b.views - a.views);

  const names = new Set<string>(Array.from(seenCount.keys()).concat(Array.from(clickCount.keys())));
  const elements = Array.from(names)
    .map((name) => {
      const seen = seenCount.get(name) ?? 0;
      const clicked = clickCount.get(name) ?? 0;
      return { name, seen, clicks: clicked, rate: seen ? Math.round((clicked / seen) * 1000) / 10 : 0 };
    })
    .sort((a, b) => b.clicks - a.clicks || b.seen - a.seen);

  const neverClicked = elements
    .filter((element) => element.clicks === 0 && element.seen >= minSeenForNeverClicked)
    .map(({ name, seen }) => ({ name, seen }))
    .sort((a, b) => b.seen - a.seen);

  return {
    visitors: visitors.size,
    views,
    clicks,
    viewsPerVisitor: visitors.size ? Math.round((views / visitors.size) * 10) / 10 : 0,
    perDay,
    pages: top(pages, 25),
    referrers: top(Array.from(referrers.entries()).map(([name, count]) => ({ name, views: count })).sort((a, b) => b.views - a.views), 12),
    devices: Array.from(deviceVisitors.entries()).map(([name, set]) => ({ name, visitors: set.size })).sort((a, b) => b.visitors - a.visitors),
    elements: top(elements, 40),
    neverClicked: top(neverClicked, 30),
  };
}
