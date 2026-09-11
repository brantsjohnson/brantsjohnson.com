// ============================================
// WHAT THIS FILE DOES (plain English):
// This wraps the whole website in the basic HTML shell (the outer
// page frame) and loads the two site fonts (Geist for text, Geist Mono
// for small labels). The public pages plug their nav, footer, and chat
// bubble in through the marketing layout, not here.
// ============================================

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "@/styles/globals.css";
import { site } from "@/content/site";

// THIS SECTION DOES: load the two typefaces from the geist package and expose them as CSS variables.

// THIS SECTION DOES: set the default browser tab title and description.
// Indexing stays off until the headshot, CV, and SEO pass in doc 05 are done.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.role}`,
    template: `%s | ${site.name}`,
  },
  description: site.tagline,
  robots: {
    index: false, // keep the in-progress site out of search until content is final
    follow: false,
  },
};

// THIS SECTION DOES: render the outer HTML document and put each page's content inside the body
export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className={GeistSans.className}>{children}</body>
    </html>
  );
}
