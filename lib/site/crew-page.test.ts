// ============================================
// WHAT THIS FILE DOES (plain English):
// Checks the Crew case study stays full, sourced, and gated: every
// section has real bullets, required terms are present, the app-design
// gallery uses real in-product screens, and the bullet list renders.
// ============================================

import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { test } from "node:test";
import { StoryBullets, StoryModeled } from "../../components/editorial/StoryList";
import { hasGalleryPhotos } from "../../content/detail";
import { workDetails } from "../../content/work";
import { strings } from "./strings";

const crew = workDetails.find((detail) => detail.slug === "crew");

test("Crew sections each have at least three substantive bullets", () => {
  assert.ok(crew, "Crew detail page is missing");
  assert.ok((crew?.sections.length ?? 0) >= 8, "Crew should tell the fuller product story in eight sections");
  for (const section of crew?.sections ?? []) {
    assert.ok((section.bullets?.length ?? 0) >= 3, `${section.id} needs at least three bullets`);
    for (const bullet of section.bullets ?? []) {
      assert.ok(bullet.trim().length >= 40, `${section.id} has a thin bullet: ${bullet}`);
      assert.doesNotMatch(bullet, /^\s*$/);
    }
    assert.ok(section.body.length > 0, `${section.id} needs intro prose as well as bullets`);
  }
});

test("Crew page keeps the approved lead facts and sourced program language", () => {
  assert.ok(crew);
  const text = strings(crew).join("\n");
  assert.match(text, /Senior Product Manager/);
  assert.match(text, /Dec 2022 to Apr 2024/);
  assert.match(text, /Family fintech, payments and onboarding/);
  assert.match(text, /first employee/);
  assert.match(text, /only product manager/);
  assert.match(text, /debit-card program from the ground up/);
  assert.match(text, /Bangor Savings Bank/);
  assert.match(text, /Mastercard/);
  assert.match(text, /\bBIN\b/);
  assert.match(text, /program-management workstream/);
  assert.match(text, /\bKYC\b/);
  assert.match(text, /\bPCI\b/);
  assert.match(text, /\bCOPPA\b/);
  assert.match(text, /card lifecycle/);
  assert.match(text, /fulfillment/);
  assert.match(text, /50%/);
  assert.match(text, /20%/);
  assert.match(text, /faster onboarding/);
  assert.match(text, /more engagement/);
  assert.match(text, /five times/);
  assert.match(text, /41 financial institutions/);
  assert.match(text, /I ran manufacturing work/);
  assert.match(text, /Prototypes were labeled separately from what shipped/);
  assert.match(text, /Idemia/);
  assert.match(text, /CompoSecure/);
  assert.match(text, /paper-airplane mailer/);
  assert.match(text, /seven people/);
  assert.match(text, /taught myself to draw/);
  assert.match(text, /Crew still uses that wordmark today/);
  assert.match(text, /trycrew\.com/);
  assert.match(text, /wore many hats/);
  assert.match(text, /Treasury Prime/);
  assert.match(text, /Unit/);
  assert.match(text, /i2c/);
  assert.doesNotMatch(text, /coming soon/i);
  assert.equal(crew?.gallery, undefined);
  assert.match(text, /See the drawings I made for Crew/);
  assert.ok((crew?.links ?? []).some((link) => link.href === "/work/crew-brand"));
});

test("Crew page keeps its existing article links and uses the final titles", () => {
  const links = [...(crew?.sections ?? []).flatMap((section) => section.links ?? []), ...(crew?.links ?? [])];
  const textByHref = new Map(links.map((link) => [link.href, link.text]));
  assert.equal(textByHref.get("/writing/inside-a-card-payment-authorization-to-settlement"), "Inside a Card Payment: Authorization to Settlement");
  assert.equal(textByHref.get("/writing/the-integration-work-behind-a-banking-app"), "The Integration Work Behind a Banking App");
  assert.equal(textByHref.get("/writing/the-manufacturing-economics-of-card-mailers"), "The Manufacturing Economics of Card Mailers");
});

test("Crew app-design gallery uses real in-product screens and stays hidden without photos", () => {
  const gallery = crew?.appDesignGallery;
  assert.ok(gallery, "Crew app-design gallery should be on now that screenshots exist");
  assert.equal(gallery?.title, "App design");
  assert.match(gallery?.intro ?? "", /my own drawings for Crew/);
  assert.match(gallery?.intro ?? "", /still used today/);
  const photos = gallery?.photos ?? [];
  assert.ok(photos.length >= 8, "gallery needs a set of real screens, not a single placeholder");
  const files = new Set(photos.map((photo) => photo.src));
  assert.equal(files.size, photos.length, "gallery screens should not repeat");
  for (const photo of photos) {
    assert.match(photo.src, /\/images\/brant-uploads\/crew-app-design\/img-\d+\.webp$/);
    assert.ok((photo.alt?.length ?? 0) > 40, `thin alt: ${photo.alt}`);
    assert.ok((photo.caption?.length ?? 0) > 0, `missing caption: ${photo.src}`);
    assert.match(photo.alt, /drawn|drawing/i);
    assert.doesNotMatch(photo.alt, /coming soon/i);
    assert.equal(photo.fit, "contain");
  }
  assert.equal(hasGalleryPhotos(gallery), true);
  assert.equal(hasGalleryPhotos(undefined), false);
  assert.equal(hasGalleryPhotos({ photos: [] }), false);
});

test("Crew modeled figures stay in the small research list, not as vanity stats", () => {
  const commercial = crew?.sections.find((section) => section.id === "commercial");
  assert.ok(commercial?.modeled);
  assert.equal(commercial?.modeled?.heading, "What I modeled");
  assert.ok((commercial?.modeled?.items.length ?? 0) >= 3);
  const modeled = (commercial?.modeled?.items ?? []).join("\n");
  assert.match(modeled, /two and a half to four cents/);
  assert.match(modeled, /3\.5 cards/);
  assert.match(modeled, /36 transactions/);
  assert.match(modeled, /150 to 170/);
  assert.match(modeled, /1% cashback/);
  const stats = (crew?.sections ?? []).flatMap((section) => section.stats ?? []);
  assert.deepEqual(
    stats.map((stat) => stat.value),
    ["50%", "20%"]
  );
});

test("an empty bullet list and an empty gallery render nothing", () => {
  assert.equal(renderToStaticMarkup(createElement(StoryBullets, { bullets: [] })), "");
  assert.equal(renderToStaticMarkup(createElement(StoryModeled, { modeled: { heading: "What I modeled", items: [] } })), "");
  assert.equal(hasGalleryPhotos(undefined), false);
  assert.equal(hasGalleryPhotos({ photos: [] }), false);
});

test("Crew bullets render as a readable list", () => {
  const html = renderToStaticMarkup(
    createElement(StoryBullets, {
      bullets: [
        "I coordinated the product across parent and child accounts, debit cards, onboarding, and controls.",
        "I mapped requirements across card issuing, processors, and fulfillment.",
        "I worked with banking partners, design, and engineering on operating tradeoffs.",
      ],
    })
  );
  assert.match(html, /<ul/);
  assert.match(html, /<li>/);
  assert.equal((html.match(/<li>/g) ?? []).length, 3);
  assert.doesNotMatch(html, /coming soon/i);
  assert.doesNotMatch(html, /border-dashed|gray rectangle|placeholder/i);
});
