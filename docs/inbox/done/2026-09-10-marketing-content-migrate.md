# 2026-09-10 Marketing content migrate

## What's needed
Fold the official marketing-content brief into the existing personal-site UI pass. Do not replace the scaffold. Copy lives under `content/`. Magic Patterns links stay design references only.

## Why
Keep Home, About, Projects, Writings, and Contact honest to LinkedIn and the CV, and stop contact details or chatbot backend from leaking onto the rest of the site.

## Where it likely fits
`app/(marketing)/`, `components/{ui,sections,motion,chatbot}`, `content/`, `styles/tokens.css`. Chat stays a glass shell in `components/chatbot`. `BrantChat/` stays untouched.

## Done when
The checklist below is true, `npm run lint` and `npm run build` are green, and the PR notes preview or deploy steps.

## Checklist

- [x] Home eyebrow: Product-minded founder
- [x] Home hero: I build technology as a bridge to real human connection.
- [x] Home primary CTA: About or See projects only (no second Contact CTA)
- [x] Nav Contact goes to `/contact`, not mailto
- [x] Chat pill: Ask about my work.
- [x] Currently building: Intro featured, plus Bridger and Filibusters
- [x] Crew proof chip is scannable: $2.5M, self-taught art, hand-drawn, dark mode, about $110k and 350+ hrs internalized design
- [x] Utah Business Magazine: Oct 2024 to Nov 2025 (not Present)
- [x] LinkedIn/CV titles over Wix (Principal PM Crew; Divvy Product Management Analyst; and the rest of the CV timeline)
- [x] Writings = Blog + Poetry as a subsection, not a top-level Poetry tab
- [x] Photography stub with an honest empty state
- [x] Civic Engagement stub with an honest empty state, systems and process, not partisan
- [x] Contact is the only place the email appears: me@brantsjohnson.com
- [x] Chat is a glass shell only in `components/chatbot`; leave `BrantChat/` alone
- [x] No fake Bridger OAuth; optional static Now placeholders only
- [x] Magic Patterns links remain design references only
- [x] Build and lint green; PR includes preview or deploy steps

Completed: LinkedIn titles (Divvy Product Management Analyst; BackLocal Founder and Product Manager), Crew proof chips, Civic stub empty state, README lint and Vercel preview steps.
