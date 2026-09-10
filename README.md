# brantsjohnson.com

Personal site for Brant S. Johnson.

## What this is right now

The first real marketing UI on the existing Next.js 14 scaffold. Architecture from `docs/01-ARCHITECTURE.md` is unchanged: App Router route groups, `components/{ui,sections,motion,chatbot}`, `content/` for copy, and `BrantChat/` kept out of the Next build.

Public pages now render real glass UI for Home, About (including experience, leadership, and service), Projects, Writings (blog and poetry as subsections), Photography, Civic Engagement, and Contact.

## Quick start

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## What is implemented

- Glass sticky nav: Home, About, Projects, Writings, Photography, Civic Engagement, Contact. Contact goes to `/contact`, not mailto.
- Home: hero promise, About as the only hero CTA, Crew Finance proof spotlight (`$2.5M`, `$110k`, `350+ hrs`), Currently building (Intro featured, Bridger, Filibusters), chat pill "Ask about my work."
- About: Wix-migrated bio (tightened), headshot and CV placeholders, Now snapshot, full experience timeline, leadership, service (Uintah Resilience Archway, Resilient Scholarship).
- Projects: Intro, Bridger, Filibusters, with detail routes under `/projects/[slug]`.
- Writings hub at `/writings` grouping Blog and Poetry. `/blog` and `/poetry` remain as architecture URLs.
- Photography and Civic Engagement: real page chrome with honest empty or systems-framed content.
- Contact: `mailto:me@brantsjohnson.com` only, plus a short human line.
- Chat: glass launcher and preview panel. No model calls. No private knowledge on the client.
- Copy lives under `content/`. Motion goes through `components/motion`. Tokens live in `styles/tokens.css`.

## Remaining TODOs

- Drop a real headshot in `/public` and set `assets.headshot` in `content/site.ts`.
- Drop a CV PDF in `/public` and set `assets.cvUrl`.
- Add blog posts and poems in `content/writings.ts`.
- Add photography collections in `content/photography.ts`.
- Replace Now placeholders in `content/now.ts` with current reading and watching.
- Add the Filibusters YouTube URL in `content/projects.ts`.
- Wire BrantChat behind the existing glass shell (`components/chatbot` plus `app/api/chatbot`).
- Connect Supabase, admin CMS, analytics, and SEO indexing (robots stay off until that pass).
- Do not invent Bridger OAuth. That is still out of scope.

## Docs

Start with `docs/00-MASTER-README.md`. Before connecting Supabase, fill in the open questions in `docs/12-EXISTING-INFRA-MIGRATION.md`.

## BrantChat

The existing BrantChat app lives in `BrantChat/` and is excluded from this Next.js build. It stays untouched until we integrate the chatbot into this site.
