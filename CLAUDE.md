# CLAUDE.md: brantsjohnson.com

This is Brant S. Johnson's personal site (Next.js on Vercel). Read this file and `docs/about-brant.md` (which includes fun facts, stories and voice from Brant's info about me doc) before you write or change anything. Use only the facts in those files and in `content/site-content.ts`. If a fact is not there, leave it out and ask Brant. Never invent dates, numbers, titles or quotes.

## Content sources
- `docs/sources/credentials.md` lists his credentials, with images in `docs/sources/certs/`.

## Who Brant is (one line)
Senior product manager, creator, performer, entrepreneur and activist from Utah. Thesis: "I build technology as a bridge to real human connection." Motto: "Good ideas deserve to happen."

## Site structure
- Five sections, always in this order: **Product Manager, Creator, Performer, Entrepreneur, Activist**.
- Home page: one short screen (no scrolling on desktop if you can help it) with five colorful "doors" that lead into each section page.
- Every page keeps scrolling to a minimum. Split long stories into short panels instead of long scrolls.
- Sections overlap on purpose. Tag cross-over work (BackLocal is Product, Creator and Entrepreneur; theater is Performer and Creator).
- Write it as a story about Brant in first person, with links inside sentences that jump between sections, for example "see how I did the branding for Crew" linking to the Crew branding piece in Creator.
- Poetry: one poem per page, line breaks kept exactly.
- Footer on every page: See résumé (`/resume.pdf`) and See full CV (`/cv.pdf`). Keep the résumé link hidden until `public/resume.pdf` exists.

## Look and feel
- Artistic, colorful, with depth (layers, shadows, color fields) and soft fades and transitions between pages.
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
