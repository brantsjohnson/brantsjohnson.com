# data

Local reference data for the site.

- `brant-knowledge.json` is an older facts file. The public Ask about me assistant does not read it. To change what the chat can say, edit `content/about-brant.md` or `content/about-me.md`. See `docs/SITE-UPDATE-GUIDE.md`.

Do not commit secrets or private credentials here. If a future version moves this content into Supabase (`site.knowledge_base`) with row-level security, keep the same rule: no secrets in the repo.
