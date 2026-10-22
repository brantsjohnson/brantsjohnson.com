// ============================================
// WHAT THIS FILE DOES (plain English):
// The public headline is one locked sentence. Older alternate lines
// are not shown, and a ?hero= query does not swap them in.
// This module stays so a leftover caller still returns that sentence.
// ============================================

export const HERO_EXPERIMENT_COOKIE = "bj_hero_variant";
export const HERO_EXPERIMENT_HEADER = "x-bj-hero";

// THIS SECTION DOES: the only public headline
export const heroExperimentVariants = [{ id: "a", headline: "Good ideas deserve to happen." }] as const;

export type HeroExperimentId = (typeof heroExperimentVariants)[number]["id"];

export function parseHeroExperimentId(value: string | null | undefined): HeroExperimentId | null {
  if (!value) return null;
  const found = heroExperimentVariants.find((variant) => variant.id === value);
  return found ? found.id : null;
}

export function heroHeadlineFor(id: HeroExperimentId): string {
  const found = heroExperimentVariants.find((variant) => variant.id === id);
  return found ? found.headline : heroExperimentVariants[0].headline;
}

// THIS SECTION DOES: there is one line, so every visitor gets it.
export function assignHeroExperimentId(_random: () => number = Math.random): HeroExperimentId {
  return heroExperimentVariants[0].id;
}
