# BUILD-STATE

Status: Nine on-site Crew articles were replaced with Brant's 2026-11-06 final copy (titles, deks, and bodies verbatim). Existing `/writing/<slug>` addresses and release dates stay. Crew page links that already pointed at those posts now use the final titles. Positioning is unchanged. Not merged. Not deployed to the production domain. Engineering VP is the merge gate. A pull request is not a launch. GitHub Actions is off, so the gates below were run locally.

## What this build is

Public pages: Home, Work, About, Contact, Ask, Now, Articles, and the unlisted /hi page. The nine Crew posts are listed on `/articles` and in Crew Read more. Old routes still redirect. Experience and Projects go to `/work`. Service goes to `/about#service`, which is the collaborations section. `/projects/bridger` goes to `/work#bridger`.

Home leads with "Good things deserve to happen." Intro and Bridger sit together under that, each with a live screenshot. Three checked facts follow (Senate internship, Crew, Utah Business), then an inquiries line. Dollar figures are not shown. Bridger is a socialization app in a beta of about 25 people. Older user counts are not shown.

`/work/crew` is an eight-section product case study with sourced bullets covering the debit-card program, manufacturing, integrations, commercial research, and the self-drawn brand. The app-design gallery is on, using Brant's real in-product Crew screens. A clear link from that page goes to `/work/crew-brand` for the drawings. Photos in `public/photos` are crops of intro.events and bridger.social. Still missing: a photograph of the Birmingham volunteers. The header is the serif wordmark. The favicon is a square serif B.

## Checks

Recorded on `cursor/crew-articles-final-7a6f` after branching from `origin/main` (includes merged PR #18). Exact commit for the run is the current branch head in the pull request. A pull request is not a launch.

- `npm ci` then `npm test` passed (43 tests), including the nine listed Crew articles with the 2026-11-06 titles and deks, Crew Read more, and Crew page links using those titles.
- `npm run typecheck` passed.
- `npm run lint` passed. Existing `ArticleShelf` `<img>` warnings only.
- `npm run build` passed. Nine `/writing/<slug>` routes remain. Built HTML on `/articles` lists the nine final titles. Built article pages show the dek under the title, `$` as a plain dollar, `<em>` italics for book titles, and no `ARTICLE 0X OF 09` numbering. No em dashes were added. The word "actually" appears only where Brant's final copy uses it.
- `python3 tools/ci/no-stubs` passed.
- `node tools/ci/no-stubs.mjs` failed on pre-existing `content/about-me.md` lines that mention Marriott School and "business strategy" as corrections, not as public page copy. Same matches exist on `origin/main`. Not changed in this PR.
- Local `next start` preview: `/articles`, `/writing/i-made-a-metal-credit-card-that-never-launched`, `/writing/what-happens-when-you-tap-your-card`, and `/work/crew` returned HTTP 200. Did not click through a browser in this environment.
- Search engines are still blocked until `SITE_INDEXABLE=true`.

## Open work

See `ops/DECISIONS-NEEDED.md`. Search indexing stays off until `SITE_INDEXABLE=true`. CRM storage stays off until its env values exist.

The one-page résumé PDF (`public/resume.pdf`) is still pending; until it ships, `publicResume.href` stays null.

Crew app-design screenshots are now on `/work/crew` from files in `public/images/brant-uploads/crew-app-design/`. The source stills remain in `crew-illustrations-in-product/`.

Brant supplied final Crew article copy on 2026-11-06. Titles, deks, and bodies are published as written, including vendor names and figures. Do not silently rewrite them. A production merge is still not a launch.
