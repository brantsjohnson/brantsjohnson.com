# 12. Existing Infrastructure & Migration Notes

**Plain English purpose:** You mentioned you already have an existing agent/database setup (a Supabase database on Vercel, tied to an existing project) and that your current live site may be on Wix. This doc is a placeholder for Cursor and Grok Bot to record the real details once confirmed, so nothing gets rebuilt from scratch unnecessarily, and so the migration off Wix (if that's the plan) is deliberate rather than accidental.

---

## 1. Reusing the existing Supabase database

You noted you already have a Supabase project (connected to an existing agent/tool, hosted on Vercel) that Cursor and Grok Bot are already aware of, and that reusing it as this site's database is fine.

**Before building anything against it, confirm and record here:**
- [ ] Project name / Supabase project ref.
- [ ] Which existing tables belong to the other agent/tool (do not touch, rename, or repurpose these without a clear separation plan).
- [ ] Whether this new site's tables (per `07-FEATURES-ADMIN-CMS.md` §1) should live in the same Supabase project under a distinct schema (e.g. a `site` schema, separate from the existing agent's schema) or in a fresh Supabase project entirely.
- **Recommendation:** use a separate Postgres schema within the same project (`site.projects`, `site.media_items`, etc.) rather than mixing tables at the top level. This gets you one bill and one dashboard, while keeping row-level security policies and migrations for this website cleanly separated from whatever the other agent relies on, so a change to one never risks breaking the other.
- All new migrations for this project go in `supabase/migrations/` in this repo, scoped to the `site` schema only.

## 2. The current Wix site

- [ ] Confirm the current site's actual URL and hosting (Wix vs. something else).
- [ ] Export/inventory existing content before migration: pages, blog posts, images, any SEO metadata already indexed by Google (so redirects can be set up and existing search rankings aren't lost).
- **Migration plan, once confirmed:**
  1. Inventory all existing URLs on the Wix site.
  2. Map each old URL to its new URL under the sitemap defined in `08-CONTENT-SECTIONS-SITEMAP.md`.
  3. Set up 301 redirects from every old URL to its new equivalent (critical for not losing existing SEO value and any existing AI-answer-engine citations pointing at the old site).
  4. Migrate content into the new content model (§ tables in `07-FEATURES-ADMIN-CMS.md`), formatted per `03-CONTENT-VOICE-GUIDELINES.md` (i.e. your existing words are preserved, not rewritten, just reformatted).
  5. Point the domain at the new Vercel deployment only after redirects and content are verified.
  6. Resubmit the sitemap to Google Search Console and re-check the `llms.txt` and structured data are live before considering the migration complete.

## 3. Open questions to resolve before Cursor starts building

These are exactly the kind of thing that should go through the `docs/inbox/` handoff process in `04-AI-AGENT-INSTRUCTIONS.md` §5 once you have the answers:

1. What's the actual name/reference of the existing Supabase project, and who else depends on it?
2. Is the current live site definitely on Wix, and do you have export/admin access to it?
3. Is there an existing custom domain already pointed at the Wix site that will need to be repointed?
