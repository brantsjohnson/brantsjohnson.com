# 13. Job Application Assistant (Admin Tool)

**Plain English purpose:** This defines a private, admin-only tool where you paste a job posting (a URL or the raw requirements text) and it drafts a tailored resume and cover letter in your voice, using Claude, following the no-dashes and no-filler rules everywhere else on this site. This is a tool for you, not a public site feature.

---

## 1. What it does

1. You go to `app/admin/job-assistant`.
2. You paste either a job posting URL or the raw text of the role's requirements.
3. If a URL is given, the server fetches and extracts the posting's text (title, company, requirements, responsibilities).
4. The tool sends the job requirements, your base resume, your base cover letter template, and your `knowledge_base` content (the private dataset, since it likely has detail beyond what's on a public resume) to Claude via the API, with an explicit instruction set (see §3).
5. Claude returns a tailored resume draft and a tailored cover letter draft.
6. Both are shown to you for review and editing before you use them anywhere, this tool never auto-submits an application.

---

## 2. Data model

| Table | Holds |
|---|---|
| `resume_base` | Your canonical, maintained resume content (structured: roles, dates, bullet points, skills), the source of truth this tool tailors from. |
| `cover_letter_template` | Your base voice/structure for a cover letter, not a generic template, your actual starting point. |
| `job_applications` | One row per application: job title, company, posting URL or pasted text, generated resume draft, generated cover letter draft, status (`drafted`, `edited`, `submitted`), timestamps. |

This lives entirely in the admin-only part of the schema, same protection level as `knowledge_base` and `agent_instructions` per `11-AI-AGENT-CONFIG-SECURITY.md`, this is personal job-search data, not public content.

---

## 3. The instruction set sent to Claude for this task

Concrete and explicit, since this is a real, consequential piece of writing:

- Use `resume_base` and `cover_letter_template` as ground truth for facts, never invent experience, skills, or dates not present in the source material.
- Tailor emphasis and ordering to the specific job requirements provided, surfacing the most relevant experience first, without fabricating relevance that isn't there.
- Follow `03-CONTENT-VOICE-GUIDELINES.md` exactly: no dashes anywhere, no filler, no AI-sounding phrasing, written the way you'd actually say it.
- Match your established voice (pull a short voice sample from `resume_base`/`cover_letter_template` into the prompt so tone stays consistent across applications).
- Output the resume and cover letter as clearly separated, clean text blocks the admin UI can render into editable fields, not prose describing what it did.

---

## 4. Review and safety

- Nothing generated here is ever published to the public site or auto-sent anywhere. It's a draft in the admin portal, always human-reviewed before use.
- Every generation is logged in `job_applications` so you can see your history of applications and reuse/compare past tailored versions.
- This feature is behind its own feature flag and counts toward the same admin authentication requirements as the rest of `/admin`.
