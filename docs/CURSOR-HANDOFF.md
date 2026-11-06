# Handoff for Cursor: which parts of the new site to keep, copy or redo

Written for Brant to give to Cursor. Everything below is in the branch `claude/confident-wozniak-0m7vya` (pull request 13). Read `docs/SITE-UPDATE-GUIDE.md`, `CLAUDE.md`, and `docs/PUBLISHING.md` first. The guide wins on the menu, headers, spacing, and click names.

## The one rule: do not overwrite this branch

Deploying Cursor's version over this branch would delete the working backend (analytics, the private admin page, the AI chatbot route, share previews, the unlisted-post system, `llms.txt`, redirects). **Start from this branch, or merge into it. Never replace it.** Change only the presentation files listed in section 2, and leave the data, backend and test files alone.

### Do not delete or rewrite (backend and data)

| Area | Files |
|---|---|
| API routes | `app/api/**` (ask, chatbot, revalidate, t, admin, cron, post-md, contact, crm) |
| AI chat logic | `lib/ai/**`, `content/about-brant.md` |
| Analytics and admin | `components/analytics/Tracker.tsx` (must stay mounted in `app/(marketing)/layout.tsx`), `lib/analytics/**`, `lib/admin/**`, `app/admin/**` |
| Share previews | `app/og/**`, `lib/site/page-metadata.ts` (every page calls `pageMetadata({ ..., image })`), `content/covers.ts`, `app/opengraph-image.tsx` |
| Posts and AI discovery | `content/posts/**`, `lib/posts/**`, `app/llms.txt`, `app/llms-full.txt`, `app/robots.ts`, `app/sitemap.ts`, `app/indexnow-key.txt`, `vercel.json` |
| Content | `content/*.ts` (about, work, events, community, photos, covers, narrative, site-content), `content/writing/**` |
| Config and tests | `next.config.mjs` (redirects, rewrites, file tracing), `lib/**/*.test.ts`, `package.json`, `.env.example` |

### Rules that must survive any restyle

- Keep every link and button's `data-track="type:what:where"` attribute. The analytics and the "never clicked" report depend on them. The `Button` component's `track` prop does this.
- Menu order: Home, About, Experience, Events, Leadership, Articles. Addresses stay `/work`, `/community`, and `/articles`. `content/site-content.ts` (`primaryNav`) and `content/narrative.ts` (`storyNav`). See `docs/SITE-UPDATE-GUIDE.md`.
- Crew drawings stay on the cream ground (`CREW_GROUND` in `content/photos.ts`).
- Respect `prefers-reduced-motion`. No em dashes, never "actually".
- Run `npm test`, `npm run typecheck`, `npm run lint`, `npm run build` before asking for review.

## 2. Things Brant likes: where the code is

| What Brant likes | Where | Notes for Cursor |
|---|---|---|
| Home: "Good things deserve to happen", the headshot, "Get to know me" and "See what I've worked on" | `components/editorial/HomePage.tsx` lines 153 to 200 (hero), `components/ui/Button.tsx` | The headshot sits in a box with a thin offset gold frame, and drifts slightly on scroll (`useScroll` and `useTransform`, line 138). Copy comes from `content/narrative.ts` (`hero`). |
| The header, and the thin gold scroll bar along its bottom edge | `components/sections/SiteHeader/index.tsx` lines 15 to 24 and 90 to 100 (`useScroll`, `useSpring`, `scaleX`). Header glass look: line 46 | Self-contained. Copy the whole file; it also holds the full-screen mobile menu. |
| How the page scrolls and fades in | `components/editorial/Reveal.tsx` (rise and fade on scroll), `components/editorial/Figure.tsx` (photo wipes open from the top, caption only on hover), `styles/globals.css` lines 125 to 160 (`.page-enter`, `image-wipe`, `.has-caption`), `app/(marketing)/template.tsx` | Everything switches off under reduced motion. |
| "A few places to start" | `components/editorial/HomePage.tsx`, the `starts` list (line 90) and the section from line 271 | Four cards: Bridger, Intro, Events, Crew. Photos are set in the list. |
| The two-tone footer | `components/sections/SiteFooter.tsx` (cream band, large italic line, email link, two link columns) and the colors `--color-bg-deep` and `--color-bg` in `styles/tokens.css` | The page is warm white; the footer and some bands are the deeper cream. |
| Events as its own section, and how events are listed | `app/(marketing)/events/page.tsx` (grouped list with small labels and thumbnails), `content/events.ts` (`eventGroups`, `eventDetails`), `components/editorial/DetailPage.tsx` and `StoryRow.tsx` for each event page | Adding an event is one entry in `content/events.ts`. `/events/[slug]` is built from it. |
| Events in the menu | `content/site-content.ts` (`primaryNav`), `content/narrative.ts` (`storyNav`), and the matching test in `lib/site/public-copy.test.ts` | If Cursor adds Events to its own header, keep the order and update that test. |
| The index of main places with a photo that changes beside it | `components/editorial/HomePage.tsx`, the `rows` list (line 45) and the section from line 204; covers come from `content/covers.ts` | Only if Brant wants it. The titles are plain text, so Cursor's header titles can replace them. |

