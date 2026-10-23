// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the opening card. A small label and the name sit above
// the large headline. The identity line and two buttons follow.
// The portrait frame is empty until a photo exists.
// ============================================

"use client";

import { Button } from "@/components/ui/Button";
import { PhotoSlot } from "@/components/narrative/PhotoSlot";
import { focusHash } from "@/components/narrative/focus-hash";
import { hero } from "@/content/narrative";

export function HeroCard() {
  return (
    <section className="pb-4 pt-8 md:pt-4" aria-labelledby="top">
      <div className="rounded-panel border border-border-subtle bg-surface px-5 py-10 sm:px-10 sm:py-14 md:px-14 md:py-16">
        <p className="label text-text-secondary">{hero.eyebrow}</p>
        <p className="mt-4 font-serif text-h3 text-ink">{hero.name}</p>
        <div className="mt-8 border-t border-border-subtle" />
        <h1 id="top" tabIndex={-1} className="mt-8 scroll-mt-24 font-serif text-display text-ink sm:mt-10 sm:max-w-[11em]">
          {hero.headline}
        </h1>
        <p className="mt-6 max-w-[38rem] text-body text-ink">{hero.identity}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button
            href={hero.storyCta.href}
            variant="primary"
            track="button:read_story:home"
            onClick={() => focusHash(hero.storyCta.href)}
          >
            {hero.storyCta.label}
          </Button>
          <Button href={hero.resumeCta.href} variant="ghost" track="button:resume:home">
            {hero.resumeCta.label}
          </Button>
        </div>
        <p className="mt-8 text-caption text-text-secondary">{hero.location}</p>
        <PhotoSlot orientation="portrait" className="mt-8" />
      </div>
    </section>
  );
}
