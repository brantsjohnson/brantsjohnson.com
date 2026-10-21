// ============================================
// WHAT THIS FILE DOES (plain English):
// This checks the headline list and the even split.
// Cutting the list to two headlines makes the split 50/50.
// ============================================

import assert from "node:assert/strict";
import { test } from "node:test";
import {
  assignHeroExperimentId,
  heroExperimentVariants,
  heroHeadlineFor,
  parseHeroExperimentId,
} from "./hero-experiment";

test("the headline list is the three approved lines", () => {
  assert.deepEqual(
    heroExperimentVariants.map((variant) => variant.headline),
    [
      "I build products people show up for.",
      "Software that gets people in the same room.",
      "Fewer screens. More people.",
    ]
  );
  const ids = heroExperimentVariants.map((variant) => variant.id);
  assert.equal(new Set(ids).size, ids.length);
});

test("an unknown id is rejected and a known id keeps its headline", () => {
  assert.equal(parseHeroExperimentId("nope"), null);
  assert.equal(parseHeroExperimentId("b"), "b");
  assert.equal(heroHeadlineFor("c"), "Fewer screens. More people.");
});

test("visitors are split evenly across the list", () => {
  assert.equal(assignHeroExperimentId(() => 0), "a");
  assert.equal(assignHeroExperimentId(() => 0.34), "b");
  assert.equal(assignHeroExperimentId(() => 0.67), "c");
  assert.equal(assignHeroExperimentId(() => 0.999), "c");
});
