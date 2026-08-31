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

Research Candidate `RES-20260831-EAA9EDD9` liegt inzwischen als **R2 — critical-review replacement** vor. R2 trennt intrinsische Materialeigenschaften sauber von sorten-/herstellerabhängigen Betriebsgrenzen und volatile Markt-/Supply-Chain-Daten von zeitstabilen Werkstoffaussagen.

## Anforderung an SSF

Bitte `modules/materials/MAG-004.yaml` und den relevanten Vergleichs-/Anwendungsteil von `MAG-005` gegen R2 prüfen.

### 1. Drei Ebenen sauber trennen

1. Werkstoff-/Familieneigenschaften wie Curie-Temperatur, Energiedichte und Koerzitivität.
2. Grade- und anwendungsabhängige Designgrenzen wie maximale Betriebstemperatur, zulässiges Gegenfeld und Korrosionsschutz.
3. Datierte Markt-/Lieferkettensnapshots wie Preise, Produktionskonzentration, Exportregeln und Recyclingkapazitäten.

Eine einzelne zeitlose Zahl für `Tmax`, Kosten pro kg oder „Korrosionsbeständigkeit“ pro Materialklasse ist wissenschaftlich zu grob.

### 2. Ferrit

- geringe Energiedichte gegenüber NdFeB/SmCo,
- oxidisch und meist korrosionsrobust,
- keine Seltene-Erden-Abhängigkeit,
- konkrete Zahlen als Sorten-/Quellenwerte, nicht als universelle Ferritkonstanten.

### 3. AlNiCo

Die didaktisch zentrale Einschränkung ist die relativ geringe Koerzitivität und damit Entmagnetisierungsanfälligkeit in Gegenfeldern. Hohe Remanenz und Temperaturtauglichkeit geeigneter Grades als Stärke darstellen, aber kein universelles Tmax setzen. Kobalt als relevanten Rohstoffkontext erwähnen.

### 4. SmCo

SmCo5 und Sm2Co17 getrennt bzw. als unterschiedliche Unterfamilien behandeln. Hohe Koerzitivität, hohe Energiedichte und gute Hochtemperatureignung geeigneter Grades sind belastbar; konkrete Einsatzgrenzen bleiben grade- und anwendungsabhängig. Sm/Co-Rohstoffabhängigkeit kennzeichnen.

### 5. NdFeB

- höchste verbreitete kommerzielle Energiedichte,
- starke Grade-Abhängigkeit bei Koerzitivität und Temperatur,
- gesintertes NdFeB ist korrosionsanfällig und wird häufig geschützt,
- Schutz/Beschichtung **nicht als ausnahmslos zwingend für jede Ausführung und Umgebung formulieren**,
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
- Revision: `R2 — critical-review replacement after raw candidate was merged`
- KG-Pfad: `research/candidates/RES-20260831-EAA9EDD9.md`
