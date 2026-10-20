# Standards and gates

## Definition of done
- [ ] Intent and feature match founder-approved scope.
- [ ] Visual design inspected and approved contracts respected.
- [ ] Screens support empty, loading, success, error, locked/permission-denied and relevant offline states.
- [ ] Back, share, links, undo, keyboard and accessibility behavior work.
- [ ] Data validation, privacy, authorization, consent, deletion and tenant isolation tested.
- [ ] Semantic IDs and outcome events are registered without leaking PII.
- [ ] Source labeling and SCHEMA-MAP updated.
- [ ] Reproduced bugs have retained regression tests.
- [ ] Real unit, integration and appropriate end-to-end checks passed; commands and revision recorded.
- [ ] No unaudited API cost, secret, dependency, migration or production impact.
- [ ] BUILD-STATE and HANDOFFS updated with exact next task.
- [ ] Every main action in the slice works end to end against a real or real-shaped backend (real API, local store with the production schema, or provider sandbox with the same contract).
- [ ] No TODO, mock, stub, placeholder or sample-data path is reachable in shipped UI. Fixtures live only in tests. No button without a handler.
- [ ] The acceptance test clicks each main action and checks the visible and stored or sent result.
- [ ] Anything not real yet is behind a visible, default-off feature flag and listed in BUILD-STATE "Open work" and the PR "mocked" section.
- [ ] If the slice was too big to make real, it was cut smaller instead of stubbed.
- [ ] `python3 tools/ci/no-stubs` passes.

## Required approval
Owner confirmation for policy/legal, priorities, budget/paid vendors, production permissions/auth changes, data loss, public publishing/contacting, secret creation, cross-project data sharing, deploys and changes to founder-locked UI. Note exact granted permissions rather than inventing perpetual access.

## Security/privacy
Never commit tokens or env values. Deny by default. Validate RLS or equivalent access boundaries and data deletion. Do not send PII to logs, analytics or AI except through approved policy and consent.

## Accessibility and UI
Target WCAG 2.2 AA where applicable, keyboard focus and screen readers, sufficient contrast, adequate touch targets, reduced motion and dynamic text. Verify on representative target platforms.

## Release evidence
A green PR does not prove deployment. Report live revision, smoke tests and failure-alert readback. If any cannot be checked, status is pending verification.
