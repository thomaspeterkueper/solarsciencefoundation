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

## Interaktive Komponente: Andock-Simulation

**Kernforderung:** SSF-0022 enthält eine eingebettete 2D-Physik-Simulation
als interaktives Lernmodul — kein separates Minigame, sondern integrierter
Lerninhalt der den Theorie-Teil unmittelbar erfahrbar macht.

### Physik-Modell

Vereinfachte Clohessy-Wiltshire Gleichungen (Hill's Equations) —
Relativbewegung im kreisförmigen Referenzorbit:

```
ẍ − 2nẏ − 3n²x = aₓ   (radial)
ÿ + 2nẋ      = aᵧ   (entlang-Bahn)
```

Vereinfachung für Lernzweck: n = 0.001 rad/s (LEO), diskrete Schübe.

### UI-Spec

```
┌─────────────────────────────────────────┐
│  STATION  ◈                             │
│                                         │
│            →  ◆  DU                    │
│                                         │
│  Abstand:  847 m   Δv: 2.3 m/s         │
│  Treibstoff: ████░░░░  68%             │
│                                         │
│  [←] [→] [↑] [↓]   Schub: 0.1 m/s²   │
└─────────────────────────────────────────┘
```

- **Ansicht:** Top-down (x=radial, y=along-track), SVG oder Canvas
- **Steuerung:** 4 Schubknöpfe (oder Tastatur ←↑↓→), diskrete Impulse
- **Ziel:** Andockzone erreichen (< 50m Abstand, < 0.5 m/s Relativgeschwindigkeit)
- **Bewertung:** Treibstoffverbrauch + Annäherungszeit → Score
- **Physikalisch korrekt genug:** Drift ohne Schub sichtbar (Coriolis-Effekt)

### Lernmomente

1. **Gegenintuitiv:** Um zu bremsen muss man in Fahrtrichtung schießen
2. **Drift:** Ohne Schub driftet das Schiff — kein "Stillstand" im Orbit
3. **Treibstoff:** Zu viele Korrekturen = Treibstoff leer = Mission gescheitert
4. **Geduld:** Langsame Annäherung ist effizienter als schnelle mit Notbremsung

### Integration in Lernpfad

- Simulation erscheint nach Theorie-Abschnitt "Rendezvous im Orbit"
- Muss **einmal erfolgreich** abgeschlossen werden für Modul-Completion
- Score wird nicht für NOXIA-Unlock gewertet — nur Success/Fail
- SSF speichert Abschluss → NOXIA sync → `UNL:NOX:STATION:FOUND` frei

### Technische Empfehlung

React-Komponente mit `useRef` + `requestAnimationFrame` Loop:
- Physik: 60fps Update (dt = 1/60 s, skaliert auf Sim-Zeit)
- Render: SVG (einfacher) oder Canvas (smoother)
- Keine externen Physics-Libraries nötig — 4 Gleichungen reichen

## Voraussetzungen in NOXIA

`UNL:NOX:NAV:ORBITAL` (für Stationen) bzw. `UNL:NOX:COLONY:FOUND` (für Kolonien)
sind als Gates in `lib/knowledge/unlocks.ts` implementiert.
Die Gate-Prüfung in `found-location/route.ts` ist vorbereitet aber im Alpha deaktiviert.


## Erledigt 2026-07-21

PATH:SSF:ENG-STATION-FOUND-0001 implementiert. Schaltet UNL:NOX:STATION:FOUND + UNL:NOX:NAV:ORBITAL frei.
