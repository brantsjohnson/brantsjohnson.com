// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the About page. It is the longer, first person version of
// the home page, plus the security and compliance emphasis block from
// the referral site work. Words come from content modules, not inline.
// ============================================

import type { Metadata } from "next";
import { FadeInOnScroll } from "@/components/motion/FadeInOnScroll";
import { PageIntro } from "@/components/sections/PageIntro";
import { aboutSecurityFocus } from "@/content/about-security";
import { about } from "@/content/site-content";

export const metadata: Metadata = { title: "About" };

// THIS SECTION DOES: draw the intro, about paragraphs, and security focus
export default function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="About" title={about.headline} />
      <FadeInOnScroll className="shell max-w-reading pb-16">
        <div className="flex flex-col gap-6">
          {about.paragraphs.map((paragraph, i) => (
            <p key={i} className="text-body text-text-secondary">
              {paragraph}
            </p>
          ))}
        </div>

        <h2 className="mt-12 text-h2 text-text-primary">{aboutSecurityFocus.title}</h2>
        <p className="mt-4 text-body text-text-secondary">{aboutSecurityFocus.intro}</p>
        <ul className="mt-6 flex flex-col gap-3">
          {aboutSecurityFocus.lines.map((line) => (
            <li key={line} className="text-body text-text-primary before:mr-2 before:content-['•']">
              {line}
            </li>
          ))}
        </ul>
      </FadeInOnScroll>
    </>
  );
}
