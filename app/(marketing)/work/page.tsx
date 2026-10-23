// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Work page. Intro and Bridger sit together under the
// title, each with a live screenshot. The experience timeline follows.
// The public CV is the file at /cv.pdf.
// ============================================

import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ProductPair } from "@/components/sections/ProductPair";
import { TextLink } from "@/components/ui/TextLink";
import { experience, experienceIntro, publicCv } from "@/content/site-content";
import { pageMetadata } from "@/lib/site/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Full work history",
  description: experienceIntro.deck,
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHero eyebrow="Work" title="Full work history." deck={experienceIntro.deck} />

      <section id="projects" className="shell scroll-mt-24 pb-16 md:pb-24">
        <h2 className="sr-only">Selected projects.</h2>
        <ProductPair page="work" />
      </section>

      <section className="shell border-t border-border-subtle py-16 md:py-24">
        <h2 className="font-serif text-h2 text-ink">The record.</h2>
        <ol className="mt-8">
          {experience
            .filter((role) => role.org !== "Intro" && role.org !== "Bridger")
            .map((role) => (
              <li
                key={`${role.org}-${role.dates}`}
                className="grid gap-3 border-t border-border-subtle py-8 md:grid-cols-[11rem_1fr] md:gap-12 md:py-10"
              >
                <div>
                  <p className="text-body text-text-secondary">{role.dates}</p>
                  {role.place && <p className="mt-1 text-caption text-text-secondary">{role.place}</p>}
                </div>
                <div>
                  <h3 className="font-serif text-h3 text-ink">{role.role}</h3>
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
        <div className="border-t border-border-subtle pt-8">
          <TextLink href={publicCv.href} track="link:public_cv:work">
            {publicCv.label}
          </TextLink>
        </div>
      </section>
    </>
  );
}
