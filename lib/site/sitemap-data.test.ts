// ============================================
// WHAT THIS FILE DOES (plain English):
// Checks the search files. Every public page is listed once, private
// pages stay out, and photographs are filed under the page that
// shows them rather than piled onto About.
// ============================================

import assert from "node:assert/strict";
import { test } from "node:test";
import { imagePages, imageSitemapXml, pageEntries } from "./sitemap-data";

const pages = pageEntries([
  { slug: "sample-note", written: "2026-01-15" },
  { slug: "bad-date", written: "soon" },
]);
const images = imagePages();

test("the page list is unique and leaves private pages out", () => {
  const paths = pages.map((entry) => entry.path);
  assert.equal(new Set(paths).size, paths.length);
  assert.ok(paths.includes("/"));
  assert.ok(paths.includes("/about"));
  assert.ok(paths.includes("/community/archway"));
  assert.ok(paths.includes("/ask"));
  assert.ok(paths.includes("/cv.pdf"));
  assert.ok(paths.includes("/images/brant-uploads/press/bl-feature-2020-11.pdf"));
  assert.ok(paths.includes("/writing/sample-note"));
  assert.equal(paths.includes("/hi"), false);
  assert.equal(paths.some((path) => path.startsWith("/admin") || path.startsWith("/chat")), false);
});

test("a date is kept only when the content has one", () => {
  const home = pages.find((entry) => entry.path === "/");
  const note = pages.find((entry) => entry.path === "/writing/sample-note");
  const undated = pages.find((entry) => entry.path === "/writing/bad-date");
  assert.equal(home?.lastModified, undefined);
  assert.equal(note?.lastModified, "2026-01-15");
  assert.equal(undated?.lastModified, undefined);
});

test("photographs are filed under the page that shows them", () => {
  const on = (path: string) => images.find((page) => page.path === path)?.images.map((image) => image.src) ?? [];
  assert.ok(on("/").includes("/images/brant-s-johnson.jpg"));
  assert.ok(on("/about").includes("/images/brant-about.webp"));
  assert.ok(on("/community").includes("/images/brant-uploads/general/brant-alone-at-the-archway.webp"));
  assert.ok(on("/community/archway").some((src) => src.includes("arch")));
  assert.equal(on("/community/archway").some((src) => src.includes("scholarship-2023")), false);
  assert.equal(images.some((page) => page.images.some((image) => image.src.includes("scholarship-2023"))), false);

  const aboutCount = on("/about").length;
  const total = images.reduce((sum, page) => sum + page.images.length, 0);
  assert.ok(aboutCount < total / 2, `About is carrying ${aboutCount} of ${total} images`);
  assert.ok(images.every((page) => page.images.length <= 1000));
});

test("the image file is real XML and names the home portrait", () => {
  const xml = imageSitemapXml("https://www.brantsjohnson.com", images);
  assert.match(xml, /xmlns:image="http:\/\/www.google.com\/schemas\/sitemap-image\/1.1"/);
  assert.match(xml, /<loc>https:\/\/www.brantsjohnson.com\/<\/loc>[\s\S]*brant-s-johnson\.jpg/);
  assert.doesNotMatch(xml, /<loc>https:\/\/www.brantsjohnson.com\/about<\/loc>[\s\S]*brant-s-johnson\.jpg/);
  assert.match(xml, /<video:player_loc>https:\/\/www.youtube-nocookie.com\/embed\/qhj9oJrPxfg\?start=1594<\/video:player_loc>/);
});
