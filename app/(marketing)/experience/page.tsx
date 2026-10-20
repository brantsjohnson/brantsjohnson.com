// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Experience page. It is an editorial timeline of the
// checked roles, newest first, plus a link to the current CV PDF.
// Roles that are still unverified are not listed.
// ============================================

import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { cv, experience, experienceIntro } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Experience",
  description: experienceIntro.deck,
};

export default function ExperiencePage() {
  return (
    <>
      <PageHero eyebrow={experienceIntro.eyebrow} title={experienceIntro.title} deck={experienceIntro.deck} />
      <ol className="shell pb-8">
        {experience.map((role) => (
          <li key={`${role.org}-${role.dates}`} className="grid gap-4 border-t border-border-subtle py-10 md:grid-cols-[200px_1fr] md:gap-12">
            <div>
              <p className="font-serif text-h3 text-ink">{role.dates}</p>
              {role.place && <p className="mt-2 text-caption text-text-secondary">{role.place}</p>}
            </div>
            <div>
              <h2 className="font-serif text-h2 text-ink">{role.role}</h2>
              <p className="mt-2 text-body">{role.org}</p>
              <p className="mt-4 max-w-reading text-body text-text-secondary">{role.summary}</p>
              {role.href && role.hrefLabel && (
                <div className="mt-6">
                  <Button href={role.href} variant="ghost" track={`button:visit_${role.org.toLowerCase()}:experience`}>
                    {role.hrefLabel}
                  </Button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
      <div className="shell pb-16">
        <Button href={cv.href} track="button:open_cv:experience">
          {cv.label}
        </Button>
      </div>
    </>
  );
}
