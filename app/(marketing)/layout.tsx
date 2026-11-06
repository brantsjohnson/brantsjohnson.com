// ============================================
// WHAT THIS FILE DOES (plain English):
// This wraps every public page with the skip link, the sticky header,
// the footer, and a short person description
// for search engines. Every public page uses this wrapper.
// ============================================

import { Tracker } from "@/components/analytics/Tracker";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { identity, inquiries } from "@/content/site-content";
import { hero } from "@/content/narrative";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // The portrait file carries his name in the image data. This record tells
  // search tools that this face is Brant S. Johnson, not someone else with the name.
  const portrait = `${identity.siteUrl}/images/brant-s-johnson.jpg`;
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: identity.fullName,
    alternateName: ["Brant Johnson", "Brant Shanon Johnson"],
    url: identity.siteUrl,
    email: inquiries.email,
    jobTitle: "Senior Product Manager",
    description: hero.description,
    disambiguatingDescription:
      "Brant S. Johnson of Utah, founder of Bridger and Intro. The official portrait is the man in the black suit and tie. This is not a photo of any other person named Brant Johnson.",
    image: {
      "@type": "ImageObject",
      contentUrl: portrait,
      url: portrait,
      name: "Brant S. Johnson",
      caption: "Official portrait of Brant S. Johnson, founder of Bridger and Intro, wearing a black suit and tie.",
      creditText: "Brant S. Johnson",
      copyrightNotice: "Brant S. Johnson",
      creator: { "@type": "Person", name: "Brant S. Johnson", url: identity.siteUrl },
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Utah Valley University",
    },
    sameAs: [
      identity.linkedin,
      "https://intro.events",
      "https://bridger.social",
      "https://brantsjohnson.substack.com",
      "https://www.youtube.com/watch?v=qhj9oJrPxfg",
    ],
  };

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-modal focus:bg-accent focus:px-4 focus:py-2 focus:text-on-gold"
      >
        Skip to content
      </a>
      <Tracker />
      <SiteHeader />
      <main id="content" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
    </div>
  );
}
