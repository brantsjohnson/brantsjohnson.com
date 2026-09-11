# 15. Referral-Based Home Variants

**Plain English purpose:** One Next.js app serves brantsjohnson.com. The home hero and focus lines change based on how someone arrived, so social followers see connection-first copy, LinkedIn and X visitors see AI craft positioning, and everyone else sees the default founder PM story. ChatGPT and Claude links use the default variant.

---

## 1. Variants

| Variant id | When it applies | Voice |
|---|---|---|
| `default` | Direct visits, unknown sources, ChatGPT, Claude, OpenAI, Anthropic, Perplexity, Gemini | People-first founder PM. Light AI only where it is true. |
| `social` | `src` or `utm_source` of `ig`, `instagram`, `threads`, `tiktok`, `substack`, or path `/from/{same}` | No AI, agentic, or LLM jargon. Connection, Bridger and Intro, co-ops, Filibuster. Required hero headline about technology bringing people together. |
| `linkedin_x` | `linkedin`, `x`, `twitter`, or `/from/{same}` | AI and agentic craft. People matter in an AI world. |

Copy lives in `content/referral-variants.ts`. Detection logic lives in `lib/cms/referral-variant.ts`.

---

## 2. How traffic is tagged

**Query parameters (any marketing URL):**

- `?src=ig` (preferred short form for link-in-bio)
- `?utm_source=threads` (standard campaign links)

**Path shortcut (redirects to `/` and sets the same cookies):**

- `/from/ig`
- `/from/threads`
- `/from/tiktok`
- `/from/substack`
- `/from/linkedin`
- `/from/x`

Aliases: `instagram` maps to social, `twitter` maps to `linkedin_x` (same as `x`).

---

## 3. Persistence

Middleware sets two cookies for 30 days (renewed when a qualifying link is used again):

- `bj_referral_variant`: `default`, `social`, or `linkedin_x`
- `bj_referral_source`: normalized source slug (for analytics wiring in `06-ANALYTICS-INTEGRATIONS.md`)

The home page reads query params first on the same request, then the cookie, via `getActiveReferralVariant()` in `lib/cms/get-active-referral-variant.ts`.

---

## 4. Example share links

- Instagram bio: `https://brantsjohnson.com/from/ig` or `https://brantsjohnson.com/?src=ig`
- LinkedIn post: `https://brantsjohnson.com/?utm_source=linkedin`
- Newsletter: `https://brantsjohnson.com/from/substack`
- ChatGPT citation: no special link required; `?src=chatgpt` still resolves to **default**

---

## 5. Implementation map

| Piece | Location |
|---|---|
| Copy | `content/referral-variants.ts` |
| Content-locked security lines | `content/security-site-lines.ts` |
| Resolve source and variant | `lib/cms/referral-variant.ts` |
| Server read for pages | `lib/cms/get-active-referral-variant.ts` |
| Cookies and `/from/*` redirect | `middleware.ts` |
| Hero UI | `components/sections/Hero.tsx` |
| Security / privacy block | `components/sections/SecurityFocus.tsx` (copy in `securityFocus` on each variant) |
| Wired on home | `app/(marketing)/page.tsx` |
| About page security narrative | `content/about-security.ts` on `/about` |

The hero root element exposes `data-referral-variant` for future analytics or styling. Do not add variant-specific photos (for example, do not invent a Mitt photo for social).

**Security and compliance copy:** `default` and `linkedin_x` use technical security language (SOC 2 aligned controls, encryption, auditability, and for `linkedin_x` AI data protections). `social` uses privacy and trust wording only. Do not claim a completed SOC 2 certification unless an authoritative source elsewhere on the site proves it. Prefer aligned controls, readiness, and operating practices.

---

## 6. Content rules checklist (social variant)

Before editing `social` copy in `content/referral-variants.ts`:

- [ ] No AI, agentic, or LLM wording
- [ ] Hero headline matches the required connection line
- [ ] No dashes used as punctuation (see `03-CONTENT-VOICE-GUIDELINES.md`)
