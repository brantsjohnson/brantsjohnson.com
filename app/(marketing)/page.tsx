// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Home page: the first look at who I am, a proof spotlight
// from Crew Finance, and the projects I am building now. Copy lives
// in content/. Layout pieces live in components/sections/.
// ============================================

import type { Metadata } from "next";
import { site } from "@/content/site";
import { getFeaturedProject, getSupportingProjects } from "@/content/projects";
import { Hero } from "@/components/sections/Hero";
import { CrewSpotlight } from "@/components/sections/CrewSpotlight";
import { CurrentlyBuilding } from "@/components/sections/CurrentlyBuilding";

export const metadata: Metadata = {
  description: site.tagline,
};

// THIS SECTION DOES: assemble the three Home blocks from content
export default function HomePage() {
  const featured = getFeaturedProject();
  const supporting = getSupportingProjects();

  return (
    <>
      <Hero />
      <CrewSpotlight />
      {featured && <CurrentlyBuilding featured={featured} supporting={supporting} />}
    </>
  );
}
