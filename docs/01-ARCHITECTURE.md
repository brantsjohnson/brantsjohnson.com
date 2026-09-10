# 01. Architecture & Repository Map

**Plain English purpose:** This is the single source of truth for where things live in the codebase and how they connect. If you (human or agent) are ever unsure where a new file belongs, this doc decides it. Nothing gets placed "wherever's convenient."

---

## 1. Top-level structure

```
/
├── docs/                    # This documentation set. Human + agent readable. Not shipped to the site.
│   └── inbox/               # Grok Bot drops feature/content requests here for Cursor to pick up.
├── app/                     # Next.js App Router. Every route the site has lives here.
│   ├── (marketing)/         # Public-facing pages: home, about, projects, media, contact.
│   ├── (chatbot)/           # The AI chatbot experience (widget entry + its dedicated API route).
│   ├── admin/               # Password/auth-protected admin portal. Never indexed, never public.
│   └── api/                 # Server routes: chatbot, contact form, CRM webhook, analytics helpers.
├── components/
│   ├── ui/                  # Small, dumb, reusable primitives (Button, Input, Card, Badge...).
│   ├── sections/             # Page-level building blocks (Hero, ProjectGrid, AboutBlock, ContactForm).
│   ├── motion/               # Reusable animation wrappers (FadeInOnScroll, GlassPanel, Parallax...).
│   └── chatbot/               # The chat widget UI itself, separate from its backend logic.
├── lib/
│   ├── ai/                   # Chatbot logic: retrieval, prompt assembly, model calls.
│   ├── cms/                   # Functions that fetch content (projects, media, links) from the database.
│   ├── integrations/           # CRM connector(s), GitHub connector, analytics helpers, social post drafting.
│   └── utils/                  # Small shared helpers (formatting, validation) with no feature-specific logic.
├── content/                   # Static/structured content that is not user-editable at runtime (bio copy, legal pages) as MDX or JSON.
├── data/                      # Local reference data + the schema for the private chatbot knowledge base. No secrets committed here; actual private data lives in Supabase, not in the repo.
├── public/                    # Static public assets: favicon, og-image, fonts, anything that must be a literal file.
├── styles/                    # Design tokens (colors, type scale, spacing, motion timing) and Tailwind config.
└── supabase/                  # Database schema, migrations, and row-level security policies.
```

---

## 2. Why it's organized this way

- **`(marketing)` vs `admin` vs `api` route groups** keep public pages, the protected admin tool, and server-only logic from ever getting tangled. A Cursor agent working on the admin portal should never accidentally touch public page code, and vice versa.
- **`components/ui` vs `components/sections`** separates "dumb, reusable pieces" from "opinionated, page-specific arrangements of those pieces." If a component only ever appears once, it's a section. If it could appear anywhere, it's a ui primitive.
- **`components/motion`** exists so every scroll reveal, hover, and transition on the site comes from the same small set of wrappers, not one-off animation code scattered everywhere. This is what keeps the site feeling consistent ("like Apple made it") instead of like ten different people animated ten different pages.
- **`lib/ai` vs `data`**: `lib/ai` is code (how retrieval works). `data`/Supabase is content (what gets retrieved). Keeping logic and knowledge separate means the private dataset can be updated constantly without ever touching code.
- **`supabase/`** holds the database's structure as version-controlled files, so the schema is reviewable and reproducible, not just a bunch of tables someone clicked into existence in a dashboard.

---

## 3. Data flow, end to end

### Public page render
`app/(marketing)/[page]` → calls a function in `lib/cms/` → which queries Supabase (public tables only) → returns content → rendered through `components/sections/*` → wrapped in `components/motion/*` for reveals.

### Chatbot question
Visitor types a question in `components/chatbot/ChatWidget` → POSTs to `app/api/chatbot/route.ts` → that route calls `lib/ai/retrieve.ts` (searches both public content and the private dataset in Supabase, private data server-side only) → assembles context → calls the model → streams the answer back. **The private dataset is never sent to the browser; only the model's final answer is.**

### Contact form
Visitor submits `components/sections/ContactForm` → POSTs to `app/api/contact/route.ts` → writes to Supabase `contact_submissions` table → fires a webhook to `lib/integrations/crm.ts`, which pushes the lead to your personal CRM or Uspot (whichever is toggled on in the admin portal, see `07-FEATURES-ADMIN-CMS.md`).

### Admin edits
You log into `app/admin` → edit content, toggle features, manage media → writes go straight to Supabase → public pages reflect the change on next load (no rebuild needed, since content is data, not hardcoded).

### Grok Bot's loop
Runs outside the Next.js app, on a schedule → reads the public site + Supabase content tables → updates structured data / knowledge base entries → drafts social posts into a review queue in the admin portal → optionally auto-publishes if you've turned that on per channel.

---

## 4. Adding something new: the decision rule

Before creating a file, ask:

1. **Is it a route (a page a visitor navigates to)?** → `app/`, in the correct route group.
2. **Is it UI that renders content?** → Is it reusable across pages (`components/ui`) or specific to one page's layout (`components/sections`)?
3. **Is it animation behavior?** → `components/motion`, and it should be a wrapper other components use, not custom animation logic pasted into a section.
4. **Is it logic with no UI (fetching, formatting, calling an API)?** → `lib/`, in the subfolder matching what it talks to.
5. **Is it content/copy, not code?** → `content/` if static, Supabase (via the admin portal) if it should be editable without a code change.
6. **Does it touch the database structure?** → `supabase/migrations/`.

If none of these fit cleanly, stop and add a note to `docs/inbox/` rather than guessing.

---

## 5. Naming conventions

- Folders: lowercase, kebab-case (`project-grid`, not `ProjectGrid`).
- Component files: PascalCase matching the component (`ProjectGrid.tsx`).
- Route folders: lowercase, matching the URL exactly.
- One component per file. If a section needs sub-pieces, they live in a folder named after the section (`components/sections/ProjectGrid/index.tsx`, `ProjectCard.tsx`).
