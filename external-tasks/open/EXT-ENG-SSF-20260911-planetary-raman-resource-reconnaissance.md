---
id: EXT-ENG-SSF-20260911-PLANETARY-RAMAN-RESOURCE-RECONNAISSANCE
title: Planetary Raman & Resource Reconnaissance – wissenschaftliche Grundlage
status: open
source: KUEPER-ENGINEERING
target: SSF
created: 2026-09-11
priority: medium
affects: [SSF, Raman, Planetary Science, Remote Sensing, Resources, Moon, Asteroids, Mars]
---

## Ausgangspunkt

KUEPER Engineering hat eine erste technische Architektur für **Planetary Resource Reconnaissance** angelegt:

- `ENG-REQ-PRR-0001`
- `ENG-SYS-PRR-0001`

Engineering-Dokumente:

- https://github.com/thomaspeterkueper/kueper-engineering/blob/main/requirements/planetary-resource-reconnaissance-0.1.md
- https://github.com/thomaspeterkueper/kueper-engineering/blob/main/systems/planetary-resource-reconnaissance-architecture-0.1.md

Realer Forschungsanker ist NASA NIAC 2026 **Interworld Slingshot Resource Surveys**. Die Phase-I-Studie prüft, ob Raman-Spektroskopie aus etwa 30–50 km Distanz während Orbit-/Flyby-Geometrien ausreichend Signal liefern kann.

KUEPER Engineering benötigt dazu eine saubere wissenschaftliche Referenzbasis aus SSF, bevor spätere quantitative Missionsmodelle oder Kanonisierungsschritte erfolgen.

## Auftrag an SSF

Bitte die wissenschaftlichen Grundlagen für planetare Raman- und Ressourcenfernerkundung aufarbeiten und dabei konsequent zwischen etablierten Verfahren und der neuen 30–50-km-Hypothese unterscheiden.

### 1. Raman-Grundlagen `[R]`

Abdecken:

- Raman scattering / Stokes / anti-Stokes in notwendiger Tiefe,
- Raman cross section und warum das Signal schwach ist,
- Zusammenhang zwischen Laserwellenlänge, Oberfläche und messbaren Raman-Linien,
- Fluoreszenz- und Hintergrundprobleme,
- detector / spectral resolution basics,
- time gating bei gepulsten aktiven Systemen.

### 2. Planetare Raman-Heritage `[R]`

Bitte reale planetare Instrumente / Missionsbeispiele einordnen, insbesondere:

- rover/lander Raman,
- SuperCam / SHERLOC soweit fachlich passend,
- typische Messdistanzen und Betriebsmodi,
- welche Aussagen über Minerale / Organika / Eisphasen tatsächlich möglich sind.

### 3. Long-range Raman `[R/H]`

Bitte real verfügbare Langdistanz-Demonstrationen dokumentieren.

Engineering verwendet als derzeitigen Anker die Angabe des NIAC/SETI-Teams, dass Pablo Sobrons frühere Long-range-Raman-Systeme etwa 120 m erreichten.

Wichtig:

- reale Demonstration klar von planetarer Übertragbarkeit trennen,
- Atmosphären-/Labor-/Feldbedingungen benennen,
- keine lineare Extrapolation von 120 m auf 30–50 km annehmen.

### 4. Orbital/Flyby Raman 30–50 km `[H]`

Bitte die NIAC-Studie als Forschungsfrage einordnen, nicht als validierte Technologie.

Zu prüfen / erklären:

- Photonbudget-Skalierung mit Entfernung,
- Spotgröße / divergence,
- pointing / jitter / smear,
- Dwell Time,
- surface albedo / roughness / dust,
- sunlight / background rejection,
- detector sensitivity,
- Rolle von aperture und pulse energy,
- Unterschiede zwischen luftlosen Körpern und Mars.

### 5. Resource Remote Sensing – Verfahren vergleichen

