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
import { relatedArticles } from "../writing/related";
import { loadPostsFrom, POSTS_DIR, seriesNeighbors } from "./load";
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
  // Site-authored fields follow the voice rules. Authorized article titles,
  // deks (summary), and bodies keep their source wording, including names,
  // figures, and words such as "actually" when they appear in Brant's copy.
  const bannedMeta = [/\$/, /—/, /–/, /\bactually\b/i, /\bleverage\b/i, /\bsynergy\b/i, /passionate about/i];
  const bannedDek = [/\$/, /—/, /–/, /\bleverage\b/i, /\bsynergy\b/i, /passionate about/i];
  for (const post of posts) {
    for (const text of strings({ tags: post.tags, about: post.about, cover: post.cover })) {
      for (const pattern of bannedMeta) assert.doesNotMatch(text, pattern, text.slice(0, 120));
    }
    for (const pattern of bannedDek) assert.doesNotMatch(post.summary, pattern, post.summary.slice(0, 120));
  }
  const slugs = posts.map((post) => post.slug);
  assert.equal(new Set(slugs).size, slugs.length);
});

test("the nine Crew articles use the approved dates and stay listed", () => {
  const expected: [string, string, string, string][] = [
    [
      "designing-crews-metal-card",
      "2026-10-28",
      "Designing Crew\u2019s Metal Card",
      "I had a brass-colored metal card made for a fintech that hadn't launched yet.",
    ],
    [
      "inside-a-card-payment-authorization-to-settlement",
      "2026-10-29",
      "Inside a Card Payment: Authorization to Settlement",
      "Every time a card terminal says APPROVED, a surprisingly large number of companies have just managed to agree with each other in a couple of seconds.",
    ],
    [
      "why-would-a-family-switch-banks",
      "2026-10-30",
      "Why Would a Family Switch Banks?",
      "For a long time, the pitch at Willow and then Crew was banking built for families.",
    ],
    [
      "the-unit-economics-of-family-banking",
      "2026-10-31",
      "The Unit Economics of Family Banking",
      "The first time I saw a processing quote for a few cents per transaction, I thought, okay. That's manageable.",
    ],
    [
      "designing-crews-card-packaging-and-fulfillment",
      "2026-11-01",
      "Designing Crew\u2019s Card Packaging and Fulfillment",
      "The prototype worked perfectly.",
    ],
    [
      "from-willow-to-crew-building-the-brand",
      "2026-11-02",
      "From Willow to Crew: Building the Brand",
      "Our first pitch deck said Willow.",
    ],
    [
      "the-digital-billboard-attribution-strategy-i-designed",
      "2026-11-03",
      "The Digital Billboard Attribution Strategy I Designed",
      "When we were building Crew, our founder wanted billboards.",
    ],
    [
      "the-integration-work-behind-a-banking-app",
      "2026-11-04",
      "The Integration Work Behind a Banking App",
      "I once spent a surprising amount of time looking at a spreadsheet of banks and asking whether we could actually connect to them.",
    ],
    [
      "the-manufacturing-economics-of-card-mailers",
      "2026-11-05",
      "The Manufacturing Economics of Card Mailers",
      "A debit card usually arrives stuck to a piece of paper inside an envelope.",
    ],
  ];
  const { posts, errors } = loadPostsFrom(POSTS_DIR);
  assert.deepEqual(errors, []);
  for (const [slug, date, title, summary] of expected) {
    const post = posts.find((item) => item.slug === slug);
    assert.ok(post, `missing post ${slug}`);
    assert.equal(post?.releaseDate, date);
    assert.equal(post?.title, title);
    assert.equal(post?.summary, summary);
    assert.equal(post?.draft, false);
    assert.deepEqual(post?.about, ["work/crew"]);
    assert.equal(stateOf(post!, "2026-11-06"), "listed");
    assert.doesNotMatch(post?.body ?? "", /ARTICLE \d+ OF/);
    assert.doesNotMatch(post?.body ?? "", /\bCONTENTS\b/);
    assert.doesNotMatch(post?.body ?? "", /\\\$/);
    assert.doesNotMatch(post?.body ?? "", /<i>/);
  }
  const metal = posts.find((post) => post.slug === "designing-crews-metal-card");
  assert.match(metal?.body ?? "", /\$80,000/);
  assert.match(metal?.body ?? "", /\$16–\$20/);
  assert.match(metal?.body ?? "", /Idemia/);
  assert.match(metal?.body ?? "", /CompoSecure/);
  const payments = posts.find((post) => post.slug === "inside-a-card-payment-authorization-to-settlement");
  assert.match(payments?.body ?? "", /\*The Anatomy of the Swipe\*/);
  assert.match(payments?.body ?? "", /\*Bank 4\.0\*/);
  const mailer = posts.find((post) => post.slug === "the-manufacturing-economics-of-card-mailers");
  assert.doesNotMatch(mailer?.body ?? "", /Private draft, unapproved/);
  assert.match(mailer?.body ?? "", /\$7,333/);
});

test("Crew Read more includes the nine listed posts and the LinkedIn launch note", () => {
  const related = relatedArticles("work/crew", "2026-11-06");
  assert.equal(related[0]?.id, "post:the-manufacturing-economics-of-card-mailers");
  assert.equal(related.filter((item) => item.internal).length, 9);
  const linkedin = related.find((item) => item.id === "crew-banking-product-launch");
  assert.ok(linkedin);
  assert.equal(linkedin?.internal, undefined);
  assert.match(linkedin?.title ?? "", /overdo/);
  const neighbors = seriesNeighbors("inside-a-card-payment-authorization-to-settlement", "work/crew", "2026-11-06");
  assert.equal(neighbors.previous?.slug, "designing-crews-metal-card");
  assert.equal(neighbors.previous?.title, "Designing Crew\u2019s Metal Card");
  assert.equal(neighbors.next?.slug, "why-would-a-family-switch-banks");
  assert.equal(neighbors.next?.title, "Why Would a Family Switch Banks?");
  assert.equal(related.find((item) => item.id === "post:inside-a-card-payment-authorization-to-settlement")?.title, "Inside a Card Payment: Authorization to Settlement");
});
