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

## Lint, preview, and deploy

```bash
npm run lint
npm run build
npm start
```

This is a standard Next.js 14 app. On Vercel, import the GitHub repo, keep the production branch as `main`, and leave the build command as `npm run build` (output is `.next`). Once the project is connected, each pull request gets its own preview URL.

Copy values from `.env.example` into Vercel project settings when Supabase or the chatbot are wired. The marketing UI builds with no secrets until then.

Magic Patterns links in the original brief are design references only. They are not part of the deploy.

## What is implemented

- Glass sticky nav: Home, About, Projects, Writings, Photography, Civic Engagement, Contact. Contact goes to `/contact`, not mailto.
- Home: Product-minded founder, hero promise, About as the only hero CTA, Crew Finance proof (stats plus chips for `$2.5M`, self-taught art, hand-drawn, dark mode, `~$110k`, `350+ hrs`), Currently building (Intro featured, Bridger, Filibusters), chat pill "Ask about my work."
- About: Wix-migrated bio (tightened), headshot and CV placeholders, Now snapshot (static placeholders, not Bridger OAuth), full LinkedIn/CV experience timeline (Utah Business Oct 2024 to Nov 2025, Crew Finance Principal PM Dec 2022 to Mar 2024, Divvy Product Management Analyst, BackLocal Founder and Product Manager), leadership, service (Uintah Resilience Archway, Resilient Scholarship).
- Projects: Intro, Bridger, Filibusters, with detail routes under `/projects/[slug]`.
- Writings hub at `/writings` grouping Blog and Poetry. `/blog` and `/poetry` remain as architecture URLs.
- Photography: honest empty state until collections exist.
- Civic Engagement: systems-and-process framing, honest empty state, optional Filibusters pointer. Not a party platform.
- Contact: `mailto:me@brantsjohnson.com` only, plus a short human line.
- Chat: glass launcher and preview panel in `components/chatbot`. No model calls. No private knowledge on the client. `BrantChat/` is left alone.
- Copy lives under `content/`. Motion goes through `components/motion`. Tokens live in `styles/tokens.css`.

## Remaining TODOs

- Drop a real headshot in `/public` and set `assets.headshot` in `content/site.ts`.
- Drop a CV PDF in `/public` and set `assets.cvUrl`.
- Add blog posts and poems in `content/writings.ts`.
- Add photography collections in `content/photography.ts`.
- Add civic writing in `content/civic.ts` when it is ready.
- Replace Now placeholders in `content/now.ts` with current reading and watching.
- Add the Filibusters YouTube URL in `content/projects.ts`.
- Wire BrantChat behind the existing glass shell (`components/chatbot` plus `app/api/chatbot`).
- Connect Supabase, admin CMS, analytics, and SEO indexing (robots stay off until that pass).
- Do not invent Bridger OAuth. That is still out of scope.

## Docs

Start with `docs/00-MASTER-README.md`. Before connecting Supabase, fill in the open questions in `docs/12-EXISTING-INFRA-MIGRATION.md`.

## BrantChat

The existing BrantChat app lives in `BrantChat/` and is excluded from this Next.js build. It stays untouched until we integrate the chatbot into this site.
