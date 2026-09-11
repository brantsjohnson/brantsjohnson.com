// ============================================
// WHAT THIS FILE DOES (plain English):
// The home page hero block. It shows the visitor's name, the headline
// and body for their referral variant, and a short list of focus lines.
// Copy comes from content/referral-variants.ts via the page, not from here.
// ============================================

import type { ReferralVariantCopy } from "@/content/referral-variants";

type HeroProps = {
  copy: ReferralVariantCopy;
};

// THIS SECTION DOES: render the variant-specific hero
export function Hero({ copy }: HeroProps) {
  return (
    <section
      aria-labelledby="home-hero-headline"
      className="mx-auto w-full max-w-3xl px-4 pt-16 pb-8"
      data-referral-variant={copy.id}
    >
      <p className="text-caption uppercase tracking-wide text-text-secondary">Brant S. Johnson</p>
      <h1 id="home-hero-headline" className="mt-3 text-h1 text-text-primary">
        {copy.heroHeadline}
      </h1>
      <p className="mt-4 text-body text-text-secondary">{copy.heroBody}</p>
      {copy.focusLines.length > 0 ? (
        <ul className="mt-8 flex flex-col gap-3">
          {copy.focusLines.map((line) => (
            <li key={line} className="text-body text-text-primary before:mr-2 before:content-['•']">
              {line}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
