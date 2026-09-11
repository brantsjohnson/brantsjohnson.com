// ============================================
// WHAT THIS FILE DOES (plain English):
// This is one project's detail page. The word in the URL (slug)
// matches a project in content/projects.ts. If that name is unknown,
// the visitor sees a not-found page.
// ============================================

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getProjectBySlug, getProjects } from "@/lib/cms/projects";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { FadeInOnScroll } from "@/components/motion/FadeInOnScroll";

type ProjectDetailPageProps = {
  params: { slug: string };
};

// THIS SECTION DOES: tell Next which project URLs to build ahead of time
export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

// THIS SECTION DOES: set the browser tab title from the project's name
export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: "Project" };
  return { title: project.name, description: project.tagline };
}

// THIS SECTION DOES: render the full writeup for one project
export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();

  return (
    <article className="pb-24 pt-14 md:pb-32 md:pt-20">
      <Container>
        <FadeInOnScroll>
          <Button
            href="/projects"
            variant="ghost"
            size="sm"
            trackId={`button:back_to_projects:project-${project.slug}`}
            leadingIcon={<ArrowLeft className="h-4 w-4" aria-hidden="true" />}
          >
            All projects
          </Button>
          <p className="mt-8">
            <Badge tone="accent">{project.status}</Badge>
          </p>
          <h1 className="mt-4 font-heading text-h1 font-semibold tracking-tight text-ink">{project.name}</h1>
          <p className="mt-3 max-w-2xl text-[18px] leading-relaxed text-ink-soft">{project.tagline}</p>
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.08}>
          <p className="mt-8 max-w-[62ch] text-[17px] leading-[1.75] text-ink-soft">{project.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
          {project.href && (
            <div className="mt-10">
              <Button
                href={project.href}
                trackId={`link:open_live:project-${project.slug}`}
                trailingIcon={<ArrowUpRight className="h-4 w-4" aria-hidden="true" />}
              >
                {project.linkLabel ?? "Open project"}
              </Button>
            </div>
          )}
        </FadeInOnScroll>
      </Container>
    </article>
  );
}
