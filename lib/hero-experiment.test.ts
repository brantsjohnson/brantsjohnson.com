// ============================================
// WHAT THIS FILE DOES (plain English):
// This checks that the public headline is one sentence.
// Unknown preview ids do not bring back an older line.
// ============================================

import assert from "node:assert/strict";
import { test } from "node:test";
import {
  assignHeroExperimentId,
  heroExperimentVariants,
  heroHeadlineFor,
  parseHeroExperimentId,
} from "./hero-experiment";

test("the public headline is one locked sentence", () => {
  assert.deepEqual(
    heroExperimentVariants.map((variant) => variant.headline),
    ["Good ideas deserve to happen."]
  );
  const ids = heroExperimentVariants.map((variant) => variant.id);
  assert.equal(new Set(ids).size, ids.length);
});

test("an unknown id is rejected and the known id keeps the sentence", () => {
  assert.equal(parseHeroExperimentId("nope"), null);
  assert.equal(parseHeroExperimentId("b"), null);
  assert.equal(parseHeroExperimentId("a"), "a");
  assert.equal(heroHeadlineFor("a"), "Good ideas deserve to happen.");
});

test("every visitor gets the same headline", () => {
  assert.equal(assignHeroExperimentId(() => 0), "a");
  assert.equal(assignHeroExperimentId(() => 0.34), "a");
  assert.equal(assignHeroExperimentId(() => 0.999), "a");
});
