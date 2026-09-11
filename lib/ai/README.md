# lib/ai

Server-side chatbot logic. Used only by API routes; never import these modules into client components. Both files import `server-only`, so the private knowledge base can never end up in a browser bundle.

- `knowledge-base.ts` loads the facts from `data/brant-knowledge.json` and turns them into text. This is the same retrieval/knowledge logic the original BrantChat app uses (the shared "brain"). Update Brant's info by editing that JSON file.
- `prompt.ts` builds the chatbot's system prompt: the same behavior rules ported from BrantChat, plus the knowledge text, with optional company/role context.

The model call itself lives in `app/api/chatbot/route.ts`, which streams the answer back. This keeps the in-site chat and the standalone BrantChat app answering with the same brain.
