# Decisions still needed

The site ships without these. Nothing below was invented. Items marked TODO are questions for Brant.

1. **Intro CRM capture.** The /hi form and the contact form post to `INTRO_CRM_CAPTURE_URL` only when `INTRO_CRM_CAPTURE_SECRET` is also set. The secret is sent as the `x-intro-capture-secret` header. Until both are set, submit opens the visitor's email app with the note addressed to me@brantsjohnson.com. A preview submit cannot create a CRM person until that pair is set. TODO(brant): send the capture URL and a shared secret.
2. **Calendar link.** Resolved. Book time uses https://calendar.app.google/qj9tb56BYCdppJPk9 on /hi, Contact, and the home close.
3. **Photos still needed.** The old speaking, podium, archway, and scholarship photographs are off the site. Intro and Bridger use fresh crops of the live sites. Still missing: a photograph of the Birmingham volunteers. TODO(brant): send that photo if you want it on About. The circle logo is not used.
4. **Crew drawings.** Not on the site. Do not invent them.
5. **Substack URL.** Set `SUBSTACK_URL` to the publication root when the feed is real. Writing stays hidden until local posts and feed items together reach two. The signup is that publication's subscribe link, and it stays hidden while the variable is unset. TODO(brant): send the publication URL, or leave Writing off.
6. **Search indexing.** `app/robots.ts` disallows all crawlers until `SITE_INDEXABLE=true`. That stays off so this preview does not compete with the live Wix site. TODO(brant): set the flag at DNS cutover. Domain cutover stays with you.
7. **Chat budget across servers.** The AI chat cap is `CHAT_MONTHLY_USD` in one server process. That cap resets on restart and is not shared across copies. Ask about me still answers from the public notes when no AI key is set.
8. **Bridger on the public site.** Resolved. Home and Work show it beside Intro, with a live screenshot of bridger.social. About, Now, Ask, and /hi name it as a socialization app in a beta of about 25 people, with a link. The role is Founder, April 2025 to present. Older user counts and dollar amounts stay off the site.
9. **Public CV.** Resolved. The file is `public/cv.pdf`, linked as Public CV from Work, About, and /hi. The private Drive file is not linked.
10. **Homepage headline.** Resolved. Every visitor sees "Good things deserve to happen." The old `?hero=` alternates are not shown.
11. **Themes from the redo plan.** Self-sabotage, the 80/20, and friction are named in the plan and are not written out as public sentences in this repo, so they are not on the site. TODO(brant): send the sentences if you want them on Now.
12. **Monthly Now note.** /now says he is building Intro and Bridger, and that he is open to relocating. TODO(brant): replace that with your own note for the month.
