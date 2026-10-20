// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Service and Leadership page. Each story is a checked
// public fact: the archway, the scholarship, Habitat, TEDx, and
// student government. Unverified metrics are left out.
// ============================================

import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { serviceIntro, serviceStories } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Service & Leadership",
  description: serviceIntro.deck,
};

export default function ServicePage() {
  return (
    <>
      <PageHero eyebrow={serviceIntro.eyebrow} title={serviceIntro.title} deck={serviceIntro.deck} />
      <div className="shell pb-16">
        {serviceStories.map((story, index) => (
          <article key={story.title} className="grid gap-6 border-t border-border-subtle py-12 md:grid-cols-[120px_1fr]">
            <p className="font-serif text-h1 text-ink">
              {String(index + 1).padStart(2, "0")}
              <span className="mt-3 block h-px w-10 bg-accent" />
            </p>
            <div>
              <h2 className="font-serif text-h2 text-ink">{story.title}</h2>
              <p className="mt-2 text-caption text-text-secondary">
                {[story.role, story.place, story.dates].filter(Boolean).join(", ")}
              </p>
              <div className="mt-6 flex max-w-reading flex-col gap-4">
                {story.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)} className="text-body">
                    {paragraph}
                  </p>
                ))}
              </div>
              {story.title === "Resilience Scholarship" && (
                <p className="mt-6">
                  <Link href="/contact" data-track="link:contact:service" className="underline decoration-accent underline-offset-4">
                    Contact
                  </Link>
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
