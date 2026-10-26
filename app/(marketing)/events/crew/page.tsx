// ============================================
// WHAT THIS FILE DOES (plain English):
// The Crew brand case study: how the brand was drawn, the wordmark,
// the motion pieces, a gallery of the drawings, the drawings in the
// product, and the announcement graphics. The drawings have
// see-through edges, so they sit on a cream ground where their lines
// can be seen.
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
import { crewProject } from "@/content/projects";
import { pageMetadata } from "@/lib/site/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Crew brand",
  description: crewProject.lead,
  path: "/events/crew",
});

export default function CrewPage() {
  return (
    <>
      <PageHeader id="crew-brand" label={crewProject.label} title={crewProject.title} lead={crewProject.lead} />

      <section className="shell pb-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <Prose body={crewProject.body} />
            <p className="mt-8">
              <StoryLink href="/work#building" track="link:work_building:crew">
                See the Crew product role
              </StoryLink>
            </p>
          </Reveal>
          <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.1}>
            <div className="flex aspect-[3/2] items-center justify-center p-8" style={{ background: CREW_GROUND }}>
              <Image
                src={crewProject.wordmark.src}
                alt={crewProject.wordmark.alt}
                width={crewProject.wordmark.width}
                height={crewProject.wordmark.height}
                sizes="(min-width: 1024px) 36vw, 90vw"
                className="h-auto w-full"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-label="Motion" className="border-t border-border-subtle py-16 md:py-24">
        <div className="shell">
          <h2 className="font-serif text-h2 text-ink">In motion</h2>
          <ul className="mt-10 grid gap-8 md:grid-cols-2">
            {crewProject.motion.map((clip) => (
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

      <Gallery title="The drawings" intro="Hover a drawing for its name." photos={crewProject.drawings} columns={3} />

      <section aria-label="In the product" className="border-t border-border-subtle py-16 md:py-24">
        <div className="shell">
          <h2 className="font-serif text-h2 text-ink">In the product</h2>
          <ul className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
            {crewProject.inProduct.map((photo, index) => (
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
            {crewProject.stills.map((still) => (
              <li key={still.src}>
                <Figure photo={still} sizes="(min-width: 768px) 46vw, 92vw" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="shell border-t border-border-subtle py-12">
        <Link href="/events" className="label inline-flex min-h-[44px] items-center gap-3 text-ink transition-colors hover:text-accent-deep">
          <span aria-hidden="true">←</span> All events
        </Link>
      </div>
    </>
  );
}
