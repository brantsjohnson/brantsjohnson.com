# 15. Chat Integration (BrantChat)

**Plain English purpose:** This explains how the chatbot is wired into the main site after integrating the old standalone `BrantChat` app, and lists the environment variables CoS needs to set in Vercel. It follows the architecture in `docs/01` and the security rules in `docs/11`.

---

## 1. What changed

The in-site chat is now wired into the main site so the marketing pages can use it directly, and it reuses BrantChat's existing brain (knowledge base + system prompt) rather than a new one. The original `BrantChat/` app is **kept in the repo and stays live** at `brantchat.brantsjohnson.com` as its own deployment (embed/link alias). The root build ignores the `BrantChat/` folder (webpack watch-ignore + tsconfig exclude), so the two do not interfere.

- **In-site bubble (primary UX):** `components/chatbot/ChatLauncher.tsx` is a floating chat button mounted in the marketing layout, so chat is available on every public page including the apex/home. It opens `components/chatbot/ChatWidget.tsx`.
- **Chat page:** `app/(chatbot)/chat/page.tsx` renders at `/chat` (also used by the subdomain alias).
- **Company links:** `app/(chatbot)/chat/[company]/page.tsx` renders at `/chat/<company>` (for example `/chat/google`) and tailors answers to that employer. The company name is used only as light context; there is no access code and no separate jobs database.
- **Server endpoint (shared API):** `app/api/chatbot/route.ts` streams the answer using the AI SDK.
- **Shared brain:** `lib/ai/knowledge-base.ts` is BrantChat's own knowledge-base serialization ported verbatim; `lib/ai/prompt.ts` is BrantChat's own system prompt ported. Both are `server-only`, so the knowledge base never ships to the browser. `data/brant-knowledge.json` is the source of truth for the in-site chat (the standalone app keeps its own copy at `BrantChat/data/`).
- **Home entry:** the home page also has a "Chat with BrantChat" button to `/chat`.
- **Subdomain alias:** `middleware.ts` rewrites the historical host `brantchat.brantsjohnson.com` root to `/chat`. This does **not** change DNS; it only takes effect if/when CoS points that subdomain at this Vercel project (see §5). Until then, the subdomain keeps serving the standalone `BrantChat/` deployment.

## 2. How a question flows

1. Visitor types in `ChatWidget` and it POSTs the conversation to `/api/chatbot` (with optional `company`/`role`).
2. The route checks the rate limit, validates length, builds the grounded system prompt from the knowledge base, and calls the model with `streamText`.
3. The answer streams back to the browser word by word. Private facts stay on the server; only the visitor's questions go up and the model's answer comes back.

## 3. Cost and safety controls

All in `app/api/chatbot/route.ts` and `lib/utils/rate-limit.ts`:

- **Grounded answers only:** the system prompt allows only facts from the knowledge base and forbids fabrication.
- **Rate limit:** 20 messages per visitor IP per minute (best-effort, in-memory). Swap for a shared store (e.g. Upstash Redis) for a hard guarantee across serverless instances.
- **Input cap:** a single question over 4000 characters is rejected; only the last 20 turns are sent to the model.
- **Output cap:** answers are capped at 800 output tokens.
- **Graceful config check:** if `OPENAI_API_KEY` is missing, the route returns a clear 503 instead of a confusing model error.

## 4. Updating what the chatbot knows

Edit `data/brant-knowledge.json` and open a pull request; `lib/ai/knowledge-base.ts` reads it. No secrets live in that file. The standalone BrantChat app keeps its own copy at `BrantChat/data/brant-knowledge.json`; keep the two in sync when facts change (they are separate deployments). A future step could make both read a single shared source. (No new admin editor ships in this pass; a future admin could edit this behind env-based auth per `docs/11`, since serverless file writes do not persist.)

## 5. Environment variables CoS must set in Vercel

For the `brantsjohnson-com` project (names only, no values in the repo):

| Variable | Required? | What it is |
| --- | --- | --- |
| `OPENAI_API_KEY` | **Required** | OpenAI key for the chat model. Must belong to the account that owns Brant's fine-tuned model. |
| `AI_MODEL` | Optional | Overrides the model id. Defaults to Brant's fine-tuned model `ft:gpt-4o-mini-...:brantchat-trained:...`. Set to a base model (e.g. `gpt-4o-mini`) if the key does not have access to the fine-tune. |

Not required for chat, but present in `.env.example` for other/site features: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, analytics ids, and admin auth (`ADMIN_PASSWORD_HASH`, `JWT_SECRET`).

### Env vars for the separate BrantChat subdomain deployment

The `brantchat.brantsjohnson.com` app is its own Vercel project and keeps its own env vars (names only, values in that project's settings): `OPENAI_API_KEY`, `JWT_SECRET`, Supabase (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`) for its chat logging and job questions, and optionally `KV_REST_API_URL` / `KV_REST_API_TOKEN` so admin-edited job roles persist across deploys. The apex `/chat` does not use these.

### DNS / subdomain alias (handled separately by CoS, not in this PR)

- To make `brantchat.brantsjohnson.com` show the chat: add that domain to the `brantsjohnson-com` Vercel project and point its DNS there. The middleware alias then rewrites its home to `/chat`. No DNS is changed by this repo.