Bitte erklären, welche Informationen verschiedene Verfahren liefern und welche nicht:

- VIS/NIR/SWIR reflectance,
- thermal IR,
- radar,
- neutron spectroscopy,
- gamma-ray spectroscopy,
- lidar / laser altimetry,
- Raman,
- LIBS / XRF im Nahbereich,
- geophysikalische / seismische / radarbasierte Tiefeninformation,
- drill/sample ground truth.

Ziel ist nicht ein „bestes“ Verfahren, sondern die wissenschaftlich korrekte **Sensorfusion**.

### 6. Von Mineralnachweis zu Ressourcenschätzung

Besonders wichtig für Engineering und NOXIA:

Ein detektiertes Mineral ist noch keine belastbare Lagerstätte.

Bitte wissenschaftlich sauber unterscheiden:

```text
composition detection
≠ grade
≠ thickness/depth
≠ tonnage
≠ recoverable resource
≠ reserve / economic viability
```

Falls bergbauliche Begriffe wie `resource`, `reserve`, `grade`, `ore` verwendet werden, bitte auf geeignete Definitionen / Standards achten oder sie bewusst allgemeinplanetarisch abgrenzen.

### 7. Zielkörper

Bitte mindestens getrennt betrachten:

- Mond: Eis / Ilmenit / Regolithkontext,
- Near-Earth Asteroids: Silikate / Metalle / Organika,
- Phobos/Deimos: volatile-bearing phases und Unsicherheiten der Herkunft/Zusammensetzung,
- Mars: Atmosphäre, Staub, Oberflächenalteration und andere Einschränkungen.

## Evidenzregel

SSF soll `[R]` nur für belegte wissenschaftliche Grundlagen / reale Instrumente / reale Demonstrationen verwenden.

Das 30–50-km-Raman-Regime bleibt bis zum Nachweis `[H]`.

Keine fiktionale KUEPER-Technik in SSF kanonisieren.

## Erwartetes Ergebnis

- belastbares SSF-Grundlagendokument zu Raman für planetare Exploration,
- Vergleichsmatrix planetarer Ressourcen-Sensoren,
- klare Grenzen dessen, was jede Methode aussagen kann,
- wissenschaftliche Einordnung der NIAC-Studie,
- Abschnitt `composition detection vs resource estimation`,
- Quellenliste mit Primär-/Missionsquellen,
- explizite Liste offener wissenschaftlicher Fragen, die Engineering nicht durch Setzungen verdecken darf.

## Acceptance Criteria

1. Nahbereichs-Raman und orbitales 30–50-km-Raman werden nicht vermischt.
2. NIAC Phase I wird als Machbarkeitsstudie gekennzeichnet.
3. Mindestens Raman, passive Spektroskopie, Neutron/Gamma und Ground Truth werden gegeneinander abgegrenzt.
4. Mineralidentifikation wird nicht mit Gehalt, Mächtigkeit oder gewinnbarer Menge gleichgesetzt.
5. Mond, Asteroiden, Phobos/Deimos und Mars werden als unterschiedliche Messumgebungen behandelt.
6. Quellen stammen bevorzugt aus Primär-/Missionsliteratur und NASA/ESA/peer-reviewed Publikationen.
7. Ergebnis bleibt wissenschaftliche SSF-Quelle; keine Engineering- oder NOXIA-Identität wird übernommen.

## Quellen zum Einstieg

- NASA NIAC, *Interworld Slingshot Resource Surveys*, 21 July 2026: https://www.nasa.gov/directorates/stmd/niac/niac-studies/interworld-slingshot-resource-surveys/
- NASA, *NIAC 2026 Selections*: https://www.nasa.gov/directorates/stmd/niac/niac-studies/niac-2026-selections/
- SETI Institute, *A New Way to Find Resources in Space*, 19 August 2026: https://www.seti.org/news/a-new-way-to-find-resources-in-space/
