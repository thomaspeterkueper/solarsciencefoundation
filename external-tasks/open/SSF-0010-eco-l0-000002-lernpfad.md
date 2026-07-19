---
id: SSF-0010
requester: SYS:KUEPER:noxia
recipient: SYS:KUEPER:ssf
type: content
priority: high
tier: 1
created: 2026-07-19
module: ECO-L0-000002
unlock: UNL:NOX:bank-compound
blocking: NOXIA-BETA
status: done
---

# SSF-0010 — Lernpfad: Zins und Zinseszins

## Modul-Info

| Feld | Wert |
|------|------|
| Modul-ID | `ECO-L0-000002` |
| Titel | Zins und Zinseszins |
| Dauer | 3–5 Min |
| Niveau | L0 |
| Unlock | `UNL:NOX:bank-compound` → Bank — Zinseszins-Vorschau |
| Voraussetzung | `ECO-L0-000001` |

## Lernziele

1. Was Zins ist (Preis für geliehenes Kapital)
2. Was Zinseszins bedeutet (Zinsen auf Zinsen)
3. Warum Zinseszins bei Schulden gefährlich ist (exponentielles Wachstum)
4. Wann Zinseszins für den Anleger vorteilhaft ist

## Quiz

Frage: Du schuldest 1.000 Cr zu 10% Zins/Tick. Nach 2 Ticks schuldest du (mit Zinseszins):
A) 1.200 Cr  B) 1.210 Cr ← richtig  C) 1.100 Cr  D) 1.020 Cr

## NOXIA-Kontext (in Lernpfad einbauen)

> Schaltet in NOXIA die Zinseszins-Vorschau im Bank-Tab frei — du siehst wie dein Kredit über Zeit wächst wenn du nicht tilgst.

## Referenz

- KXF-Modul: `ECO-L0-000002` in `exports/kxf-learning-modules-0.1.json`
- NOXIA Unlock-Key: `UNL:NOX:bank-compound`
- Analog zu: SSF-0009 (ECO-L0-000001) als Referenz-Implementierung


## Erledigt 2026-07-19

PATH:SSF:ECO-ZINSESZINS-NOXIA-0001 implementiert. Regel-70, exponentielle Kurve. Schaltet UNL:NOX:bank-compound frei.
