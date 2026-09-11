# lib/ai

Server-side chatbot logic. Used only by API routes; never import these modules into client components.

- `knowledge-base.ts` loads the facts about Brant from `data/brant-knowledge.json` and turns them into plain text. Update Brant's info by editing that JSON file.
- `prompt.ts` builds the chatbot's standing instructions (system prompt): the grounding rules plus the knowledge text, with optional company/role context.

The model call itself lives in `app/api/chatbot/route.ts`, which streams the answer back. The chatbot may only answer using the knowledge base text, so private facts never depend on a hidden hardcoded string here.
