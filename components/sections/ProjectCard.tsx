// ============================================
// WHAT THIS FILE DOES (plain English):
// This is one project card. The featured version is a wide glass panel
// used on Home for Intro. The regular version is a smaller card used
// in the supporting row and on the Projects page. The card itself
// goes to the on-site project page. The domain, if there is one, is
// the external link.
// ============================================

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";
import { Badge } from "@/components/ui/Badge";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/utils/cn";

type ProjectCardProps = {
  project: Project;
  featured?: boolean;
};

// THIS SECTION DOES: render a featured wide panel or a compact card for one project
export function ProjectCard({ project, featured = Boolean(project.featured) }: ProjectCardProps) {
  const internalHref = `/projects/${project.slug}`;

  if (featured) {
    return (
      <article>
        <Link
          href={internalHref}
          data-track={`card:view_project:project-${project.slug}`}
          className="group block rounded-panel border border-line bg-glass p-8 shadow-glass backdrop-blur-glass transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand md:p-12"
        >
          <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_260px] md:gap-16">
            <div>
              <p className="font-mono text-[11.5px] uppercase tracking-[0.18em] text-brand">{project.status}</p>
              <h3 className="mt-6 font-heading text-[38px] font-medium leading-[1.05] tracking-tight text-ink md:text-[52px]">
                {project.name}
              </h3>
              <p className="mt-5 max-w-[520px] text-[17px] leading-[1.65] text-ink-soft md:text-[18px]">
                {project.description}
              </p>
            </div>
            <div className="md:border-l md:border-line md:pl-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">Tags</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </div>
          </div>
        </Link>
        {project.href && (
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer noopener"
            data-track={`link:open_live:project-${project.slug}`}
            className="focus-ring mt-4 inline-flex items-center gap-1.5 rounded-sm text-[14.5px] font-medium text-ink"
          >
            {project.linkLabel ?? project.href}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        )}
      </article>
    );
  }

  return (
    <article
      className={cn(
        "group flex h-full flex-col rounded-panel border border-line bg-glass p-8 shadow-glass backdrop-blur-glass transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
      )}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">{project.status}</p>
      <h3 className="mt-5 font-heading text-[26px] font-medium leading-[1.15] tracking-tight text-ink">
        <Link
          href={internalHref}
          data-track={`card:view_project:project-${project.slug}`}
          className="focus-ring rounded-sm"
        >
          {project.name}
        </Link>
      </h3>
      <p className="mt-4 text-[15.5px] leading-[1.6] text-ink-soft">{project.description}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Link
          href={internalHref}
          data-track={`button:view_project:project-${project.slug}`}
          className="focus-ring inline-flex items-center gap-1.5 text-[13.5px] font-medium text-ink"
        >
          View project
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
        {project.href && (
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer noopener"
            data-track={`link:open_live:project-${project.slug}`}
            className="focus-ring inline-flex items-center gap-1.5 text-[13.5px] text-ink-soft hover:text-ink"
          >
            {project.linkLabel ?? project.href}
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}
