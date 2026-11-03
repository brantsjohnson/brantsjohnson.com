// ============================================
// WHAT THIS FILE DOES (plain English):
// The shape of the visitor events the site records, shared by the
// browser tracker, the collector and the admin page. Nothing here
// identifies a person: there is no name, email, IP address or cookie.
// A visitor is a short one-way code that changes every day.
// ============================================

export type EventType = "view" | "click" | "scroll";

export type Device = "mobile" | "tablet" | "desktop";

// THIS SECTION DOES: what the browser sends for one event
export type IncomingEvent = {
  t: EventType;
  p: string; // the page path, e.g. /work/crew
  n?: string; // for a click: the data-track name, e.g. link:index_work:home
  r?: string; // for a view: the site the visitor came from, host only, e.g. substack.com
  s?: string[]; // for a view: the names of every tracked link on the page
  d?: number; // for a scroll: the deepest point reached, 25 / 50 / 75 / 100
  v?: Device;
  u?: string; // the utm_source or ref from the link, if any
};

// THIS SECTION DOES: one stored row
export type StoredEvent = {
  at: string;
  visitor: string;
  type: EventType;
  path: string;
  name: string | null;
  referrer: string | null;
  seen: string[] | null;
  depth: number | null;
  device: Device | null;
  source: string | null;
  country: string | null;
};

export const SCROLL_STEPS = [25, 50, 75, 100] as const;
