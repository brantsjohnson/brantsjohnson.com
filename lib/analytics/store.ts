// ============================================
// WHAT THIS FILE DOES (plain English):
// This connects the analytics to the database. It looks for the
// database address in the site's settings (ANALYTICS_DATABASE_URL, or
// the POSTGRES_URL or DATABASE_URL that Vercel adds when a Neon
// database is connected to the project). With no address, saving
// quietly does nothing and the admin page explains what to set up.
// The table makes itself the first time. Server only.
// ============================================

import "server-only";
import { Pool } from "pg";
import { createStore } from "@/lib/analytics/db";
import type { StoredEvent } from "@/lib/analytics/types";

function connectionString(): string | null {
  const value = process.env.ANALYTICS_DATABASE_URL || process.env.POSTGRES_URL || process.env.DATABASE_URL;
  return value && value.startsWith("postgres") ? value : null;
}

export function analyticsConfigured(): boolean {
  return connectionString() !== null;
}

// One shared connection pool per server process.
const globalForPool = globalThis as unknown as { __analyticsStore?: ReturnType<typeof createStore> };

function store() {
  const url = connectionString();
  if (!url) return null;
  if (!globalForPool.__analyticsStore) {
    const pool = new Pool({ connectionString: url, max: 3, idleTimeoutMillis: 10_000, connectionTimeoutMillis: 8_000 });
    pool.on("error", (error) => console.error("analytics database error:", error.message));
    globalForPool.__analyticsStore = createStore(pool);
  }
  return globalForPool.__analyticsStore;
}

// THIS SECTION DOES: save one event. Failures are logged, never shown to the visitor.
export async function saveEvent(event: StoredEvent): Promise<void> {
  const db = store();
  if (!db) return;
  try {
    await db.save(event);
  } catch (error) {
    console.error("analytics save failed:", error instanceof Error ? error.message : error);
  }
}

// THIS SECTION DOES: one tiny read each day, so a sleepy database stays warm and the daily job can report if it is down
export async function keepAlive(): Promise<boolean> {
  const db = store();
  return db ? db.ping() : false;
}

// THIS SECTION DOES: the events from the last N days for the admin page
export async function readEvents(days: number): Promise<{ events: StoredEvent[]; truncated: boolean }> {
  const db = store();
  if (!db) return { events: [], truncated: false };
  return db.read(days);
}
