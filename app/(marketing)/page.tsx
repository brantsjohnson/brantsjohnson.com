// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Home page. It stacks the pieces of the home experience:
// the name hero with the "Ask about my work" chat invite, a row of
// proof stats (starting with the Crew Finance chip), a photo mosaic,
// and doorway cards into the main sections. The order gives a first
// time visitor a fast, honest picture of who Brant is and where to go
// next (docs/08 §1, docs/12).
// ============================================

import { Hero } from "@/components/sections/Hero";
import { ProofChips } from "@/components/sections/ProofChips";
import { PhotoMosaic } from "@/components/sections/PhotoMosaic";
import { HomeSections } from "@/components/sections/HomeSections";

// THIS SECTION DOES: assemble the home page from its sections, top to bottom
export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofChips />
      <PhotoMosaic />
      <HomeSections />
    </>
  );
}
