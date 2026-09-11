// ============================================
// WHAT THIS FILE DOES (plain English):
// This wraps the whole website in the basic HTML shell (the outer
// page frame). Shared chrome like nav and footer will plug in later.
// It does not draw any real page content by itself.
// ============================================

import type { Metadata } from "next";
import "@/styles/globals.css";

// THIS SECTION DOES: set the default browser tab title and keep search engines from indexing this scaffold yet
export const metadata: Metadata = {
  title: {
    default: "Brant S. Johnson",
    template: "%s | Brant S. Johnson",
  },
  description: "Brant S. Johnson is a customer focused product manager who has owned KYC, onboarding, and analytics, and who sells what he ships.",
  robots: {
    index: false, // do not show unfinished pages in Google yet
    follow: false,
  },
};

// THIS SECTION DOES: render the outer HTML document and put each page's content inside the body
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
