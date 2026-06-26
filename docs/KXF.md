<!--
KUEPER - Solar Science Foundation (SSF)
Path: docs/KXF.md
Repo: github.com/thomaspeterkueper/solarsciencefoundation/blob/main/docs/KXF.md
Name: KXF integration in SSF
Version: 0.1.0
Created: 2026-06-26
Modified: 2026-06-26 18:25 CEST
Depends: lib/kxf.ts
-->

# KUEPER Exchange Format in SSF

KXF is the shared exchange format between KUEPER, kueper.com, SSF, NOXIA and OTA.

SSF does not define the scientific source of truth. It reads KXF records and turns them into learning modules, exercises, mappings and unlocks.

## Current source

The current productive draft lives in the central Knowledge Graph repository:

```text
thomaspeterkueper/kueper-knowledge-graph
exports/kxf-0.1.json
```

SSF reads it through `lib/kxf.ts`. The default URL is the raw GitHub export:

```text
https://raw.githubusercontent.com/thomaspeterkueper/kueper-knowledge-graph/main/exports/kxf-0.1.json
```

This can be overridden later through:

```text
KUEPER_KG_KXF_URL
```

## Adapter endpoints

```text
GET /api/kxf
GET /api/modules
GET /api/modules/[id]
```

`/api/kxf` exposes the source URL, load status, raw KXF payload and the normalised SSF module view.

## Current KXF shape

The Knowledge Graph currently exports records under `records`:

```json
{
  "schema": "KXF-0.1",
  "master": "kueper-knowledge-graph",
  "records": {
    "entities": [],
    "documents": [],
    "learningModules": [],
    "unlocks": [],
    "buildings": [],
    "mappings": []
  }
}
```

## ID normalisation

The Knowledge Graph owns canonical IDs. SSF keeps user-facing route IDs readable.

```text
KXF: LRN:SSF:PHY-1101
SSF: SSF-PHY-1101
```

The adapter maps both directions:

```text
LRN:SSF:PHY-1101 -> SSF-PHY-1101
SSF-PHY-1101     -> LRN:SSF:PHY-1101
```

## SSF reads now

- `records.entities`
- `records.learningModules`
- `records.unlocks`

The first imported module is merged with local didactic data when available. This is intentional: KXF owns canonical identity and mappings; SSF owns the learning presentation until KXF carries localized module text, exercises and didactic metadata.

## SSF writes later

- progress records
- exercise attempts
- membership metadata
- contributor attribution

These records may later be exported back into a KXF-compatible form, but the authoritative science graph remains outside SSF.

## Open Knowledge Graph request

SSF needs bilingual module fields in KXF before large-scale content expansion:

```text
title.de / title.en
summary.de / summary.en
body.de / body.en
exercises[].question.de / exercises[].question.en
exercises[].options.de / exercises[].options.en
```

Until then, SSF will merge KXF identity with local didactic fallback content.
