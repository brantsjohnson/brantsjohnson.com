# content/posts

One markdown file per post written on this site. The file name is the address: `crew-onboarding.md` becomes `brantsjohnson.com/writing/crew-onboarding`. Lowercase words joined by hyphens.

Posts are **unlisted until their release day, then listed automatically**. See `docs/PUBLISHING.md`, section "Pre-write posts and release one a day". Do not add sample or placeholder posts here. This folder is empty until a real post exists.

## Template

```
---
title: "Exactly the title you want shown"
summary: "One plain sentence, 200 characters or fewer. Used in lists, search results, share previews and the feed."
releaseDate: 2026-11-10
written: 2026-11-03
tags: [crew, product, onboarding]
about: [work/crew]
cover: /images/brant-uploads/general/crew-team-photo.webp
coverAlt: "The Crew team piled onto a yellow couch."
substackUrl: https://brantsjohnson.substack.com/p/your-post
draft: false
---

The body, in markdown. First person, plain and warm.

## A heading

Paragraphs, **bold**, *italic*, [links](/work/crew), lists, > quotes, and pictures on their own line.
```

### Fields

| Field | Required | What it does |
|---|---|---|
| `title` | yes | The page heading and the title everywhere else. |
| `summary` | yes | One sentence. 200 characters or fewer. |
| `releaseDate` | yes | `YYYY-MM-DD` (Denver time). Before this day the post is **unlisted**. From this day it is **listed**. |
| `written` | no | `YYYY-MM-DD`. The day the post was added. Defaults to `releaseDate`. Cannot be later than it. |
| `tags` | no | Topics, as `[a, b]`. They go into search data. |
| `about` | no | Pages it relates to, as `[work/crew]`. Must be real pages. |
| `cover`, `coverAlt` | no | A picture under `public/` and a short description. Used for the share preview. |
| `substackUrl` | no | Set it once the post is also on Substack. The site then shows its own version once. |
| `draft` | no | `true` = not available at all (404, not in the sitemap). Use while still writing. |

Run `npm test` after adding a file. It names every mistake.
