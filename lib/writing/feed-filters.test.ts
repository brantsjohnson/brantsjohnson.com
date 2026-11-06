// ============================================
// WHAT THIS FILE DOES (plain English):
// This checks that Substack's default starter post is kept off
// the Articles list, while a real /p/ slug still counts.
// ============================================

import assert from "node:assert/strict";
import { test } from "node:test";
import { isDefaultSubstackPost, isSubstackStarterFeedItem } from "./feed-filters";

test("Substack's default starter post is filtered from Articles", () => {
  assert.equal(isDefaultSubstackPost("https://brantsjohnson.substack.com/p/coming-soon"), true);
  assert.equal(isDefaultSubstackPost("https://brantsjohnson.substack.com/p/coming-soon/"), true);
  assert.equal(isDefaultSubstackPost("https://brantsjohnson.substack.com/p/13-reasons-theatre-kids"), false);
  assert.equal(isDefaultSubstackPost("https://brantsjohnson.substack.com/p/coming-soon-to-a-city-near-you"), false);
});

test("RSS items match the Substack starter by URL or title", () => {
  assert.equal(
    isSubstackStarterFeedItem("https://brantsjohnson.substack.com/p/coming-soon", "Any title"),
    true
  );
  assert.equal(
    isSubstackStarterFeedItem("https://brantsjohnson.substack.com/p/other", "Coming soon"),
    true
  );
  assert.equal(
    isSubstackStarterFeedItem("https://brantsjohnson.substack.com/p/13-reasons-theatre-kids", "Thirteen reasons"),
    false
  );
});
