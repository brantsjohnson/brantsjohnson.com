// ============================================
// WHAT THIS FILE DOES (plain English):
// This saves visitor events to the database and reads them back for
// the admin page. It uses the existing Supabase project, in the
// "site" schema, table analytics_events (see
// supabase/migrations/20261103_000002_analytics.sql). If the database
// settings are not there, saving quietly does nothing and the admin
// page explains what to set up. Server only.
// ============================================

import "server-only";
import { createServerClient } from "@/lib/supabase";
import type { StoredEvent } from "@/lib/analytics/types";

export function analyticsConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

// THIS SECTION DOES: save one event. Failures are logged, never shown to the visitor.
export async function saveEvent(event: StoredEvent): Promise<void> {
  if (!analyticsConfigured()) return;
  try {
    const { error } = await createServerClient().schema("site").from("analytics_events").insert(event);
    if (error) console.error("analytics insert failed:", error.message);
  } catch (error) {
    console.error("analytics insert failed:", error instanceof Error ? error.message : error);
  }
}

// THIS SECTION DOES: one tiny read, so a free Supabase project never looks idle and never pauses.
// The daily job calls this. Returns whether the database answered.
export async function keepAlive(): Promise<boolean> {
  if (!analyticsConfigured()) return false;
  try {
    const { error } = await createServerClient().schema("site").from("analytics_events").select("id").limit(1);
    return !error;
  } catch {
    return false;
  }
}

// THIS SECTION DOES: read the events from the last N days, a page at a time, up to a sensible cap
export async function readEvents(days: number): Promise<{ events: StoredEvent[]; truncated: boolean }> {
  const since = new Date(Date.now() - days * 86_400_000).toISOString();
  const client = createServerClient().schema("site");
  const events: StoredEvent[] = [];
  const pageSize = 1000;
  const maxPages = 60;
  for (let page = 0; page < maxPages; page += 1) {
    const { data, error } = await client
      .from("analytics_events")
      .select("at,visitor,type,path,name,referrer,seen,depth,device,source,country")
      .gte("at", since)
      .order("at", { ascending: true })
      .range(page * pageSize, page * pageSize + pageSize - 1);
    if (error) throw new Error(error.message);
    events.push(...((data ?? []) as StoredEvent[]));
    if (!data || data.length < pageSize) return { events, truncated: false };
  }
  return { events, truncated: true };
}
