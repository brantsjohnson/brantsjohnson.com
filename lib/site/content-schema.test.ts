// ============================================
// WHAT THIS FILE DOES (plain English):
// The content safety net. Anyone (an agent or a person) who adds or
// edits an article, event, work story or community story runs
// `npm test` and this file checks the new entry: it has the right
// fields, the dates look like dates, the photos exist, every link
// inside the site points to a real page, and the words follow the
// voice rules (no em dashes, no "actually", no dollar figures).
// The steps are in docs/PUBLISHING.md.
// ============================================

import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { aboutDetails } from "../../content/about";
import { communityDetails } from "../../content/community";
import { eventDetails, eventGroups } from "../../content/events";
import { poems } from "../../content/poems";
import { workDetails, workGroups } from "../../content/work";
import { articles } from "../../content/writing/articles";
import { writingSources } from "../../content/writing/sources";
import type { Detail } from "../../content/detail";
import { availablePosts } from "../posts/load";
import { strings } from "./strings";

const sections: Record<string, Detail[]> = {
  about: aboutDetails,
  work: workDetails,
  events: eventDetails,
  community: communityDetails,
};

// Pages that exist without a content entry.
const fixedRoutes = [
  "/",
  "/about",
  "/work",
  "/work/crew-brand",
  "/events",
  "/community",
  "/articles",
  "/writing",
  "/writing/poetry",
  "/contact",
  "/ask",
  "/now",
  "/hi",
  "/cv.pdf",
];

const knownRoutes = new Set<string>([
  ...fixedRoutes,
  ...Object.values(sections).flatMap((list) => list.map((detail) => detail.path)),
  ...poems.map((poem) => `/writing/poetry/${poem.slug}`),
  ...availablePosts().map((post) => `/writing/${post.slug}`),
]);

const publicFile = (src: string) => existsSync(join(process.cwd(), "public", src));

function internal(href: string): string | null {
  if (!href.startsWith("/")) return null;
  return href.split("#")[0].split("?")[0];
}

function linksIn(value: unknown, found: string[] = []): string[] {
  if (Array.isArray(value)) value.forEach((item) => linksIn(item, found));
  else if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    if (typeof record.href === "string") found.push(record.href);
    Object.values(record).forEach((item) => linksIn(item, found));
  }
  return found;
}

function photosIn(value: unknown, found: string[] = []): string[] {
  if (Array.isArray(value)) value.forEach((item) => photosIn(item, found));
  else if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    if (typeof record.src === "string" && typeof record.alt === "string") found.push(record.src);
    if (typeof record.poster === "string") found.push(record.poster);
    Object.values(record).forEach((item) => photosIn(item, found));
  }
  return found;
}

test("every detail page has a unique slug, a matching path and the fields the page needs", () => {
  for (const [section, list] of Object.entries(sections)) {
    const slugs = new Set<string>();
    for (const detail of list) {
      assert.ok(/^[a-z0-9]+(-[a-z0-9]+)*$/.test(detail.slug), `${section}/${detail.slug}: slug must be lowercase with hyphens`);
      assert.ok(!slugs.has(detail.slug), `${section}/${detail.slug}: duplicate slug`);
      slugs.add(detail.slug);
      assert.equal(detail.path, `/${section}/${detail.slug}`, `${detail.slug}: path must be /${section}/<slug>`);
      assert.ok(detail.title && detail.metaTitle && detail.description, `${detail.path}: title, metaTitle and description are required`);
      assert.ok(detail.lead.length > 0, `${detail.path}: needs a lead paragraph`);
      assert.ok(detail.description.length <= 200, `${detail.path}: description should be 200 characters or fewer`);
      const ids = new Set<string>();
      for (const part of detail.sections) {
        assert.ok(!ids.has(part.id), `${detail.path}: duplicate section id ${part.id}`);
        ids.add(part.id);
        if (part.bullets) {
          assert.ok(part.bullets.length > 0, `${detail.path}#${part.id}: bullets, if present, cannot be an empty list`);
          for (const bullet of part.bullets) {
            assert.ok(bullet.trim().length > 0, `${detail.path}#${part.id}: empty bullet`);
          }
        }
        if (part.modeled) {
          assert.ok(part.modeled.heading.trim().length > 0, `${detail.path}#${part.id}: modeled heading is required`);
          assert.ok(part.modeled.items.length > 0, `${detail.path}#${part.id}: modeled items cannot be empty`);
        }
      }
    }
  }
});

test("every link inside the site points to a real page, and every photo file exists", () => {
  const everything = [workDetails, eventDetails, communityDetails, aboutDetails, workGroups, eventGroups];
  for (const href of linksIn(everything)) {
    const path = internal(href);
    if (path === null) continue;
    assert.ok(knownRoutes.has(path), `Link to ${href} does not match any page. Fix the address or add the page.`);
  }
  for (const src of photosIn(everything)) {
    assert.ok(publicFile(src), `Photo file is missing: public${src}`);
  }
});

test("work item ids are unique, and event cards link to event pages that exist", () => {
  const ids = workGroups.flatMap((group) => group.items.map((item) => item.id));
  assert.equal(new Set(ids).size, ids.length, "work item ids must be unique");
  for (const group of eventGroups) {
    for (const item of group.items) assert.ok(knownRoutes.has(item.href), `Event card ${item.title} links to ${item.href}, which does not exist`);
  }
});

test("articles have the right fields and refer to pages and photos that exist", () => {
  const sourceIds = new Set(writingSources.map((source) => source.id));
  const ids = new Set<string>();
  let previous = "9999-12-31";
  for (const article of articles) {
    assert.ok(/^[a-z0-9]+(-[a-z0-9]+)*$/.test(article.id), `${article.id}: id must be lowercase with hyphens`);
    assert.ok(!ids.has(article.id), `${article.id}: duplicate article id`);
    ids.add(article.id);
    assert.ok(/^\d{4}-\d{2}-\d{2}$/.test(article.date) && !Number.isNaN(new Date(article.date).getTime()), `${article.id}: date must be YYYY-MM-DD`);
    assert.ok(article.date <= previous, `${article.id}: keep articles newest first`);
    previous = article.date;
    assert.ok(article.url.startsWith("https://"), `${article.id}: url must start with https://`);
    assert.ok(sourceIds.has(article.source), `${article.id}: source ${article.source} is not in content/writing/sources.ts`);
    for (const key of article.about ?? []) {
      const [section, slug] = key.split("/");
      assert.ok(sections[section]?.some((detail) => detail.slug === slug), `${article.id}: about "${key}" is not a page. Use section/slug, for example work/crew.`);
    }
    if (article.cover) {
      assert.ok(article.cover.alt.length > 5, `${article.id}: cover needs a description (alt)`);
      assert.ok(publicFile(article.cover.src), `${article.id}: cover file is missing: public${article.cover.src}`);
    }
  }
  for (const source of writingSources) assert.ok(source.feedUrl.startsWith("https://") && source.subscribeUrl.startsWith("https://"), `${source.id}: feed and subscribe addresses must be https`);
});

test("new content follows the voice rules", () => {
  const text = strings([workDetails, eventDetails, communityDetails, aboutDetails, workGroups, eventGroups, articles]);
  const banned = [/\$/, /—/, /–/, /\bactually\b/i, /\bleverage\b/i, /\bsynergy\b/i, /passionate about/i];
  for (const line of text) {
    for (const pattern of banned) assert.doesNotMatch(line, pattern, line);
  }
});
