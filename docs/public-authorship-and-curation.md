# Public authorship and Foundation curation

Status: initial operational model

## Public author profiles

Public author profiles are opt-in and separate from private account profiles. A contributor may maintain a public name, slug, short biography, expertise and optional HTTP(S) website. `is_public=false` is the default. Private email addresses and other account data are never part of the public profile table.

The public directories are:

- `/authors` and `/authors/{slug}`
- `/de/authors` and `/de/authors/{slug}`

An author page lists only the author's current materialized SSF publication snapshots. Superseded publication versions remain part of the editorial history but are not presented as current contributions.

## Editorially curated surfaces

Publication and promotion are different decisions. Materializing a contribution makes it a reviewed SSF publication; it does not automatically promote that contribution on the Foundation or home page.

Curator/admin accounts can select current publication snapshots under `/admin/foundation-features` for one of two placements:

- `foundation` — the broader "From the Foundation / Aus der Foundation" area;
- `home` — a smaller current-selection area on the start page.

Selections can carry an editorial note and explicit sort order. If a publication is superseded by a later version, the old selected snapshot is no longer shown as current. The new version must be deliberately selected if it should remain promoted.

## Source-of-truth boundary

These features are SSF publication metadata only. They do not modify KXF identities, canonical KG facts, dependencies, learning unlocks or NOXIA gameplay. Canonical scientific changes continue to require a request in the Knowledge Graph repository under `external-tasks/open/`.
