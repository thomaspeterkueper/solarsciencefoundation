---
id: EXT-KG-SSF-20260831-karamellisierung-temperaturkinetik
title: Karamellisierungs-Lernpfad auf Zeit-Temperatur-Kinetik und belastbare Zuckerwerte umstellen
status: done
source: KG
target: SSF
created: 2026-08-31
completed: 2026-09-01
priority: high
affects: [KG, SSF]
---

## Ergebnis

`PATH:SSF:CHE-KUECHE-KARAMELL-0001` wurde als eigenständiger, governter Lernpfad neu aufgesetzt und auf die KG-Identitäten aus `exports/chemistry-food-thermal-0.1.json` ausgerichtet.

Verwendete KG-Identitäten:
- `KD:CHE-FOOD-THERMAL:N2`
- `CON:CHE:sugar-crystal-structure-loss`
- `CON:CHE:thermal-decomposition`
- `CON:CHE:caramelization`
- `CON:CHE:thermal-process-kinetics`
- `CON:CHE:matrix-water-dependence`

## Fachliche Korrekturen

- Verlust kristalliner Struktur/DSC-Ereignis, thermische Zersetzung und Karamellisierungs-/Bräunungskinetik werden getrennt erklärt.
- Die harte 160-°C-Schalterlogik wurde entfernt.
- DSC-Beispielwerte werden ausschließlich mit Messkontext verwendet und nicht als universelle Karamellisierungstemperaturen dargestellt.
- Eine universelle Maltose-180-°C-Regel wird nicht mehr gelehrt.
- Temperatur wird mit Zeit als Prozessgröße gekoppelt; Matrix/Wassergehalt wird als weitere Einflussgröße erklärt.
- Der Zuckerartenvergleich vermittelt qualitative Unterschiede statt einer vermeintlich universellen Temperaturschwellentabelle.

## ID-Integrität

Die frühere fachfremde Wiederverwendung von Karamell-Experiment-IDs in Finanzpfaden wurde entfernt. Die neuen Finanzpfade besitzen eigene Lernobjekte. Die allgemeine Learning-Object-Kollisionsprüfung ist zusätzlich im Registry-Audit abgesichert.

`EXP:KARAMELL-TEMP` gehört damit im konsumierbaren Registry nur noch zum Karamellkontext; gemeinsame React-Komponenten werden unabhängig davon über `interactiveId` aufgelöst.

## Relevante Implementierung

- `lib/learningPaths/caramelization.ts`
- `components/learning/KaramellTempExperiment.tsx`
- `components/learning/ZuckerartenExperiment.tsx`
- `lib/learningPaths/finance.ts`
- `lib/learningPathRegistry.ts`

## Abnahme

Die Produktions-Registry meldet nach Abschluss `criticalIssueCount: 0`. Damit sind alle fünf Abnahmekriterien dieses Requests erfüllt.
