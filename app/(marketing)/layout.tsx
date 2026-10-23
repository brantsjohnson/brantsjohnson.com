// ============================================
// WHAT THIS FILE DOES (plain English):
// This wraps every public page with the skip link, the sticky header,
// the footer, and a short person description
// for search engines. Every public page uses this wrapper.
// ============================================

import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { identity, inquiries } from "@/content/site-content";
import { hero } from "@/content/narrative";
import { getPublicWriting } from "@/lib/writing/public-posts";

export default async function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const writing = await getPublicWriting();
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: identity.fullName,
    url: identity.siteUrl,
    email: inquiries.email,
    jobTitle: "Senior Product Manager",
    description: `${hero.headline} ${hero.identity}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "American Fork",
      addressRegion: "UT",
      addressCountry: "US",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Utah Valley University",
    },
    sameAs: [identity.linkedin, "https://intro.events", "https://bridger.social"],
  };

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-modal focus:bg-accent focus:px-4 focus:py-2 focus:text-on-gold"
      >
        Skip to content
      </a>
      <SiteHeader showWriting={writing.show} />
      <main id="content" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
    </div>
  );
}
