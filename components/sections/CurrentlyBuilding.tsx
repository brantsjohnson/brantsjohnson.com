// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Home "Currently building" block: a featured Intro panel
// plus two supporting cards for Bridger and Filibusters. The heading
// and the "All projects" link sit above a hairline, matching the
// approved home design.
// ============================================

import Link from "next/link";
import { currentlyBuilding } from "@/content/home";
import type { Project } from "@/content/projects";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";
import { FadeInOnScroll } from "@/components/motion/FadeInOnScroll";
import { StaggerChildren } from "@/components/motion/StaggerChildren";
import { ProjectCard } from "@/components/sections/ProjectCard";

type CurrentlyBuildingProps = {
  featured: Project;
  supporting: Project[];
};

// THIS SECTION DOES: render the section heading, the featured project, then the supporting pair
export function CurrentlyBuilding({ featured, supporting }: CurrentlyBuildingProps) {
  return (
    <section aria-labelledby="projects-heading" className="pb-24 md:pb-36">
      <Container>
        <FadeInOnScroll className="flex items-baseline justify-between gap-6">
          <h2
            id="projects-heading"
            className="font-heading text-[13px] font-medium uppercase tracking-[0.2em] text-ink-soft"
          >
            {currentlyBuilding.eyebrow}
          </h2>
          <Link
            href="/projects"
            data-track="link:view_all_projects:home"
            className="focus-ring rounded-sm font-heading text-[13.5px] text-ink-soft transition-colors hover:text-ink"
          >
            {currentlyBuilding.allLinkLabel}
          </Link>
        </FadeInOnScroll>

        <Divider className="mt-8" />

        <FadeInOnScroll delay={0.05} className="mt-10">
          <ProjectCard project={featured} featured />
        </FadeInOnScroll>

        <StaggerChildren className="mt-6 grid gap-6 md:grid-cols-2">
          {supporting.map((project) => (
            <ProjectCard key={project.slug} project={project} featured={false} />
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
