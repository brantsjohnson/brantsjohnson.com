// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the About page's biography block: the long first-person
// story on the left, and a framed portrait plus a few quick facts on
// the right. The words come from content/about.ts. The portrait is a
// placeholder until a real headshot is added.
// ============================================

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { about } from "@/content/about";
import { assets } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { HeadshotPlaceholder } from "@/components/ui/HeadshotPlaceholder";
import { Button } from "@/components/ui/Button";
import { FadeInOnScroll } from "@/components/motion/FadeInOnScroll";

// THIS SECTION DOES: render the headline, story, portrait, and quick facts
export function AboutIntro() {
  return (
    <section aria-labelledby="about-heading" className="pb-16 pt-14 md:pb-24 md:pt-20">
      <Container>
        <FadeInOnScroll>
          <Eyebrow>{about.eyebrow}</Eyebrow>
          <h1
            id="about-heading"
            className="mt-3 max-w-2xl font-heading text-h1 font-semibold tracking-tight text-ink"
          >
            {about.heading}
          </h1>
        </FadeInOnScroll>

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
          <FadeInOnScroll delay={0.08}>
            <article className="max-w-[62ch]">
              <p className="text-[17px] leading-[1.75] text-ink-soft sm:text-[18px]">{about.lead}</p>
              {about.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="mt-6 text-[17px] leading-[1.75] text-ink-soft sm:text-[18px]"
                >
                  {paragraph}
                </p>
              ))}

              <div className="mt-10">
                <Button
                  href="/projects"
                  variant="secondary"
                  trackId="button:view_projects:about"
                  trailingIcon={<ArrowUpRight className="h-4 w-4" aria-hidden="true" />}
                >
                  See selected projects
                </Button>
              </div>
            </article>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.14}>
            <aside>
              <GlassPanel padding="sm">
                <figure>
                  {assets.headshot ? (
                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                      <Image
                        src={assets.headshot}
                        alt="Portrait of Brant S. Johnson"
                        fill
                        className="object-cover"
                        sizes="320px"
                      />
                    </div>
                  ) : (
                    <HeadshotPlaceholder label="Headshot" />
                  )}
                  <figcaption className="px-1 pb-1 pt-3 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-soft">
                    Portrait placeholder, 2026
                  </figcaption>
                </figure>
              </GlassPanel>

              <GlassPanel padding="md" className="mt-4">
                <dl>
                  {about.quickFacts.map((fact, index) => (
                    <div
                      key={fact.label}
                      className={
                        index === 0
                          ? "flex items-baseline justify-between gap-4"
                          : "mt-3 flex items-baseline justify-between gap-4 border-t border-line pt-3"
                      }
                    >
                      <dt className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-soft">
                        {fact.label}
                      </dt>
                      <dd className="text-right text-[14px] text-ink">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
                {/* THIS SECTION DOES: show a CV download when the file exists, otherwise an honest placeholder */}
                <div className="mt-3 border-t border-line pt-3">
                  {assets.cvUrl ? (
                    <Button href={assets.cvUrl} variant="ghost" size="sm" trackId="link:open_resume:about">
                      Download CV
                    </Button>
                  ) : (
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-soft">
                      CV PDF, TODO
                    </p>
                  )}
                </div>
              </GlassPanel>
            </aside>
          </FadeInOnScroll>
        </div>
      </Container>
    </section>
  );
}
