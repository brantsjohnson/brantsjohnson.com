# BUILD-STATE

Status: public pages recut for a Washington lookup, on top of the four-page site. Not deployed to the production domain. A pull request is not a launch.

## What this build is

Public pages: Home, Work, About, Contact, Ask, Now, and the unlisted /hi page. Writing stays hidden until at least two real pieces exist. Old routes still redirect. Experience and Projects go to `/work`. Service goes to `/about#service`. `/projects/bridger` goes to `/work#bridger`.

Home leads with one sentence, a photograph, three checked facts (Senate internship, Crew, Utah Business), Intro with its product screen, Bridger as text with a link, the archway photograph, and a way to write him or book time. Dollar figures are not shown. Bridger is described as a socialization app in a beta of about 25 people. Older user counts are not shown.

Photos in `public/photos` are web-sized derivatives. `next/image` serves smaller widths from those files. Still missing: a photograph of the Birmingham volunteers. The header is the serif wordmark. The favicon is a square serif B.

## Checks

Recorded after the Washington lookup pass.

- `npm test` passed. Preset answers stay on topic. A follow-up adds the next fact. The building answer names Intro and Bridger. Bridger answers use the 25-person beta and bridger.social, and they do not use a dollar figure or an older user count. Public copy has no em dash, en dash, "actually", Israel, or Trump.
- `npx tsc --noEmit` passed.
- `npx next lint` passed.
- `node tools/ci/no-stubs.mjs` passed.
- `python3 tools/ci/no-stubs` passed and printed `no-stubs: clean`.
- `npx next build` passed.
- Against `next start`: `/`, `/work`, `/about`, `/contact`, `/hi`, `/now`, and `/ask` returned 200. `/writing` returned 404 because fewer than two posts exist.
- Visible text on those pages has no dollar sign, TODO, lorem, actually, Israel, or Trump. Bridger appears only with the public description above.
- Redirects returned 301: `/experience` and `/blank-2` to `/work`, `/projects/bridger` to `/work#bridger`, `/about-1` to `/about`.
- Contact and /hi submit with no CRM secret open the visitor's email app. `/hi?e=senate-coffee` prefills "senate coffee".
- Ask answered the school question, and "Tell me more" added that it is a bachelor's degree.
- Keyboard: the first Tab lands on "Skip to content" and activates `#content`. The mobile menu opens About and Work.
- Gold on black is 12.3:1. Body text on paper is 9.7:1 or higher. The gold arrow beside a text link is decorative. The link words are black.
- Search engines are still blocked until `SITE_INDEXABLE=true`. That is the only reason a crawl audit would fail.

## Open work

See `ops/DECISIONS-NEEDED.md`. Writing, the newsletter signup, the CV button, search indexing, and CRM storage stay off until their env values exist.
