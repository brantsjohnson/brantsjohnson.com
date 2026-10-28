// ============================================
// WHAT THIS FILE DOES (plain English):
// The Crew brand story: how the illustrations started, the visual
// direction, the two animated pieces, a gallery of the drawings,
// the drawings in the product, and the launch graphics. The
// drawings have see-through edges, so they sit on a cream ground
// where their lines can be seen.
// ============================================

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Figure } from "@/components/editorial/Figure";
import { Gallery } from "@/components/editorial/Gallery";
import { PageHeader } from "@/components/editorial/PageHeader";
import { Prose } from "@/components/editorial/Prose";
import { Reveal } from "@/components/editorial/Reveal";
import { StoryLink } from "@/components/narrative/StoryLink";
import { CREW_GROUND } from "@/content/photos";
import { crewBrandMedia, crewBrandPage } from "@/content/work";
import { pageMetadata } from "@/lib/site/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: crewBrandPage.metaTitle,
  description: crewBrandPage.description,
  path: crewBrandPage.path,
});

export default function CrewBrandPage() {
  return (
    <>
      <div className="shell pt-10">
        <nav aria-label="Breadcrumb" className="label flex items-center gap-3 text-[0.66rem] text-text-secondary">
          <Link href="/work" className="text-ink transition-colors hover:text-accent-deep">
            Work
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Crew brand</span>
        </nav>
      </div>
      <PageHeader id="crew-brand" label="Work" title={crewBrandPage.title} lead={crewBrandPage.lead} />

      <section className="shell pb-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            {crewBrandPage.sections.map((section) => (
              <Reveal key={section.heading} className="mb-10">
                <h2 className="font-serif text-h2 text-ink">{section.heading}</h2>
                <Prose body={section.body} className="mt-5" />
              </Reveal>
            ))}
          </div>
          <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.1}>
            <div className="flex aspect-[3/2] items-center justify-center p-8" style={{ background: CREW_GROUND }}>
              <Image
                src={crewBrandMedia.wordmark.src}
                alt={crewBrandMedia.wordmark.alt}
                width={crewBrandMedia.wordmark.width}
                height={crewBrandMedia.wordmark.height}
                sizes="(min-width: 1024px) 36vw, 90vw"
                className="h-auto w-full"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-label="In motion" className="border-t border-border-subtle py-16 md:py-24">
        <div className="shell">
          <h2 className="font-serif text-h2 text-ink">In motion</h2>
          <ul className="mt-10 grid gap-8 md:grid-cols-2">
            {crewBrandMedia.motion.map((clip) => (
              <Reveal as="li" key={clip.mp4}>
                <video
                  loop
                  muted
                  autoPlay
                  playsInline
                  preload="none"
                  poster={clip.poster}
                  width={clip.width}
                  height={clip.height}
                  aria-label={clip.alt}
                  className="h-auto max-h-[28rem] w-full object-contain"
                  style={{ background: CREW_GROUND }}
                >
                  <source src={clip.webm} type="video/webm" />
                  <source src={clip.mp4} type="video/mp4" />
                </video>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <Gallery title="The drawings" intro="Hover over a drawing to see its name." photos={crewBrandMedia.drawings} columns={3} />

      <section aria-label="In the product" className="border-t border-border-subtle py-16 md:py-24">
        <div className="shell">
          <h2 className="font-serif text-h2 text-ink">In the product</h2>
          <ul className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
            {crewBrandMedia.inProduct.map((photo, index) => (
              <li key={photo.src}>
                <Figure photo={photo} ratio="9 / 16" sizes="(min-width: 768px) 22vw, 46vw" delay={index * 0.1} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-label="Announcements" className="border-t border-border-subtle py-16 md:py-24">
        <div className="shell">
          <h2 className="font-serif text-h2 text-ink">Announcements</h2>
          <ul className="mt-10 grid gap-8 md:grid-cols-2">
            {crewBrandMedia.stills.map((still) => (
              <li key={still.src}>
                <Figure photo={still} sizes="(min-width: 768px) 46vw, 92vw" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="shell border-t border-border-subtle py-12">
        <ul className="mb-8 flex flex-wrap gap-x-10 gap-y-3">
          {crewBrandPage.links.map((item) => (
            <li key={item.href}>
              <StoryLink href={item.href} track={item.track}>
                {item.text}
              </StoryLink>
            </li>
          ))}
        </ul>
        <Link href="/work" className="label inline-flex min-h-[44px] items-center gap-3 text-ink transition-colors hover:text-accent-deep">
          <span aria-hidden="true">←</span> All work
        </Link>
      </div>
    </>
  );
}
