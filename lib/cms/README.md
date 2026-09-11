# lib/cms

Functions that fetch public content (projects, media, links, flags) from the `site` schema in Supabase. Pages call these helpers instead of querying the database directly. No UI lives here.

Referral home variants: `referral-variant.ts`, `get-active-referral-variant.ts` (see `docs/15-REFERRAL-SITE-VARIANTS.md`).
