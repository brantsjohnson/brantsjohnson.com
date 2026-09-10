import Link from "next/link";
import { Container } from "@/components/Container";
import { ProjectCard } from "@/components/ProjectCard";
import { BrantChat } from "@/components/BrantChat";
import { home } from "@/content/home";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

/**
 * Home page.
 *
 * Purpose: the front door. It opens with the hero (headline + short intro +
 * interest chips and calls to action), then a short "what I care about" grid,
 * a preview of current projects, and the reserved brantchat placeholder. All
 * copy comes from content modules so this file stays about layout only.
 */
export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-20 sm:pt-28">
        <Container>
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            {site.role}
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-6xl">
            {home.heroHeadline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">
            {home.heroSubhead}
          </p>

          {/* Interest chips */}
          <ul className="mt-8 flex flex-wrap gap-2">
            {home.interests.map((interest) => (
              <li
                key={interest}
                className="rounded-full border border-ink/10 bg-white px-4 py-1.5 text-sm text-ink-soft"
              >
                {interest}
              </li>
            ))}
          </ul>

          {/* Calls to action */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent"
            >
              See what I&apos;m building
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="rounded-full border border-ink/15 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Get in touch
            </a>
          </div>
        </Container>
      </section>

      {/* What I care about */}
      <section className="mt-24 sm:mt-32">
        <Container>
          <h2 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">
            What I care about
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {home.highlights.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-ink/10 bg-white p-6"
              >
                <h3 className="font-serif text-lg font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-ink-soft">{item.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Projects preview */}
      <section className="mt-24 sm:mt-32">
        <Container>
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-serif text-2xl font-semibold text-ink sm:text-3xl">
              Projects
            </h2>
            <Link href="/projects" className="link text-sm font-medium">
              View all
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {projects.items.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        </Container>
      </section>

      {/* Reserved spot for the future, separate brantchat app */}
      <section className="mt-24 sm:mt-32">
        <BrantChat />
      </section>
    </>
  );
}
