# Decisions still needed

The site ships without these. Nothing below was invented. Items marked TODO are questions for Brant.

1. **Intro CRM capture.** The /hi form and the contact form post to `INTRO_CRM_CAPTURE_URL` only when `INTRO_CRM_CAPTURE_SECRET` is also set. The secret is sent as the `x-intro-capture-secret` header. Until both are set, submit opens the visitor's email app with the note addressed to me@brantsjohnson.com. A preview submit cannot create a CRM person until that pair is set. TODO(brant): send the capture URL and a shared secret.
2. **Calendar link.** Resolved. Book time uses https://calendar.app.google/qj9tb56BYCdppJPk9 on /hi, Contact, and the home close.
3. **Photos still needed.** Speaking, the podium, the archway, the scholarship, and an Intro product screen are on the site. Still missing: a photograph of the Birmingham volunteers. TODO(brant): send that photo if you want it on the Work or About page. The circle logo is not used.
4. **Crew drawings.** Not on the site. Do not invent them.
5. **Substack URL.** Set `SUBSTACK_URL` to the publication root when the feed is real. Writing stays hidden until local posts and feed items together reach two. The signup is that publication's subscribe link, and it stays hidden while the variable is unset. TODO(brant): send the publication URL, or leave Writing off.
6. **Search indexing.** `app/robots.ts` disallows all crawlers until `SITE_INDEXABLE=true`. That stays off so this preview does not compete with the live Wix site. TODO(brant): set the flag at DNS cutover. Domain cutover stays with you.
7. **Chat budget across servers.** The AI chat cap is `CHAT_MONTHLY_USD` in one server process. That cap resets on restart and is not shared across copies. Ask about me still answers from the public notes when no AI key is set.
8. **Bridger on the public site.** Resolved. Home, Work, About, Now, Ask, and /hi name it as a socialization app in a beta of about 25 people, with a link to https://bridger.social. The role on the record is Founder, April 2025 to present. No screen was sent, so none is shown. Older user counts and dollar amounts stay off the site.
9. **Public CV URL.** Set `CV_URL` when a public résumé link is ready. Until then the Work page has no CV link. TODO(brant): send a public file URL. The private Drive file is not linked.
10. **Homepage headline.** Every visitor sees "I build technology as a bridge to real human connection." The three alternate lines remain in `lib/hero-experiment.ts` and can be previewed with `?hero=a`, `?hero=b`, or `?hero=c`. The site does not set a headline cookie. TODO(brant): pick a different public line if you want one.
11. **Themes from the redo plan.** Self-sabotage, the 80/20, and friction are named in the plan and are not written out as public sentences in this repo, so they are not on the site. TODO(brant): send the sentences if you want them on Now.
12. **Monthly Now note.** /now says he is building Intro and Bridger, and that he is open to relocating. TODO(brant): replace that with your own note for the month.
