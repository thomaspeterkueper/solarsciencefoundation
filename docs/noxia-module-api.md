# SSF → NOXIA module API

Version 1.1 exposes SSF learning content as structured data so NOXIA can render learning inside the game without embedding SSF HTML and without opening a separate browser tab.

## List

`GET /api/noxia/modules`

The existing list remains compatible and adds `pathId` and `detailUrl`. `pathId` is resolved from the SSF learning-path registry; SSF does not maintain a second NOXIA-specific path mapping.

## Detail

`GET /api/noxia/modules/{moduleId}`

Response schema: `SSF-NOXIA-MODULE-1.0`, `contentVersion: "1.1"`.

The module contains canonical identity/knowledge metadata plus SSF-owned didactic content:

- `id`, `pathId`, `title`, `domain`, `difficulty`, `durationMinutes`, `summary`
- ordered `sections`: `heading`, `text`, `key_point`, `example`, `task`, `interactive`
- `assessment` with `multiple_choice` questions
- `unlocks`
- `prerequisites`
- `sources`
- `schemaVersion`, `contentVersion`
- compatibility `ssfUrl` and machine-readable `detailUrl`

Modules that do not yet have SSF didactic content still return their canonical metadata and empty content/assessment arrays. Consumers must not invent missing curriculum content.

`durationMinutes` prefers SSF didactic duration when available; otherwise the KXF interaction estimate is returned.

## Interactive sections (contentVersion 1.1)

`contentVersion: "1.0"` payloads never contain `interactive` sections — consumers can gate their renderer on the version. SSF is the source of truth for the interaction's content, didactics and parameters; NOXIA builds only the in-game presentation.

```json
{
  "type": "interactive",
  "interactiveId": "gravitationsbrunnen",
  "title": "Gravitationsbrunnen visualisiert",
  "instruction": "Wähle einen Himmelskörper und verschiebe den Abstand r vom Zentrum. …",
  "params": {
    "bodies": [
      { "id": "mond",    "label": "Mond",    "massKg": 7.35e22,  "radiusM": 1737000 },
      { "id": "mars",    "label": "Mars",    "massKg": 6.42e23,  "radiusM": 3390000 },
      { "id": "erde",    "label": "Erde",    "massKg": 5.97e24,  "radiusM": 6371000 },
      { "id": "jupiter", "label": "Jupiter", "massKg": 1.898e27, "radiusM": 69911000 }
    ],
    "distance": { "unit": "body_radii", "min": 1, "max": 10, "step": 0.1, "default": 1 },
    "testMassKg": 1000,
    "constants": { "G": 6.674e-11 }
  },
  "fallback": "Jeder Himmelskörper sitzt in einem Gravitationsbrunnen: …"
}
```

Rules for consumers:

- `interactiveId` is the stable binding key. `gravitationsbrunnen` is the first registered id.
- The interaction has exactly two learner parameters: the selected body (`params.bodies`) and the distance from the centre (`params.distance`, in body radii — 1 = surface).
- Derived quantities are computed with the shipped constants: Φ = −G·M/r, ΔΦ = Φ(r) − Φ(R), W = `testMassKg`·ΔΦ, v_esc = √(2·G·M/r).
- Render inline within the academy — no iframe and no external navigation.
- If the client cannot render the interaction, it MUST show `fallback` (a complete textual explanation) instead of a placeholder.

### Registered interactives

| `interactiveId` | Modul | Lernpfad |
|---|---|---|
| `gravitationsbrunnen` | `SSF-PHY-GRAVITATIONSBRUNNEN-0001` | `PATH:SSF:PHY-GRAVITATIONSBRUNNEN-0001` |

## Source-of-truth boundary

The Knowledge Graph remains source of truth for canonical knowledge identity and factual metadata. SSF owns didactic presentation, structured learning content, interactive parameters and didactic duration. NOXIA consumes this contract and must not persist a competing curriculum copy.
