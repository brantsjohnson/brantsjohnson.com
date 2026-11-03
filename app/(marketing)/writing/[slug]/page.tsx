// ============================================
// WHAT THIS FILE DOES (plain English):
// One post, written on this site. Every post that is not a draft has a
// working page. A post whose release day has not come yet is
// "unlisted": the page works and search engines and AI tools can read
// it (it is in the sitemap and llms.txt), but the site does not list it
// anywhere and the page shows no date. On its release day it becomes
// "listed" on its own and the date appears. Everyone, human or
// machine, sees the same page; nothing is hidden from visitors or
// shown only to crawlers. See docs/PUBLISHING.md.
// ============================================

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/editorial/Markdown";
import { PageHeader } from "@/components/editorial/PageHeader";
import { StoryLink } from "@/components/narrative/StoryLink";
import { availablePosts, getPost } from "@/lib/posts/load";
import { postJsonLd } from "@/lib/posts/jsonld";
import { postDate } from "@/lib/posts/model";
import { indexingRobots } from "@/lib/site/indexing";
import { pageMetadata } from "@/lib/site/page-metadata";
import { siteOrigin } from "@/lib/site/origin";

type PageProps = { params: { slug: string } };

// Rebuilt about hourly so a post flips from unlisted to listed on its release day without anyone editing anything.
export const revalidate = 3600;

export function generateStaticParams() {
  return availablePosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const found = getPost(params.slug);
  if (!found) return {};
  const { post, state } = found;
  const base = pageMetadata({
    title: post.title,
    description: post.summary,
    path: `/writing/${post.slug}`,
    image: post.cover ? { photo: { src: post.cover.src, alt: post.cover.alt, width: 1200, height: 630 } } : { kicker: "Writing" },
    article: state === "listed" ? { publishedTime: post.releaseDate } : undefined,
  });
  return {
    ...base,
    // Unlisted is not private: once the site is open to indexing, so is this page.
    robots: indexingRobots(),
    alternates: { canonical: `/writing/${post.slug}`, types: { "text/markdown": `/writing/${post.slug}.md` } },
  };
}

function Tags({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;
  return (
    <ul className="mt-8 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={tag} className="label rounded-control border border-border-subtle px-3 py-1 text-[0.66rem] text-text-secondary">
          {tag}
        </li>
      ))}
    </ul>
  );
}

export default function WritingPostPage({ params }: PageProps) {
  const found = getPost(params.slug);
  if (!found) notFound();
  const { post, state } = found;
  const jsonLd = postJsonLd(post, state, siteOrigin());

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHeader id={post.slug} label={state === "listed" ? `Writing · ${postDate(post.releaseDate)}` : "Writing"} title={post.title} lead={post.summary} />
      <div className="shell pb-24">
        <div className="max-w-reading">
          <Markdown source={post.body} />
          <Tags tags={post.tags} />
          {post.substackUrl ? (
            <p className="mt-10">
              <StoryLink href={post.substackUrl} track={`link:substack:post_${post.slug}`}>
                Also on Substack
              </StoryLink>
            </p>
          ) : null}
          <p className="mt-10">
            <Link href="/writing" data-track="link:writing_index:post" className="label inline-flex min-h-[44px] items-center gap-3 text-ink hover:text-accent-deep">
              <span aria-hidden="true">←</span> All writing
            </Link>
          </p>
        </div>
      </div>
    </article>
  );
}
