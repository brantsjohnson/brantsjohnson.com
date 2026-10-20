// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the About page. It tells the connection story, then the
// degree, then a single skills line, then the archway and the
// scholarship. Longer service stories live on the Service page.
// ============================================

import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { FadeInOnScroll } from "@/components/motion/FadeInOnScroll";
import { about } from "@/content/site-content";

export const metadata: Metadata = {
  title: "About",
  description: about.paragraphs[0],
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow={about.eyebrow} title={about.title} mark />
      <FadeInOnScroll className="shell max-w-reading py-16">
        <div className="flex flex-col gap-6">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="text-body">
              {paragraph}
            </p>
          ))}
        </div>
      </FadeInOnScroll>

      <section className="border-t border-border-subtle bg-ink text-on-hero">
        <div className="shell grid gap-10 py-16 md:grid-cols-2">
          <div>
            <h2 className="font-serif text-h2 text-accent">{about.educationTitle}</h2>
            <p className="mt-4 text-body">{about.education}</p>
            <p className="mt-4 text-body">{about.location}</p>
          </div>
          <div id="skills">
            <h2 className="font-serif text-h2 text-accent">{about.skillsTitle}</h2>
            <p className="mt-4 text-body">{about.skills}</p>
          </div>
        </div>
      </section>

      <section className="shell py-16">
        <h2 className="font-serif text-h2 text-ink">{about.outsideTitle}</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {about.outside.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="text-body">
              {paragraph}
            </p>
          ))}
        </div>
        <p className="mt-8 text-body">
          <Link href="/service" data-track="link:service:about" className="underline decoration-accent underline-offset-4">
            Read the service stories
          </Link>
        </p>
      </section>
    </>
  );
}
