// ============================================
// WHAT THIS FILE DOES (plain English):
// This wraps the whole website in the HTML shell. It loads the two
// typefaces (a serif for titles, a light sans for reading) and sets
// the default title. Search engines are asked to wait until the
// domain moves off Wix. See app/robots.ts.
// ============================================

import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "@/styles/globals.css";
import { identity } from "@/content/site-content";

const description =
  "Good ideas deserve to happen. Brant S. Johnson runs a studio for consulting, creative projects, opportunities, partnerships, and events.";

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
  themeColor: "#f4f2ec",
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
