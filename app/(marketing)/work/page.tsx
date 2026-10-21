// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Work page. Intro and Bridger sit at the top. Under them
// is the experience timeline, with the dates in a narrow left column.
// ============================================

import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import { building, experience, experienceIntro } from "@/content/site-content";
import { publicCvUrl } from "@/lib/site/public-env";

export const metadata: Metadata = {
  title: "Work",
  description: experienceIntro.deck,
};

export default function WorkPage() {
  const cvUrl = publicCvUrl();

  return (
    <>
      <PageHero eyebrow="Work" title="The work, in order." deck={experienceIntro.deck} />

      <section className="shell grid gap-12 py-12 md:grid-cols-2 md:py-16">
        <article id="intro">
          <p className="label text-text-secondary">Intro</p>
          <h2 className="mt-3 font-serif text-h2 text-ink">{building.intro.name}</h2>
          <p className="mt-3 text-body text-text-secondary">
            {building.intro.role}, {building.intro.dates}. {building.intro.summary}
          </p>
          <div className="mt-6">
            <Button href={building.intro.href} track="button:visit_intro:work">
              Visit Intro
            </Button>
          </div>
        </article>
        <article id="bridger">
          <p className="label text-text-secondary">Bridger</p>
          <h2 className="mt-3 font-serif text-h2 text-ink">{building.bridger.name}</h2>
          <p className="mt-3 text-body text-text-secondary">
            {building.bridger.role}, {building.bridger.dates}. {building.bridger.summary}
          </p>
          <div className="mt-6">
            <TextLink href={building.bridger.href} track="link:visit_bridger:work">
              Visit Bridger
            </TextLink>
          </div>
        </article>
      </section>

      <ol className="shell pb-20">
        {experience.map((role) => (
          <li
            key={`${role.org}-${role.dates}`}
            className="grid gap-3 border-t border-border-subtle py-10 md:grid-cols-[11rem_1fr] md:gap-12"
          >
            <div>
              <p className="text-body text-text-secondary">{role.dates}</p>
              {role.place && <p className="mt-1 text-caption text-text-secondary">{role.place}</p>}
            </div>
            <div>
              <h2 className="font-serif text-h2 text-ink">{role.role}</h2>
              <p className="mt-2 text-body text-ink">{role.org}</p>
              <p className="mt-4 max-w-reading text-body text-text-secondary">{role.summary}</p>
              {role.href && role.hrefLabel && (
                <div className="mt-4">
                  <TextLink href={role.href} track={`link:visit_${role.org.toLowerCase()}:work`}>
                    {role.hrefLabel}
                  </TextLink>
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
      {cvUrl && (
        <div className="shell pb-20">
          <TextLink href={cvUrl} track="link:open_cv:work">
            Open the CV
          </TextLink>
        </div>
      )}
    </>
  );
}
