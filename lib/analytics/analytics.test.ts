// ============================================
// WHAT THIS FILE DOES (plain English):
// Checks the analytics math (visitors, views, click rates, links that
// are never clicked) and the admin sign-in (a right password works, a
// wrong one fails, a forged or expired cookie is refused).
// ============================================

import assert from "node:assert/strict";
import { randomBytes, scryptSync } from "node:crypto";
import { test } from "node:test";
import { newDb } from "pg-mem";
import { groupReferrer, summarize } from "./aggregate";
import { createStore, type Queryable } from "./db";
import type { StoredEvent } from "./types";
import { makeSession, passwordMatches, sessionValid } from "../admin/session";

const base = { name: null, referrer: null, seen: null, depth: null, device: null, source: null, country: null } as const;

function event(over: Partial<StoredEvent>): StoredEvent {
  return { at: "2026-11-03T10:00:00.000Z", visitor: "a", type: "view", path: "/", ...base, ...over };
}

test("summary counts visitors, views, clicks and click rates", () => {
  const seen = ["link:index_work:home", "link:index_about:home"];
  const events: StoredEvent[] = [];
  for (let i = 0; i < 6; i += 1) events.push(event({ visitor: `v${i}`, seen, device: "desktop", referrer: "substack.com" }));
  events.push(event({ visitor: "v0", type: "click", name: "link:index_work:home" }));
  events.push(event({ visitor: "v1", type: "click", name: "link:index_work:home" }));
  events.push(event({ visitor: "v0", type: "scroll", depth: 50 }));
  events.push(event({ visitor: "v1", type: "scroll", depth: 100 }));

  const summary = summarize(events);
  assert.equal(summary.visitors, 6);
  assert.equal(summary.views, 6);
  assert.equal(summary.clicks, 2);
  const work = summary.elements.find((el) => el.name === "link:index_work:home");
  assert.deepEqual([work?.clicks, work?.seen, work?.rate], [2, 6, 33.3]);
  assert.deepEqual(summary.neverClicked.map((el) => el.name), ["link:index_about:home"]);
  assert.equal(summary.pages[0].avgDepth, 75);
  assert.equal(summary.referrers[0].name, "Substack");
  assert.equal(summary.devices[0].name, "desktop");
});

test("referrers are grouped into friendly names", () => {
  assert.equal(groupReferrer("www.linkedin.com", null), "LinkedIn");
  assert.equal(groupReferrer(null, null), "Direct or unknown");
  assert.equal(groupReferrer("example.com", "newsletter"), "newsletter");
});

test("admin password and session cookie checks", () => {
  const salt = randomBytes(16);
  process.env.ADMIN_PASSWORD_HASH = `scrypt$${salt.toString("hex")}$${scryptSync("correct horse battery", salt, 64).toString("hex")}`;
  process.env.JWT_SECRET = "test-secret-value";

  assert.equal(passwordMatches("correct horse battery"), true);
  assert.equal(passwordMatches("wrong password here"), false);

  const session = makeSession(1_000);
  assert.equal(sessionValid(session.value, 2_000), true);
  assert.equal(sessionValid(session.value, 2_000 + 13 * 3_600_000), false); // expired
  assert.equal(sessionValid(`${session.value.split(".")[0]}.deadbeef`, 2_000), false); // forged
  assert.equal(sessionValid(undefined, 2_000), false);
});

test("one ADMIN_PASSWORD setting is enough to sign in", () => {
  delete process.env.ADMIN_PASSWORD_HASH;
  delete process.env.JWT_SECRET;
  process.env.ADMIN_PASSWORD = "a plain password 123";
  assert.equal(passwordMatches("a plain password 123"), true);
  assert.equal(passwordMatches("a plain password 124"), false);
  const session = makeSession(1_000);
  assert.equal(sessionValid(session.value, 2_000), true);
  process.env.ADMIN_PASSWORD = "changed password 456";
  assert.equal(sessionValid(session.value, 2_000), false); // changing the password signs everyone out
  delete process.env.ADMIN_PASSWORD;
});

test("the database layer creates its own table, saves events and reads them back", async () => {
  const { Pool } = newDb().adapters.createPg();
  const store = createStore(new Pool() as unknown as Queryable);

  assert.equal(await store.ping(), true);
  const now = new Date().toISOString();
  await store.save(event({ at: now, visitor: "a1", type: "view", path: "/work", referrer: "substack.com", seen: ["link:index_work:home"], device: "mobile", source: "newsletter" }));
  await store.save(event({ at: now, visitor: "a1", type: "click", path: "/work", name: "link:index_work:home" }));
  await store.save(event({ at: now, visitor: "a1", type: "scroll", path: "/work", depth: 75 }));
  await store.save(event({ at: "2020-01-01T00:00:00.000Z", visitor: "old", type: "view", path: "/" })); // outside the window

  const { events, truncated } = await store.read(7);
  assert.equal(truncated, false);
  assert.equal(events.length, 3);
  assert.deepEqual(events.find((e) => e.type === "view")?.seen, ["link:index_work:home"]);
  assert.equal(events.find((e) => e.type === "scroll")?.depth, 75);
  assert.equal(events.find((e) => e.type === "click")?.name, "link:index_work:home");

  // The same events feed the dashboard math.
  const summary = summarize(events);
  assert.equal(summary.visitors, 1);
  assert.equal(summary.clicks, 1);
  assert.equal(summary.referrers[0].name, "newsletter"); // a link's utm_source wins over the referring site

  // The table rules reject bad data.
  await assert.rejects(() => store.save(event({ type: "scroll", depth: 33 })));
});
