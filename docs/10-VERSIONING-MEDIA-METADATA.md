# 10. Content Versioning, Timelines & Media Metadata

**Plain English purpose:** This doc covers two related things: (1) how the site keeps and visually displays a history of when content was written or edited, and (2) how photos and other media get tagged so they're organized, findable, and good for SEO. Both are about the site remembering and surfacing its own history accurately.

---

## 1. Content history (edit and written history)

Every content table that matters (`projects`, `blog_posts`, `poetry`, `media_items`) gets a companion history mechanism, not just a single `updated_at` timestamp.

### Data model
- Each content table has: `created_at`, `published_at` (can differ from created, if drafted earlier), `updated_at`.
- A separate `content_revisions` table logs: `content_type`, `content_id`, `changed_at`, `changed_by` (`human`, `cursor`, or `grok_bot`), and a short plain-English `change_summary` (e.g. "Added two paragraphs about the 2024 redesign," not a raw diff dump).
- This gives you a real, human-readable history per piece of content, not just a last-modified date.

### Visual timeline display
- On relevant pages (About/Biography especially, and optionally Projects), a **timeline component** (`components/sections/Timeline.tsx`) renders key dated events, chronologically, with `components/motion` reveal-on-scroll applied per item as described in `02-BRAND-DESIGN-SYSTEM.md`.
- Two distinct uses of "timeline," keep them separate in the data model:
  1. **Your biographical timeline** (career milestones, projects launched, etc.), a curated, human-edited list, not auto-generated from edit history.
  2. **Content history display** (e.g. "first written March 2024, last updated September 2026"), a small, quiet metadata line on individual posts/projects, pulled from `content_revisions`, not a separate curated list.
- Don't conflate the two. A visitor wants to see your life/career timeline as a designed feature. They only want to see "last updated" as a small trust signal on an individual piece of content.

---

## 2. Photo and media tagging: best practices

This is what makes your media library searchable by you, useful to the chatbot, and good for image SEO.

### Required fields on every `media_items` row
| Field | Purpose |
|---|---|
| `alt_text` | Required, descriptive, written for a person who can't see the image. Never "IMG_2481." |
| `title` | Short, human title for the piece itself. |
| `caption` | Optional longer context (where/when/why taken), shown publicly if relevant. |
| `tags` | An array of controlled-vocabulary tags (see below), not free-text guesses per upload. |
| `date_taken` (or `date_created` for non-photo media) | The real date the content originated, distinct from `created_at` (when it was uploaded to the system). |
| `location` (optional) | Where it was taken, if relevant and if you want it public. |
| `visibility` | `public` / `chatbot_only` / `private`, per `07-FEATURES-ADMIN-CMS.md` §1. |
| `collection` | Groups related media (a shoot, a trip, a project) so the gallery isn't just one flat feed. |

### Controlled tag taxonomy, not free text
- Maintain a fixed, admin-managed list of tags (subject, style, project association, etc.) rather than letting every upload introduce a slightly different new tag. This keeps filtering (per your "clear infrastructure for filtering information" requirement) actually useful instead of fragmented.
- Tags should cover at least: **subject matter** (portrait, landscape, event, product), **association** (which project/post/collection it belongs to, if any), and **format** (photo, audio, video, podcast).
- The admin upload form should suggest existing tags first (autocomplete against the controlled list) before allowing a genuinely new one, and a genuinely new tag should be a deliberate choice, not an accident of typing.

### Image SEO specifics
- Filenames: descriptive, kebab-case, before upload if possible (`street-photography-nyc-2024.jpg`, not `IMG_2481.jpg`).
- Every public image ships with real `alt` text (accessibility and SEO, same fix for both).
- Structured data: photo collections can use `ImageObject` / `ImageGallery` schema per `05-SEO-GEO-AI-SEARCH-STRATEGY.md` §2.
- Responsive sizes generated on upload (already required per `07-FEATURES-ADMIN-CMS.md` §4), served with correct `srcset`, so large images don't hurt load speed or Core Web Vitals.

---

## 3. Who maintains this

- You tag at upload time, assisted by autocomplete against the controlled vocabulary.
- Grok Bot may suggest tags or flag untagged/incomplete media items (missing alt text, no tags) as part of its maintenance loop (`05-SEO-GEO-AI-SEARCH-STRATEGY.md` §6), but does not invent new controlled-vocabulary tags on its own, it flags a suggestion for you to approve, keeping the taxonomy from drifting out of your control.
- Cursor builds the tagging UI and the timeline component; it does not decide the tag vocabulary itself, that's content/product judgment, yours to set.
