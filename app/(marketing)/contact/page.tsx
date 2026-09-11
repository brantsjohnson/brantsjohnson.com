// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Contact page, and it is the one place contact happens
// on the site (the "contact once" rule in docs/03). It shows the
// direct ways to reach Brant: email and LinkedIn. A full contact
// form that saves to the CMS comes in a later pass; the links here
// work now, so there are no dead ends. The details come from
// content/site-content.ts.
// ============================================

import type { Metadata } from "next";
import { PageIntro } from "@/components/sections/PageIntro";
import { FadeInOnScroll } from "@/components/motion/FadeInOnScroll";
import { GlassPanel } from "@/components/motion/GlassPanel";
import { identity } from "@/content/site-content";

// THIS SECTION DOES: set this page's browser tab title
export const metadata: Metadata = { title: "Contact" };

// THIS SECTION DOES: draw the intro and the direct contact links
export default function ContactPage() {
  return (
    <>
      <PageIntro eyebrow="Contact" title="Get in touch" deck="The fastest ways to reach me." />
      <FadeInOnScroll className="shell max-w-reading pb-16">
        <GlassPanel className="flex flex-col gap-4 p-6 md:p-8">
          {/* A real, working email link, so the page has no dead ends */}
          <a
            href={`mailto:${identity.email}`}
            className="text-body font-medium text-accent hover:text-accent-muted"
          >
            {identity.email}
          </a>
          <a
            href={identity.linkedin}
            className="text-body font-medium text-accent hover:text-accent-muted"
          >
            LinkedIn
          </a>
        </GlassPanel>
      </FadeInOnScroll>
    </>
  );
}
