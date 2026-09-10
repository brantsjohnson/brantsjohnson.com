# brantsjohnson.com

Personal site for Brant S. Johnson.

## What this is right now

Foundation only, matching `docs/01-ARCHITECTURE.md`:

- Next.js 14 App Router + TypeScript + Tailwind
- Route stubs for marketing sections, admin portal, and API endpoints
- `lib/` stubs for AI, CMS, and integrations
- Design token placeholders in `styles/tokens.css`
- Initial Supabase `site` schema migration (not applied yet)
- `BrantChat/` kept as a sibling reference for later chatbot integration

No real UI, brand polish, or content yet.

## Quick start

```bash
cd brantsjohnson.com
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Docs

Start with `docs/00-MASTER-README.md`. Before connecting Supabase, fill in the open questions in `docs/12-EXISTING-INFRA-MIGRATION.md`.

## BrantChat

The existing BrantChat app lives in `BrantChat/` and is excluded from this Next.js build. It stays untouched until we integrate the chatbot into this site.
