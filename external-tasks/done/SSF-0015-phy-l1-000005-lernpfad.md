---
id: SSF-0015
requester: SYS:KUEPER:noxia
recipient: SYS:KUEPER:ssf
type: content
priority: medium
tier: 2
created: 2026-07-19
module: PHY-L1-000005
unlock: UNL:NOX:PHY:DENSITY-ANOMALY
blocking: NOXIA-BETA-EXTENDED
status: done
---

# SSF-0015 — Lernpfad: Warum platzen Wasserleitungen im Winter von innen?

## Modul-Info

| Feld | Wert |
|------|------|
| Modul-ID | `PHY-L1-000005` |
| Titel | Warum platzen Wasserleitungen im Winter von innen? |
| Dauer | 3–4 Min |
| Niveau | L1 |
| Unlock | `UNL:NOX:PHY:DENSITY-ANOMALY` → Dichteanomalie (Habitat-Isolierung) |
| Voraussetzung | `PHY-L1-000003` |

## Lernziele

1. Warum Wasser beim Gefrieren dichter wird (Dichteanomalie)
2. Warum Eis schwimmt
3. Warum das für Leben auf der Erde entscheidend ist
4. Was das für Mars-Habitate bedeutet

## Quiz

Frage: Warum schwimmt Eis auf Wasser — obwohl es doch fest ist?
A) Weil Eis weiß ist und Licht reflektiert
B) Weil flüssiges Wasser bei 4°C dichter ist als Eis — Wasser dehnt sich beim Gefrieren aus ← richtig
C) Weil Eis Gas enthält
D) Weil Wasser beim Gefrieren Wärme abgibt

## NOXIA-Kontext (in Lernpfad einbauen)

> Verbessert das Verständnis der Habitat-Isolierung auf Eisplaneten — du siehst Wärmeeffizienz-Analysen für Koloniegebäude.

## Referenz

- KXF-Modul: `PHY-L1-000005` in `exports/kxf-learning-modules-0.1.json`
- NOXIA Unlock-Key: `UNL:NOX:PHY:DENSITY-ANOMALY`
- Analog zu: SSF-0009 (ECO-L0-000001) als Referenz-Implementierung


## Erledigt 2026-07-19

PATH:SSF:PHY-WASSER-EIS-0001 implementiert. Dichte Eis 917 kg/m³, Expansion +9%, Dichte-Kurve mit Maximum bei 4°C.
