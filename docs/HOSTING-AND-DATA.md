# Hosting and Data Map

**Plain English purpose:** This document records where brantsjohnson.com is hosted, what data and outside services it depends on, and how a change reaches the live site. It is a read only audit. It changes no redirects, no marketing UI, and no DNS. Every claim below is tied to something actually found in this repository. Where the repository does not prove a fact, the entry says UNKNOWN so nobody treats a guess as confirmed.

Audit method: findings come from reading this repository only (`package.json`, `.env.example`, `next.config.mjs`, `middleware.ts`, `lib/`, `supabase/`, `docs/`, the `BrantChat/` sibling app, and the git remote). No live Vercel, Supabase, or DNS console was inspected, so hosting and DNS state that lives only in those consoles is marked UNKNOWN.

---

## 1. Product role

- brantsjohnson.com is the personal marketing site for Brant S. Johnson. It is built as a Next.js 14 App Router app in TypeScript with Tailwind (see `package.json` and `docs/01-ARCHITECTURE.md`). Right now the repository is a scaffold: route stubs and library stubs exist, but there is no finished UI or real content yet (see `README.md`).
- Planned public sections are Home, About, Projects, Blog, Poetry, Photography, Civic Engagement, and Contact, plus a site wide chatbot widget (see `docs/08-CONTENT-SECTIONS-SITEMAP.md`).
- BrantChat is a separate chatbot application kept in the `BrantChat/` folder as a sibling reference. It is excluded from this site's build today (`next.config.mjs` ignores `BrantChat/**`) and is intended to be integrated into this site later as the on site chatbot (see `README.md` and `components/chatbot/`).
- Bridger is described in the BrantChat knowledge base as an AI powered social platform that Brant is building as a passion project (`BrantChat/data/brant-knowledge.json`). It is a separate product Brant is developing, not a shipped feature of this site.
- A "Now" page and a "Bridger tastes" feature that surface Bridger data on this personal site: UNKNOWN. Neither is present in this repository's routes, content, or configuration. Treat them as not yet built rather than confirmed.

---

## 2. Current hosting

- Intended host is Vercel. This is stated in the docs (`docs/00-MASTER-README.md` section 4 lists Hosting: Vercel, and `docs/12-EXISTING-INFRA-MIGRATION.md` describes pointing the domain at a new Vercel deployment).
- The `package.json` `name` field is `brantsjohnson-com`, which matches the expected Vercel project name `brantsjohnson-com`.
- Verification of the Vercel project link from the repository: NOT AVAILABLE. There is no committed `.vercel/` directory (it is intentionally ignored in `.gitignore` under the `# Vercel` section), and there is no `vercel.json` or `.vercelignore` at the repository root. Because the `.vercel/project.json` that records the linked project and org ids is not committed, the exact Vercel project id and org id cannot be confirmed from this repo. The link itself is UNKNOWN from the repository and would need to be confirmed in the Vercel dashboard.
- Wix: the docs describe a current live site that may still be on Wix, with a deliberate migration planned off Wix onto the new Vercel deployment (see `docs/12-EXISTING-INFRA-MIGRATION.md`). Whether Wix is still serving the custom domain today is UNKNOWN from the repository; it can only be confirmed from DNS and the Wix account. Treat the custom domain as still on Wix until cutover is confirmed, and do not repoint DNS as part of this audit.

---

## 3. Database and integrations

### Supabase

- The site is built to use Supabase. The dependency `@supabase/supabase-js` is in `package.json`, and `lib/supabase.ts` builds a browser client (anon key) and a server only client (service role key).
- A database migration exists at `supabase/migrations/20260910_000001_site_schema.sql`. It creates a dedicated `site` schema with tables including `site.projects`, `site.media_items`, `site.links`, `site.socials`, and `site.contact_submissions`. Per its own header comment and `docs/12-EXISTING-INFRA-MIGRATION.md`, this migration is not applied yet.
- The plan is to reuse an existing Supabase project (one Brant already has, described as connected to another agent or tool) and keep this site's tables in a separate `site` schema so they do not collide with the other tool's tables (see `docs/12-EXISTING-INFRA-MIGRATION.md`).
- The actual Supabase project reference or id: UNKNOWN. It is not committed anywhere in the repository and is listed as an open question in `docs/12-EXISTING-INFRA-MIGRATION.md`.

