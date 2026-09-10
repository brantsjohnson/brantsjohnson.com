// ============================================
// WHAT THIS FILE DOES (plain English):
// This holds the copy for the home page: the hero promise, the short
// supporting paragraph, and the Crew Finance "proof" spotlight (a
// scannable summary of a real, high-value win). Keeping it here lets
// the front door be rewritten without touching layout code.
// ============================================

// THIS SECTION DOES: the hero block copy.
// The headline is the site promise; the eyebrow is the role; the support line adds honest context.
export const hero = {
  eyebrow: "Product-minded founder",
  headline: "I build technology as a bridge to real human connection.",
  support:
    "I work across product, AI, media, and government. Most of my ideas start with a room full of people and end as software that helps strangers become friends.",
  // The single primary action on the page points into the long story.
  primaryCta: { label: "About", href: "/about" },
};

// THIS SECTION DOES: describe one number-and-label pair for the proof spotlight
export type SpotlightStat = {
  value: string; // the number or short figure
  label: string; // what the number measures
};

// THIS SECTION DOES: the Crew Finance proof spotlight.
// This is a scannable, high-credibility win: I taught myself illustration and built the
// entire brand and product design for a venture-backed startup, saving real money and time.
// Figures come from the CV.
export const crewSpotlight = {
  eyebrow: "Proof",
  org: "Crew Finance",
  role: "Principal Product Manager, founding team",
  period: "Dec 2022 to Mar 2024",
  title: "I taught myself to draw, then designed a funded startup's entire brand.",
  description:
    "For a startup that raised about $2.5M, I owned the branding and illustration end to end. Self-taught with no art classes, I hand-drew the visual language, added animation and a full dark mode, and internalized design work a studio would normally bill for.",
  stats: [
    { value: "$2.5M", label: "Raised by the startup I helped brand" },
    { value: "$110k", label: "Design cost internalized" },
    { value: "350+ hrs", label: "Saved by keeping design in house" },
  ] satisfies SpotlightStat[],
};

// THIS SECTION DOES: the small heading above the featured project block on the home page
export const currentlyBuilding = {
  eyebrow: "Currently building",
  allLinkLabel: "All projects",
};
