// ============================================
// WHAT THIS FILE DOES (plain English):
// One project, as a short case study. The Crew brand and Poetry have
// their own pages; every other project reads from content/projects.ts.
// ============================================

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/editorial/CaseStudy";
import { getProject, projects } from "@/content/projects";
import { pageMetadata } from "@/lib/site/page-metadata";

type ProjectPageProps = { params: { slug: string } };

const own = new Set(["crew", "poetry"]);

export function generateStaticParams() {
  return projects.filter((project) => !own.has(project.slug)).map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = getProject(params.slug);
  if (!project || own.has(project.slug)) return {};
  return pageMetadata({ title: project.title, description: project.blurb, path: project.href });
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProject(params.slug);
  if (!project || own.has(project.slug)) notFound();

  return (
    <CaseStudy
      id={project.slug}
      label={`Projects · ${project.kind}`}
      title={project.title}
      lead={project.lead}
      meta={project.meta}
      stories={project.stories}
      gallery={project.gallery}
      galleryTitle="More photos"
      links={project.links}
      back={{ href: "/projects", label: "All projects" }}
    />
  );
}
