# SSF contribution materialization

Status: operational publication contract

## Purpose

Approved author contributions are not written directly into static module source files. Publication creates an immutable, versioned SSF snapshot attached to an existing module ID.

This keeps three concerns separate:

- KUEPER Knowledge Graph / KXF remains source of truth for canonical facts, identifiers and dependencies.
- Existing SSF module code remains the baseline didactic implementation.
- Published author contributions are editorially controlled SSF supplements with their own provenance and version history.

## Publication flow

1. Author creates and submits a contribution.
2. Contribution passes scientific and editorial review.
3. Editor approves it.
4. A curator/admin opens `/admin/materialization` and materializes the approved contribution.
5. PostgreSQL creates a row in `published_module_contributions` containing a snapshot of title, summary, body, sources, author, KG request reference and target module.
6. The contribution state changes from `approved` to `published` in the same transaction.
7. The target module page renders the current publication snapshot under “Ergänzende SSF-Beiträge”.

## Versioning

A contribution publication has an integer version. Re-materializing a later approved revision supersedes the previous current snapshot instead of modifying it. Historical snapshots remain stored with `superseded_at` set.

## Safety boundaries

Materialization requires `ROLE:SSF:curator` or `ROLE:SSF:admin` and is checked in PostgreSQL.

A contribution cannot be materialized unless:

- it is in `approved` state;
- `target_module_id` is present;
- if it declares `canonical_change_required`, a `kg_request_ref` is present.

Materialization never changes the KG, KXF module identity, dependencies, unlocks or existing static didactic content. Canonical changes must still be handled through an external task in the Knowledge Graph repository.
