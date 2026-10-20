# Decisions still needed

The site ships without these. Nothing below was invented.

1. **Intro CRM capture URL.** The /hi form and the contact form post to `INTRO_CRM_CAPTURE_URL` or `CRM_WEBHOOK_URL` when one is set. Until then, submit opens the visitor's email app with the note addressed to me@brantsjohnson.com. A preview submit cannot create a CRM person until that URL is set.
2. **Calendar link** for /hi. Omitted. No link was provided.
3. **Photos.** No gallery. Empty frames were not shipped. Four to six real photos can be added under `public/photos` later.
4. **Crew drawings.** Home and About use an original bridge mark. It is not Crew artwork. Drop the real illustrations in and they can replace the mark.
5. **Substack URL.** Set `SUBSTACK_URL` to the publication root when the feed is real. Until then, Writing stays hidden unless a post is added in `content/writing/posts.ts`. The signup is that publication's subscribe link, and it stays hidden while the variable is unset.
6. **Search indexing.** `app/robots.ts` disallows all crawlers so this preview does not compete with the live Wix site. Flip that at DNS cutover.
7. **Chat budget across servers.** The AI chat reserves about $0.02 per answer and stops at $5 in one server process (`CHAT_MONTHLY_USD`). That cap resets on restart and is not shared across copies. Ask about me still answers from the public notes when no AI key is set, and that path does not spend the budget.
8. **Bridger on LinkedIn-facing pages.** The approved v3 plan puts Bridger on the public site. /hi includes it because both demo URLs returned 200.
9. **Public CV URL.** Set `CV_URL` when a public résumé link is ready. Until then the Experience page has no CV button. The private Drive file is not linked.
