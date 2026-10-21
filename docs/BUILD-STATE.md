# BUILD-STATE

Status: specified and built on the existing Next.js site. Not deployed. A pull request is not a launch.

## What this build is

Four public pages: Home, Work, About, and Contact. Ask about me is a full page at `/ask`, linked once from the header. `/hi` stays unlisted. Writing stays hidden until at least two real pieces exist. Old routes redirect: Experience and Projects to `/work`, Service to `/about#service`.

Photos in `public/photos` are web-sized derivatives. `next/image` serves smaller widths from those files. Intro uses a screen captured from intro.events. Still missing: a Birmingham volunteers photograph, and a Bridger App Store or TestFlight screen. The header is the serif wordmark only.

## Checks run in this workspace

Recorded after the layout pass, the Intro screen, the Ask thread, and the headline test.

- `npm test` passed (preset answers stay short and on topic, and the headline list splits evenly).
- `npx tsc --noEmit` passed.
- `npx next lint` passed.
- `node tools/ci/no-stubs.mjs` passed.
- `python3 tools/ci/no-stubs` passed and printed `no-stubs: clean`.
- `npx next build` passed.
- Page checks against `next start`: `/`, `/about`, `/work`, `/contact`, `/ask`, `/hi` returned 200.
- `/writing` and `/writing/feed.xml` returned 404 because fewer than two posts exist and `SUBSTACK_URL` is unset.
- Home HTML does not link a Writing item. `showWriting` is false. The three stats are in the first HTML response, with no scroll-hidden opacity.
- Home has one gold button, "See the work". Work has one, "Visit Intro". Contact has one, "Send the note". Ask has one, "Send". About has none.
- Hero headline measured 89px on a 1440px viewport. Body is 18px. Stat numbers measured 86px.
- Work lists Bridger as Founder and does not render a CV link.
- About skills do not mention AWS. About renders the podium, the full-bleed crane, the archway crew, and both scholarship photos.
- `/hi` says the note opens in the email app and does not say the note is stored.
- Redirects returned 301: `/experience` and `/projects` to `/work`, `/projects/intro` to `/work#intro`, `/service` to `/about#service`, `/skills` to `/about#skills`.
- `POST /api/ask` and the `/ask` page both answered "Where did Brant go to school?" with the Utah Valley University bachelor's sentence only.
- The content shell is 1200px wide on a 1440px viewport. Intro is two columns, with the product screen on the right. Bridger is full width because no screen exists.
- The homepage headline test sets a first-party cookie, `bj_hero_variant`, and splits visitors evenly across the list in `lib/hero-experiment.ts`. `?hero=a`, `?hero=b`, and `?hero=c` preview the three lines. Clicks on "See the work" and a scroll to the work section are Vercel Analytics events `hero_see_work` and `hero_scroll_work`.
- The header is the serif wordmark only. The circle mark is not in the header or the favicon.
- Ask keeps a running thread, four suggestion chips, and follow-ups. "Tell me more" after the school question adds that it is a bachelor's degree only.
- Desktop and phone screenshots, before and after, are in the pull request.
- Earlier Lighthouse on `/` with headless Chrome: performance 97, accessibility 100, SEO 63. The only failed SEO audit is `is-crawlable`, because robots disallow indexing until the Wix cutover. That setting was not changed in this pass.

## Starter kit

`scripts/bootstrap_new_repo.py` from brant-control-center PR #18 defines 39 scaffold files. Five were already here and were not overwritten: `README.md`, `.gitignore`, `.env.example`, `docs/BUILD-STATE.md`, `ops/DECISIONS-NEEDED.md`. The other 34 were created. A later `--check` reported `missing=0`.

## Open work

See `VERIFY.md` and `ops/DECISIONS-NEEDED.md`. Writing, the newsletter signup, and the CV button stay hidden until their env values or a real post exist. No flagged fake path is turned on.
