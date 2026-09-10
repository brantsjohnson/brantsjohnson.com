# 11. Chatbot Instructions Management & Security

**Plain English purpose:** This doc covers two things that have to be handled together: how the chatbot's own instructions (its system prompt/behavior rules) get stored and edited, and how the whole site is kept genuinely hard to break into. The chatbot's instructions are powerful (they shape what it says and how it searches), so they need to be easy for you to adjust but not exposed or editable by just anyone.

---

## 1. Where the chatbot's instructions live

- The chatbot's system prompt and retrieval behavior rules live in a dedicated table, `agent_instructions`, in Supabase, not hardcoded as a plain string in a public repo file. Storing it in the repo as a plain committed file would mean anyone with read access to the repo (or a public GitHub repo, if it's ever made public) could read exactly how to manipulate the bot.
- Each row: `version`, `content` (the instruction text), `updated_by` (`human`, `cursor`, or `grok_bot`), `updated_at`, `is_active`. Old versions are kept, not overwritten, so you always have a rollback path, this is the "history" version of the earlier `content_revisions` idea, applied to the agent itself.
- The **active version** is what `app/api/chatbot/route.ts` loads at request time, server-side only.

## 2. Who can change it, and how

- **You**: through a dedicated, clearly separated section of the admin portal (not the general content editor), gated behind the same auth as the rest of `/admin` plus, ideally, a second confirmation step given how consequential this is.
- **Cursor**: can propose changes to the instruction set as part of a coding task (e.g. "improve how it cites sources"), but writes them as a new, inactive version for you to review and activate, never auto-activates a change to a live system prompt.
- **Grok Bot**: can propose refinements based on what it's observed (e.g. "visitors keep asking about X and the bot isn't finding it," derived from the topic-level analytics in `06-ANALYTICS-INTEGRATIONS.md`, never from reading private conversation content it shouldn't), same rule, proposes a new inactive version, doesn't self-activate.
- This means every actual change to how the chatbot behaves has a clear author, a clear version history, and requires your review before going live, "adjustable by Cursor, Grok Bot, or me" and "not easily accessible" both hold at once.

## 3. Retrieval quality: finding the non-obvious but relevant answer

Per your requirement that the bot surface information that's useful but not the most obvious match:

- Retrieval (`lib/ai/retrieve.ts`) should not rely on simple keyword matching alone. Use embeddings-based semantic search over both public content and the private `knowledge_base` (Supabase's `pgvector` extension is the natural fit here, keeps everything in one database rather than adding a separate vector store).
- Pull a slightly wider net than the single "best" match (e.g. top 5 to 8 relevant chunks across content types) before composing the answer, so the model has room to connect a question to a less obvious but genuinely relevant piece of content, rather than only ever surfacing the single most literal match.
- Log (in aggregate, topic-level only, not raw private content) which questions retrieval struggled to answer well. Grok Bot uses this to suggest new `knowledge_base` entries. This is the practical version of "machine learning adjusting the agent," the system observes real questions and improves its own source material and instructions over time, always through the reviewed-version process in §2, not silently.

## 4. Security and privacy checklist

- **Admin auth**: strong password plus 2FA at minimum; consider passkey/WebAuthn if your auth provider supports it. Single user, but still hardened, this is the master key to your whole content and instruction set.
- **Environment variables and secrets**: all API keys, database credentials, and webhook secrets live in environment variables (Vercel's encrypted env storage), never committed to the repo, never hardcoded.
- **Row-level security everywhere**: Supabase RLS policies enforced on every table, especially `knowledge_base`, `agent_instructions`, `contact_submissions`, `feature_flags`. Public tables get explicit read-only policies for anonymous users; everything else denies by default.
- **Rate limiting**: on `app/api/chatbot`, `app/api/contact`, and any other public-facing API route, to prevent abuse and cost blowouts.
- **Input sanitization**: every form and chatbot input sanitized server-side before it touches the database or gets passed to a model call.
- **Dependency hygiene**: automated dependency update checks (Dependabot or similar) so known vulnerabilities in packages get caught.
- **Audit trail**: every write to `agent_instructions` and `feature_flags` logged with who/when/what changed, visible in the admin portal.
- **No secrets or private data in client-side code, ever**: this is a repeat of `07-FEATURES-ADMIN-CMS.md` §3, worth repeating here because it's the single most important rule in this whole document.
- **Backups**: Supabase automatic backups enabled, and you know how to restore from one before you need to.

## 5. What "not hackable" actually means in practice

No public site connected to a database is literally unhackable, so the honest goal is: no secrets exposed client-side, every table locked down by RLS by default, every admin action authenticated and logged, every public API route rate-limited, and dependencies kept current. That combination is what a genuinely well-secured small personal site looks like, and it's achievable with the stack already chosen.
