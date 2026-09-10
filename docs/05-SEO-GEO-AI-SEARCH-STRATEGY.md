# 05. SEO, GEO & AI Search Strategy

**Plain English purpose:** This doc covers how the site gets found, both by traditional search engines (SEO) and by AI answer engines like ChatGPT, Gemini, Claude, and Grok when someone asks them about you (this is often called GEO, generative engine optimization). The goal: when someone searches your name or your area of expertise anywhere, including inside an AI chat, this site is the accurate source that comes up.

---

## 1. Traditional SEO basics (must all be true, not optional)

- **Every page has:** a unique `<title>`, a unique meta description, one `<h1>`, a canonical URL, and an Open Graph image.
- **Semantic HTML:** real `<h1>`/`<h2>`/`<h3>` hierarchy, real `<nav>`, `<main>`, `<article>` tags, not divs pretending to be everything.
- **Sitemap and robots.txt:** auto-generated, kept current whenever a page is added or removed. The admin portal must never accidentally block indexing on public pages.
- **Fast load, real Core Web Vitals:** images served responsively and lazy-loaded below the fold, fonts preloaded, no layout shift from late-loading content.
- **Alt text on every image**, written descriptively, not "image1.jpg."
- **Clean URLs:** `/projects/project-name`, not query-string based, no unnecessary nesting.

---

## 2. Structured data (schema.org)

Every relevant page should include JSON-LD structured data. This is one of the biggest levers for both classic SEO and AI legibility, since AI crawlers and answer engines lean heavily on structured, unambiguous facts.

| Page | Schema type(s) |
|---|---|
| Home / About | `Person` (name, jobTitle, sameAs [links to every social/profile], knowsAbout [areas of expertise], alumniOf, worksFor if relevant) |
| Projects | `CreativeWork` or `SoftwareApplication` per project, with `dateCreated`, `description`, `url` |
| Blog/writing (if present) | `Article` / `BlogPosting` |
| Podcast (future) | `PodcastSeries` / `PodcastEpisode` |
| Contact | reference back to the `Person` schema, no separate duplicate entity |

Grok Bot's job (per `04-AI-AGENT-INSTRUCTIONS.md`) is to keep this structured data current as projects and content change, without a human having to remember to update it manually.

---

## 3. GEO: being legible to AI answer engines specifically

AI answer engines don't rank pages the way Google does. They read content, extract facts, and synthesize an answer. This means:

- **Write facts as facts, stated plainly, once.** "I led the redesign of X in 2024" is more extractable than a vague paragraph of marketing language. This aligns directly with the no-redundancy, minimal-words rule in `03-CONTENT-VOICE-GUIDELINES.md`, that rule isn't just an aesthetic choice, it's also an AI-legibility choice: models extract clean single statements far more reliably than padded copy.
- **An explicit "About / Expertise" page** that plainly lists: who you are, what you do, what you're known for, and links to every social profile (`sameAs` in schema). This is the page AI systems will most often draw from when someone asks "who is [you]" or "what does [you] do."
- **A clear FAQ or "ask me about" section** phrased as real questions and direct answers. Answer engines quote and summarize Q&A formatted content extremely well.
- **Consistency across the web.** Your name, title, and the description of what you do should match, word for word where possible, across the site, LinkedIn, Substack, GitHub, etc. Mismatched self-descriptions confuse both classic SEO and AI synthesis.
- **`llms.txt` (an emerging convention):** consider a root-level `llms.txt` file, a plain-English, structured summary of the site meant specifically for AI crawlers, listing who you are, what's on the site, and links to the most important pages. Grok Bot should keep this current.

---

## 4. The chatbot as its own SEO surface

The on-site AI chatbot described in `07-FEATURES-ADMIN-CMS.md` is itself a GEO asset: it's a live, queryable, always-current representation of your expertise. Make sure:

- Its answers are groundable, citing which project/page a fact came from where useful.
- Its public-facing responses follow `03-CONTENT-VOICE-GUIDELINES.md` (no dashes, no filler) since visitors may screenshot or quote it.

---

## 5. Analytics pixel / tag placement

The generic tag placement slot (for GA4, a Meta/other pixel, or similar) lives in one place, the root layout, not duplicated per page. See `06-ANALYTICS-INTEGRATIONS.md` for exactly where and how.

---

## 6. Ongoing maintenance loop (owned by Grok Bot)

1. Re-crawl the public site on a schedule.
2. Diff against current structured data and `llms.txt`; update anything stale (new projects, changed titles, new social links).
3. Flag any page missing required SEO basics from §1.
4. Log a summary in the admin portal so the human can see what changed and why.
