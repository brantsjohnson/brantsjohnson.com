// ============================================
// WHAT THIS FILE DOES (plain English):
// This draws the Projects page. Each project is a glass card with a
// name and a short description. The rule from Brant: only working
// links appear as links. A project that is a live on-site feature
// (BrantChat) gets a button that opens the chat. A project that is
// not live yet (Filibusters, the conference matchmaking app) shows a
// quiet "Coming soon" tag and is never turned into a clickable link,
// so the page has no dead links.
// ============================================

import Link from "next/link";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";
import { GlassPanel } from "@/components/motion/GlassPanel";
import { OpenChatButton } from "@/components/chatbot/OpenChatButton";
import type { Project } from "@/content/site-content";

// THIS SECTION DOES: describe what the grid needs
type ProjectGridProps = {
  projects: Project[];
};

// THIS SECTION DOES: choose the right action for one project (link, chat, or a coming-soon tag)
function ProjectAction({ project }: { project: Project }) {
  // A live on-site feature opens the chat panel instead of navigating away.
  if (project.status === "live" && project.kind === "chat") {
    return (
      <OpenChatButton variant="ghost" className="mt-6">
        Ask about my work
      </OpenChatButton>
    );
  }

  // A live project with a real, working URL becomes a link. Internal-style verb-first label.
  if (project.status === "live" && project.url) {
    return (
      <Link
        href={project.url}
        className="mt-6 inline-flex text-body font-medium text-accent hover:text-accent-muted"
      >
        View project
      </Link>
    );
  }

  // Not live yet: a quiet tag, never a link, so there are no dead links.
  return (
    <span className="mt-6 inline-flex w-fit rounded-control border border-border-subtle px-3 py-1 text-caption text-text-secondary">
      Coming soon
    </span>
  );
}

// THIS SECTION DOES: draw one card per project, in a responsive grid
export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <StaggerChildren className="shell grid grid-cols-1 gap-6 pb-16 md:grid-cols-2">
      {projects.map((project) => (
        <StaggerItem key={project.name}>
          <GlassPanel className="flex h-full flex-col p-6 md:p-8">
            <h2 className="text-h3">{project.name}</h2>
            <p className="mt-3 max-w-reading text-body text-text-secondary">{project.blurb}</p>
            <ProjectAction project={project} />
          </GlassPanel>
        </StaggerItem>
      ))}
    </StaggerChildren>
  );
}
