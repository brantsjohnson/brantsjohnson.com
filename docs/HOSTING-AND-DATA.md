# Hosting and Data Map

**Plain English purpose:** This document records where brantsjohnson.com is hosted, what data and outside services it depends on, and how a change reaches the live site. It is a read only audit. It changes no redirects, no marketing UI, and no DNS. Every claim below is tied to something actually found in this repository. Where the repository does not prove a fact, the entry says UNKNOWN so nobody treats a guess as confirmed.

Audit method: most findings come from reading this repository only (`package.json`, `.env.example`, `next.config.mjs`, `middleware.ts`, `lib/`, `supabase/`, `docs/`, the `BrantChat/` sibling app, and the git remote). A small number of facts below are ops verified: they were confirmed directly from the Vercel dashboard during operations work and are labelled "ops verified" so it is clear they came from a live console rather than from a file in the repo. Anything still living only in a console we did not inspect (for example Supabase and DNS records) stays marked UNKNOWN.

---

## 1. Product role

- brantsjohnson.com is the personal marketing site for Brant S. Johnson. It is built as a Next.js 14 App Router app in TypeScript with Tailwind (see `package.json` and `docs/01-ARCHITECTURE.md`). Right now the repository is a scaffold: route stubs and library stubs exist, but there is no finished UI or real content yet (see `README.md`).
- Planned public sections are Home, About, Projects, Blog, Poetry, Photography, Civic Engagement, and Contact, plus a site wide chatbot widget (see `docs/08-CONTENT-SECTIONS-SITEMAP.md`).
- BrantChat is a separate chatbot application kept in the `BrantChat/` folder as a sibling reference. It is excluded from this site's build today (`next.config.mjs` ignores `BrantChat/**`) and is intended to be integrated into this site later as the on site chatbot (see `README.md` and `components/chatbot/`).
- Bridger is described in the BrantChat knowledge base as an AI powered social platform that Brant is building as a passion project (`BrantChat/data/brant-knowledge.json`). It is a separate product Brant is developing, not a shipped feature of this site.
- A home page "Now" section that surfaces Brant's shared Bridger tastes (hobbies, movies, books, currently reading) is now built and lives on `main` after PR #4. The section component is `components/sections/Now.tsx`, its fixed copy lives in `content/now.ts`, and the server side fetch that reads Bridger lives in `lib/integrations/bridger.ts`. This is a section on the home page, not a standalone `/now` route. When Bridger has nothing shared, the section shows an honest empty placeholder rather than inventing tastes.

---

## 2. Current hosting

- Intended host is Vercel. This is stated in the docs (`docs/00-MASTER-README.md` section 4 lists Hosting: Vercel, and `docs/12-EXISTING-INFRA-MIGRATION.md` describes pointing the domain at a new Vercel deployment).
- The `package.json` `name` field is `brantsjohnson-com`, which matches the confirmed Vercel project name `brantsjohnson-com`.
- Vercel project link (ops verified): the site is hosted on the Vercel project named `brantsjohnson-com`, project id `prj_yurrRwzw30f443Hy0Rc2hLeDlgnV`, under the team "Brant Johnson's projects". Its production alias is `https://brantsjohnson-com.vercel.app`, which was READY when built from `main` at commit `64a53dd`. These four facts (project name, project id, team, production alias) were confirmed from the Vercel dashboard, not from the repository, because there is no committed `.vercel/` directory (it is intentionally ignored in `.gitignore` under the `# Vercel` section) and no `vercel.json` or `.vercelignore` at the repository root.
- Wix and the DNS cutover: the custom domain has historically been served by Wix, and the plan is to migrate it onto the new Vercel deployment (see `docs/12-EXISTING-INFRA-MIGRATION.md`). Brant has greenlit the DNS cutover from Wix to Vercel and it is in progress. The cutover is NOT confirmed complete: until DNS is verified as fully pointing at Vercel, treat the domain as mid migration. Do not repoint DNS or claim the cutover is done as part of this audit.

---

## 3. Database and integrations

### Supabase

