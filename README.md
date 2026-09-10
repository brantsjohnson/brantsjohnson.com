# brantsjohnson.com

Personal website for **Brant S. Johnson** — a product-minded founder focused on connection and community, with interests across product, AI, media, and government.

Built with **Next.js (App Router) + TypeScript + Tailwind CSS**, and designed so that content edits can be made through small, reviewable pull requests. It replaces the previous Wix site.

## Why this exists

The old site lived on Wix, which made it hard to update programmatically. This version keeps all copy in plain, well-labeled content modules so a person (or an agent) can change wording by editing one small file and opening a PR — no visual editor required.

## Tech stack

- [Next.js 15](https://nextjs.org/) with the App Router
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- Deployed on [Vercel](https://vercel.com/) (zero extra configuration required)

## Project structure

Content is separated from layout on purpose. Copy lives in `content/`; the visual pieces live in `components/`; each URL/route lives in `app/`.

```
app/                     # Routes (App Router). One folder per page.
  layout.tsx             # Shared shell: fonts, metadata, header, footer
  page.tsx               # Home / hero
  about/page.tsx         # About
  experience/page.tsx    # Experience timeline
  projects/page.tsx      # Projects (Intro, Bridger, Filibusters)
  service/page.tsx       # Service (Uintah Resilience Archway, Resilient Scholarship)
  contact/page.tsx       # Contact (me@brantsjohnson.com)
  not-found.tsx          # Friendly 404
  globals.css            # Tailwind layers + base styles

components/              # Reusable UI, no page-specific copy
  Nav.tsx                # Sticky header + mobile menu
  Footer.tsx             # Footer with contact + links
  Container.tsx          # Consistent max width + padding
  PageHeader.tsx         # Title block for interior pages
  ProjectCard.tsx        # A single project card
  BrantChat.tsx          # Commented placeholder for a FUTURE, separate
                         # "brantchat" app (not built here)

content/                 # Plain-text copy — edit these to change wording
  site.ts                # Name, tagline, contact email, navigation
  home.ts                # Hero + highlights
  about.ts               # About page copy
  experience.ts          # Experience entries
  projects.ts            # Project descriptions and links
  service.ts             # Service work
```

## Editing content

To change wording, edit the matching file in `content/`. For example:

- Update the hero headline in `content/home.ts`
- Add a job to the timeline in `content/experience.ts`
- Add or edit a project in `content/projects.ts`

Anything marked `TODO` in those files is an honest placeholder waiting for real detail (for example, dates on the experience timeline and the Filibusters YouTube URL). Search the repo for `TODO` to find them all.

## Run locally

Requirements: **Node.js 18.18+** (Node 20+ recommended) and npm.

```bash
npm install      # install dependencies
npm run dev      # start the dev server at http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build
npm run start    # serve the production build locally
npm run lint     # run ESLint
```

## Deploy to Vercel

This is a standard Next.js app, so no special configuration is needed.

1. Push this repository to GitHub (already done if you're reading this in a PR).
2. In [Vercel](https://vercel.com/new), click **Add New → Project** and import the repo.
3. Vercel auto-detects Next.js. Keep the defaults:
   - **Framework preset:** Next.js
   - **Build command:** `next build`
   - **Install command:** `npm install`
   - **Output:** handled automatically
4. Click **Deploy**. No environment variables or secrets are required for these marketing pages.
5. To use the custom domain, add `brantsjohnson.com` under the project's **Domains** settings and point DNS at Vercel.

## The "brantchat" placeholder

There is a clearly-commented placeholder component at `components/BrantChat.tsx` for a future **brantchat** experience. brantchat is expected to be a **separate application** — this site should only ever link to or embed it. The component is intentionally a "coming soon" stub with instructions inside for how to wire up a link, an iframe embed, or a widget once that app exists. Nothing about the chat product is invented here.
