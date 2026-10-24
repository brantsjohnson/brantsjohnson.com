# CLAUDE.md: brantsjohnson.com

This is Brant S. Johnson's personal site (Next.js on Vercel). Read this file and `docs/about-brant.md` (which includes fun facts, stories and voice from Brant's info about me doc) before you write or change anything. Use only the facts in those files and in `content/site-content.ts`. If a fact is not there, leave it out and ask Brant. Never invent dates, numbers, titles or quotes.

## Content sources
- `docs/sources/credentials.md` lists his credentials, with images in `docs/sources/certs/`.

## Who Brant is (one line)
Senior product manager, creator, performer, entrepreneur and activist from Utah. Thesis: "I build technology as a bridge to real human connection." Motto: "Good ideas deserve to happen."

## Site structure
- Six top-level menu items, always in this order: **About, Work, Projects, Community, Writing, Contact**. Do not add a seventh.
- About: the personal story, what drives him, and a short "outside of work" section with a few photos. Hobbies do not get their own page.
- Work: organized by theme (Building things, Storytelling, Organizing, Listening), not as a timeline, with a downloadable CV at the bottom.
- Projects: a visual grid of cards, each opening a short case study or gallery.
- Community: the Archway and the Resilience Scholarship lead, with their own pages. Public service (government, student leadership) sits beneath them.
- Writing: the blog. Contact: email and socials.
- Home page: a magazine-style cover with the headshot, an index of the main places, and three featured projects.
- Write it as a story about Brant in first person, with links inside sentences that jump between pages.
- Poetry: one poem per page, line breaks kept exactly (under Projects).
- Footer on every page: See résumé (`/resume.pdf`) and See full CV (`/cv.pdf`). Keep the résumé link hidden until `public/resume.pdf` exists.

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
