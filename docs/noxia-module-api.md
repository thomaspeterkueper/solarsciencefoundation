# SSF → NOXIA module API

Version 1.1 exposes SSF learning content as structured data so NOXIA can render learning inside the game without embedding SSF HTML.

## List

`GET /api/noxia/modules`

The existing list remains compatible and adds `pathId` and `detailUrl`. `pathId` is resolved from the SSF learning-path mapping; SSF does not maintain a competing NOXIA curriculum identity.

## Detail

`GET /api/noxia/modules/{moduleId}`

Response schema: `SSF-NOXIA-MODULE-1.0`. `contentVersion` is `1.1` when interactive sections are supported.

The module contains canonical identity/knowledge metadata plus SSF-owned didactic content:

- `id`, `pathId`, `title`, `domain`, `difficulty`, `durationMinutes`, `summary`
- ordered `sections`: `heading`, `text`, `key_point`, `example`, `task`, `interactive`
- `assessment` with `multiple_choice` questions
- `unlocks`
- `prerequisites`
- `sources`
- `schemaVersion`, `contentVersion`
- compatibility `ssfUrl` and machine-readable `detailUrl`

### Interactive section

An `interactive` section is structured content, not SSF UI markup:

```json
{
  "type": "interactive",
  "interactiveId": "gravitationsbrunnen",
  "title": "Gravitationsbrunnen visualisiert",
  "instruction": "…",
  "params": {
    "bodies": [{ "id": "erde", "label": "Erde", "massKg": 5.9722e24, "radiusM": 6371000 }],
    "distance": { "unit": "body_radii", "min": 1, "max": 10, "step": 0.1, "default": 1 },
    "testMassKg": 1000,
    "constants": { "G": 6.6743e-11 }
  },
  "fallback": "…"
}
```

Consumers render from `params`. If the client has no renderer for the stable `interactiveId`, it must show `fallback` instead of an empty placeholder. No iframe or external navigation is required.

For **Energie & Arbeit / Gravitationsbrunnen**, the canonical KG mapping is:

- module: `PHY-L2-000005`
- consumer identity: `LRN:SSF:PHY-ENERGIE-ARBEIT-0001`
- learning path: `PATH:SSF:PHY-ENERGIE-ARBEIT-0001`
- interactive: `gravitationsbrunnen`

Modules that do not yet have SSF didactic prose can still return canonical metadata and structured interactives when a canonical SSF learning path supplies one. Consumers must not invent missing curriculum content.

`durationMinutes` prefers SSF didactic duration when available; otherwise the KXF interaction estimate is returned.

## Source-of-truth boundary

The Knowledge Graph remains source of truth for canonical knowledge identity and factual metadata. SSF owns didactic presentation, structured learning content and didactic duration. NOXIA consumes this contract and must not persist a competing curriculum copy.
