---
id: SSF-0017
requester: SYS:KUEPER:noxia
recipient: SYS:KUEPER:ssf
type: content
priority: medium
tier: 2
created: 2026-07-19
module: PHY-L1-000007
unlock: UNL:NOX:PHY:SUBLIMATION
blocking: NOXIA-BETA-EXTENDED
---

# SSF-0017 — Lernpfad: Warum trocknet Wäsche auch im Winter draußen?

## Modul-Info

| Feld | Wert |
|------|------|
| Modul-ID | `PHY-L1-000007` |
| Titel | Warum trocknet Wäsche auch im Winter draußen? |
| Dauer | 3–4 Min |
| Niveau | L1 |
| Unlock | `UNL:NOX:PHY:SUBLIMATION` → Sublimation (Eisbohrung auf dem Mars) |
| Voraussetzung | `PHY-L1-000004` |

## Lernziele

1. Was Sublimation ist (fest → gasförmig, ohne flüssig zu werden)
2. Warum das auf dem Mars die Norm ist
3. Was Dampfdruck ist
4. Wie Eisbohrungen auf dem Mars damit umgehen

## Quiz

Frage: Auf dem Mars verdampft Wassereis direkt in die Atmosphäre ohne zu schmelzen. Warum?
A) Weil es auf dem Mars nie warm wird
B) Weil der niedrige Luftdruck den flüssigen Zustand verhindert — Sublimation statt Schmelzen ← richtig
C) Weil Marswasser kein Eis bildet
D) Weil der Mars keine Atmosphäre hat

## NOXIA-Kontext (in Lernpfad einbauen)

> Schaltet den Sublimations-Analyse-Modus für Eisbohrungen frei — du siehst Wasserverlust durch atmosphärische Verdampfung.

## Referenz

- KXF-Modul: `PHY-L1-000007` in `exports/kxf-learning-modules-0.1.json`
- NOXIA Unlock-Key: `UNL:NOX:PHY:SUBLIMATION`
- Analog zu: SSF-0009 (ECO-L0-000001) als Referenz-Implementierung


## Erledigt 2026-07-19

PATH:SSF:PHY-WASSER-SUBLIM-0001 implementiert. Dampfdruck Eis -10°C=2.6 mbar, Titan-Methan-Analogie.
