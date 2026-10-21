# BUILD-STATE

Status: specified and built on the existing Next.js site. Not deployed. A pull request is not a launch.

## What this build is

Four public pages: Home, Work, About, and Contact. Ask about me is a full page at `/ask`, linked once from the header. `/hi` stays unlisted. Writing stays hidden until at least two real pieces exist. Old routes redirect: Experience and Projects to `/work`, Service to `/about#service`.

Photos in `public/photos` are web-sized derivatives. `next/image` serves smaller widths from those files. Still missing: a Birmingham volunteers photograph, and Bridger screens.

## Checks run in this workspace

Recorded after the four-page redesign and the full-resolution photo set.

- `npm test` passed (preset answers stay short and on topic).
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
- Header logo and name fit at 390px without overflow. Desktop and phone screenshots are in the pull request.
- Earlier Lighthouse on `/` with headless Chrome: performance 97, accessibility 100, SEO 63. The only failed SEO audit is `is-crawlable`, because robots disallow indexing until the Wix cutover. That setting was not changed in this pass.

## Starter kit

`scripts/bootstrap_new_repo.py` from brant-control-center PR #18 defines 39 scaffold files. Five were already here and were not overwritten: `README.md`, `.gitignore`, `.env.example`, `docs/BUILD-STATE.md`, `ops/DECISIONS-NEEDED.md`. The other 34 were created. A later `--check` reported `missing=0`.

## Open work

See `VERIFY.md` and `ops/DECISIONS-NEEDED.md`. Writing, the newsletter signup, and the CV button stay hidden until their env values or a real post exist. No flagged fake path is turned on.
