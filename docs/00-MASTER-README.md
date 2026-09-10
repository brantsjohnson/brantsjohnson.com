# 00. Master Guide — Read This First

**Plain English purpose:** This file is the map to every other document in `/docs`. Any human or AI agent (Cursor, Grok Bot, or a future contributor) should read this file before touching code. It explains what each doc governs, in what order to consult them, and how the two AI agents working on this project relate to each other.

---

## 1. How to use this documentation set

Every document in this folder governs one layer of the project. When you are about to do a task, find the matching doc and follow it. Do not improvise on things these docs already decide.

| Doc | Governs | Read when you are... |
|---|---|---|
| `01-ARCHITECTURE.md` | Folder structure, tech stack, data flow, how pieces connect | Adding a file, deciding where new code lives, wiring a new feature |
| `02-BRAND-DESIGN-SYSTEM.md` | Colors, type scale, spacing, motion rules, the "glass / Apple" feel | Building or styling any UI |
| `03-CONTENT-VOICE-GUIDELINES.md` | Wording, tone, no-redundancy rule, the no-dashes rule | Writing any copy, label, button text, or error message |
| `04-AI-AGENT-INSTRUCTIONS.md` | Code comment format, Cursor's operating rules, Grok Bot's role and how it and Cursor divide labor | Writing code, or configuring either agent |
| `05-SEO-GEO-AI-SEARCH-STRATEGY.md` | SEO, structured data, and being legible to AI answer engines (ChatGPT, Gemini, Claude, Grok) | Publishing any page, writing metadata, adding content |
| `06-ANALYTICS-INTEGRATIONS.md` | Tracking, GA4/pixel, what events to fire | Adding a button, page, or conversion point |
| `07-FEATURES-ADMIN-CMS.md` | Data model, content types (photos/audio/video/podcasts/links), admin portal, feature flags, CRM + GitHub integrations | Building the backend, the chatbot's knowledge base, or the admin panel |
| `08-CONTENT-SECTIONS-SITEMAP.md` | The actual site sections (About, Projects, Blog, Poetry, Photography, Civic Engagement, Contact), how they're framed, URL structure | Building or writing for a specific section, especially Civic Engagement, read the framing note first |
| `09-NAMING-TRACKING-TAXONOMY.md` | The naming system for every button/element so analytics can tell identical vs. similar elements apart across pages | Building any interactive component |
| `10-VERSIONING-MEDIA-METADATA.md` | Content edit history, the biographical timeline feature, and photo/media tagging best practices | Building the timeline component, media uploads, or anything history-related |
| `11-AI-AGENT-CONFIG-SECURITY.md` | How the chatbot's own instructions are stored, versioned, and edited, plus the full security/privacy checklist | Touching chatbot behavior, auth, or anything security-related |
| `12-EXISTING-INFRA-MIGRATION.md` | Reusing the existing Supabase project, migrating off Wix | Before the first line of infrastructure code is written |
| `13-JOB-APPLICATION-ASSISTANT.md` | The admin-only tool that drafts a tailored resume/cover letter via Claude from a pasted job posting | Building or touching the job assistant tool |
| `14-UIUX-RESEARCH-BEST-PRACTICES.md` | The full research-backed UI/UX standards document (breakpoints, type scale, spacing, motion timing, accessibility, navigation logic), with citations | Building or reviewing any UI, alongside `02` and `09` |

Read `01`, `04`, `12`, and `14` fully before writing any code. The rest can be consulted as needed.

---

## 2. The two agents and how they relate

This project is maintained by **two AI agents with different jobs.** They must never duplicate or fight over each other's role.

### Cursor (the builder)
- Lives inside the codebase.
- Writes, edits, and refactors code.
- Follows `01-ARCHITECTURE.md` for where things go and `04-AI-AGENT-INSTRUCTIONS.md` for how to comment and structure code.
- Never writes final on-site copy from scratch without checking `03-CONTENT-VOICE-GUIDELINES.md`.
- Does not publish content or post to social media.

