# Labeling standard

The goal is to understand code, not to add boilerplate on every obvious line. Every substantial file, module and critical code region must have a searchable plain-English purpose.

## File header convention
WHAT: the behavior or product job of this file.
FITS: the module and larger user flow it belongs to.
IN/OUT: accepted data, outputs and side effects.
DOCS: exact canonical contracts that govern it.
OWNER: responsible module/team.
Generated, vendor, and config files may be exempted with a listed reason.

## Semantic identifiers
- Names describe product meaning, not visual color, ordinal position or implementation accident.
- A canonical component exists for each repeated UI job.
- Screens and actions use stable screen.section.element analytics IDs.
- Folder names, table names and services have human labels in SCHEMA-MAP.md.
- Comments explain invariants, risks, permissions, edge cases or non-obvious decisions, never repeat simple syntax.

## Code regions
Use readable section comments for multi-part logic: AUTHORIZATION, DATA WRITE, RETRY, POLICY, ANALYTICS, CLEANUP, UI STATE. Annotate trust boundaries and privacy-sensitive fields.

## Change gate
Any new folder, file family, schema table, route or provider updates SCHEMA-MAP.md at the same time.
