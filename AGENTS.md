# Agent operating instructions

Read docs/INDEX.md and the top of docs/BUILD-STATE.md first. Open the relevant full spec and founder WHY as needed; do not load every document.

Before feature code: research, visualize UX, define data, permissions, schema, analytics, tests and acceptance criteria. Follow docs/STANDARDS-AND-GATES.md.

Never change explicitly locked UI without approval. Keep docs/SCHEMA-MAP.md and ops/HANDOFFS.md current. Reproduce bugs and write regression tests.

Do not invent product choices or claims of a deployment. No secrets or personal data in git or analytics, no cross-project integration by default. Contact/spend/delete/deploy/publish only with applicable approval.


Build each slice working end to end. Never ship stubs, placeholders, sample data or buttons that do nothing; cut scope instead. A stub is allowed only behind a visible default-off feature flag and logged as open work in docs/BUILD-STATE.md. Run python3 tools/ci/no-stubs before every PR.