## 3. Things Brant does not like: what to redo

**The chatbot page (both versions).** Files: `components/ask/AskAssistant.tsx` (used when an AI key is set), `components/ask/AskConversation.tsx` (the no-key version), `app/(marketing)/ask/page.tsx`. Redesign the look only. The behavior to change:

- A suggested question must **not** answer the moment it is clicked. Clicking one should put the question in the input box, and the visitor presses Send. Both components send on click today (`onClick={() => ask(question)}` in `AskAssistant.tsx`, `void ask(question)` in `AskConversation.tsx`).
- Make "Ask about me" much more prominent: a clear panel on the About page and on the home page, and a bigger link from "Get to know me". Today it is only a small footer link.
- Keep the server logic: the AI route is `app/api/chatbot/route.ts`, the no-AI answers are `app/api/ask/route.ts`. `AskAssistant` falls back to the notes if the model fails. Do not remove that.

**The contact page.** `app/(marketing)/contact/page.tsx` uses the `TextLink` component (`components/ui/TextLink.tsx`), which prints an email, LinkedIn and Book time as small links with arrows. Replace with real buttons or cards. Keep the form (`components/forms/NoteForm.tsx`) and the single email `me@brantsjohnson.com` (`inquiries` in `content/site-content.ts`).

**Links that should look like buttons.** "Parties and gatherings", "Things I've made", and the other onward links are plain underlined text (`components/narrative/StoryLink.tsx`, used by `StoryRow.tsx`, `DetailPage.tsx`). The `Button` component has three looks: `primary` (gold), `ghost` (outline), `line`. Use it for the main onward links. The link lists are in `content/about.ts`, `events.ts`, `work.ts` and `community.ts` (the `links:` fields).

## 4. Photos: where each one is chosen

Brant says several photos are the wrong ones. All photo choices are data, so they are easy to change without touching layout:

- **Section covers** (home index, share previews): `content/covers.ts`.
- **Home hero and "places to start" cards:** `components/editorial/HomePage.tsx` (`starts`, hero image).
- **Per-page photos:** `photos:` fields in `content/about.ts`, `work.ts`, `events.ts`, `community.ts`.
- **How to add or swap one:** use `ph("folder/file.webp", "description", "hover caption", { focus: { x, y } })` from `content/photos.ts`. `focus` (0 to 1) is where the subject is, so crops keep Brant centered. The files are in `public/images/brant-uploads/`.
- Brant should send Cursor a short list: "On the home page use X. On About use Y. On Work use Z."

## 5. Prompt to paste into Cursor

> Work on branch `claude/confident-wozniak-0m7vya` (do not replace it and do not touch `main`). Read `CLAUDE.md`, `docs/PUBLISHING.md` and `docs/CURSOR-HANDOFF.md`. Keep the design Brant already likes from my current site: the home hero with the headshot and buttons, the header with the gold scroll bar, the scroll animations, "A few places to start", the two-tone footer, and Events as its own menu item and list. Restyle page headers and page layouts to match the look of the Vercel `main` site that Brant prefers (its header titles and how it formats pages). Redo three things: (1) the chatbot page, where suggested questions must fill the input and wait for Send, and where "Ask about me" is much more prominent on the home and About pages; (2) the contact page, with real buttons and no small arrow links; (3) onward links like "Parties and gatherings" and "Things I've made", which should look like buttons. Change presentation files only. Do not edit the backend, data, API, analytics, share preview or test files listed in `docs/CURSOR-HANDOFF.md`. Keep every `data-track` attribute. Run `npm test`, `npm run typecheck`, `npm run lint` and `npm run build`, then open a pull request.