### Bridger share API

- A Bridger share integration for this site (using env names such as `BRIDGER_API_BASE`, `BRIDGER_SHARE_SLUG`, and `BRIDGER_SHARE_TOKEN`): NOT EVIDENCED. None of these variable names appear in `.env.example`, in any code under `lib/`, `app/`, or `components/`, or anywhere else in this repository. There is no Bridger client or fetch code. Status is UNKNOWN or not yet built. Do not assume these variables are configured.

### Other integrations (scaffolded, not wired)

- CRM and Uspot: contact and chat leads are meant to be pushed to a personal CRM or Uspot via a webhook. Today `lib/integrations/crm.ts` only exposes a stub connector that reports "not configured yet," and `.env.example` lists the target URLs as optional placeholders (see below).
- GitHub: `lib/integrations/github.ts` and a `GITHUB_TOKEN` placeholder exist for pulling repo metadata onto the Projects section later.
- Analytics: GA4 and a pixel style tag are planned and gated behind env vars and feature flags (see `docs/06-ANALYTICS-INTEGRATIONS.md`). Not wired yet.
- AI chatbot: `lib/ai/` holds stubs for retrieval, prompt assembly, and generation. The model provider is chosen via env vars but no provider is wired yet.

---

## 4. Domains

- **brantsjohnson.com** is the primary custom domain for this personal site. Whether it currently points at Wix or at Vercel is UNKNOWN from the repository (see section 2). The intended end state is that it points at the Vercel deployment after the Wix migration and redirects are verified.
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

Bridger share variables (`BRIDGER_API_BASE`, `BRIDGER_SHARE_SLUG`, `BRIDGER_SHARE_TOKEN`): not present in `.env.example` or anywhere else in this repository. Status UNKNOWN or not yet added.

For reference only, the separate BrantChat app declares its own environment names in `BrantChat/config.example.env`: `OPENAI_API_KEY`, `JWT_SECRET`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY`. These belong to BrantChat, not to this site.

---

## 7. Summary table

| Area | Confirmed from repo | Status |
|---|---|---|
| Framework | Next.js 14 App Router, TypeScript, Tailwind | Confirmed (`package.json`) |
| Host | Vercel intended; project name `brantsjohnson-com` matches `package.json` | Intended; project link UNKNOWN (no committed `.vercel/`) |
| Current live site | Possibly Wix, migration planned | UNKNOWN if still live; do not repoint DNS |
| Database | Supabase, `site` schema migration exists, not applied | Project ref UNKNOWN |
| Bridger share API | No env vars, no client code | Not evidenced / UNKNOWN |
| Primary domain | brantsjohnson.com | Target points to Vercel post migration; current pointer UNKNOWN |
| www | none in repo | UNKNOWN |
| brantchat subdomain | brantchat.brantsjohnson.com, separate BrantChat deploy | Leave alone |
| Deploy path | Vercel git integration via GitHub remote | Intended; dashboard config UNKNOWN |
| CI in repo | none (no `.github/`, no `vercel.json`) | Confirmed absent |

---

## 8. How to confirm the UNKNOWN items later

When someone has dashboard access, these are the specific things to verify and then update in this document:

1. In Vercel, confirm the project named `brantsjohnson-com` is linked to `github.com/brantsjohnson/brantsjohnson.com`, and record the production branch and any build overrides.
2. In DNS and Vercel domains, confirm what `brantsjohnson.com` and `www.brantsjohnson.com` currently point at, and whether Wix is still serving either.
3. In Supabase, record the project reference this site will reuse and confirm the `site` schema separation.
4. If a Bridger share integration is added, add `BRIDGER_API_BASE`, `BRIDGER_SHARE_SLUG`, and `BRIDGER_SHARE_TOKEN` to `.env.example` and document them here.
