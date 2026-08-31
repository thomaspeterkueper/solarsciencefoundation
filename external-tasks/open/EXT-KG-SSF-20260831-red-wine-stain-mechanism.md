---
id: EXT-KG-SSF-20260831-red-wine-stain-mechanism
title: Rotweinflecken-Lernpfad auf Polyphenolchemie statt Proteindenaturierung umstellen
status: open
source: KG
target: SSF
created: 2026-08-31
requested_by: research-validation-loop
priority: high
affects: [KG, SSF]
---

## Anlass

Research Candidate `RES-20260831-A397C7AD` liegt inzwischen als **R1 — critical-review replacement** vor. Der Kernbefund bleibt: Der aktuelle Mechanismus „Proteindenaturierung/thermische Vernetzung mit der Textilfaser“ ist für Rotwein auf Baumwolle wissenschaftlich nicht haltbar. R1 korrigiert zugleich eine Überdehnung des Roh-Audits: Aus der geprüften Primärliteratur folgt **keine universelle Heiß-/Kalt-Waschregel** und insbesondere kein wissenschaftlicher Nachweis, dass kochendes Wasser Rotweinflecken auf Baumwolle allgemein zuverlässig entfernt.

## Anforderung an SSF

Bitte den Lernpfad `PATH:SSF:CHE-REINIGUNG-ROTWEIN-0001` und seine Domänen-/Unlock-Verknüpfungen gegen R1 korrigieren.

1. Rotwein als **Anthocyanin-/Polyphenol-System** behandeln. Die sichtbare Farbchemie ist wesentlich polyphenolisch; Protein-Denaturierung ist nicht der tragende Fleckenmechanismus.
2. Baumwolle als **Cellulosefaser** behandeln. Eine proteinbedingte thermische Vernetzung des Rotweinflecks mit Baumwolle ist nicht belegt.
3. Die Aussagen „ab 40 °C beginnt Vernetzung“ und „ab 80 °C permanent fixiert“ entfernen. Für diese Schwellen wurde keine belastbare Trägersource gefunden.
4. Keine neue Universalregel einführen. Weder „heißes Wasser setzt Rotwein immer fest“ noch „kochendes Wasser entfernt frische Rotweinflecken zuverlässig“ ist durch die geprüfte Primärliteratur als allgemeines Naturgesetz gedeckt.
5. Praktische Pflegehinweise dürfen nur klar als **konditionale Praxisempfehlung** erscheinen und müssen von der chemischen Evidenz getrennt bleiben. Faserart, Textilausrüstung/Färbung, Fleckenalter, Waschchemie, Wassergehalt und thermische Vorgeschichte beeinflussen die Behandlung.
6. Protein-Denaturierung als eigenen Kontrastfall für echte Proteinflecken wie Blut, Ei oder Milch verwenden, nicht als Hauptmechanismus des Rotweinflecks.
7. Die bisherige Verknüpfung zu `KD:CHE-PROTEINS` / `CHEM:PROTEIN-DENATURATION` für den Rotwein-Kern prüfen und auf passende Polyphenol-/Anthocyanin-/Cellulosechemie umstellen.
8. Falls Temperatur experimentell behandelt werden soll, keine 40/80-°C-Schwelle vorgeben. R1 weist ausdrücklich eine direkte Evidenzlücke für ein systematisches 20/40/60/80/100-°C-Vergleichsexperiment unter sonst gleichen Bedingungen aus.

## Belastbarer didaktischer Kern

- Rotweinfarbe: Anthocyane und weitere Polyphenolreaktionen.
- Baumwolle: cellulosisches Substrat.
- Tanninsäure kann in einem publizierten Modellsystem an hydrophiler Baumwolle adsorbieren; dort nahm die Adsorption mit steigender Temperatur ab.
- Das beweist keine vollständige Waschregel, widerlegt aber die simple Behauptung „Hitze verstärkt automatisch die Bindung an Baumwolle“.

## Source-of-Truth-Grenze

KG hält den Research Candidate und kanonische Wissensbegriffe. SSF bleibt Source of Truth für Lernpfad, Didaktik, Beispiele, Aufgaben und Erklärtext. Der Request transportiert keine Haushaltsregel als neue kanonische Wissenschaft.

## Erwartetes Ergebnis

Der Rotwein-Lernpfad erklärt den chemischen Kern über Anthocyanin-/Polyphenolchemie und Cellulose, entfernt die unbelegten Protein- und Temperaturschwellen und trennt wissenschaftliche Mechanismen sauber von konditionalen Pflegeempfehlungen.

## Referenz

- Research ID: `RES-20260831-A397C7AD`
- Revision: `R1 — critical-review replacement`
- KG-Pfad: `research/candidates/RES-20260831-A397C7AD.md`
- KG Merge R1: `74a08f4aba5f0447edcc465ffa9b553b70ee3c31`
