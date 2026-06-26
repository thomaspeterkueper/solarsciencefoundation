# Solar Science Foundation API

The first API is intentionally small and exists to prove the connection between SSF and NOXIA.

## Current demo endpoints

```text
GET /api/modules
GET /api/modules/[id]
GET /api/noxia/unlocks/demo
```

## GET /api/modules

Returns the current module registry.

```json
{
  "schema": "SSF-API-0.1",
  "modules": []
}
```

## GET /api/modules/[id]

Returns one module by id.

```json
{
  "schema": "SSF-API-0.1",
  "module": {}
}
```

If the module is unknown, the endpoint returns status `404`.

## GET /api/noxia/unlocks/demo

Returns a fixed demo unlock for the first proof loop.

```json
{
  "schema": "SSF-NOXIA-0.1",
  "playerId": "demo",
  "completedModules": ["SSF-PHY-1101"],
  "unlocks": [
    {
      "id": "UNL:NOX:orbital-navigation",
      "sourceModule": "SSF-PHY-1101",
      "target": "NOXIA",
      "type": "research_unlock",
      "status": "granted"
    }
  ]
}
```

## Next API steps

```text
POST /api/progress/complete
GET  /api/player/[id]/progress
GET  /api/player/[id]/unlocks
```

These require accounts or at least a temporary player identity model.
