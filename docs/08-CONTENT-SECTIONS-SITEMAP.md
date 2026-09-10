# 08. Content Sections & Sitemap

**Plain English purpose:** This doc defines what sections the site actually has, in what order, and what each one is for. The site's overall aim: someone who has never met you should be able to land here and get an accurate, well-organized picture of who you are, the way a good Wikipedia page gives you a fast, structured, trustworthy picture of a subject. Every section below should feel like a chapter of that, not a disconnected page.

---

## 1. Top-level sections

| Section | Purpose | Notes |
|---|---|---|
| **Home** | A fast, honest overview. Who you are, what you do, what you're known for, where to go next. | Not a full biography, a doorway into one. |
| **About / Biography** | The long-form version of Home. Your background, in a clear narrative, written in your voice, structured with real headings (education, work, what drives you) so both humans and AI answer engines can extract it cleanly. | This is the page `05-SEO-GEO-AI-SEARCH-STRATEGY.md` §3 calls the primary "who is this person" source. |
| **Projects** | Technical, data-driven work. Each project: what it is, what problem it solved, your role, links (GitHub, live demo, writeup). | Pulls GitHub metadata per `07-FEATURES-ADMIN-CMS.md` §7. |
| **Blog** | Longer-form writing, your thinking, essays. | Standard `Article`/`BlogPosting` schema per `05` §2. |
| **Poetry** | Your poetry, presented as its own distinct reading experience (different pacing/typography treatment than the blog, but same design tokens). | Not mixed into the Blog feed; poetry and prose are different reading modes. |
| **Photography** | Photos you've taken, presented as a real gallery, not a grid of thumbnails with no context. | Uses the tagging/metadata system in `10-VERSIONING-MEDIA-METADATA.md`. |
| **Civic Engagement** (see §2) | How you think about civic participation and the systems of government/democracy, as an intellectual and values-driven interest, not a partisan platform. | Read §2 before building this, the framing matters. |
| **Contact** | The one place contact happens. Links to socials, the contact form. | Nothing about contact duplicated elsewhere, per `03-CONTENT-VOICE-GUIDELINES.md`. |
| **Chatbot** (persistent, not a page) | Available everywhere via the widget, answers questions about you and the site. | See `07-FEATURES-ADMIN-CMS.md` §3. |

Future/flagged-off until ready (see feature flags, `07` §5): Podcast section.

---

## 2. The Civic Engagement section, framed correctly

You were specific about this, so it's worth stating explicitly rather than leaving it to interpretation: this section is about your **intellectual interest in civic engagement and how democratic and governmental systems function**, not a page declaring political affiliations or advocating for candidates or parties.

- Frame it around: why civic participation matters to you, how you think about it in your work, and the ideas/media that shape that thinking (for example, referencing a channel like *Filibuster*, which covers how political systems and procedure work, as a resource you find valuable, not as an endorsement of a position).
- Avoid: partisan language, candidate endorsements, party affiliation statements.
- Favor: process, systems thinking, participation, the "how democracy works" angle, and how that connects to your broader interest in systems and data.
- Treat this the same as any other section for SEO/GEO purposes (§05), it should read as a clear, well-defined topic area an AI answer engine could accurately summarize as "an interest in civic systems and engagement," not something ambiguous.
- If you ever do want to state a personal position on something, that's your call to make explicitly and separately. The default for this section, absent that explicit instruction, is systems and engagement, not stance-taking.

---

## 3. Navigation structure

- Primary nav: Home, About, Projects, Blog, Poetry, Photography, Civic Engagement, Contact. (Reorder to taste, but keep it to one row, no dropdowns-within-dropdowns; if it gets crowded, group Blog/Poetry/Photography under a single "Writing & Work" or similar parent tab rather than adding visual clutter.)
- Every section is its own route under `app/(marketing)/`, per `01-ARCHITECTURE.md`.
- Every section can be hidden via its feature flag while you're populating it, so the site never shows an embarrassingly empty tab.

---

## 4. URL / slug convention

- `/about`, `/projects`, `/projects/[slug]`, `/blog`, `/blog/[slug]`, `/poetry`, `/poetry/[slug]`, `/photography`, `/photography/[collection-slug]`, `/civic-engagement`, `/contact`.
- Slugs are lowercase, kebab-case, generated from the title but editable in the admin portal (so a slug doesn't have to change if you retitle something later).
- No dates, IDs, or query strings in public URLs.
