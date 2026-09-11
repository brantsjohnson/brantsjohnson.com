// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Projects page. It shows Brant's projects as cards.
// The rule: only working links appear as links. BrantChat is a live
// on-site feature and opens the chat. Projects that are not live yet
// (Filibusters, the conference matchmaking app) show a quiet "Coming
// soon" tag and are never linked, so the page has no dead links.
// ============================================

import type { Metadata } from "next";
import { PageIntro } from "@/components/sections/PageIntro";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { projects } from "@/content/site-content";

// THIS SECTION DOES: set this page's browser tab title
export const metadata: Metadata = { title: "Projects" };

// THIS SECTION DOES: draw the intro and the project cards
export default function ProjectsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Projects"
        title="Things I have built"
        deck="Live work is linked. Anything still in progress is marked coming soon, never a dead link."
      />
      <ProjectGrid projects={projects} />
    </>
  );
}
