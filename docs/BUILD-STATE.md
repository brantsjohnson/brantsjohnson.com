# BUILD-STATE

Status: specified and built on the existing Next.js site. Not deployed. A pull request is not a launch.

## What this build is

Multi-page brantsjohnson.com from the v3 plan and the copy map: Home, About, Experience, Projects, Service & Leadership, Writing, Contact, /hi, and Ask about me. Stub pages are removed. Old Wix slugs redirect.

## Checks run in this workspace

Recorded after the production build on this branch.

- `npx tsc --noEmit` passed.
- `npx next lint` passed.
- `node tools/ci/no-stubs.mjs` passed.
- `npx next build` passed.
- Page checks against `next start`: `/`, `/about`, `/experience`, `/projects`, `/projects/intro`, `/projects/bridger`, `/projects/ask`, `/service`, `/writing`, `/writing/feed.xml`, `/contact`, `/hi` returned 200.
- Redirects returned 301: `/about-1` to `/about`, `/blank-2` to `/experience`, `/blank-1` and `/blank-3` to `/service`, `/blank-4` and `/skills` to `/about#skills`, `/leadership` to `/service`, `/blog` to `/writing`, `/photography` to `/about`.
- `POST /api/ask` answered the school question with Utah Valley University and did not invent a BYU degree.
- `POST /api/contact` for contact and for /hi returned a real mailto delivery because no CRM webhook is configured.
- Ask about me, opened with `/?ask=1`, answered "Where did Brant go to school?" with Utah Valley University.
- Lighthouse on `/` with headless Chrome: performance 97, accessibility 100, SEO 63. The only failed SEO audit is `is-crawlable`, because robots disallow indexing until the Wix cutover.

## Open work

See `VERIFY.md` and `ops/DECISIONS-NEEDED.md`. No stub pages are hiding behind a flag.
