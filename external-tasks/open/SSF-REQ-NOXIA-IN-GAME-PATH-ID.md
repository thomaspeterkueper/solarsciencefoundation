# SSF Request — kanonische Lernpfad-ID für NOXIA In-Game-Lernen liefern

## Target System
Solar Science Foundation

## Origin
NOXIA (`SYS:KUEPER:noxia`)

## Purpose
NOXIA rendert SSF-Lernmodule künftig innerhalb des Spiels. Dafür muss NOXIA aus einem SSF-Modul zuverlässig den kanonischen Lernpfad bestimmen können, ohne ein eigenes dauerhaftes `moduleId -> PATH:SSF:*` Mapping zu pflegen.

## Current state
`GET /api/noxia/modules` liefert u. a.:

- `id`
- `title`
- `domain`
- `summary`
- `unlocks`
- `ssfUrl`

Die kanonische Lernpfad-ID (`PATH:SSF:*`) fehlt jedoch im Payload. NOXIA besitzt deshalb derzeit noch ein lokales Übergangsmapping in `lib/knowledge/ssfPaths.ts`.

## Requested change
`GET /api/noxia/modules` um ein kanonisches Feld ergänzen:

```json
{
  "id": "PHY-L1-000004",
  "pathId": "PATH:SSF:PHY-WASSER-PHASEN-0001",
  "title": "...",
  "unlocks": ["UNL:NOX:PHY:PHASE-DIAGRAM"]
}
```

Anforderungen:

1. `pathId` ist die kanonische KG/SSF-Lernpfad-ID.
2. NOXIA darf damit `unlock -> module -> pathId` dynamisch auflösen.
3. Das bisherige `ssfUrl` kann aus Kompatibilitätsgründen bestehen bleiben.
4. Keine NOXIA-spezifische Duplizierung der Pfaddefinition in SSF; Quelle soll der bestehende kanonische Lernpfad/Knowledge-Graph-Vertrag sein.

## Why
Damit funktionieren in NOXIA zwei zentrale UX-Pfade ohne externen Browserwechsel:

- Akademie -> SSF-Modul -> In-Game-Kurs
- "Wissen X benötigt" beim Bauen -> direkt zum passenden Lernmodul

## Priority
High

## Status
Open

## Created
2026-08-28
