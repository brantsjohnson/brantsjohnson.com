// ============================================
// WHAT THIS FILE DOES (plain English):
// The database part of the analytics, written so it works with any
// ordinary Postgres database (Neon, Supabase, Vercel Postgres). It
// creates the one table it needs the first time it is used (so there is
// no SQL for anyone to run), saves visitor events, reads them back for
// the admin page, and does a tiny "are you there" check. It stores no
// IP address, name, email or cookie. It knows nothing about settings
// or the website, so it can be tested on its own.
// ============================================

import type { StoredEvent } from "@/lib/analytics/types";

// The smallest part of a database connection this file needs.
export type Queryable = {
  query: (text: string, values?: unknown[]) => Promise<{ rows: Record<string, unknown>[] }>;
};

export const MAX_ROWS = 60_000;

const DDL = [
  `create table if not exists analytics_events (
    id bigserial primary key,
    at timestamptz not null default now(),
    visitor text not null,
    type text not null check (type in ('view', 'click', 'scroll')),
    path text not null,
    name text,
    referrer text,
    seen text[],
    depth integer check (depth is null or depth in (0, 25, 50, 75, 100)),
    device text check (device is null or device in ('mobile', 'tablet', 'desktop')),
    source text,
    country text
  )`,
  "create index if not exists analytics_events_at_idx on analytics_events (at desc)",
  "create index if not exists analytics_events_type_at_idx on analytics_events (type, at desc)",
];

export function createStore(db: Queryable) {
  let ready: Promise<void> | null = null;

  // THIS SECTION DOES: make the table once per server process, then never again
  const ensureTable = () => {
    if (!ready) {
      ready = (async () => {
        for (const statement of DDL) await db.query(statement);
      })().catch((error) => {
        ready = null; // try again next time
        throw error;
      });
    }
    return ready;
  };

  return {
    // THIS SECTION DOES: save one event
    async save(event: StoredEvent): Promise<void> {
      await ensureTable();
      await db.query(
        "insert into analytics_events (at, visitor, type, path, name, referrer, seen, depth, device, source, country) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",
        [event.at, event.visitor, event.type, event.path, event.name, event.referrer, event.seen, event.depth, event.device, event.source, event.country]
      );
    },

    // THIS SECTION DOES: read the events from the last N days, oldest first, up to a sensible cap
    async read(days: number): Promise<{ events: StoredEvent[]; truncated: boolean }> {
      await ensureTable();
      const since = new Date(Date.now() - days * 86_400_000).toISOString();
      const { rows } = await db.query(
        "select at, visitor, type, path, name, referrer, seen, depth, device, source, country from analytics_events where at >= $1 order by at asc limit $2",
        [since, MAX_ROWS]
      );
      const events = rows.map((row) => ({
        at: row.at instanceof Date ? row.at.toISOString() : String(row.at),
        visitor: String(row.visitor),
        type: row.type as StoredEvent["type"],
        path: String(row.path),
        name: (row.name as string | null) ?? null,
        referrer: (row.referrer as string | null) ?? null,
        seen: (row.seen as string[] | null) ?? null,
        depth: row.depth === null || row.depth === undefined ? null : Number(row.depth),
        device: (row.device as StoredEvent["device"]) ?? null,
        source: (row.source as string | null) ?? null,
        country: (row.country as string | null) ?? null,
      }));
      return { events, truncated: rows.length >= MAX_ROWS };
    },

    // THIS SECTION DOES: a tiny read to confirm the database answers (and keeps a sleepy database awake)
    async ping(): Promise<boolean> {
      try {
        await db.query("select 1 as ok");
        return true;
      } catch {
        return false;
      }
    },
  };
}
