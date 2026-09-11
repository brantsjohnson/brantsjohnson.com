# components/sections

Page-level building blocks. A section is opinionated about layout for one part of a page. If something is reusable everywhere, it belongs in `components/ui` instead.

Current sections:

- `SiteHeader/` sticky top bar: full-name serif wordmark plus the primary navigation (Home, BrantChat, Experience, Service, Leadership, Skills, About). BrantChat opens the chat panel instead of loading a page.
- `SiteFooter.tsx` bottom bar: wordmark, the quieter secondary links, and the copyright line.
- `Hero.tsx` home hero: full name, referral variant headline and body when applicable, and chat plus experience calls to action (`docs/15-REFERRAL-SITE-VARIANTS.md`).
- `ProofChips.tsx` home row of proof stats (starts with the Crew Finance chip).
- `PhotoMosaic.tsx` home photo gallery, with reserved frames until real photos are added.
- `HomeSections.tsx` home doorway cards into the main sections.
- `SecurityFocus.tsx` home security, compliance, or privacy and trust block per referral variant.
- `Now.tsx` Bridger tastes panel on the home page.
- `PageIntro.tsx` shared inner-page header (eyebrow, title, optional summary).
- `Timeline.tsx` shared timeline used by Experience, Service, and Leadership.
- `SkillsGrid.tsx` grouped skills cards for the Skills page.
- `ProjectGrid.tsx` project cards. Live work is linked; unfinished work shows a coming-soon tag and is never linked.
