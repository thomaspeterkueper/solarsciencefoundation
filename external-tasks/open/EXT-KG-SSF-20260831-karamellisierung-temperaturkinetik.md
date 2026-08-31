---
id: EXT-KG-SSF-20260831-karamellisierung-temperaturkinetik
title: Karamellisierungs-Lernpfad auf Zeit-Temperatur-Kinetik und belastbare Zuckerwerte umstellen
status: open
source: KG
target: SSF
created: 2026-08-31
requested_by: research-validation-loop
priority: high
affects: [KG, SSF]
---

## Anlass

Der im Knowledge Graph integrierte Research Candidate `RES-20260831-B813E7F4` prüft die Temperaturclaims des Lernpfads `PATH:SSF:CHE-KUECHE-KARAMELL-0001`. Ergebnis: Der Pfad vermischt Schmelzverhalten und Karamellisierungsbeginn und stellt beide als harte, zeitunabhängige Temperaturschwellen dar. Diese Darstellung ist wissenschaftlich nicht haltbar.

## Anforderung an SSF

Bitte den Karamellisierungs-Lernpfad und zugehörige Experimente/Slider gegen den Evidenzstand überarbeiten.

### 1. Harte 160-°C-Schwelle entfernen

Die Aussagen

- „Zucker beginnt bei etwa 160 °C zu schmelzen“ und
- „Unter 160 °C passiert nichts“

nicht weiter als Realweltfakten lehren.

Für Saccharose liegt der DSC-Schmelzonset je nach Aufheizrate ungefähr bei 184–189 °C; zugleich läuft thermische Zersetzung bereits vorher an. Karamellisierung ist ein Zeit-Temperatur-Ratenprozess und keine einzelne harte Schwelle.

### 2. Schmelzen und Karamellisierung didaktisch trennen

Mindestens unterscheiden:

- Kristall-/Schmelzverhalten bzw. `apparent melting`,
- thermische Zersetzung,
- Farb-/Aromabildung durch Karamellisierung,
- Zeit- und Aufheizratenabhängigkeit.

Die sichtbare Bräunung um etwa 160 °C kann als Küchenorientierung für typische Zeiten behandelt werden, nicht als physikalischer Schmelzpunkt.

### 3. Zuckerarten-Vergleich korrigieren

- Fructose ~110 °C: nur als grobe Näherung des Schmelz-/Zersetzungsbeginns; Fructose ist in der Farbentwicklung besonders reaktiv.
- Glucose ~150 °C: als grobe, aufheizratenabhängige Näherung des Schmelzonsets vertretbar.
- Saccharose 160 °C: nicht als Schmelzpunkt verwenden; Schmelzonset eher ~184–189 °C, während Karamellisierung zeitabhängig früher sichtbar werden kann.
- Maltose 180 °C: nicht als belastbaren Einzelwert lehren. Die Datenlage hängt von Hydratform und Messmethode ab; der Wert ist im Audit nicht primärliteraturgestützt.

### 4. Temperatur-Slider / Experiment überarbeiten

`EXP:KARAMELL-TEMP`, `EXP:ZUCKERARTEN` und der Temperatur-Slider 100–200 °C sollen keine Logik „unter 160 nichts / ab 160 schmilzt“ mehr abbilden.

Stattdessen soll das Lernmodell mindestens Temperatur **und Zeit** bzw. Reaktionsgeschwindigkeit vermitteln. Ziel ist die Einsicht: höhere Temperatur beschleunigt den Prozess; niedrigere Temperatur bedeutet nicht automatisch „kein Prozess“.

### 5. Terminologie und Concept-Verknüpfungen

Die Zuordnung zu `CON:CHE-ORGANIC`, `KD:CHE-THERMAL` und `CHEM:THERMAL-DECOMP` nur mit den korrigierten Aussagen verwenden. Keine falschen Einzeltemperaturen als kanonische Concept-Eigenschaft propagieren.

### 6. Didaktisch brauchbaren Kern erhalten

Die qualitative Reihenfolge der Reaktivität kann erhalten bleiben: Fructose reagiert in der Farbentwicklung schneller als Glucose, Saccharose langsamer. Der Lernwert „verschiedene Zucker reagieren unterschiedlich“ bleibt damit erhalten, aber ohne Pseudohartschwellen.

## Source-of-Truth-Grenze

KG hält den Research Candidate und kanonische Concept-Identitäten. SSF bleibt Source of Truth für Didaktik, Lerntexte, Aufgaben, Experimente und Darstellung. Dieser Request ändert keine SSF-Inhalte direkt.

## Erwartetes Ergebnis

`PATH:SSF:CHE-KUECHE-KARAMELL-0001` erklärt Karamellisierung als zeit- und temperaturabhängige chemische Kinetik, trennt Schmelzen von Zersetzung/Farbentwicklung und verwendet nur quellengebundene bzw. als Näherung gekennzeichnete Zuckerwerte.

## Referenz

- Research ID: `RES-20260831-B813E7F4`
- KG-Pfad: `research/candidates/RES-20260831-B813E7F4.md`
- KG Merge: `7aea3dc480a2f4c1c5e8ffab07f8e6458390d15d`
