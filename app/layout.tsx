// ============================================
// WHAT THIS FILE DOES (plain English):
// This wraps the whole website in the HTML shell. It loads the two
// typefaces (a serif for titles, a light sans for reading) and sets
// the default title. Search engines are asked to wait until the
// domain moves off Wix. See app/robots.ts.
// ============================================

import type { Metadata } from "next";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "@/styles/globals.css";
import { hero, identity } from "@/content/site-content";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-serif-file",
  display: "swap",
});

const sans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-sans-file",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(identity.siteUrl),
  title: {
    default: identity.fullName,
    template: `%s | ${identity.fullName}`,
  },
  description: hero.subline,
  robots: { index: false, follow: false },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
