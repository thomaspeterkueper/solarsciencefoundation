# KUEPER Exchange Format in SSF

KXF is the shared exchange format between KUEPER, kueper.com, SSF, NOXIA and OTA.

SSF does not define the scientific source of truth. It reads KXF records and turns them into learning modules, exercises, mappings and unlocks.

## Minimal KXF shape

```json
{
  "schema": "KXF-0.1",
  "meta": {
    "authority": "kueper-knowledge-graph"
  },
  "entities": [],
  "documents": [],
  "learningModules": [],
  "exercises": [],
  "unlocks": [],
  "gameObjects": [],
  "organizations": [],
  "locations": [],
  "people": [],
  "timelines": [],
  "mappings": []
}
```

## SSF reads

- entities
- documents
- learningModules
- exercises
- unlocks
- mappings

## SSF writes later

- progress records
- exercise attempts
- membership metadata
- contributor attribution

These records may later be exported back into a KXF-compatible form, but the authoritative science graph remains outside SSF.
