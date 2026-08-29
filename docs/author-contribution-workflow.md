# SSF author contribution workflow

Status: operational model

## Scope

Authors contribute to the SSF-owned didactic layer: explanations, examples, exercises, learning sequences, source notes and module-oriented educational material. Canonical scientific facts, identifiers and dependency changes remain owned by the KUEPER Knowledge Graph.

## States

1. `draft` — editable by the author.
2. `submitted` — author has submitted the contribution.
3. `scientific_review` — scientific/didactic review is active.
4. `revision_requested` — author must revise; a review note is mandatory.
5. `editorial_review` — scientific review is complete and editorial fit is checked.
6. `approved` — editorially approved but not yet public.
7. `published` — approved SSF learning-layer contribution.
8. `archived` — retained but no longer active.
9. `rejected` — editorially closed without publication.

Authors can edit only `draft` and `revision_requested`. Review transitions require `ROLE:SSF:curator` or `ROLE:SSF:admin`.

## Canonical-change boundary

A contribution can explicitly declare `canonical_change_required=true`. Such a contribution cannot be submitted until `kg_request_ref` points to the corresponding request in the Knowledge Graph repository. SSF never performs the KG change itself.

## Publication semantics

`approved` and `published` are deliberately separate. Approval confirms that the contribution is ready; publication is the explicit act that makes it part of the active SSF learning layer. The workflow does not automatically mutate existing KXF modules or learning paths yet. That integration should be a later controlled publication step once contribution-to-module mapping is finalized.

## Audit trail

Every submission and editorial transition is recorded in `author_contribution_events` with actor, previous state, next state, note and timestamp.
