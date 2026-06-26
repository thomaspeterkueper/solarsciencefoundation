<!--
KUEPER · Solar Science Foundation (SSF)
Path:      docs/API.md
Repo:      github.com/thomaspeterkueper/solarsciencefoundation/blob/main/docs/API.md
Name:      SSF API reference
Version:   0.1.0
Created:   2026-06-26
Modified:  2026-06-26 13:00 CEST
Depends:   —
-->

# Solar Science Foundation API

The API proves and now closes the connection between SSF and NOXIA: learn a
module, complete its exercises, store progress, expose a NOXIA unlock.

## Read endpoints

```text
GET /api/modules
GET /api/modules/[id]
GET /api/noxia/unlocks/demo
```

## Proof-loop endpoints

```text
POST /api/progress/complete
GET  /api/player/[id]/progress
GET  /api/player/[id]/unlocks
```

## GET /api/modules

Returns the current module registry.

```json
{ "schema": "SSF-API-0.1", "modules": [] }
```

## GET /api/modules/[id]

Returns one module by id, or status `404` if unknown.

```json
{ "schema": "SSF-API-0.1", "module": {} }
```

## POST /api/progress/complete

Submits exercise answers for a module. The module is recorded as completed
only when every exercise is answered correctly, which is what keeps NOXIA
unlocks tied to learning instead of payment.

Request:

```json
{
  "playerId": "p1",
  "moduleId": "SSF-PHY-1101",
  "answers": [
    { "exerciseId": "EX:SSF-PHY-1101:001", "selectedOption": 1 },
    { "exerciseId": "EX:SSF-PHY-1101:002", "selectedOption": 0 }
  ]
}
```

Response on success:

```json
{
  "schema": "SSF-API-0.1",
  "playerId": "p1",
  "status": "completed",
  "moduleId": "SSF-PHY-1101",
  "score": 1,
  "graded": [],
  "completion": { "moduleId": "SSF-PHY-1101", "completedAt": "...", "score": 1 },
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

Other responses: `status: "incomplete"` when not all exercises are correct
(no unlock granted), `404` for an unknown module, `400` for a malformed body.

## GET /api/player/[id]/progress

```json
{
  "schema": "SSF-API-0.1",
  "progress": {
    "playerId": "p1",
    "completedModules": [],
    "attempts": 0
  }
}
```

## GET /api/player/[id]/unlocks

The endpoint NOXIA calls for a real player. Same shape as the demo unlock
endpoint, but derived from stored progress.

```json
{
  "schema": "SSF-NOXIA-0.1",
  "playerId": "p1",
  "completedModules": ["SSF-PHY-1101"],
  "unlocks": []
}
```

## GET /api/noxia/unlocks/demo

Fixed demo unlock for the first proof loop, kept for reference. Now sourced
from the same unlock builder as the player endpoint so the two cannot drift.

## Notes

- The progress store is in-memory for the local proof loop (Roadmap Phase 1).
  Phase 5 swaps it for a durable database behind the same function signatures.
- `correctOption` is currently exposed through `/api/modules`. Before any real
  deployment, serve a sanitised module shape to clients and grade server-side
  only.
