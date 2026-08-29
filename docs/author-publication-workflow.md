# SSF author publication workflow

Status: operational workflow

## Working model

SSF authors create didactic contributions without directly changing canonical KXF/KG data. A contribution moves through draft, review, editorial approval and a separate materialization step. Materialization creates an immutable publication snapshot attached to an existing SSF module.

## Preview

Authors see a live approximation of the contribution in the later module presentation while editing. Editors use the same presentation component when reviewing, so the working copy is evaluated in a learner-facing context rather than only as raw Markdown.

The target module can be opened separately during authoring and review. The preview does not modify the target module.

## Publication provenance

Every newly materialized snapshot records, where available:

- the author's display name as a publication-time snapshot;
- the latest scientific-review actor associated with the contribution;
- the editorial approver;
- the curator/admin who performed materialization;
- review and editorial notes as publication-time snapshots;
- the KG external-task reference when canonical work is required.

The display-name fields are snapshots. Later profile-name changes do not rewrite already published attribution.

## Revisions after publication

A published contribution can be reopened by a curator/admin with a required revision note. Reopening changes the working contribution to `revision_requested` but leaves the current published snapshot untouched and publicly visible.

The author edits the working contribution and submits it through the normal scientific and editorial review cycle again. Only after a new approval can it be materialized. Materialization then:

1. marks the former snapshot as superseded;
2. creates the next immutable version for the same contribution;
3. makes the new snapshot the public current version.

This makes the `version` field operational instead of decorative.

## Version comparison

Curators/admins can load the complete publication history through a guarded PostgreSQL function. The editorial UI shows the newest and previous materialized versions side by side. Superseded snapshots are not exposed through the normal public table policy.

## Source-of-truth boundary

Published contributions supplement SSF didactics only. They never overwrite:

- KXF module identity;
- canonical KG scientific facts;
- dependencies or prerequisite canon;
- NOXIA gameplay logic or unlock semantics.

If a contribution requires a canonical scientific change, it must reference a request in the Knowledge Graph repository under `external-tasks/open/`. SSF remains source of truth only for its didactic and editorial layer.
