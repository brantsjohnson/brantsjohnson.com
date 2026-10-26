# CLAUDE.md: brantsjohnson.com

This is Brant S. Johnson's personal site (Next.js on Vercel). Read this file and `docs/about-brant.md` (which includes fun facts, stories and voice from Brant's info about me doc) before you write or change anything. Use only the facts in those files and in `content/site-content.ts`. If a fact is not there, leave it out and ask Brant. Never invent dates, numbers, titles or quotes.

## Content sources
- `docs/sources/credentials.md` lists his credentials, with images in `docs/sources/certs/`.

## Who Brant is (one line)
Senior product manager, creator, performer, entrepreneur and activist from Utah. Thesis: "I build technology as a bridge to real human connection." Motto: "Good ideas deserve to happen."

## Site structure
- Six top-level menu items, always in this order: **About, Work, Events, Community, Writing, Contact**. Do not add a seventh.
- About: the personal introduction, how he got here, parties, and two deeper pages: `/about/pre-college` and `/about/handmade`. Hobbies do not get their own top-level page.
- Work: quick previews grouped by kind of work, each opening a longer story at `/work/[slug]` (Intro, Bridger, Crew, Crew brand, BackLocal, A chatbot of me). Full CV at the bottom.
- Events: an archive grouped by kind (`/events`), with one page per event at `/events/[slug]`. Add a new event as one entry in `content/events.ts`. Do not claim he produced an event alone or that he attended every event in a portfolio.
- Community: the Archway and the Resilience Scholarship lead, with their own pages. Public service and student government sit beneath them.
- Writing: simple dated lists of Articles and Poetry. One poem per page under `/writing/poetry`, line breaks kept exactly.
- Contact: email and a short form. Footer on every page: email, the menu, Full CV, Ask about me, LinkedIn, Substack. Keep the résumé link hidden until `public/resume.pdf` exists.
- Home page: the headline "Good ideas deserve to happen." is the page's one h1, with the headshot, an index of the main places, and four places to start.
- Copy source of truth: the approved copy doc (ideas, people and events edition). Where it says a detail is still to be confirmed (the Governor's Economic Summit year, Uintah County tourism events), leave the detail out.
- Do not use Utah or Vernal as the site's brand identity, hero explanation or footer. Place names belong in the story of the project that happened there.
- Write it as a story about Brant in first person, with links inside sentences that jump between pages.

## Look and feel
- Editorial magazine feel: warm white page, near-black type, lots of white space, large display serif. Gold is the one accent and is used sparingly (rules, small blocks, a word). No gold or black fills across big areas.
- Soft fades, scroll reveals and hover captions. Photo captions show only on hover.
- Crew illustrations have see-through backgrounds. Always set them on the cream ground (`CREW_GROUND` in `content/photos.ts`).
- Respect `prefers-reduced-motion`: no animation or smooth scrolling when it is set.
- Model on the best artistic personal portfolio sites. Do not reinvent patterns that already work. References in `docs/design-references.md`.
- No empty frames. If a photo slot has no file, render nothing.

## Photos and media
- Brant's photos live in `public/images/brant-uploads/` (see its README for folders such as general, Crew illustrations, Elf, Something Rotten).
- Keep media light: WebP, sized to how they display, `loading="lazy"` below the fold, no big videos on page load.

## Writing voice
- Plain, warm, short sentences, first person.
- No em dashes. Never use the word "actually". No business filler ("leverage", "synergy", "passionate about").
- Nothing religious. Describe Birmingham, England (2017 to 2019) only as product and volunteer leadership work.
- No dollar figures on pages unless Brant approves them.

## Privacy (hard rules)
- No health, medical, family, relationship, money or job-search details. No home address or phone number.
- No secrets, API keys or tokens in the repo. The site needs none.

## How to work
- Work on a branch and open a pull request. Do not push to `main`.
- Before asking for review, run locally: `npm ci`, `npm test`, `npm run typecheck`, `npm run lint`, `npm run build`. GitHub Actions is turned off, so local checks are the gate.
- Also check built pages for em dashes and the word "actually".
- Vercel builds a preview for each pull request. Share the preview link in the PR.
