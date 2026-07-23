---
id: SSF-0021-colony-found-lernpfad
requester: SYS:KUEPER:noxia
recipient: SYS:KUEPER:ssf
type: content
priority: high
created: 2026-07-20
module: NEU-COLONY-L1-000001
unlock: UNL:NOX:COLONY:FOUND
blocking: [NOXIA-COLONIZATION]
---

# Ssf 0021 Colony Found Lernpfad

## Modul

**ID:** `NEU-COLONY-L1-000001`
**Titel:** Wie gründet man eine Kolonie? — Lebenserhaltung, Ressourcen, Standortwahl
**Unlocks:**
- `UNL:NOX:COLONY:FOUND` — Primär-Unlock
- `UNL:NOX:SHIP:PIONEER` — Schiff-Unlock

## Beschreibung

Neues Modul: Kolonisierungsplanung. Abschluss schaltet Kolonie-Gründung + Pioneer-Schiff frei.

## Hinweis

Neues Modul — muss in KG angelegt werden (KB-REQUEST nötig).

## NOXIA-Kontext

Nach Abschluss kann der Spieler:
- Neue Standorte auf der Sonnensystem-Karte wählen
- Das entsprechende Schiff in der Werft kaufen
- Den Gründungs-Flow starten (🚀 Gründen in der Navbar)

## Voraussetzungen in NOXIA

`UNL:NOX:NAV:ORBITAL` (für Stationen) bzw. `UNL:NOX:COLONY:FOUND` (für Kolonien)
sind als Gates in `lib/knowledge/unlocks.ts` implementiert.
Die Gate-Prüfung in `found-location/route.ts` ist vorbereitet aber im Alpha deaktiviert.
