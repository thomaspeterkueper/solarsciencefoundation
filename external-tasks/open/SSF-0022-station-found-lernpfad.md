---
id: SSF-0022-station-found-lernpfad
requester: SYS:KUEPER:noxia
recipient: SYS:KUEPER:ssf
type: content
priority: high
created: 2026-07-20
module: NEU-STATION-L1-000001
unlock: UNL:NOX:STATION:FOUND
blocking: [NOXIA-COLONIZATION]
---

# Ssf 0022 Station Found Lernpfad

## Modul

**ID:** `NEU-STATION-L1-000001`
**Titel:** Raumstationen — Orbit-Mechanik, Lebenserhaltung, Andockmanöver
**Unlocks:**
- `UNL:NOX:STATION:FOUND` — Primär-Unlock
- `UNL:NOX:SHIP:PIONEER` — Schiff-Unlock

## Beschreibung

Neues Modul: Stationsbau. Abschluss schaltet Station-Gründung frei.

## Hinweis

Neues Modul — muss in KG angelegt werden. Baut auf AST-L1-000001 auf.

## NOXIA-Kontext

Nach Abschluss kann der Spieler:
- Neue Standorte auf der Sonnensystem-Karte wählen
- Das entsprechende Schiff in der Werft kaufen
- Den Gründungs-Flow starten (🚀 Gründen in der Navbar)

## Voraussetzungen in NOXIA

`UNL:NOX:NAV:ORBITAL` (für Stationen) bzw. `UNL:NOX:COLONY:FOUND` (für Kolonien)
sind als Gates in `lib/knowledge/unlocks.ts` implementiert.
Die Gate-Prüfung in `found-location/route.ts` ist vorbereitet aber im Alpha deaktiviert.


## Erledigt 2026-07-21

PATH:SSF:ENG-STATION-FOUND-0001 implementiert. Schaltet UNL:NOX:STATION:FOUND + UNL:NOX:NAV:ORBITAL frei.
