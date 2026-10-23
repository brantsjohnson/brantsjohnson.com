// ============================================
// WHAT THIS FILE DOES (plain English):
// This checks the Substack publication URL and the subscribe link
// the Writing page uses when the signup is shown.
// ============================================

import assert from "node:assert/strict";
import { test } from "node:test";
import {
  substackBaseFromEnv,
  substackSubscribeUrlFromBase,
} from "./substack-url";

test("substack subscribe URL defaults to Brant's publication", () => {
  assert.equal(substackBaseFromEnv(undefined), "https://brantsjohnson.substack.com");
  assert.equal(
    substackSubscribeUrlFromBase(substackBaseFromEnv(undefined)),
    "https://brantsjohnson.substack.com/subscribe",
  );
  assert.equal(
    substackBaseFromEnv("https://example.substack.com/subscribe"),
    "https://example.substack.com",
  );
  assert.equal(
    substackSubscribeUrlFromBase(substackBaseFromEnv("https://example.substack.com/subscribe")),
    "https://example.substack.com/subscribe",
  );
});
