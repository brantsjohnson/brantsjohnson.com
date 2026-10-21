// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the homepage headline test. Edit the list below.
// Visitors are split evenly across whatever is in the list.
// Two headlines is a 50/50 test. Three is an even three-way split.
// The subhead does not change with the headline.
// ============================================

export const HERO_EXPERIMENT_COOKIE = "bj_hero_variant";
export const HERO_EXPERIMENT_HEADER = "x-bj-hero";

// THIS SECTION DOES: the headlines Brant can cut down to two or three
export const heroExperimentVariants = [
  { id: "a", headline: "I build products people show up for." },
  { id: "b", headline: "Software that gets people in the same room." },
  { id: "c", headline: "Fewer screens. More people." },
] as const;

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

// THIS SECTION DOES: pick one headline with equal weight. Pass a random function in tests.
export function assignHeroExperimentId(random: () => number = Math.random): HeroExperimentId {
  const index = Math.min(
    heroExperimentVariants.length - 1,
    Math.floor(random() * heroExperimentVariants.length)
  );
  return heroExperimentVariants[index].id;
}
