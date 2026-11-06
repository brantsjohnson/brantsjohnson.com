# brantsjohnson.com

Personal site for Brant S. Johnson.

## What this is right now

The public site is a multi-page Next.js app. How to change a page, an article, the chat, spacing, a header, a slug, or an analytics name is in `docs/SITE-UPDATE-GUIDE.md`.

- Menu: Home, About, Experience, Events, Leadership, Articles. Contact is a page, not a menu item.
- Addresses stay `/work` for Experience, `/community` for Leadership, and `/articles` for the article list.
- Ask about me answers from `content/about-brant.md` and `content/about-me.md`. It does not use `data/brant-knowledge.json`.

Unconfirmed claims are listed in `VERIFY.md`, not printed as fact. Open follow-ups are in `ops/DECISIONS-NEEDED.md`.

## Quick start

```bash
cd brantsjohnson.com
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Docs

Start with `docs/SITE-UPDATE-GUIDE.md` when you are changing the site. Publishing fields are in `docs/PUBLISHING.md`. Facts and voice are in `CLAUDE.md` and `docs/about-brant.md`.

## Chat

Ask about me is the public assistant. Its facts are `content/about-brant.md` and `content/about-me.md`. Listed articles are added on their own. How to update it is in `docs/SITE-UPDATE-GUIDE.md`.
