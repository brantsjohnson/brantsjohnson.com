# 04. AI Agent Instructions (Cursor + Grok Bot)

**Plain English purpose:** This doc tells any AI agent working on this codebase exactly how to comment code, how to structure explanations, and how Cursor and Grok Bot divide responsibility. Follow this literally. It is not a style suggestion, it's how this repo stays understandable to a human skimming it a year from now.

---

## 1. The three-tier commenting rule

The founder is non-technical and will read the code. Comments must be plain English a kindergartener could follow. Put technical words in parentheses when you need them. Say what and why, not how clever the code is. Keep comments updated when code changes; a stale comment is worse than none.

Every file follows this structure, no exceptions:

### Tier 1: Folder level
Every folder that contains more than one file gets a `README.md` (or a top comment in the single index file) with 2 to 4 plain-English sentences: what this folder is, what it's responsible for, and what it is *not* responsible for. Example for `components/motion/`:

> This folder holds every scroll and hover animation used on the site. If you want something to move when it appears, wrap it in one of these components rather than writing new animation code. This folder does not contain any content or layout logic, only motion behavior.

### Tier 2: File header (required on every code file)
Every file starts with this exact header shape. Explain what the file is for in everyday words. Mention what it is *not* for if that avoids confusion.

```ts
// ============================================
// WHAT THIS FILE DOES (plain English):
// This is the Contact page. Right now it is only a placeholder
// so the website knows this URL exists. Later we add the form
// and social links (they talk to the CMS and API).
// ============================================
```

### Tier 3: Section breaks (required at every meaningful break)
Before every major chunk of code (imports that matter, security checks, the main UI, a send/save step, a helper), add one simple sentence that introduces what comes next. Prefer this label:

```ts
// THIS SECTION DOES: check that only signed-in people can open admin pages
```

For load-bearing bits, also tag them so they are easy to find later:

```ts
// --- SECURITY: only signed-in users can change this ---
// --- PRIVACY: private chatbot notes never go to the browser ---
// --- PAYMENT: charge happens only after the user confirms ---
// --- ACCESSIBILITY: button stays usable with keyboard and screen readers ---
```

Comments say what and why ("this checks you can only see fields shared with your tier"), not just restating the next line of code.

### Tier 4: Line level
For any line that sets a specific value, style, size, color, or behavior that isn't obvious from the name, add a short inline comment in plain terms:

```ts
const cardRadius = "20px"; // how round the glass panel corners are
const heroFadeDuration = 500; // how long the fade-in takes, in milliseconds
```

You don't need a comment on every trivial line inside an obvious loop, but anything a non-engineer might wonder about gets one.

**Test to apply:** could someone with no coding background open this file, read only the comments, and describe what the file does and roughly what would happen if a specific value changed? If not, add more comments.

---

## 2. Before writing any code

1. Check `01-ARCHITECTURE.md` for where the file belongs.
2. Check `02-BRAND-DESIGN-SYSTEM.md` if it touches UI.
3. Check `03-CONTENT-VOICE-GUIDELINES.md` if it touches copy.
4. Check `07-FEATURES-ADMIN-CMS.md` if it touches data, content types, or the admin portal.

---

## 3. Cursor's operating rules

- Cursor writes and edits code. It does not decide product scope on its own; scope decisions come from the human or from a request Grok Bot has dropped in `docs/inbox/` and the human has approved.
- Every new component gets the file header (`WHAT THIS FILE DOES`) and section comments (`THIS SECTION DOES`) before it's considered done, not as a follow-up task.
- Cursor never hardcodes design values (colors, spacing, type sizes) that already exist as tokens in `styles/tokens.css`. If a new value is genuinely needed, it's added to the tokens file first, with a comment explaining what it's for.
- Cursor never writes final public-facing copy without applying `03-CONTENT-VOICE-GUIDELINES.md`, including the no-dashes rule.
- Cursor never touches the private dataset schema without updating `supabase/migrations/` and noting the change in `07-FEATURES-ADMIN-CMS.md`.

---

## 4. Grok Bot's operating rules

- Grok Bot does not write or edit application code. Its outputs are: (a) updated content/metadata in Supabase, (b) drafted social posts in the review queue, (c) plain-English requests dropped into `docs/inbox/`.
- Grok Bot reads the public site and the content tables in Supabase. It does not read the private chatbot knowledge base unless a task specifically calls for it (e.g. drafting content from an internal note that's been flagged "ready to consider publishing"), and never exposes private data publicly.
- Grok Bot's SEO/GEO updates (structured data, meta descriptions, FAQ content for AI answer engines) follow `05-SEO-GEO-AI-SEARCH-STRATEGY.md` exactly. It doesn't invent its own optimization tactics ad hoc.
- Social drafts follow `03-CONTENT-VOICE-GUIDELINES.md` (yes, this applies to social copy too, not just the site).
- Auto-publish to a given social channel only happens if that channel's auto-publish toggle is on in the admin portal (see `07-FEATURES-ADMIN-CMS.md` §5). Default is off; drafts sit in a review queue.

---

## 5. The inbox handoff format

When Grok Bot (or a human) wants Cursor to build something new, it's written as a file in `docs/inbox/` named `YYYY-MM-DD-short-title.md`, containing:

```
## What's needed
(plain English, 2 to 4 sentences)

## Why
(what this solves or enables)

## Where it likely fits
(reference the relevant section of 01-ARCHITECTURE.md if known)

## Done when
(a plain description of what "finished" looks like)
```

Cursor picks up files from `docs/inbox/`, builds them, and moves the file to `docs/inbox/done/` once complete, leaving a one-line note of what changed.
