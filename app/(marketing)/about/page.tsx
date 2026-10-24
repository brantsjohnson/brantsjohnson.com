// ============================================
// WHAT THIS FILE DOES (plain English):
// The About page: the personal story with his headshot, short
// stories of where he comes from, what drives him as a numbered
// list, and a quiet "outside of work" section with a few photos.
// Hobbies get a section here, not a page of their own.
// ============================================

import type { Metadata } from "next";
import Link from "next/link";
import { Figure } from "@/components/editorial/Figure";
import { Gallery } from "@/components/editorial/Gallery";
import { PageHeader } from "@/components/editorial/PageHeader";
import { Prose } from "@/components/editorial/Prose";
import { Reveal } from "@/components/editorial/Reveal";
import { StoryRow } from "@/components/editorial/StoryRow";
import { aboutIntro, aboutStories, beliefs, outside } from "@/content/about";
import { headshot } from "@/content/photos";
import { pageMetadata } from "@/lib/site/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: aboutIntro.lead,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader id="about" label={aboutIntro.label} title={aboutIntro.title} lead={aboutIntro.lead} />

      <section className="shell grid items-start gap-12 pb-24 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <Prose body={aboutIntro.body} />
          <p className="mt-8">
            <Link
              href="/work"
              data-track="link:work:about"
              className="label inline-flex min-h-[44px] items-center gap-3 text-ink underline decoration-accent decoration-2 underline-offset-8 hover:text-accent-deep"
            >
              See the work <span aria-hidden="true">→</span>
            </Link>
          </p>
        </Reveal>
        <div className="lg:col-span-5 lg:col-start-8">
          <Figure photo={{ ...headshot, position: "50% 15%" }} ratio="4 / 4.6" priority sizes="(min-width: 1024px) 36vw, 90vw" />
        </div>
      </section>

      {aboutStories.map((story, index) => (
        <StoryRow key={story.id} story={story} flip={index % 2 === 1} />
      ))}

      <section id="beliefs" aria-labelledby="beliefs-title" className="scroll-mt-24 border-t border-border-subtle bg-bg-deep py-20 md:py-32">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="label text-accent-deep">What drives me</p>
            <h2 id="beliefs-title" className="mt-4 font-serif text-h2 text-ink">
              {beliefs.title}
            </h2>
          </Reveal>
          <ol className="lg:col-span-8">
            {beliefs.items.map((item, index) => (
              <Reveal as="li" key={item} delay={index * 0.04} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-border-subtle py-5 first:border-t-0 first:pt-0">
                <span className="label pt-2 text-accent-deep">{String(index + 1).padStart(2, "0")}</span>
                <span className="font-serif text-[clamp(1.4rem,2.2vw,1.9rem)] leading-snug text-ink">{item}</span>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section id={outside.id} aria-labelledby="outside-title" className="scroll-mt-24 py-20 md:py-32">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="label text-accent-deep">{outside.label}</p>
            <h2 id="outside-title" className="mt-4 font-serif text-h2 text-ink">
              {outside.title}
            </h2>
            <Prose body={outside.body} className="mt-8" />
          </Reveal>
          <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.1}>
            <ul className="divide-y divide-border-subtle border-y border-border-subtle">
              {outside.facts.map((fact) => (
                <li key={fact} className="py-4 text-body text-text-secondary">
                  {fact}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <Gallery title="A few more frames" photos={outside.photos} columns={4} />
    </>
  );
}
