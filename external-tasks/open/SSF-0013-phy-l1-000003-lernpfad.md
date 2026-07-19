---
id: SSF-0013
requester: SYS:KUEPER:noxia
recipient: SYS:KUEPER:ssf
type: content
priority: medium
tier: 2
created: 2026-07-19
module: PHY-L1-000003
unlock: UNL:NOX:CHEM:WATER-MOLECULE
blocking: NOXIA-BETA-EXTENDED
---

# SSF-0013 — Lernpfad: Warum ist Wasser eigentlich so seltsam?

## Modul-Info

| Feld | Wert |
|------|------|
| Modul-ID | `PHY-L1-000003` |
| Titel | Warum ist Wasser eigentlich so seltsam? |
| Dauer | 3–5 Min |
| Niveau | L1 |
| Unlock | `UNL:NOX:CHEM:WATER-MOLECULE` → Wassermolekül-Analyse (Wasserrecycler-Effizienz) |
| Voraussetzung | keine |

## Lernziele

1. Warum Wassermoleküle polar sind (Dipolmolekül)
2. Was Wasserstoffbrückenbindungen sind
3. Warum Wasser so viele ungewöhnliche Eigenschaften hat
4. Wie das die Wasserversorgung auf dem Mars beeinflusst

## Quiz

Frage: Warum hat Wasser einen ungewöhnlich hohen Siedepunkt für seine Molekülgröße?
A) Weil Wasser schwer ist
B) Weil Wasserstoffbrückenbindungen extra Energie zum Lösen brauchen ← richtig
C) Weil Wasser transparent ist
D) Weil Sauerstoff schwer siedet

## NOXIA-Kontext (in Lernpfad einbauen)

> Verbessert die Analyse-Fähigkeit von Wasserrecyclern auf Kolonien — du siehst Effizienzwerte und Optimierungspotenzial.

## Referenz

- KXF-Modul: `PHY-L1-000003` in `exports/kxf-learning-modules-0.1.json`
- NOXIA Unlock-Key: `UNL:NOX:CHEM:WATER-MOLECULE`
- Analog zu: SSF-0009 (ECO-L0-000001) als Referenz-Implementierung


## Erledigt 2026-07-19

PATH:SSF:PHY-WASSER-DIPOL-0001 implementiert. Dipol 104.5°, Elektronegativitaet, H-Bruecken 23 kJ/mol.