### Grok Bot (the maintainer / growth agent)
- Runs on a schedule or on trigger, largely from the backend, not inside the IDE.
- Job 1 — **Keep the site's AI-legibility current.** Re-crawls the public site, updates structured data and the AI knowledge base described in `07-FEATURES-ADMIN-CMS.md`, and keeps `05-SEO-GEO-AI-SEARCH-STRATEGY.md` targets fresh (new projects, new pages, updated bio facts).
- Job 2 — **Surface content for social.** Pulls from the site's own content (published projects, posts, the "not-yet-published but flagged for later" media described in `07`) to draft social posts. It drafts; it does not auto-publish unless the human explicitly turns on auto-publish for a given channel in the admin portal.
- Job 3 — **Health checks.** Flags broken links, stale metadata, missing alt text, orphaned pages, and outdated project statuses.
- Does not write application code. If Grok Bot finds something that needs a code change (a bug, a missing field), it opens a written task/ticket describing the problem in plain English — it does not touch the codebase directly.

### The handoff rule
If Grok Bot identifies a structural need (new content type, new field, new page template), it writes the request as a plain-English spec and drops it in `/docs/inbox/` (see `04-AI-AGENT-INSTRUCTIONS.md` §5). Cursor picks that up as its next task. This keeps "who decides what to build" (human, via reviewing Grok Bot's requests) separate from "who builds it" (Cursor).

---

## 3. Non-negotiables (apply everywhere, no exceptions)

These are repeated in the relevant docs too, but they are absolute across the whole project:

1. **No dashes (—, –, or even a plain hyphen used as punctuation) anywhere in on-site copy.** Rewrite the sentence instead. See `03-CONTENT-VOICE-GUIDELINES.md`.
2. **No redundancy.** A piece of information (a CTA, a fact, a label) appears once, in the right place, at the right size. It is never repeated smaller/quieter elsewhere "just in case."
3. **Visual design is priority.** Every UI decision defaults to the brand and motion system in `02-BRAND-DESIGN-SYSTEM.md`, not to whatever is fastest to ship.
4. **Every folder and every code file carries plain-English comments a non-technical reader can follow.** File header (`WHAT THIS FILE DOES`), section breaks (`THIS SECTION DOES`), and load-bearing labels (`SECURITY`, `PRIVACY`, etc.). No exceptions. See `04-AI-AGENT-INSTRUCTIONS.md` §1.
5. **The private backend dataset (the chatbot's non-public knowledge) is never exposed to the public site or bundled into client-side code.** See `07-FEATURES-ADMIN-CMS.md` §3.
6. **The chatbot's own instructions are never hardcoded in a plain repo file.** They're versioned in the database, editable only through the protected admin flow, with every change attributed and reviewable before it goes live. See `11-AI-AGENT-CONFIG-SECURITY.md`.
7. **Every interactive element follows the naming taxonomy before it ships**, not as an afterthought. See `09-NAMING-TRACKING-TAXONOMY.md`.

---

## 4. Assumed stack (stated so nothing is ambiguous)

- **Framework:** Next.js 14, App Router, TypeScript.
- **Styling:** Tailwind CSS + a small design-tokens layer (see `02`).
- **Motion:** Framer Motion.
- **UI primitives:** shadcn/ui, customized to the brand system, not left default.
- **Database / backend:** Supabase (Postgres + Storage + Auth) for the admin portal, media library, private chatbot knowledge base, and contact form submissions.
- **AI chatbot:** Retrieval-augmented generation over the private dataset + public content, served from a server route, never calling the model directly from the browser.
- **Hosting:** Vercel.
- **Analytics:** GA4 + a pixel-style tag slot (see `06`), optionally PostHog later.

If any of this changes, update this section first, then propagate the change to `01-ARCHITECTURE.md`.
