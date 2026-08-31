---
id: EXT-KG-SSF-20260831-CARAMELIZATION-R1-ALIGNMENT
title: Karamellpfad an korrigierte R1-Evidenz und KG-Thermochemie anbinden
status: open
source: KG
target: SSF
created: 2026-08-31
requested_by: knowledge-graph-curation
priority: high
affects: [KG, SSF]
---

## Anlass

Research `RES-20260831-B813E7F4` wurde inzwischen als Revision R1 korrigiert. Maßgeblicher Source Anchor ist `PATH:SSF:CHE-KUECHE-KARAMELL-0001` am geprüften Source Ref `a58fce20a9a595408124cd9bbb14b24271ac3389`.

Der aktuelle `main`-Stand von `lib/learningPaths.ts` enthält diesen Pfad nicht mehr. Daher bitte zuerst klären, ob er bewusst entfernt/ersetzt wurde oder aus einem parallelen Stand verloren ging. Die fachlich falschen Aussagen dürfen nicht aus dem alten Ref wieder übernommen werden.

KG stellt ab KXF 0.6.13 `exports/chemistry-food-thermal-0.1.json` bereit.

## Kanonische Domain

- `KD:CHE-FOOD-THERMAL:N2`

## Kanonische Concepts

- `CON:CHE:sugar-crystal-structure-loss`
- `CON:CHE:thermal-decomposition`
- `CON:CHE:caramelization`
- `CON:CHE:thermal-process-kinetics`
- `CON:CHE:matrix-water-dependence`

## Fachliche R1-Grenzen

Der Lernpfad muss mindestens drei experimentell verschiedene Größen auseinanderhalten:

1. Verlust kristalliner Struktur / beobachtetes DSC-Thermalereignis eines konkreten Zuckerpräparats,
2. thermische Zersetzung,
3. chemische Karamellisierungs-/Bräunungsreaktionen.

Nicht mehr lehren:
- `Zucker beginnt bei etwa 160 °C zu schmelzen` als allgemeine Aussage,
- `unter 160 °C passiert nichts`,
- 110/150/160/180 °C als universelle Karamellisierungstemperaturen von Fructose/Glucose/Saccharose/Maltose.

Zulässig sind methodisch kontextualisierte Beispiele. R1 nennt für β-D-Fructopyranose, α-D-Glucopyranose und D-Saccharose bei 1 °C/min DSC-Onsets von etwa 112,7 °C, 146,5 °C und 184,5 °C; bei 10 °C/min verschieben sie sich auf etwa 125,7 °C, 155,2 °C und 188,9 °C. Diese Zahlen sind Messbeispiele, keine invarianten Concept-Eigenschaften.

## Didaktische Anforderung

Ein Temperatur-Slider allein ist für die Prozessdarstellung nicht ausreichend. Mindestens Temperatur **und Zeit** müssen den Reaktionsfortschritt bestimmen. Für eine vertiefte Darstellung zusätzlich Matrix/Wassergehalt berücksichtigen.

`160 °C` darf allenfalls als kontextualisiertes Küchenbeispiel für relativ schnelle sichtbare Bräunung unter bestimmten Bedingungen erscheinen, nicht als universelle Reaktions- oder Schmelzgrenze.

## Abnahme

Erledigt, wenn:
1. geklärt ist, warum `PATH:SSF:CHE-KUECHE-KARAMELL-0001` im aktuellen `main` nicht auffindbar ist,
2. ein ggf. wiederhergestellter/ersetzender Pfad die fünf KG-Concepts und `KD:CHE-FOOD-THERMAL:N2` konsumiert,
3. Schmelzereignis/Kristallstrukturverlust, Zersetzung und Karamellisierung getrennt werden,
4. keine harte 160-°C-Grenze oder universelle Zucker-Temperaturtabelle mehr gelehrt wird,
5. die Interaktion mindestens eine Zeitdimension besitzt.
