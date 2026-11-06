# BUILD-STATE

Status: Crew app-design gallery is on a pull request branch from latest main (PR #17 merged). Real in-product Crew screens from `public/images/brant-uploads/crew-illustrations-in-product/` are copied into `crew-app-design/` and shown on `/work/crew`. Nine on-site Crew articles stay listed. Positioning is unchanged. Not merged. Not deployed to the production domain. Engineering VP is the merge gate. A pull request is not a launch. GitHub Actions is off, so the gates below were run locally.

## What this build is

Public pages: Home, Work, About, Contact, Ask, Now, and the unlisted /hi page. Writing stays hidden until at least two real pieces exist. Old routes still redirect. Experience and Projects go to `/work`. Service goes to `/about#service`, which is the collaborations section. `/projects/bridger` goes to `/work#bridger`.

Home leads with "Good things deserve to happen." Intro and Bridger sit together under that, each with a live screenshot. Three checked facts follow (Senate internship, Crew, Utah Business), then an inquiries line. Dollar figures are not shown. Bridger is a socialization app in a beta of about 25 people. Older user counts are not shown.

`/work/crew` is an eight-section product case study with sourced bullets covering the debit-card program, manufacturing, integrations, commercial research, and the self-drawn brand. The app-design gallery is on, using Brant's real in-product Crew screens. A clear link from that page goes to `/work/crew-brand` for the drawings. Photos in `public/photos` are crops of intro.events and bridger.social. Still missing: a photograph of the Birmingham volunteers. The header is the serif wordmark. The favicon is a square serif B.

## Checks

Recorded on `cursor/crew-app-design-gallery-14e6` after branching from `origin/main` (includes merged PR #17). Exact commit for the run is the current branch head in the pull request. A pull request is not a launch.

- `npm ci` then `npm test` passed (42 tests), including Crew section bullets, app-design gallery photos under `crew-app-design/`, the drawings link to `/work/crew-brand`, modeled-research list, and the nine listed Crew articles.
- `npm run typecheck` passed.
- `npm run lint` passed. Existing `ArticleShelf` `<img>` warnings only.
- `npm run build` passed. `/work/crew` and `/work/crew-brand` are in the route list. Built `/work/crew` HTML includes `App design`, fourteen `crew-app-design` screens, and `See the drawings I made for Crew`.
- `python3 tools/ci/no-stubs` passed.
- `node tools/ci/no-stubs.mjs` failed on pre-existing `content/about-me.md` lines that mention Marriott School and "business strategy" as corrections, not as public page copy. Same matches exist on `origin/main`. Not changed in this PR.
- Local `next start` preview: `/work/crew`, `/work`, and `/work/crew-brand` returned HTTP 200. Playwright loaded all 14 gallery images, hover caption `SIGN IN`, and the gold drawings button to `/work/crew-brand`. Phone width 390px still showed the gallery and a 44px+ drawings link. No "coming soon" or empty slot.
- Search engines are still blocked until `SITE_INDEXABLE=true`.

## Open work

See `ops/DECISIONS-NEEDED.md`. Search indexing stays off until `SITE_INDEXABLE=true`. CRM storage stays off until its env values exist.

The one-page résumé PDF (`public/resume.pdf`) is still pending; until it ships, `publicResume.href` stays null.

Crew app-design screenshots are now on `/work/crew` from files in `public/images/brant-uploads/crew-app-design/`. The source stills remain in `crew-illustrations-in-product/`.

**PENDING BRANT:** Should vendor names, prices, volume figures, commercial terms, contract structures and operational metrics in the nine Crew article bodies be scrubbed before production, and if so which ones? The bodies are published as written for this preview. Do not silently rewrite them. This is a production-release review item, not permission to launch.
