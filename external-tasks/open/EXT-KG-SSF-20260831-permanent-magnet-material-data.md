---
id: EXT-KG-SSF-20260831-permanent-magnet-material-data
title: Verifizierte Werkstoffdaten für MAG-004/005 übernehmen
status: open
source: KG
target: SSF
created: 2026-08-31
requested_by: research-validation-loop
priority: medium
affects: [KG, SSF]
---

## Anlass

Research Candidate `RES-20260831-EAA9EDD9` liegt inzwischen als **R1 — critical-review correction** vor. R1 trennt intrinsische Materialeigenschaften sauber von sorten-/herstellerabhängigen Betriebsgrenzen und volatile Markt-/Supply-Chain-Daten von zeitstabilen Werkstoffaussagen.

## Anforderung an SSF

Bitte `modules/materials/MAG-004.yaml` und den relevanten Vergleichs-/Anwendungsteil von `MAG-005` gegen R1 prüfen.

### 1. Keine scheinbar universellen Tmax-Werte

Curie-Temperatur, `(BH)max`, Koerzitivität und Einsatztemperatur nicht vermischen. Insbesondere maximale Einsatztemperaturen sind stark sorten-, Geometrie-, Last- und Herstellerabhängig und sollen nur als quellengebundene Bereiche bzw. konkrete Grade geführt werden.

### 2. Ferrit

- keine Seltenen Erden,
- sehr gute Korrosionsbeständigkeit,
- deutlich geringeres Energieprodukt als NdFeB/SmCo,
- günstige und robuste Standardklasse.

Konkrete Zahlen als Sorten-/Quellenwerte, nicht als universelle Ferritkonstanten.

### 3. AlNiCo

Die didaktisch zentrale Einschränkung bleibt die relativ geringe Koerzitivfeldstärke und damit Entmagnetisierungsanfälligkeit in Gegenfeldern. Hohe Curie-/Einsatztemperaturen nicht zu einem einzigen allgemeinen Tmax verdichten. Kobalt als relevanten kritischen Rohstoff erwähnen.

### 4. SmCo

SmCo5 und Sm2Co17 getrennt bzw. als unterschiedliche Unterfamilien behandeln. Temperatur-, Energieprodukt- und Koerzitivitätswerte unterscheiden sich erheblich. Gute Hochtemperatur- und Korrosionseigenschaften als Stärke darstellen, aber keine pauschale universelle Einsatzgrenze nennen.

### 5. NdFeB

- höchstes kommerzielles Energieprodukt im Vergleich,
- Temperatur- und Koerzitivitätsverhalten stark gradeabhängig,
- korrosionsanfällige Werkstofffamilie, Schutz-/Beschichtungsbedarf jedoch **nicht als ausnahmslos zwingend für jede Ausführung und Umgebung formulieren**,
- Abhängigkeit von Nd/Pr und je nach Hochkoerzitiv-Grade zusätzlich Dy/Tb.

### 6. Kosten, Markt und Supply Chain

Keine alten USD/kg-Werte aus 2016 als heutige Preise lehren. Kosten nur qualitativ oder mit klar datiertem Marktbezug verwenden. Aktuelle Supply-Chain-/Exportkontrollaussagen nur mit Datum und direkter Quelle führen; sie sind kein zeitloser Werkstoffkanon.

### 7. Recycling

Zwischen technischer Recyclingfähigkeit, realen End-of-Life-Rückgewinnungsquoten und im Aufbau befindlichen industriellen Kapazitäten unterscheiden. Keine einzelne historische Quote als dauerhaften Zustand darstellen.

## Source-of-Truth-Grenze

KG hält die kanonischen Magnet-/Materialbegriffe und den nicht-kanonischen Research Candidate. SSF bleibt Source of Truth für Didaktik, Lerntext, Aufgaben, Reihenfolge und redaktionelle Lerndauer.

## Erwartetes Ergebnis

MAG-004/005 vermitteln belastbare Materialfamilien-Unterschiede, ohne Gradeigenschaften, historische Preise oder aktuelle Handelslage in vermeintlich zeitlose Konstanten zu verwandeln.

## Referenz

- Research ID: `RES-20260831-EAA9EDD9`
- Revision: `R1 — critical-review correction`
- KG-Pfad: `research/candidates/RES-20260831-EAA9EDD9.md`
