# Build plan

Before feature code, discovery and core contracts must be populated and high-risk choices resolved.

## Phase 0: understand and prove the problem
- [ ] Founder why and product promise sourced, not assumed.
- [ ] Users, workflows, alternatives and riskiest assumptions documented.
- [ ] Cheap experiment with objective success and stop conditions.
Done when: desired user outcome and first vertical slice are clear.

## Phase 1: engineering foundations
- [ ] Approved architecture, selected stack, real test commands and CI.
- [ ] Schema, permissions, migration plan, privacy and secrets protections.
- [ ] Design system, component inventory, accessible primitives and stable analytics naming.
- [ ] Error handling, feature flags, backup and monitoring plans.
Done when: reviewer can reproduce foundational test checks.

## Phase 2: one useful vertical slice
- [ ] Entire journey works end-to-end with source-backed behavior, with no stubbed actions; cut the slice rather than stub it.
- [ ] Empty/loading/success/error/unauthorized states and accessible UX.
- [ ] Database and permission behavior tested and analytics firing.
- [ ] Visual QA across target devices and regression coverage.
Done when: an actual user can complete the essential job.

## Further phases
Each phase names goal, dependencies, in-scope screens, data effects, task read pack, reviewer, acceptance criteria, test commands, feature flag, release/rollback and next action. The next phase does not start solely because code compiled.

## Release phase
Only after real CI, privacy/security/performance, backups/restore, owner approval, production roll forward/rollback, live-health verification and checks for failed deployment alerts. Do not label a PR or staging preview Deployed.
