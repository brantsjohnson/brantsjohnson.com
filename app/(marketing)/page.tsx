// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the homepage: a magazine-style cover with the headshot,
// an index of the main places, and four places to start.
// ============================================

import type { Metadata } from "next";
import { HomePage } from "@/components/editorial/HomePage";
import { hero } from "@/content/narrative";
import { headshot } from "@/content/photos";
import { identity } from "@/content/site-content";
import { pageMetadata } from "@/lib/site/page-metadata";

// THIS SECTION DOES: tell search engines the site itself is the homepage,
// and that the person the site is about lives at that same address.
const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${identity.siteUrl}/#website`,
  name: identity.fullName,
  url: `${identity.siteUrl}/`,
  description: hero.description,
  publisher: { "@id": `${identity.siteUrl}/#brant` },
  mainEntity: { "@id": `${identity.siteUrl}/#brant` },
};

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Brant S. Johnson | Good things deserve to happen.",
    description: hero.description,
    path: "/",
    image: { photo: headshot },
  }),
  title: { absolute: "Brant S. Johnson | Good things deserve to happen." },
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
      <HomePage />
    </>
  );
}
