// ============================================
// WHAT THIS FILE DOES (plain English):
// Checks how posts work: the settings block is read strictly, a post's
// state (draft, unlisted, listed) follows its release date in Denver
// time, the markdown reader never produces raw HTML or unsafe links,
// and every real post file in content/posts is complete and follows
// the voice rules. A post with a mistake is named here with what to fix.
// ============================================

import assert from "node:assert/strict";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { aboutDetails } from "../../content/about";
import { communityDetails } from "../../content/community";
import { eventDetails } from "../../content/events";
import { workDetails } from "../../content/work";
import { strings } from "../site/strings";
import { parseFrontmatter } from "./frontmatter";
import { loadPostsFrom, POSTS_DIR } from "./load";
import { parseMarkdown, safeHref, toPlainText } from "./markdown";
import { readPost, stateOf, todayInDenver } from "./model";

const words = Array.from({ length: 40 }, (_, i) => `word${i}`).join(" ");
const file = (extra = "") => `---\ntitle: "A post"\nsummary: "One plain sentence."\nreleaseDate: 2026-11-10\nwritten: 2026-11-03\ntags: [crew, product]\nabout: [work/crew]\n${extra}---\n\n${words}\n`;

test("the settings block is read, and mistakes are reported", () => {
  const parsed = parseFrontmatter(file('draft: true\n'));
  assert.equal(parsed.errors.length, 0);
  assert.equal(parsed.data.title, "A post");
  assert.deepEqual(parsed.data.tags, ["crew", "product"]);
  assert.equal(parsed.data.draft, true);
  assert.ok(parseFrontmatter("no settings here").errors.length > 0);
  assert.ok(parseFrontmatter("---\ntitle: x\n").errors.length > 0);
});

test("a post is checked for every required field", () => {
  const good = readPost("crew-onboarding", file(), new Set(["work/crew"]));
  assert.equal(good.errors.length, 0);
  assert.equal(good.post?.releaseDate, "2026-11-10");

  const bad = readPost("Bad Name", "---\ntitle: x\nreleaseDate: 11/10/2026\n---\nshort", new Set());
  assert.ok(bad.post === null);
  const text = bad.errors.join(" | ");
  assert.match(text, /file name/);
  assert.match(text, /summary is required/);
  assert.match(text, /releaseDate must be a real date/);

  const wrongPage = readPost("ok-post", file(), new Set(["work/intro"]));
  assert.match(wrongPage.errors.join(" "), /not a page/);
  const noAlt = readPost("ok-post", file("cover: /images/x.webp\n"), new Set(["work/crew"]));
  assert.match(noAlt.errors.join(" "), /coverAlt/);
});

test("state follows the release date in Denver time, and drafts stay hidden", () => {
  const post = { draft: false, releaseDate: "2026-11-10" };
  assert.equal(stateOf(post, "2026-11-09"), "unlisted");
  assert.equal(stateOf(post, "2026-11-10"), "listed");
  assert.equal(stateOf(post, "2026-12-01"), "listed");
  assert.equal(stateOf({ ...post, draft: true }, "2026-12-01"), "draft");
  assert.equal(todayInDenver(new Date("2026-11-04T06:30:00Z")), "2026-11-03"); // 11:30 pm the day before, Denver
  assert.equal(todayInDenver(new Date("2026-11-04T07:30:00Z")), "2026-11-04");
});

test("posts load from a folder, newest release first, and bad files are reported not used", () => {
  const dir = mkdtempSync(join(tmpdir(), "posts-"));
  try {
    writeFileSync(join(dir, "older.md"), file().replace("2026-11-10", "2026-11-05"));
    writeFileSync(join(dir, "newer.md"), file());
    writeFileSync(join(dir, "broken.md"), "---\ntitle: only a title\n---\n");
    writeFileSync(join(dir, "README.md"), "ignored");
    const { posts, errors } = loadPostsFrom(dir);
    assert.deepEqual(posts.map((post) => post.slug), ["newer", "older"]);
    assert.ok(errors.some((message) => message.startsWith("broken:")));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("markdown is read into safe pieces and never raw HTML or unsafe links", () => {
  const blocks = parseMarkdown("## Heading\n\nA **bold** and *soft* [link](https://example.com) and [bad](javascript:alert(1)).\n\n- one\n- two\n\n> quote\n\n<script>alert(1)</script>");
  assert.equal(blocks[0].type, "heading");
  assert.equal(blocks[2].type, "list");
  assert.equal(blocks[3].type, "quote");
  const text = toPlainText(blocks);
  assert.match(text, /bold and soft link and bad/);
  assert.equal(safeHref("javascript:alert(1)"), null);
  assert.equal(safeHref("//evil.example"), null);
  assert.equal(safeHref("/work/crew"), "/work/crew");
  // The script tag is kept only as plain text, never as markup.
  assert.ok(blocks.every((block) => block.type !== "image"));
});

test("every real post file is complete and follows the voice rules", () => {
  const keys = new Set<string>([
    ...workDetails.map((d) => `work/${d.slug}`),
    ...eventDetails.map((d) => `events/${d.slug}`),
    ...communityDetails.map((d) => `community/${d.slug}`),
    ...aboutDetails.map((d) => `about/${d.slug}`),
  ]);
  const { posts, errors } = loadPostsFrom(POSTS_DIR, keys);
  assert.deepEqual(errors, [], `Fix these post files:\n${errors.join("\n")}`);
  const banned = [/\$/, /—/, /–/, /\bactually\b/i, /\bleverage\b/i, /\bsynergy\b/i, /passionate about/i];
  for (const text of strings(posts)) for (const pattern of banned) assert.doesNotMatch(text, pattern, text.slice(0, 120));
  const slugs = posts.map((post) => post.slug);
  assert.equal(new Set(slugs).size, slugs.length);
});
