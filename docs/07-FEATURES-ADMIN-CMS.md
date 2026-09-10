# 07. Content Model, Admin Portal & Integrations

**Plain English purpose:** This doc defines every content type the site stores (projects, photos, audio, video, podcasts, links), how the private chatbot dataset stays separate from public content, how the admin portal controls all of it, and how outside systems (CRM, GitHub, social) connect in.

---

## 1. Content types (Supabase tables, high level)

| Table | Holds | Public? |
|---|---|---|
| `projects` | Title, description, media, links, tags, status (in progress / shipped / archived) | Yes |
| `media_items` | Photos, audio files, video, future podcast episodes. Each has a `type`, `url`, `caption`, `tags`, and `visibility` field | Depends on `visibility` |
| `links` | External links (GitHub repo, Substack post, press mention, etc.), each tagged to a project or standalone | Yes |
| `socials` | Your social profile links (Substack, LinkedIn, Threads, Twitter/X, Facebook, Instagram, GitHub), each with a handle and URL, rendered consistently site-wide | Yes |
| `contact_submissions` | Contact form entries | No (admin only) |
| `knowledge_base` | The private dataset the chatbot can draw from that isn't published anywhere on the site | No, chatbot-only, server-side |
| `feature_flags` | On/off switches for site features, see §5 | No (admin only) |
| `social_drafts` | Posts Grok Bot has drafted from site content, awaiting review or auto-publish | No (admin only) |

### `media_items.visibility` values
- `public`: shown on the site.
- `chatbot_only`: not rendered anywhere public, but the chatbot can reference/describe it if relevant ("a few unpublished photos exist from that shoot").
- `private`: visible only in the admin portal, not used by the chatbot either. This covers your "chosen a few to publish more of later, but not yet" case exactly, flip `chatbot_only` to `public` when ready, no re-upload needed.

---

## 2. Adding new content types / new tabs

The site should never require a code change just to add a new project, photo, or link. It **does** require a (small, documented) code change to add an entirely new *type* of content (say, a "Talks" tab for conference talks). That process:

1. Add the table/fields in `supabase/migrations/`.
2. Add a fetch function in `lib/cms/`.
3. Add a route (or a tab within an existing route) in `app/(marketing)/`.
4. Add the corresponding admin UI in `app/admin/` so you can manage it without touching code again afterward.
5. Add a feature flag for it in `feature_flags` (see §5) so it can be hidden while you populate it and revealed when ready.

This keeps "new item" (fast, no-code, done in the admin portal) separate from "new category of item" (a deliberate, documented step).

---

## 3. The private dataset and the chatbot

- The `knowledge_base` table holds information about you and the site that isn't necessarily published as a page, but that the chatbot should be able to answer from (background context, detailed bio facts, answers to questions you're often asked, private notes you choose to feed it).
- This table is queried **only** from server-side code (`lib/ai/retrieve.ts`, called from `app/api/chatbot/route.ts`). It is never fetched client-side, never included in any public API response, and never appears in page source.
- Row-level security in Supabase should enforce this at the database level too, not just in application code, so a mistake in one place doesn't expose it.
- You add to this dataset through the admin portal (paste text, upload a document, paste a video link with notes). Per `03-CONTENT-VOICE-GUIDELINES.md` §4, uploaded source material is formatted for storage, not rewritten by AI.

---

## 4. Media handling

- **Photos:** stored in Supabase Storage, served responsively (multiple sizes generated on upload), always with alt text (required field in the admin upload form, not optional).
- **Audio:** stored in Supabase Storage, played through a consistent site-wide audio player component (`components/ui/AudioPlayer.tsx`), not an embedded third-party widget, so it matches the brand system.
- **Video:** supports both uploaded files and embedded links (YouTube/Vimeo/etc.), rendered through a consistent `components/ui/VideoPlayer.tsx` wrapper either way, so playback controls look the same regardless of source.
- **Podcasts (future):** modeled as `media_items` with `type: "podcast_episode"`, grouped under a `PodcastSeries` schema entry per `05-SEO-GEO-AI-SEARCH-STRATEGY.md`, so this can be turned on later without restructuring anything.

---

## 5. Admin portal & feature flags

- `app/admin` is authenticated (single-user auth is enough, this is your site).
- Every major feature (chatbot widget, a given tab/section, a given social auto-publish channel, a given analytics integration) is gated by an entry in `feature_flags`, checked at render/runtime. Flip it off in the admin UI, it disappears from the live site immediately, no deploy needed.
- Admin portal sections, at minimum:
  - **Content**: manage projects, media, links, socials.
  - **Chatbot knowledge base**: add/edit/remove entries, mark media `chatbot_only` vs `public` vs `private`.
  - **Leads**: view contact form submissions, CRM sync status.
  - **Social queue**: review Grok Bot's drafted posts, approve/edit/reject, or toggle auto-publish per channel.
  - **Feature flags**: the master on/off switchboard.
  - **Analytics snapshot**: a simple internal view of the key numbers from `06-ANALYTICS-INTEGRATIONS.md`, so you don't have to leave the site to check them.

---

## 6. CRM integration (personal CRM and/or Uspot)

- `lib/integrations/crm.ts` defines a small, common interface (`createLead(data)`), with two implementations, one for your personal CRM, one for Uspot.
- Which one is active is a feature flag, and both can theoretically be on at once if you ever want to dual-write.
- Trigger points: contact form submission, and optionally a "meaningful chatbot conversation" heuristic (e.g. the visitor asked to be contacted or shared their email in chat).
- Failure handling: if the CRM push fails, the submission is still saved in `contact_submissions` and retried, a failed webhook should never lose a lead.

---

## 7. GitHub integration

- `lib/integrations/github.ts` reads your public repos (via the GitHub API) to optionally auto-populate project metadata (description, last updated, primary language, stars) for projects you've linked to a repo.
- This is a convenience layer, not a requirement, every project can also be entered manually. The `projects` table has an optional `github_repo` field; if set, this integration keeps a few fields in sync (last updated, and optionally a "recently active" badge).
- Also used by Grok Bot as a source of "what have you been building" when drafting social posts.

---

## 8. Contact form

- Fields: name, email, message, and an optional "what are you reaching out about" selector (keeps the CRM lead pre-tagged).
- Client-side and server-side validation.
- On submit: writes to `contact_submissions`, fires the CRM webhook (§6), shows one clear confirmation state (no redundant "thank you" repeated in multiple places per `03-CONTENT-VOICE-GUIDELINES.md`).
- Spam protection: a honeypot field plus basic rate limiting on the API route, avoid adding a visible CAPTCHA unless spam actually becomes a problem, it hurts the clean feel of the site.