- The site is built to use Supabase. The dependency `@supabase/supabase-js` is in `package.json`, and `lib/supabase.ts` builds a browser client (anon key) and a server only client (service role key).
- A database migration exists at `supabase/migrations/20260910_000001_site_schema.sql`. It creates a dedicated `site` schema with tables including `site.projects`, `site.media_items`, `site.links`, `site.socials`, and `site.contact_submissions`. Per its own header comment and `docs/12-EXISTING-INFRA-MIGRATION.md`, this migration is not applied yet.
- The plan is to reuse an existing Supabase project (one Brant already has, described as connected to another agent or tool) and keep this site's tables in a separate `site` schema so they do not collide with the other tool's tables (see `docs/12-EXISTING-INFRA-MIGRATION.md`).
- The actual Supabase project reference or id: UNKNOWN. It is not committed anywhere in the repository and is listed as an open question in `docs/12-EXISTING-INFRA-MIGRATION.md`.

### Bridger share API

- A Bridger share integration for this site is now built and lives on `main` after PR #4. The server side client is `lib/integrations/bridger.ts`; it only runs on the server, caches for a few minutes, and is written so it can never crash the page (if Bridger is off, unset, or Brant has opted out, it quietly returns nothing and the Now section shows its placeholder).
- It reads three environment variables, all documented in `.env.example`: `BRIDGER_API_BASE` (the base URL of the Bridger API), `BRIDGER_SHARE_SLUG` (the public share slug for Brant's interests), and `BRIDGER_SHARE_TOKEN` (an optional server only token). These are documented, not UNKNOWN.
- Production Bridger API base: `BRIDGER_API_BASE=https://jiyzei8qqu.us-east-1.awsapprunner.com`. This value is committed in `.env.example` on `main`.
- `BRIDGER_SHARE_SLUG` is intentionally left blank until Brant opts in and enables sharing in Bridger. While it is unset, the live fetch stays off and the Now section shows its empty placeholder. This is expected, not a misconfiguration.

### Other integrations (scaffolded, not wired)

- CRM and Uspot: contact and chat leads are meant to be pushed to a personal CRM or Uspot via a webhook. Today `lib/integrations/crm.ts` only exposes a stub connector that reports "not configured yet," and `.env.example` lists the target URLs as optional placeholders (see below).
- GitHub: `lib/integrations/github.ts` and a `GITHUB_TOKEN` placeholder exist for pulling repo metadata onto the Projects section later.
- Analytics: GA4 and a pixel style tag are planned and gated behind env vars and feature flags (see `docs/06-ANALYTICS-INTEGRATIONS.md`). Not wired yet.
- AI chatbot: `lib/ai/` holds stubs for retrieval, prompt assembly, and generation. The model provider is chosen via env vars but no provider is wired yet.

---

## 4. Domains

- **brantsjohnson.com** is the primary custom domain for this personal site. It has historically been served by Wix, and Brant has greenlit the DNS cutover to the Vercel project `brantsjohnson-com` (production alias `https://brantsjohnson-com.vercel.app`), which is in progress (see section 2). Do not claim the cutover is complete until DNS is verified as fully pointing at Vercel.
- **www.brantsjohnson.com**: UNKNOWN. No www specific configuration, redirect, or reference exists in this repository. The `www` to apex behavior would be set in DNS and the Vercel domain settings, neither of which is inspected here.
- **brantchat.brantsjohnson.com**: this subdomain belongs to the separate BrantChat app (referenced in `BrantChat/setup.sh` and `BrantChat/README.md`, which point to `https://brantchat.brantsjohnson.com`). BrantChat keeps its own Vercel deploy and git history (`.gitignore` ignores `BrantChat/.vercel/` and `BrantChat/.git/`). Leave this subdomain alone. This audit and this site's deploy do not manage it.

---

## 5. Deploy path

- Intended deploy path is the Vercel git integration: pushing to the connected GitHub repository triggers a Vercel build and deploy. The git remote for this repository is `github.com/brantsjohnson/brantsjohnson.com` (from `git remote -v`).
- There are no CI workflow files in this repository (no `.github/` directory) and no `vercel.json`, so there is no repo defined pipeline or Vercel build override. Any deploy configuration, including production branch, build command overrides, and environment variables, lives in the Vercel dashboard and is UNKNOWN from the repository.
- BrantChat deploys separately and is documented in its own README as a direct `vercel --prod` deploy. That path is independent of this site.

---

## 6. Environment variable names

These are the environment variable NAMES this site expects. Values are never committed. This list is taken directly from `.env.example` at the repository root. No secret values are shown.

- `NEXT_PUBLIC_SUPABASE_URL` (Supabase project URL, browser safe)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Supabase anon/public key, browser safe, RLS still applies)
- `SUPABASE_SERVICE_ROLE_KEY` (Supabase service role key, server only)
- `AI_API_KEY` (AI provider key for the chatbot, server only)
- `AI_MODEL` (optional model id override)
- `NEXT_PUBLIC_GA4_MEASUREMENT_ID` (GA4 measurement id, optional until wired)
- `NEXT_PUBLIC_PIXEL_ID` (pixel style tag id, optional until wired)
- `GITHUB_TOKEN` (GitHub API token for project metadata)
- `CRM_WEBHOOK_URL` (personal CRM webhook target)
- `USPOT_WEBHOOK_URL` (Uspot webhook target)
- `ADMIN_PASSWORD_HASH` (hash for the single user admin portal login)
- `JWT_SECRET` (secret used to sign admin session tokens)
- `BRIDGER_API_BASE` (base URL of the production Bridger API; set to `https://jiyzei8qqu.us-east-1.awsapprunner.com` on `main`)
- `BRIDGER_SHARE_SLUG` (public share slug for Brant's interests; intentionally blank until he opts in)
- `BRIDGER_SHARE_TOKEN` (optional server only token for the share endpoint; must never be exposed to the browser)

The Bridger share variables above are now present and documented in `.env.example` on `main` (added in PR #4). They power the home page Now section described in sections 1 and 3.

For reference only, the separate BrantChat app declares its own environment names in `BrantChat/config.example.env`: `OPENAI_API_KEY`, `JWT_SECRET`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY`. These belong to BrantChat, not to this site.

---

## 7. Summary table

| Area | Confirmed from repo | Status |
|---|---|---|
| Framework | Next.js 14 App Router, TypeScript, Tailwind | Confirmed (`package.json`) |
| Host | Vercel project `brantsjohnson-com`, id `prj_yurrRwzw30f443Hy0Rc2hLeDlgnV`, team "Brant Johnson's projects", prod alias `https://brantsjohnson-com.vercel.app` | Ops verified (READY at `main` 64a53dd) |
| Current live site | Historically Wix; DNS cutover to Vercel greenlit and in progress | Cutover in progress; not confirmed complete; do not repoint DNS |
| Database | Supabase, `site` schema migration exists, not applied | Project ref UNKNOWN |
| Bridger share API | `lib/integrations/bridger.ts` client; `BRIDGER_API_BASE=https://jiyzei8qqu.us-east-1.awsapprunner.com` in `.env.example` | Built on `main` (PR #4); share slug unset until opt in |
| Primary domain | brantsjohnson.com | Historically Wix; cutover to Vercel in progress |
| www | none in repo | UNKNOWN |
| brantchat subdomain | brantchat.brantsjohnson.com, separate BrantChat deploy | Leave alone |
| Deploy path | Vercel git integration via GitHub remote | Intended; dashboard config UNKNOWN |
| CI in repo | none (no `.github/`, no `vercel.json`) | Confirmed absent |

---

## 8. How to confirm the UNKNOWN items later

When someone has dashboard access, these are the specific things to verify and then update in this document:

1. Vercel project link: resolved. Ops verified as project `brantsjohnson-com`, id `prj_yurrRwzw30f443Hy0Rc2hLeDlgnV`, team "Brant Johnson's projects", prod alias `https://brantsjohnson-com.vercel.app`. Still worth recording the production branch and any build overrides from the dashboard.
2. In DNS and Vercel domains, confirm when the greenlit `brantsjohnson.com` cutover from Wix to Vercel fully completes, and confirm what `www.brantsjohnson.com` points at (`www` behavior is still UNKNOWN until the Vercel domain panel confirms it). Update this document once the cutover is verified complete.
3. In Supabase, record the project reference this site will reuse and confirm the `site` schema separation.
4. Bridger share integration: resolved. `BRIDGER_API_BASE`, `BRIDGER_SHARE_SLUG`, and `BRIDGER_SHARE_TOKEN` are already in `.env.example` on `main`, with `BRIDGER_API_BASE=https://jiyzei8qqu.us-east-1.awsapprunner.com`. Record the `BRIDGER_SHARE_SLUG` value here once Brant opts in and enables sharing in Bridger.
