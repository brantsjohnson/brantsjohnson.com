// ============================================
// WHAT THIS FILE DOES (plain English):
// This wraps the whole website in the HTML shell. It loads the two
// typefaces (a serif for titles, a light sans for reading) and sets
// the default title. Search engines are asked to wait until the
// domain moves off Wix. See app/robots.ts.
// ============================================

import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Hanken_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "@/styles/globals.css";
import { identity } from "@/content/site-content";

const description =
  "Good ideas deserve to happen. I'm a senior product manager, a creator, performer and entrepreneur, and an activist for the places that raised me.";

// THIS SECTION DOES: point share images at the preview while a preview is open,
// and at the public domain everywhere else.
function metadataBaseUrl(): URL {
  if (process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`);
  }
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return new URL(configured);
  return new URL(identity.siteUrl);
}

const allowIndexing = process.env.SITE_INDEXABLE === "true";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif-file",
  display: "swap",
});

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans-file",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: metadataBaseUrl(),
  title: {
    default: identity.fullName,
    template: `%s | ${identity.fullName}`,
  },
  description,
  applicationName: identity.fullName,
  authors: [{ name: identity.fullName, url: identity.siteUrl }],
  creator: identity.fullName,
  robots: allowIndexing
    ? { index: true, follow: true }
    : { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: identity.siteUrl,
    siteName: identity.fullName,
    title: identity.fullName,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: identity.fullName,
    description,
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#0d0b08",
  width: "device-width",
  initialScale: 1,
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
