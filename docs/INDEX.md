# Documentation index

This is the task-reading map. A scaffold is only a draft; it does not imply that the founder approved the product, design, or stack.

The numbered files in `docs/` (`00` through `15`, plus `HOSTING-AND-DATA.md` and `BUILD-STATE.md`) and the copy in `content/` already describe this site. `[OPEN]` markers in the newer contract files mean those drafts have not been rewritten from those specs. They do not erase the shipped pages.

## One-minute project digest
- Purpose and audience: [OPEN, from THE-WHY and PRODUCT-VISION]
- User's most important outcome and metric: [OPEN]
- What must never happen: [OPEN]
- Approved platform/stack: [OPEN]
- Phase and next action: see BUILD-STATE.md

## Always-read (Tier 0)
1. AGENTS.md, which binds every coding assistant.
2. This INDEX, including the authority and task-specific reading map.
3. Top of BUILD-STATE.md, which reports verified reality, not intended product state.
4. Read THE-WHY on first orientation, when altering product behavior, or whenever intent is unclear.
Do not load every full spec on every session.

## Permanent document contracts
| Topic and source of truth | File |
|---|---|
| Founder purpose and values | THE-WHY.md |
| Product scope, audience, non-goals | PRODUCT-VISION.md |
| Evidence and assumptions | RESEARCH-AND-VALIDATION.md |
| Screens, interactions and states | FEATURES-AND-FLOWS.md |
| Design tokens and explicit UI locks | DESIGN-SYSTEM.md |
| System modules and interfaces | ARCHITECTURE.md |
| Chosen stack and versions | TECH-STACK.md |
| Schema, sensitive data and access policy | DATA-MODEL.md |
| Threats, security, privacy and consent | SECURITY-AND-PRIVACY.md |
| Agent/tools/models/memory/evals | AI-SYSTEM.md |
| External provider contracts | INTEGRATIONS.md |
| Usage caps and costs | COSTS-AND-LIMITS.md |
| Screens, elements and outcome events | ANALYTICS-TAXONOMY.md |
| Phases and acceptance criteria | BUILD-PLAN.md |
| Automated and manual QA expectations | TEST-PLAN.md |
| Universal done and approval gates | STANDARDS-AND-GATES.md |
| CI, backups, deployment and verification | RELEASE-AND-OPERATIONS.md |
| Accepted decisions and reversals | DECISIONS.md |
| Doc owners, priority, conflict procedure | DOC-GOVERNANCE.md |
| Source/code labeling | LABELING-STANDARD.md |
| File, data, provider and route registry | SCHEMA-MAP.md |
| Actual progress and precise resume point | BUILD-STATE.md |

## Task reading packs (Tier 1, read only relevant files)
- UI/screen: FEATURES-AND-FLOWS, DESIGN-SYSTEM, ANALYTICS-TAXONOMY, TEST-PLAN.
- Backend or schema: ARCHITECTURE, DATA-MODEL, SECURITY-AND-PRIVACY, TEST-PLAN.
- New provider: TECH-STACK, INTEGRATIONS, SECURITY-AND-PRIVACY, COSTS-AND-LIMITS.
- AI model/agent: AI-SYSTEM, DATA-MODEL, COSTS-AND-LIMITS, TEST-PLAN.
- New module/file/table: SCHEMA-MAP, LABELING-STANDARD and owning spec.
- Phase planning: BUILD-PLAN, BUILD-STATE, DECISIONS and the affected feature docs.
- Deploy/infra: RELEASE-AND-OPERATIONS, STANDARDS-AND-GATES and relevant data/security docs.

## Authority and conflict handling
Explicit approved founder decision wins over assumptions. The named authority in the table governs its subject. Legal/privacy/security requirements cannot be overridden by an incidental implementation note. Approved design owns visuals, feature docs own behavior, BUILD-STATE reports evidence but never overrides product intent. Record contradictory claims and request resolution in DECISIONS.md; reconcile all references in the same change.

## Change discipline
Source docs are additive and dated; do not silently shrink or erase accepted decisions. Mark irrelevant topics Not applicable with rationale. The phase build plan and test output must explicitly say what ran, what did not, and what is awaiting approval.
