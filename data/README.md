# data

Local reference data for the site.

- `brant-knowledge.json` is the chatbot's source of truth. It holds the facts about Brant (resume-style content, no secrets) that the `/chat` assistant is allowed to use. To update what the chatbot knows, edit this file and open a pull request. `lib/ai/knowledge-base.ts` reads it.

Do not commit secrets or private credentials here. If a future version moves this content into Supabase (`site.knowledge_base`) with row-level security, keep the same rule: no secrets in the repo.
