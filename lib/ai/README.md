# lib/ai

Server-side chatbot logic. Used only by API routes; never import these modules into client components. Both files import `server-only`, so the private knowledge base can never end up in a browser bundle.

- `knowledge-base.ts` loads the public facts from `content/about-brant.md` and `content/about-me.md`, then adds listed articles. Do not update the public chat by editing `data/brant-knowledge.json`. That file is not the public answer source. See `docs/SITE-UPDATE-GUIDE.md`.
- `prompt.ts` builds the Ask about me instructions from those notes, with optional company or role context.

The model call lives in `app/api/chatbot/route.ts`. The public facts it may use are the two notes files above, not the standalone BrantChat app.
