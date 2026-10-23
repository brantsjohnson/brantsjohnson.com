# BUILD-STATE

Status: public pages recut for a Washington lookup, on top of the four-page site. Admin shells are removed. Not deployed to the production domain. A pull request is not a launch. GitHub Actions is off, so the gates below were run locally.

## What this build is

Public pages: Home, Work, About, Contact, Ask, Now, and the unlisted /hi page. Writing stays hidden until at least two real pieces exist. Old routes still redirect. Experience and Projects go to `/work`. Service goes to `/about#service`, which is the collaborations section. `/projects/bridger` goes to `/work#bridger`.

Home leads with "Good ideas deserve to happen." Intro and Bridger sit together under that, each with a live screenshot. Three checked facts follow (Senate internship, Crew, Utah Business), then an inquiries line. Dollar figures are not shown. Bridger is a socialization app in a beta of about 25 people. Older user counts are not shown.

Photos in `public/photos` are crops of intro.events and bridger.social. The older portraits and project photographs are not shipped. Still missing: a photograph of the Birmingham volunteers. The header is the serif wordmark. The favicon is a square serif B.

## Checks

Recorded after removing the admin shells and restoring the starter-kit no-stubs check.

- `npm test` passed. The public headline is the one sentence. Ask answers where he lives the same way About does. The Romney answer names constituent inquiries and the nuclear licensing brief. Public copy has no em dash, en dash, "actually", Israel, or Trump.
- `npm run typecheck` passed.
- `npm run lint` passed.
- `npm run build` passed. The route list has no `/admin`.
- `python3 tools/ci/no-stubs` passed. `node tools/ci/no-stubs.mjs` passed.
- `node --test lib/ai-settings/test.mjs` passed.
- Search engines are still blocked until `SITE_INDEXABLE=true`.

## Open work

See `ops/DECISIONS-NEEDED.md`. Writing, the newsletter signup, the CV button, search indexing, and CRM storage stay off until their env values exist.
