// ============================================
// WHAT THIS FILE DOES (plain English):
// This wraps every public page with the skip link, the sticky header,
// the footer, the Ask about me panel, and a short person description
// for search engines. Admin pages do not use this wrapper.
// ============================================

import { ChatLauncher } from "@/components/chatbot/ChatLauncher";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { identity } from "@/content/site-content";
import { getPublicWriting } from "@/lib/writing/public-posts";

export default async function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const chatConfigured = Boolean(process.env.OPENAI_API_KEY);
  const writing = await getPublicWriting();
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: identity.fullName,
    url: identity.siteUrl,
    email: `mailto:${identity.email}`,
    jobTitle: "Founder and Product Lead",
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
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-modal focus:bg-accent focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <SiteHeader showWriting={writing.show} />
      <main id="content">{children}</main>
      <SiteFooter showWriting={writing.show} />
      <ChatLauncher configured={chatConfigured} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
    </>
  );
}
