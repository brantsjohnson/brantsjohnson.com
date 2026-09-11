// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the top of the home page. It shows Brant's full name large
// in the serif typeface, variant-specific headline and body when the
// visitor arrived via a referral link, and two actions: "Ask about my
// work" opens BrantChat, and "See my experience" goes to Experience.
// ============================================

import { FadeInOnScroll } from "@/components/motion/FadeInOnScroll";
import { Button } from "@/components/ui/Button";
import { OpenChatButton } from "@/components/chatbot/OpenChatButton";
import type { ReferralVariantCopy } from "@/content/referral-variants";
import { hero } from "@/content/site-content";

type HeroProps = {
  /** When set, headline and body follow the referral variant (docs/15). */
  copy?: ReferralVariantCopy;
};

// THIS SECTION DOES: draw the home hero with the name, positioning copy, and the two actions
export function Hero({ copy }: HeroProps) {
  const headline = copy?.heroHeadline ?? hero.positioning;
  const body = copy?.heroBody;

  return (
    <FadeInOnScroll className="shell pt-24 pb-16 md:pt-32">
      <div data-referral-variant={copy?.id}>
      <p className="text-caption uppercase tracking-widest text-text-secondary">{hero.eyebrow}</p>

      <h1 className="mt-4 text-display font-serif">{hero.name}</h1>

      <p className="mt-6 max-w-reading text-h3 text-text-primary">{headline}</p>
      {body ? (
        <p className="mt-4 max-w-reading text-body text-text-secondary">{body}</p>
      ) : null}
      {copy && copy.focusLines.length > 0 ? (
        <ul className="mt-6 flex max-w-reading flex-col gap-3">
          {copy.focusLines.map((line) => (
            <li key={line} className="text-body text-text-primary before:mr-2 before:content-['•']">
              {line}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-8 flex flex-wrap gap-4">
        <OpenChatButton variant="primary">{hero.primaryCta.label}</OpenChatButton>
        <Button variant="ghost" href={hero.secondaryCta.href}>
          {hero.secondaryCta.label}
        </Button>
      </div>
      </div>
    </FadeInOnScroll>
  );
}
