# SSF → NOXIA module API

Version 1.0 exposes SSF learning content as structured data so NOXIA can render learning inside the game without embedding SSF HTML.

## List

`GET /api/noxia/modules`

The existing list remains compatible and now adds `pathId` and `detailUrl`. `pathId` is resolved from the SSF learning-path registry; SSF does not maintain a second NOXIA-specific path mapping.

## Detail

`GET /api/noxia/modules/{moduleId}`

Response schema: `SSF-NOXIA-MODULE-1.0`.

The module contains canonical identity/knowledge metadata plus SSF-owned didactic content:

- `id`, `pathId`, `title`, `domain`, `difficulty`, `durationMinutes`, `summary`
- ordered `sections`: `heading`, `text`, `key_point`, `example`, `task`
- `assessment` with `multiple_choice` questions
- `unlocks`
- `prerequisites`
- `sources`
- `schemaVersion`, `contentVersion`
- compatibility `ssfUrl` and machine-readable `detailUrl`

Modules that do not yet have SSF didactic content still return their canonical metadata and empty content/assessment arrays. Consumers must not invent missing curriculum content.

`durationMinutes` prefers SSF didactic duration when available; otherwise the KXF interaction estimate is returned.

## Source-of-truth boundary

The Knowledge Graph remains source of truth for canonical knowledge identity and factual metadata. SSF owns didactic presentation, structured learning content and didactic duration. NOXIA consumes this contract and must not persist a competing curriculum copy.
