---
id: SSF-0018
requester: SYS:KUEPER:noxia
recipient: SYS:KUEPER:ssf
type: content
priority: medium
tier: 2
created: 2026-07-19
module: PHY-L1-000008
unlock: UNL:NOX:PHY:HEAT-CAPACITY
blocking: NOXIA-BETA-EXTENDED
---

# SSF-0018 — Lernpfad: Warum braucht Wasser so lange zum Kochen?

## Modul-Info

| Feld | Wert |
|------|------|
| Modul-ID | `PHY-L1-000008` |
| Titel | Warum braucht Wasser so lange zum Kochen? |
| Dauer | 3–4 Min |
| Niveau | L1 |
| Unlock | `UNL:NOX:PHY:HEAT-CAPACITY` → Wärmekapazität (Habitat-Energieverbrauch) |
| Voraussetzung | `PHY-L1-000003` |

## Lernziele

1. Was Wärmekapazität ist (wieviel Energie pro Grad)
2. Warum Wasser eine ungewöhnlich hohe Wärmekapazität hat
3. Was latente Wärme ist (Energie für Phasenwechsel)
4. Wie das den Energieverbrauch von Mars-Habitaten beeinflusst

## Quiz

Frage: Warum benötigt Wasser beim Kochen plötzlich sehr viel Energie ohne wärmer zu werden?
A) Weil der Herd nachlässt
B) Weil die Energie für den Phasenwechsel (latente Wärme) verbraucht wird, nicht für Temperaturerhöhung ← richtig
C) Weil Wasser bei 100°C aufhört zu erwärmen
D) Weil Dampf die Energie ableitet

## NOXIA-Kontext (in Lernpfad einbauen)

> Schaltet Wärmeeffizienz-Analyse für Habitate frei — du siehst den Energieverbrauch für Wasseraufbereitung und Heizung.

## Referenz

- KXF-Modul: `PHY-L1-000008` in `exports/kxf-learning-modules-0.1.json`
- NOXIA Unlock-Key: `UNL:NOX:PHY:HEAT-CAPACITY`
- Analog zu: SSF-0009 (ECO-L0-000001) als Referenz-Implementierung
