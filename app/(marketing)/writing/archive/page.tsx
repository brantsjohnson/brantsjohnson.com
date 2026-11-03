// ============================================
// WHAT THIS FILE DOES (plain English):
// The full list of everything written on this site, including posts
// that have not been featured yet. It is not linked from the menu or
// the footer, but it is in the sitemap and llms.txt, and it is open to
// search engines and AI tools, so they can find every post at once
// instead of one a day. It is not private: anyone with the address can
// read it. See docs/PUBLISHING.md.
// ============================================

import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/editorial/PageHeader";
import { availablePosts } from "@/lib/posts/load";
import { postDate, stateOf } from "@/lib/posts/model";
import { indexingRobots } from "@/lib/site/indexing";
import { pageMetadata } from "@/lib/site/page-metadata";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Writing archive",
    description: "Every post on this site, in one list.",
    path: "/writing/archive",
    image: { kicker: "Writing" },
  }),
  robots: indexingRobots(),
};

export const revalidate = 3600;

export default function WritingArchivePage() {
  const posts = availablePosts();
  return (
    <>
      <PageHeader id="archive" label="Writing" title="Archive" lead="Every post on this site, in one list." />
      <div className="shell pb-24">
        <ul className="border-t border-border-subtle">
          {posts.map((post) => {
            const listed = stateOf(post) === "listed";
            return (
              <li key={post.slug} className="grid gap-1 border-b border-border-subtle py-6 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <p className="label pt-2 text-[0.68rem] text-text-secondary">{listed ? postDate(post.releaseDate) : ""}</p>
                <div>
                  <Link href={`/writing/${post.slug}`} className="font-serif text-[1.7rem] leading-tight text-ink underline decoration-transparent decoration-2 underline-offset-4 hover:decoration-accent">
                    {post.title}
                  </Link>
                  <p className="mt-2 max-w-reading text-caption text-text-secondary">{post.summary}</p>
                </div>
              </li>
            );
          })}
        </ul>
        {posts.length === 0 ? <p className="mt-6 text-text-secondary">Nothing here yet.</p> : null}
        <p className="mt-10">
          <Link href="/writing" className="label inline-flex min-h-[44px] items-center gap-3 text-ink hover:text-accent-deep">
            <span aria-hidden="true">←</span> Writing
          </Link>
        </p>
      </div>
    </>
  );
}
