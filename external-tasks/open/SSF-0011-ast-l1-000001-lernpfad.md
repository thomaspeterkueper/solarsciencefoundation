---
id: SSF-0011
requester: SYS:KUEPER:noxia
recipient: SYS:KUEPER:ssf
type: content
priority: high
tier: 1
created: 2026-07-19
module: AST-L1-000001
unlock: UNL:NOX:NAV:ORBITAL
blocking: NOXIA-BETA
---

# SSF-0011 — Lernpfad: Orientierung im Sonnensystem — Planetologie

## Modul-Info

| Feld | Wert |
|------|------|
| Modul-ID | `AST-L1-000001` |
| Titel | Orientierung im Sonnensystem — Planetologie |
| Dauer | 4–6 Min |
| Niveau | L1 |
| Unlock | `UNL:NOX:NAV:ORBITAL` → Orbitale Navigation (erweiterte Reiserouten) |
| Voraussetzung | keine |

## Lernziele

1. Grundstruktur des Sonnensystems (Planeten, Abstände, Umlaufbahnen)
2. Wie Transferbahnen funktionieren (Hohmann-Transfer, Energieminimum)
3. Warum Reisezeiten im Sonnensystem so lang sind
4. Wie NOXIA Reisezeiten berechnet (vereinfacht)

## Quiz

Frage: Warum brauchen Raumschiffe nicht den direkten Weg zwischen zwei Planeten?
A) Weil es keine Straßen im All gibt
B) Weil die Planeten sich bewegen und Umlaufbahnen energieeffizienter sind ← richtig
C) Weil der direkte Weg durch die Sonne führt
D) Weil Raumschiffe nur vorwärts fliegen können

## NOXIA-Kontext (in Lernpfad einbauen)

> Schaltet die orbitale Navigationsansicht frei — du siehst optimale Transferfenster und Energiekosten für Reisen zwischen Kolonien.

## Referenz

- KXF-Modul: `AST-L1-000001` in `exports/kxf-learning-modules-0.1.json`
- NOXIA Unlock-Key: `UNL:NOX:NAV:ORBITAL`
- Analog zu: SSF-0009 (ECO-L0-000001) als Referenz-Implementierung


## Erledigt 2026-07-19

PATH:SSF:AST-SONNENSYSTEM-0001 implementiert. Hohmann-Transfer Δv korrekt. Schaltet UNL:NOX:NAV:ORBITAL frei.
