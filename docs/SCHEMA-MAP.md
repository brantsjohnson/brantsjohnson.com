# Schema map

Plain-English directory, component, data and service registry. Add rows in the same change as the code. Do not silently delete rows. Mark removed things Removed with date and reason.

## Repository roots
| Path | Human label | Purpose | Owner | Status |
|---|---|---|---|---|
| AGENTS.md | Rules front door | Permanent instructions | founder | Active |
| CLAUDE.md | Claude entrypoint | Delegates to AGENTS | founder | Active |
| .cursor/rules/ | Cursor guardrails | Concise always-on rules | founder | Active |
| docs/ | Permanent contracts | Product and engineering truth | both | Active |
| ops/ | Working memory | Tasks, bugs, decisions, handoffs | both | Active |
| src/ | [OPEN: app source] | [OPEN] | engineer | Planned |
| tests/ | [OPEN: automated checks] | [OPEN] | engineer | Planned |

## Data objects
| Table or collection | Label | Fields / doc | Sensitivity | Reads | Writes | Retention |
|---|---|---|---|---|---|---|
| [OPEN] | | DATA-MODEL.md | | | | |

## Screens and reusable components
| Route / canonical component | Label | Design source | Implementation path | Approved or locked? | Owner |
|---|---|---|---|---|---|
| [OPEN] | | | | No by default | |

## Providers and processes
| Service | Label | Purpose | Env variable NAMES only | Owner | Fallback |
|---|---|---|---|---|---|
| [OPEN] | | | | | |

## Updates
When creating, moving or removing an item: update this map, owning spec, analytics event registry and relevant tests. All unknown design decisions stay [OPEN].

## This site, recorded 2026-10-20
The rows above are the starter-kit draft. These rows name what this repository already ships. App source lives in `app/`, `components/`, and `lib/`, not in `src/`.

| Route | What it is | Shown when |
|---|---|---|
| `/` | Home | Always |
| `/work` | Intro, Bridger, then the experience timeline | Always |
| `/about` | Story and service, including the archway and the scholarship | Always |
| `/contact` | Contact note | Always |
| `/ask` | Full-page Ask conversation | Always. Linked from the header |
| `/writing` and `/writing/[slug]` | Essays and letters | At least two real posts |
| `/hi` | Unlisted event follow-up | Not in the nav |

| Env name | Purpose |
|---|---|
| `SUBSTACK_URL` | Publication root. Feed is `{url}/feed`. Signup is `{url}/subscribe` |
| `CV_URL` | Public CV link. Work shows "Open the CV" only when this is an https URL |
| `INTRO_CRM_CAPTURE_URL` or `CRM_WEBHOOK_URL` | When set, contact and /hi notes are posted there and /hi may say they are stored |
