// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the first thing a visitor sees on the Home page: the name, the
// one-sentence promise, a short supporting line, a single About button,
// and a circular portrait placeholder. There is no second Contact
// button here. Contact lives only on /contact.
// ============================================

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { assets, site } from "@/content/site";
import { hero } from "@/content/home";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FadeInOnScroll } from "@/components/motion/FadeInOnScroll";

// THIS SECTION DOES: render the hero row: copy on the left, circular portrait on the right
export function Hero() {
  return (
    <section aria-labelledby="hero-name" className="pb-20 pt-16 md:pb-28 md:pt-24">
      <Container>
        <div className="grid items-center gap-14 md:grid-cols-[minmax(0,1fr)_auto] md:gap-16">
          <div className="max-w-[640px]">
            <FadeInOnScroll>
              <Eyebrow>{hero.eyebrow}</Eyebrow>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.08}>
              <h1
                id="hero-name"
                className="mt-5 font-heading text-display font-medium tracking-tight text-ink"
              >
                {site.name}
              </h1>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.16}>
              <p className="mt-6 font-heading text-[21px] font-normal leading-[1.45] tracking-tight text-ink sm:text-[24px]">
                {hero.headline}
              </p>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.22}>
              <p className="mt-5 max-w-[520px] text-body text-ink-soft">{hero.support}</p>
            </FadeInOnScroll>

            {/* THIS SECTION DOES: the one primary action on this screen, pointing to About */}
            <FadeInOnScroll delay={0.3}>
              <div className="mt-10">
                <Button
                  href={hero.primaryCta.href}
                  trackId="button:go_about:hero"
                  trailingIcon={<ArrowUpRight className="h-4 w-4" aria-hidden="true" />}
                >
                  {hero.primaryCta.label}
                </Button>
              </div>
            </FadeInOnScroll>
          </div>

          {/* THIS SECTION DOES: show the real headshot when it exists, otherwise the initials in a glass circle */}
          <FadeInOnScroll delay={0.12} className="justify-self-start md:justify-self-end">
            <div className="relative">
              <div className="absolute -inset-6 rounded-full border border-line" aria-hidden="true" />
              <div
                className="relative flex h-[220px] w-[220px] items-center justify-center overflow-hidden rounded-full border border-line bg-glass shadow-glass backdrop-blur-glass sm:h-[268px] sm:w-[268px]"
                role="img"
                aria-label={
                  assets.headshot
                    ? `Portrait of ${site.name}`
                    : `Portrait placeholder for ${site.name}`
                }
              >
                {assets.headshot ? (
                  <Image
                    src={assets.headshot}
                    alt={`Portrait of ${site.name}`}
                    fill
                    className="object-cover"
                    sizes="268px"
                  />
                ) : (
                  <span className="font-heading text-[34px] font-light tracking-[0.06em] text-ink-soft">
                    {site.initials}
                  </span>
                )}
              </div>
            </div>
          </FadeInOnScroll>
        </div>
      </Container>
    </section>
  );
}
