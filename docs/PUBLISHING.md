# Publishing guide for agents and for Brant

Read this before you add or change anything on brantsjohnson.com. It says **where each kind of thing lives**, **the exact fields**, and **the steps to publish** it. The site is Next.js on Vercel. Content lives in `content/` as plain TypeScript, so a change is a small, reviewable edit.

Rules that never change (also in `CLAUDE.md`): first person, plain and warm; no em dashes; never the word "actually"; no dollar figures unless Brant approves; no health, family, relationship or job-search details; no home address or phone number; use only facts from `docs/about-brant.md`, `content/about-brant.md` and the content files. If a fact is missing, leave it out and ask Brant. Work on a branch and open a pull request. Never push to `main`.

## 1. The map: what goes where

| You are publishing | It lives in | It shows up on |
|---|---|---|
| A Substack article (articles, events newsletter, GitHub newsletter) | The newsletter itself. The site reads its feed. Optional extras in `content/writing/articles.ts` | `/writing`, a "Read more" link on any page it is about, the "Ask about me" chatbot |
| A Crew article (or any article about a role) | `content/writing/articles.ts` with `about: ["work/crew"]` | `/writing`, plus "Read more" under Crew Finance on `/work` and on `/work/crew` |
| A change to what a role says (a bullet) | `content/work.ts` (the item's `summary`) | `/work` and the matching `/work/<slug>` page |
| A new project or long story | `content/work.ts`, `workDetails` | `/work/<slug>` |
| A new event | `content/events.ts`: one `eventDetails` entry and one card in `eventGroups` | `/events` and `/events/<slug>` |
| A community or public-service story | `content/community.ts` | `/community`, `/community/<slug>` |
| A personal or "outside of work" story | `content/about.ts` | `/about`, `/about/<slug>` |
| A poem | `content/poems.ts` (keep line breaks exactly) | `/writing`, `/writing/poetry/<slug>` |
| The CV | `public/cv.pdf` (see section 4) | "Full CV" in the footer and on `/work` |
| Photos | `public/images/brant-uploads/` (WebP), sizes recorded in `content/photo-sizes.ts` | everywhere a page references them |
| The menu, footer links, email | `content/site-content.ts` | every page |
| What the chatbot knows | `content/about-brant.md` (facts), plus articles automatically | `/ask` |

The six menu items are fixed: **About, Work, Events, Community, Writing, Contact**. Do not add a seventh.

## 2. Publish an article

An article published on Substack appears on `/writing` **on its own** within about an hour, because the Writing page reads the feeds in `content/writing/sources.ts`. To make it appear **right away**, and to add a cover, a summary, or links from Work/Events pages, add an entry.

### Fields (`content/writing/articles.ts`)

```ts
{
  id: "crew-onboarding-experiments",        // lowercase, hyphens, unique
  title: "Exactly as published",
  date: "2026-11-10",                         // YYYY-MM-DD
  url: "https://brantsjohnson.substack.com/p/...",
  source: "articles",                         // a source id from content/writing/sources.ts
  summary: "One plain sentence.",             // optional. First person is fine.
  cover: { src: "/images/brant-uploads/...webp", alt: "What the picture shows" }, // optional, see section 5
  about: ["work/crew"],                       // optional, page keys: section/slug
}
```

Add the entry at the **top** of the list (newest first).

### Page keys for `about`

`<section>/<slug>` where the section is `work`, `events`, `community` or `about` and the slug is the page's slug. Examples: `work/crew`, `work/intro`, `work/bridger`, `work/backlocal`, `events/theater`, `events/utah-business`, `community/archway`. A wrong key fails `npm test`.

### What happens automatically

- Listed on `/writing` under its source's heading.
- Each page named in `about` gets a **Read more** link to the article. On `/work`, it appears under the role whose id matches (`work/crew` shows under Crew Finance).
- The chatbot learns the title, date and address.
- A summary, if given, appears under the title.

### Another newsletter (events newsletter, GitHub newsletter)

Add an object to `writingSources` in `content/writing/sources.ts` with its `id` (one of `articles`, `events-newsletter`, `github-newsletter`), `label`, `feedUrl` (the newsletter's `/feed` address) and `subscribeUrl`. It then gets its own heading on `/writing`, and its posts appear automatically. Use `source: "events-newsletter"` in `articles.ts` entries for that newsletter. Do not add a source until the newsletter exists.

### Refresh now

After publishing, make the site pick it up immediately:

```
curl -X POST https://www.brantsjohnson.com/api/revalidate \
  -H "x-revalidate-secret: $REVALIDATE_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"paths":["/writing","/work/crew"]}'
```

An empty body refreshes the writing feeds, home, Work and Events. This needs the `REVALIDATE_SECRET` setting in Vercel.

## 3. Publish an event

1. Add a detail entry to `eventDetails` in `content/events.ts`. Copy a similar one. Required: `slug`, `path` (`/events/<slug>`), `title`, `metaTitle`, `description` (200 characters or fewer), `crumbs`, `label: "Events"`, `lead`, `sections`, `back`.
2. Add a card to the right group in `eventGroups` (`title`, `tag`, `summary`, `href`, `linkText`, optional `photo`).
3. Add `articles` entries if you wrote about it.
4. Run the checks (section 6).

**Event honesty rules:** do not say Brant produced an event alone, and do not say he attended every event in a portfolio. Say what he did: produced, helped produce, worked sponsorships, performed, presented. Leave out a year or a named event unless Brant confirmed it.

## 4. Update the CV and role bullets

The CV is a PDF. Its master text lives in Brant's Drive (Job Applications, Masters). The site does not generate it. To change it:

1. Brant (or an agent with Drive access) updates the master and exports the PDF.
2. Replace `public/cv.pdf` with the new file in a pull request. If a one-page résumé is ready, add `public/resume.pdf` and set `publicResume.href` to `"/resume.pdf"` in `content/site-content.ts`; the footer and Work page then show it. The résumé must contain no phone number or street address.
3. The bullets on the site are the `summary` lines in `content/work.ts`. When an article goes deeper on a bullet, do **not** lengthen the bullet. Add the article with `about: ["work/<id>"]`; the **Read more** link appears under that role.

**Known conflict to resolve with Brant:** the control-center plan (2026-11-03) says Crew copy must say **Mastercard**, not Visa. The current `public/cv.pdf` text says Visa. The chatbot notes and local answers now say Mastercard. Replace the PDF with the Mastercard master when it is available.

## 5. Share previews (what a shared link looks like)

Every page sets its own Open Graph and Twitter card in `lib/site/page-metadata.ts`.

- **Pages with a cover photo** share that photo, cropped to 1200 by 630 with the subject kept in the center. Section pages use the covers in `content/covers.ts`. Detail pages use their `cover` field, or else the first photo on the page.
- **Pages without a photo** share a clean text card with the page title and a small label.
- **Home** shares the headshot. **Poems** share a text card.
- **Articles** hosted on Substack are previewed by Substack. For an article page hosted on this site, set `cover` on the entry; it becomes the share picture and the page is marked as an article.
- To change a cover: edit `content/covers.ts` (sections) or the entry's `cover` / the page's first photo. Use a photo with a `focus` point (where the subject is, 0 to 1) so crops stay centered.
- To check: open `/og/photo?src=/images/brant-uploads/general/brant-speaking-2.webp` or `/og/card?title=Test&kicker=Events` in a browser. Facebook's Sharing Debugger and LinkedIn's Post Inspector show the live result after deploy; they cache, so use their "scrape again" button.

## 6. Check before you open the pull request

```
npm ci
npm test            # includes the content checks: fields, dates, links, photos, voice rules
npm run typecheck
npm run lint
npm run build
```

Also look at the built page for em dashes and the word "actually". Vercel builds a preview for the pull request; put the preview link in the PR. After Brant approves and the PR is merged, call the refresh endpoint if the change involves writing.

## 7. Analytics

First-party, private, no cookies. The browser script (`components/analytics/Tracker.tsx`) sends three kinds of events to `/api/t`: page views, clicks on named links and buttons, and how far people scroll. Every link or button already has a name in its `data-track` attribute, written `type:what:where` (for example `link:index_work:home`). Name any new tracked element the same way.

What it records: a one-way daily visitor code (not an IP address), the page, the referrer site, device size, the click name, scroll depth, country. It skips visitors with Do Not Track, bots, `/admin`, and any browser where Brant has signed in to the admin page.

**Dashboard:** `https://www.brantsjohnson.com/admin/analytics` (sign in with the admin password). It shows visitors, page views, per-day chart, top pages with scroll depth, where visitors came from (Substack, LinkedIn, Google...), devices, **what gets clicked** with click rates, and **seen but never clicked** links.

### One-time setup (Brant or an agent with Vercel and Supabase access)

1. **Database.** In the Supabase project, apply `supabase/migrations/20261103_000002_analytics.sql`. Then Settings, API, Exposed schemas: add `site`.
2. **Vercel settings** (Production and Preview): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `ANALYTICS_SALT` (any long random string), `REVALIDATE_SECRET` (any long random string).
3. **Admin sign-in.** On your own computer run `node tools/admin/hash-password.mjs "a long password"`. Put the two lines it prints (`ADMIN_PASSWORD_HASH` and `JWT_SECRET`) into the Vercel settings. The password itself is never stored.
4. **The AI chatbot.** Set `OPENAI_API_KEY` (optionally `AI_MODEL`). Without it, `/ask` still answers from the public notes with no model.
5. Redeploy. Open `/admin/login`, sign in once on each of your own devices so your visits are not counted.

Vercel Web Analytics is also on (`@vercel/analytics`) and works with no setup beyond enabling it in the Vercel dashboard.

## 8. Changing how the site works

- **Menu or footer:** `content/site-content.ts` (`primaryNav`, `footerNav`). Update the menu list in `CLAUDE.md` and the test in `lib/site/public-copy.test.ts`.
- **A new kind of page:** add a content file shaped like `content/events.ts`, a `[slug]` route modeled on `app/(marketing)/events/[slug]/page.tsx`, add its section to `sections` in `lib/site/content-schema.test.ts`, and to `app/sitemap.ts`.
- **Moving or renaming a page:** add a 301 in `next.config.mjs` from the old address so shared links keep working.
- **Look and feel:** colors and type are in `styles/tokens.css` and `tailwind.config.ts`. Layout pieces are in `components/editorial/`. Follow `CLAUDE.md` (editorial, white space, gold used sparingly, captions on hover, Crew drawings on the cream ground).
- **Chatbot behavior:** rules are in `lib/ai/prompt.ts`; facts in `content/about-brant.md`; the no-model fallback answers in `lib/ai/answer-question.ts`. When a fact on the site changes, change it in `content/about-brant.md` too.

## 9. Open questions for Brant

- Mastercard or Visa for the Crew card program (see section 4).
- The motto: the site says "Good ideas deserve to happen." The control-center plan says "Good things deserve to happen."
- Feed addresses for the events newsletter and the GitHub newsletter, when they exist.
- The year and exact role for the Governor's Economic Summit, and the named Uintah County tourism events, before those pages say more.
