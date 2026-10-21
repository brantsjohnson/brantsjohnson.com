# Decisions still needed

The site ships without these. Nothing below was invented.

1. **Intro CRM capture URL.** The /hi form and the contact form post to `INTRO_CRM_CAPTURE_URL` or `CRM_WEBHOOK_URL` when one is set. Until then, submit opens the visitor's email app with the note addressed to me@brantsjohnson.com. A preview submit cannot create a CRM person until that URL is set.
2. **Calendar link** for /hi. Omitted. No link was provided.
3. **Photos still needed.** The archway, Brant speaking, the scholarship, and the logo are in `public/photos`. Still missing: a photograph of the Birmingham volunteers, and Bridger screens. Do not invent either one.
4. **Crew drawings.** Not on the site. Do not invent them.
5. **Substack URL.** Set `SUBSTACK_URL` to the publication root when the feed is real. Writing stays hidden until local posts and feed items together reach two. The signup is that publication's subscribe link, and it stays hidden while the variable is unset.
6. **Search indexing.** `app/robots.ts` disallows all crawlers so this preview does not compete with the live Wix site. Flip that at DNS cutover.
7. **Chat budget across servers.** The AI chat reserves about $0.02 per answer and stops at $5 in one server process (`CHAT_MONTHLY_USD`). That cap resets on restart and is not shared across copies. Ask about me still answers from the public notes when no AI key is set, and that path does not spend the budget.
8. **Bridger on the public site.** The approved v3 plan puts Bridger on the public site. It is on Home and Work. /hi does not repeat it.
9. **Public CV URL.** Set `CV_URL` when a public résumé link is ready. Until then the Work page has no CV link. The private Drive file is not linked.
