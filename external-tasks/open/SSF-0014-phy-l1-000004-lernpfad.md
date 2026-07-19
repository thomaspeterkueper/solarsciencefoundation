---
id: SSF-0014
requester: SYS:KUEPER:noxia
recipient: SYS:KUEPER:ssf
type: content
priority: medium
tier: 2
created: 2026-07-19
module: PHY-L1-000004
unlock: UNL:NOX:PHY:PHASE-DIAGRAM
blocking: NOXIA-BETA-EXTENDED
---

# SSF-0014 — Lernpfad: Warum hat Wasser genau drei Formen?

## Modul-Info

| Feld | Wert |
|------|------|
| Modul-ID | `PHY-L1-000004` |
| Titel | Warum hat Wasser genau drei Formen? |
| Dauer | 3–5 Min |
| Niveau | L1 |
| Unlock | `UNL:NOX:PHY:PHASE-DIAGRAM` → Phasendiagramm (Eisbohrung-Optimierung) |
| Voraussetzung | `PHY-L1-000003` |

## Lernziele

1. Was Aggregatzustände sind (fest/flüssig/gasförmig)
2. Wie Druck und Temperatur den Zustand bestimmen
3. Was der Tripelpunkt ist
4. Warum auf dem Mars Wasser direkt sublimiert

## Quiz

Frage: Warum verdampft Wasser auf dem Mars direkt vom Eis ohne flüssig zu werden?
A) Weil der Mars zu kalt ist
B) Weil der Atmosphärendruck auf dem Mars unter dem Tripelpunkt des Wassers liegt ← richtig
C) Weil Marswasser anders ist
D) Weil es auf dem Mars kein Wasser gibt

## NOXIA-Kontext (in Lernpfad einbauen)

> Schaltet Phasendiagramm-Analyse für Eisbohrungen frei — du siehst bei welchen Bedingungen Wassereis optimal abgebaut wird.

## Referenz

- KXF-Modul: `PHY-L1-000004` in `exports/kxf-learning-modules-0.1.json`
- NOXIA Unlock-Key: `UNL:NOX:PHY:PHASE-DIAGRAM`
- Analog zu: SSF-0009 (ECO-L0-000001) als Referenz-Implementierung
