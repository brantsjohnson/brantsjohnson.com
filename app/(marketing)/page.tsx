// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the homepage: a magazine-style cover with the headshot,
// an index of the main places, and four places to start.
// ============================================

import type { Metadata } from "next";
import { HomePage } from "@/components/editorial/HomePage";
import { hero } from "@/content/narrative";
import { pageMetadata } from "@/lib/site/page-metadata";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Brant S. Johnson | Good things deserve to happen.",
    description: hero.description,
    path: "/",
  }),
  title: { absolute: "Brant S. Johnson | Good things deserve to happen." },
};

export default function Home() {
  return <HomePage />;
}
