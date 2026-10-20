# BUILD-STATE

Status: specified and built on the existing Next.js site. Not deployed. A pull request is not a launch.

## What this build is

Multi-page brantsjohnson.com from the v3 plan and the copy map: Home, About, Experience, Projects, Service & Leadership, Writing, Contact, /hi, and Ask about me. Stub pages are removed. Old Wix slugs redirect.

## Checks run in this workspace

Recorded after the review fixes on this branch.

- `npx tsc --noEmit` passed.
- `npx next lint` passed.
- `node tools/ci/no-stubs.mjs` passed.
- `python3 tools/ci/no-stubs` passed and printed `no-stubs: clean`.
- `npx next build` passed.
- Page checks against `next start`: `/`, `/about`, `/experience`, `/projects`, `/projects/intro`, `/projects/bridger`, `/service`, `/contact`, `/hi` returned 200.
- `/writing` and `/writing/feed.xml` returned 404 because no local post exists and `SUBSTACK_URL` is unset.
- Home, header, and footer do not link to `/writing` in that state.
- Experience shows Bridger as Founder and does not render a CV button.
- About skills do not mention AWS.
- `/hi` says the note opens in the email app and does not say the note is stored.
- Redirects returned 301: `/about-1` to `/about`, `/blank-2` to `/experience`, `/skills` to `/about#skills`, `/blog` and `/poetry` to `/writing`.
- `POST /api/ask` answered the school question with Utah Valley University and did not invent a BYU degree or an AWS certificate.
- `POST /api/contact` for contact and for /hi returned a mailto delivery because no CRM webhook is configured.
- Ask about me, opened with `/?ask=1`, answered "Where did Brant go to school?" with Utah Valley University.
- Earlier Lighthouse on `/` with headless Chrome: performance 97, accessibility 100, SEO 63. The only failed SEO audit is `is-crawlable`, because robots disallow indexing until the Wix cutover. That setting was not changed in this pass.

## Starter kit

`scripts/bootstrap_new_repo.py` from brant-control-center PR #18 defines 39 scaffold files. Five were already here and were not overwritten: `README.md`, `.gitignore`, `.env.example`, `docs/BUILD-STATE.md`, `ops/DECISIONS-NEEDED.md`. The other 34 were created. A later `--check` reported `missing=0`.

## Open work

See `VERIFY.md` and `ops/DECISIONS-NEEDED.md`. Writing, the newsletter signup, and the CV button stay hidden until their env values or a real post exist. No flagged fake path is turned on.
