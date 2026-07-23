---
status: done
id: SSF-0020-nav-orbital-lernpfad
requester: SYS:KUEPER:noxia
recipient: SYS:KUEPER:ssf
type: content
priority: high
created: 2026-07-20
module: AST-L1-000001
unlock: UNL:NOX:NAV:ORBITAL
blocking: [NOXIA-COLONIZATION]
---

# Ssf 0020 Nav Orbital Lernpfad

## Modul

**ID:** `AST-L1-000001`
**Titel:** Orientierung im Sonnensystem — Grundlagen der Orbital-Mechanik
**Unlocks:**
- `UNL:NOX:NAV:ORBITAL` — Primär-Unlock
- `UNL:NOX:SHIP:SCOUT` — Schiff-Unlock

## Beschreibung

Hohmann-Transfer, Umlaufbahnen, Reisezeit. Voraussetzung für Erkundungsschiff + Stationsgründung.

## Hinweis

Bereits als SSF-0011 beauftragt. Dieser Task ergänzt: nach Abschluss auch UNL:NOX:SHIP:SCOUT freischalten.

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

UNL:NOX:SHIP:SCOUT zu AST-SONNENSYSTEM-0001 unlocks ergaenzt (v1.3.3).


## Erledigt 2026-07-21

UNL:NOX:SHIP:SCOUT zu AST-SONNENSYSTEM-0001 hinzugefügt. HohmannExperiment (EXP:HOHMANN-TRANSFER) gebaut und eingebunden. v1.3.6.
