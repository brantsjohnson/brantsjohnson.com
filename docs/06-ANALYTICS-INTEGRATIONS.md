# 06. Analytics & Tracking

**Plain English purpose:** This doc defines what gets tracked, where the tracking code lives, and how new tracking gets added consistently instead of scattered ad hoc across pages.

---

## 1. Where tracking code lives

- All tag/pixel scripts (GA4, a Meta-style pixel, any future tag) load from a single component: `components/analytics/AnalyticsScripts.tsx`, included once in the root layout. Never paste a tracking script directly into an individual page.
- Each script is gated by an environment variable and an admin portal feature flag (see `07-FEATURES-ADMIN-CMS.md`), so any tag can be turned on or off without a code deploy.
- Every tracked event is fired through one helper, `lib/integrations/analytics.ts` (e.g. `trackEvent("project_card_clicked", { projectId })`), not scattered `gtag()` calls throughout components. This keeps the full list of tracked events discoverable in one file.

---

## 2. What gets tracked at minimum

**Page level (automatic via GA4):**
- Page views, referrer/source, device type, rough geography.

**Search and navigation:**
- Site search queries (what people search for on-site, if a search feature exists).
- Nav clicks: which top-level tabs get used.
- Filter usage: which project/media filters get applied and how often.

**Engagement:**
- Scroll depth per page (helps you know if the "reveal on scroll" content is actually being seen).
- Chatbot: message sent, and (without logging the private dataset content itself) which general topic area the question fell into, so you can see what people are curious about.
- Outbound clicks: every social link, every "view project" external link, tagged with which one was clicked.
- Contact form: started, submitted, and if possible, abandoned (started but not completed).

**Conversion-style events:**
- Contact form submitted.
- Newsletter/Substack link clicked.
- Resume/CV download, if present.

---

## 3. Event naming convention

`noun_verb_past_tense`, lowercase, underscores. Examples: `project_card_clicked`, `contact_form_submitted`, `social_link_clicked`, `chatbot_message_sent`. Keep a running list in `lib/integrations/analytics.ts` as a single exported object so there's never a second, slightly-different name for the same event.

---

## 4. Dashboards you'll actually want

- **Traffic sources**: where visitors come from (direct, social, referral, AI answer engines where detectable via referrer).
- **Top content**: which projects/pages get the most engagement.
- **Chatbot topics**: rough clustering of what people ask about.
- **Funnel**: page view → engaged (scrolled/clicked something) → contact form started → submitted.

---

## 5. Future integrations

- **PostHog** (or similar): optional, for session replay and more detailed funnels. Same gating pattern as GA4, added as its own toggle in the admin portal, not hardcoded on.
- **CRM webhook**: contact form submissions and (optionally) meaningful chatbot conversations can push a lead record into your personal CRM or Uspot, see `07-FEATURES-ADMIN-CMS.md` §6.

---

## 6. Privacy note

Add a short, honest privacy note (not a wall of legal text) describing what's tracked. This also matters for AI legibility and trust, per `05-SEO-GEO-AI-SEARCH-STRATEGY.md`, since a site that's transparent about its own data reads as more credible to both people and models.
