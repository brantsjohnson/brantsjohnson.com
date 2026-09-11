# brantsjohnson.com

Personal site for Brant S. Johnson.

## What this is right now

Foundation only, matching `docs/01-ARCHITECTURE.md`:

- Next.js 14 App Router + TypeScript + Tailwind
- Route stubs for marketing sections, admin portal, and API endpoints
- `lib/` for AI (chatbot), CMS, and integrations
- Design token placeholders in `styles/tokens.css`
- Initial Supabase `site` schema migration (not applied yet)
- Integrated chatbot at `/chat` (see `docs/15-CHAT-INTEGRATION.md`)

No full brand polish or marketing content yet.

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

## Chat (BrantChat)

The BrantChat app has been integrated into this site. The chat now lives at `/chat` (and `/chat/[company]` for employer-tailored links), streams answers from `app/api/chatbot`, and is grounded in `data/brant-knowledge.json`. See `docs/15-CHAT-INTEGRATION.md` for how it is wired and the required environment variables.
