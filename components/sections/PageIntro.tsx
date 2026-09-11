// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the top of an inner page: a small category label
// (eyebrow), the page title (H1), and an optional one-line summary
// (deck). Every inner page uses this so their headers line up and
// read in the same order (docs/14 §4.1).
// ============================================

import { FadeInOnScroll } from "@/components/motion/FadeInOnScroll";

// THIS SECTION DOES: describe what the intro needs
type PageIntroProps = {
  eyebrow: string; // the small category label above the title
  title: string; // the page title
  deck?: string; // an optional one-line summary under the title
};

// THIS SECTION DOES: draw the page intro in the standard order
export function PageIntro({ eyebrow, title, deck }: PageIntroProps) {
  return (
    <FadeInOnScroll className="shell pt-16 pb-8">
      <p className="text-caption uppercase tracking-widest text-text-secondary">{eyebrow}</p>
      <h1 className="mt-3 text-h1">{title}</h1>
      {deck && <p className="mt-4 max-w-reading text-body text-text-secondary">{deck}</p>}
    </FadeInOnScroll>
  );
}
