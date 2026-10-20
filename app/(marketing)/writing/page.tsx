// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Writing page. It stays off the public site until a real
// essay or letter exists. Local pieces come from the writing shelf.
// Substack letters appear when SUBSTACK_URL is set and the feed has
// posts. The signup is a link to that publication. If the URL is
// unset, the signup is not shown.
// ============================================

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { writingIntro } from "@/content/site-content";
import { getPublicWriting, type PublicWritingItem } from "@/lib/writing/public-posts";

export const metadata: Metadata = {
  title: "Writing",
  description: writingIntro.deck,
};

function Shelf({
  title,
  id,
  posts,
  empty,
}: {
  title: string;
  id: string;
  posts: PublicWritingItem[];
  empty: string;
}) {
  return (
    <section aria-labelledby={id} className="border-t border-border-subtle py-12">
      <h2 id={id} className="font-serif text-h2 text-ink">
        {title}
      </h2>
      {posts.length === 0 ? (
        <p className="mt-4 text-body text-text-secondary">{empty}</p>
      ) : (
        <ul className="mt-6 flex flex-col gap-8">
          {posts.map((post) => (
            <li key={post.id}>
              <p className="text-caption text-text-secondary">{post.published}</p>
              {post.external ? (
                <a
                  href={post.href}
                  className="mt-1 block font-serif text-h3 text-ink"
                  data-track="link:open_writing:substack"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {post.title}
                </a>
              ) : (
                <Link
                  href={post.href}
                  className="mt-1 block font-serif text-h3 text-ink"
                  data-track={`link:open_writing:${post.id}`}
                >
                  {post.title}
                </Link>
              )}
              {post.excerpt && <p className="mt-2 max-w-reading text-body text-text-secondary">{post.excerpt}</p>}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default async function WritingPage() {
  const writing = await getPublicWriting();
  if (!writing.show) notFound();

  return (
    <>
      <PageHero eyebrow={writingIntro.eyebrow} title={writingIntro.title} deck={writingIntro.deck} />
      <div className="shell pb-8">
        {writing.feedUrl && (
          <p className="text-caption">
            <a
              href={writing.feedUrl}
              data-track="link:writing_feed:writing"
              className="underline decoration-accent underline-offset-4"
            >
              RSS
            </a>
          </p>
        )}
        <Shelf
          title={writingIntro.essayShelf}
          id="essay-shelf"
          posts={writing.essays}
          empty="No essays are published here yet."
        />
        <Shelf
          title={writingIntro.letterShelf}
          id="letter-shelf"
          posts={writing.letters}
          empty="No letters are mirrored here yet."
        />
      </div>
      {writing.subscribeUrl && (
        <section className="border-t border-border-subtle">
          <div className="shell grid gap-8 py-16 md:grid-cols-2">
            <div>
              <h2 className="font-serif text-h2 text-ink">Get the letter</h2>
              <p className="mt-4 max-w-reading text-body text-text-secondary">
                The letter is published on Substack. Subscribe there, and a mirror can appear here the day after it goes out.
              </p>
            </div>
            <div>
              <Button href={writing.subscribeUrl} track="button:subscribe_substack:writing">
                Subscribe on Substack
              </Button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
