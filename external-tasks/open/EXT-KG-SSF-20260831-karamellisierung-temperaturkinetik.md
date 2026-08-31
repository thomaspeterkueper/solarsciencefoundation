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

Research Candidate `RES-20260831-B813E7F4` liegt inzwischen als **R1 — critical-review replacement** vor. Der Grundbefund bleibt: `PATH:SSF:CHE-KUECHE-KARAMELL-0001` vermischt Verlust kristalliner Struktur/DSC-Ereignis, thermische Zersetzung und Karamellisierungs-/Bräunungskinetik und stellt daraus harte, zeitunabhängige Temperaturschwellen her. R1 präzisiert jedoch, dass konkrete DSC-Werte nur für definierte Zuckerformen, Proben und Heizraten gelten und Daten aus hochkonzentrierten Saccharoselösungen nicht pauschal auf trockenen Haushaltszucker übertragen werden dürfen.

## Anforderung an SSF

Bitte Lernpfad, Experimente und Slider gegen R1 überarbeiten.

### 1. Harte 160-°C-Regel entfernen

Die Aussagen

- „Zucker beginnt bei etwa 160 °C zu schmelzen“ und
- „Unter 160 °C passiert nichts“

nicht als allgemeine Realweltfakten lehren.

Es gibt keine universelle 160-°C-Schwelle. Thermische Ereignisse und Reaktionsraten hängen mindestens von Zuckerart, Kristallform, Heizrate, Zeit, Wassergehalt und Matrix ab.

### 2. Drei Ebenen explizit trennen

Mindestens unterscheiden:

1. Verlust kristalliner Struktur bzw. beobachtetes DSC-„Schmelzereignis“,
2. thermische Zersetzung,
3. Karamellisierungs-/Bräunungsreaktionen als chemische Kinetik.

Bei Zahlenwerten immer deutlich machen, **welches Ereignis unter welchen Messbedingungen** gemeint ist.

### 3. DSC-Beispielwerte nur kontextgebunden verwenden

Hurtta et al. liefern für konkrete Proben bei 1 °C/min ungefähr:

- β-D-Fructopyranose: 112,7 °C,
- α-D-Glucopyranose: 146,5 °C,
- D-Saccharose: 184,5 °C.

Bei 10 °C/min verschieben sich die Onsets deutlich. Diese Werte sind deshalb **Beispiel-Onsets**, keine zeitlosen Karamellisierungstemperaturen und keine universellen Stoffkonstanten aller Handelszucker.

### 4. Saccharose 160 °C korrekt einordnen

`160 °C` nicht als allgemeinen Saccharose-Schmelzpunkt verwenden. Der Wert kann höchstens als kontextualisiertes Küchenbeispiel für relativ schnelle sichtbare Bräunung unter bestimmten Bedingungen dienen. R1 warnt ausdrücklich davor, daraus eine physikalische Hartschwelle zu machen.

### 5. Maltose 180 °C aus dem Faktenlayer entfernen

Für `180 °C` als universelle Maltose-Karamellisierungstemperatur wurde keine ausreichend belastbare moderne Primärbasis gefunden. Bis Zuckerform/Hydratstatus und geeignete Primärquelle geklärt sind, den festen Wert nicht lehren.

### 6. Temperatur-Slider / Experimente neu modellieren

`EXP:KARAMELL-TEMP`, `EXP:ZUCKERARTEN` und der Slider 100–200 °C dürfen keine Logik „unter 160 nichts / ab 160 schmilzt“ mehr abbilden.

Mindestens eine **Zeitdimension** bzw. Reaktionsgeschwindigkeit einführen. Für fortgeschrittene Darstellung zusätzlich Matrix/Wassergehalt berücksichtigen. Daten aus hochkonzentrierten Saccharoselösungen nicht als direkten Beweis für sichtbare Karamellisierung trockener Kristalle bei derselben Temperatur und Zeit verwenden.

### 7. Didaktisch brauchbaren Kern erhalten

Die qualitative Aussage bleibt sinnvoll: verschiedene Zucker entwickeln unter vergleichbaren Bedingungen unterschiedlich schnell Farbe; Fructose reagiert schneller als Glucose, Saccharose langsamer. Dieser Lernwert soll erhalten bleiben, ohne daraus starre Einzeltemperaturen abzuleiten.

### 8. Publikationsroute

Die R1-Fassung stuft die unmittelbare Nutzung auf `archive_support` zurück. Aus diesem Request folgt daher **keine automatische KUE-SCI-Publikation**. Eine spätere Veröffentlichung wäre eine eigene redaktionelle Entscheidung im KUE-Repository.

## Source-of-Truth-Grenze

KG hält den Research Candidate und kanonische Concept-Identitäten. SSF bleibt Source of Truth für Didaktik, Lerntexte, Aufgaben, Experimente und Darstellung. KUE bleibt Source of Truth für eine eventuelle eigenständige Realwissenschafts-Publikation.

## Erwartetes Ergebnis

`PATH:SSF:CHE-KUECHE-KARAMELL-0001` trennt Messereignis, Zersetzung und Karamellisierung; behandelt Temperatur als Teil einer Zeit-/Matrix-abhängigen Kinetik und verwendet Zahlen nur mit Messkontext statt als Pseudohartschwellen.

## Referenz

- Research ID: `RES-20260831-B813E7F4`
- Revision: `R1 — critical-review replacement`
- KG-Pfad: `research/candidates/RES-20260831-B813E7F4.md`
- KG Merge R1: `16dca20c1a2215157bd0dcabb1bc8f3e449295b0`
