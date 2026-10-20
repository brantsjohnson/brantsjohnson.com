# Decisions still needed

The site ships without these. Nothing below was invented.

1. **Intro CRM capture URL.** The /hi form and the contact form post to `INTRO_CRM_CAPTURE_URL` or `CRM_WEBHOOK_URL` when one is set. Until then, submit opens the visitor's email app with the note addressed to me@brantsjohnson.com. A preview submit cannot create a CRM person until that URL is set.
2. **Calendar link** for /hi. Omitted. No link was provided.
3. **Photos.** No gallery. Empty frames were not shipped. Four to six real photos can be added under `public/photos` later.
4. **Crew drawings.** Home and About use an original bridge mark. It is not Crew artwork. Drop the real illustrations in and they can replace the mark.
5. **Substack or newsletter URL.** Writing is ready for government reform essays and for letters mirrored one day later. No feed URL was confirmed, so no posts were invented. Add a real entry in `content/writing/posts.ts`.
6. **Search indexing.** `app/robots.ts` disallows all crawlers so this preview does not compete with the live Wix site. Flip that at DNS cutover.
7. **Chat budget across servers.** The AI chat reserves about $0.02 per answer and stops at $5 in one server process (`CHAT_MONTHLY_USD`). That cap resets on restart and is not shared across copies. Ask about me still answers from the public notes when no AI key is set, and that path does not spend the budget.
8. **Bridger on LinkedIn-facing pages.** The approved v3 plan puts Bridger on the public site. /hi includes it because both demo URLs returned 200.
