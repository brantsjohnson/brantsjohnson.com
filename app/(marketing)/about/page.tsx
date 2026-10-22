// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the About page. It tells the studio story, then schooling,
// then collaborations: the archway, the scholarship, and the work
// with other people. The product screens live on Work, next to each
// other. This page does not use the old photographs.
// ============================================

import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { TextLink } from "@/components/ui/TextLink";
import { about, publicCv, serviceStories } from "@/content/site-content";
import { pageMetadata } from "@/lib/site/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Brant S. Johnson runs a studio for consulting, creative projects, opportunities, partnerships, and events.",
  path: "/about",
});

function Story({
  title,
  role,
  dates,
  place,
  paragraphs,
}: {
  title: string;
  role: string;
  dates: string;
  place?: string;
  paragraphs: string[];
}) {
  return (
    <article className="border-t border-border-subtle py-10">
      <h3 className="font-serif text-h3 text-ink">{title}</h3>
      <p className="mt-2 text-body text-ink">
        {role}, {dates}
        {place ? `, ${place}` : ""}
      </p>
      <div className="mt-4 flex flex-col gap-4">
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 32)} className="max-w-reading text-body text-text-secondary">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow={about.eyebrow} title={about.title} />

      <div className="shell pb-16 md:pb-20">
        <div className="flex max-w-reading flex-col gap-6">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="text-body text-text-secondary">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="mt-8">
          <TextLink href="/work#projects" track="link:projects:about">
            Selected projects
          </TextLink>
        </div>
      </div>

      <section className="shell grid gap-12 border-t border-border-subtle py-16 md:grid-cols-2 md:py-24">
        <div>
          <h2 className="font-serif text-h2 text-ink">{about.educationTitle}</h2>
          <p className="mt-4 max-w-reading text-body text-text-secondary">{about.education}</p>
          <p className="mt-4 max-w-reading text-body text-text-secondary">{about.location}</p>
          <div className="mt-4">
            <TextLink href={publicCv.href} track="link:public_cv:about">
              {publicCv.label}
            </TextLink>
          </div>
        </div>
        <div id="skills">
          <h2 className="font-serif text-h2 text-ink">{about.skillsTitle}</h2>
          <p className="mt-4 max-w-reading text-body text-text-secondary">{about.skills}</p>
        </div>
      </section>

      <section id="collaborations" className="shell scroll-mt-24 border-t border-border-subtle py-16 md:py-24">
        <span id="service" className="block scroll-mt-28" />
        <h2 className="font-serif text-h2 text-ink">Collaborations.</h2>
        <p className="mt-4 max-w-reading text-body text-text-secondary">
          Work done with a town, a school, and a group of people.
        </p>
        <div className="mt-8">
          {serviceStories.map((story) => (
            <Story key={story.title} {...story} />
          ))}
        </div>
      </section>
    </>
  );
}
