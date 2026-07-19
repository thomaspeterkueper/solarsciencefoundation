---
id: SSF-0016
requester: SYS:KUEPER:noxia
recipient: SYS:KUEPER:ssf
type: content
priority: medium
tier: 2
created: 2026-07-19
module: PHY-L1-000006
unlock: UNL:NOX:PHY:SURFACE-TENSION
blocking: NOXIA-BETA-EXTENDED
---

# SSF-0016 — Lernpfad: Warum kann eine Büroklammer auf Wasser schwimmen?

## Modul-Info

| Feld | Wert |
|------|------|
| Modul-ID | `PHY-L1-000006` |
| Titel | Warum kann eine Büroklammer auf Wasser schwimmen? |
| Dauer | 3–4 Min |
| Niveau | L1 |
| Unlock | `UNL:NOX:PHY:SURFACE-TENSION` → Oberflächenspannung (Wasserfilter-Effizienz) |
| Voraussetzung | `PHY-L1-000003` |

## Lernziele

1. Was Oberflächenspannung ist
2. Wie Kapillarwirkung funktioniert
3. Warum das für Wasserversorgung in der Schwerelosigkeit relevant ist
4. Wie Mars-Wasserfilter Kapillareffekte nutzen

## Quiz

Frage: Warum steigt Wasser in einem dünnen Röhrchen nach oben — gegen die Schwerkraft?
A) Weil Wasser leichter ist als Luft
B) Weil die Adhäsion zur Röhrchenwand stärker ist als die Schwerkraft auf die Wassersäule ← richtig
C) Weil Wasser immer nach oben will
D) Weil das Röhrchen ein Vakuum erzeugt

## NOXIA-Kontext (in Lernpfad einbauen)

> Verbessert die Effizienzanalyse von Wasserfilter-Gebäuden — du siehst wie Filtermedien optimiert werden können.

## Referenz

- KXF-Modul: `PHY-L1-000006` in `exports/kxf-learning-modules-0.1.json`
- NOXIA Unlock-Key: `UNL:NOX:PHY:SURFACE-TENSION`
- Analog zu: SSF-0009 (ECO-L0-000001) als Referenz-Implementierung


## Erledigt 2026-07-19

PATH:SSF:PHY-WASSER-OBERFL-0001 implementiert. γ=72.8 mN/m, Kapillarformel h=2γcosθ/ρgr.
