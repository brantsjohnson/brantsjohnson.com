# BUILD-STATE

Status: Crew case-study fuller page is on a follow-up pull request branch after PR #16 merged to main. Nine on-site Crew articles stay listed with Brant-approved dates from 2026-10-28 through 2026-11-05. Positioning is unchanged. Not merged. Not deployed to the production domain. Engineering VP is the merge gate. A pull request is not a launch. GitHub Actions is off, so the gates below were run locally.

## What this build is

Public pages: Home, Work, About, Contact, Ask, Now, and the unlisted /hi page. Writing stays hidden until at least two real pieces exist. Old routes still redirect. Experience and Projects go to `/work`. Service goes to `/about#service`, which is the collaborations section. `/projects/bridger` goes to `/work#bridger`.

Home leads with "Good things deserve to happen." Intro and Bridger sit together under that, each with a live screenshot. Three checked facts follow (Senate internship, Crew, Utah Business), then an inquiries line. Dollar figures are not shown. Bridger is a socialization app in a beta of about 25 people. Older user counts are not shown.

`/work/crew` is now an eight-section product case study with sourced bullets covering the debit-card program, manufacturing, integrations, commercial research, and the self-drawn brand. The optional app-design gallery is not rendered. Photos in `public/photos` are crops of intro.events and bridger.social. Still missing: a photograph of the Birmingham volunteers. The header is the serif wordmark. The favicon is a square serif B.

## Checks

Recorded on `cursor/crew-case-study-fuller-07ae` after branching from `origin/main` (includes merged PR #16). Exact commit for the run is the current branch head in the pull request. A pull request is not a launch.

- `npm ci` then `npm test` passed (41 tests), including Crew section bullets, gallery gating, modeled-research list, Ask Crew/Mastercard answers, and the nine listed Crew articles.
- `npm run typecheck` passed.
- `npm run lint` passed. Existing `ArticleShelf` `<img>` warnings only.
- `npm run build` passed. Nine `/writing/<slug>` routes remain. `/work/crew` is in the route list.
- `python3 tools/ci/no-stubs` passed.
- `node tools/ci/no-stubs.mjs` failed on pre-existing `content/about-me.md` lines that mention Marriott School and "business strategy" as corrections, not as public page copy. Same matches exist on `origin/main`. Not changed in this PR.
- Local preview of `/work/crew`, `/work`, `/articles`, Crew article routes, and `/ask` returned HTTP 200. No app-design gallery, "coming soon", or empty slot on `/work/crew`.
- Search engines are still blocked until `SITE_INDEXABLE=true`.

## Open work

See `ops/DECISIONS-NEEDED.md`. Search indexing stays off until `SITE_INDEXABLE=true`. CRM storage stays off until its env values exist.

The one-page résumé PDF (`public/resume.pdf`) is still pending; until it ships, `publicResume.href` stays null.

Crew app-design screenshots are still pending from Chief of Staff. Until they arrive, `appDesignGallery` stays unset and the band does not render.

**PENDING BRANT:** Should vendor names, prices, volume figures, commercial terms, contract structures and operational metrics in the nine Crew article bodies be scrubbed before production, and if so which ones? The bodies are published as written for this preview. Do not silently rewrite them. This is a production-release review item, not permission to launch.
