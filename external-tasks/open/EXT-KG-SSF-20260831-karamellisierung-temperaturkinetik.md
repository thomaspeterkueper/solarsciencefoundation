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

Research Candidate `RES-20260831-B813E7F4` liegt als **R1 — critical-review replacement** vor. Der Grundbefund bleibt: `PATH:SSF:CHE-KUECHE-KARAMELL-0001` vermischt Verlust kristalliner Struktur/DSC-Ereignis, thermische Zersetzung und Karamellisierungs-/Bräunungskinetik und stellt daraus harte, zeitunabhängige Temperaturschwellen her.

Die Provenienz ist inzwischen geklärt: Der Pfad wurde mit SSF-Commit `80a5fe6ecb0fdfbbb2daccd3c70cc91892e7dc59` eingeführt. Der vom Research verwendete Ref `a58fce20a9a595408124cd9bbb14b24271ac3389` liegt später in derselben Historie. Der Vergleich dieses Refs mit aktuellem `main` zeigt für `lib/learningPaths.ts` nur `+3/-1` Zeilen und keine Entfernung des Karamellblocks. Der Pfad ist daher **nicht verschwunden**; frühere Suchbefunde waren ein Retrieval-/Indexierungsartefakt und dürfen nicht als Repositoryzustand interpretiert werden.

KG stellt ab KXF 0.6.13 `exports/chemistry-food-thermal-0.1.json` bereit.

## Kanonische KG-Identitäten

KnowledgeDomain:
- `KD:CHE-FOOD-THERMAL:N2`

Concepts:
- `CON:CHE:sugar-crystal-structure-loss`
- `CON:CHE:thermal-decomposition`
- `CON:CHE:caramelization`
- `CON:CHE:thermal-process-kinetics`
- `CON:CHE:matrix-water-dependence`

Diese IDs sollen vom überarbeiteten SSF-Pfad konsumiert werden; SSF legt dafür keine konkurrierenden kanonischen Concept-/Domain-IDs an.

## Anforderung an SSF

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

Bei 10 °C/min verschieben sich die Onsets deutlich. Diese Werte sind **Beispiel-Onsets**, keine zeitlosen Karamellisierungstemperaturen und keine universellen Stoffkonstanten aller Handelszucker.

### 4. Saccharose 160 °C korrekt einordnen

`160 °C` nicht als allgemeinen Saccharose-Schmelzpunkt verwenden. Der Wert kann höchstens als kontextualisiertes Küchenbeispiel für relativ schnelle sichtbare Bräunung unter bestimmten Bedingungen dienen.

### 5. Maltose 180 °C aus dem Faktenlayer entfernen

Für `180 °C` als universelle Maltose-Karamellisierungstemperatur wurde keine ausreichend belastbare moderne Primärbasis gefunden. Bis Zuckerform/Hydratstatus und geeignete Primärquelle geklärt sind, den festen Wert nicht lehren.

### 6. Temperatur-Slider / Experimente neu modellieren

`EXP:KARAMELL-TEMP`, `EXP:ZUCKERARTEN` und der Slider 100–200 °C dürfen keine Logik „unter 160 nichts / ab 160 schmilzt“ mehr abbilden.

Mindestens eine **Zeitdimension** bzw. Reaktionsgeschwindigkeit einführen. Für fortgeschrittene Darstellung zusätzlich Matrix/Wassergehalt berücksichtigen.

### 7. ID-Kollision bereinigen

Im aktuellen `lib/learningPaths.ts` wird `EXP:KARAMELL-TEMP` außerdem fälschlich im Pfad `PATH:SSF:ECO-ZINSESZINS-NOXIA-0001` als ID des Experiments „Linear vs. Exponentiell“ verwendet. Diese ID gehört semantisch zum Karamellpfad und darf nicht für ein Finanzexperiment wiederverwendet werden.

Bitte dem Zinseszins-Experiment eine eigene SSF-lokale Experiment-ID geben, z. B. `EXP:ZINSESZINS-VERGLEICH`, und alle dazugehörigen Runtime-/Component-Mappings entsprechend anpassen. Keine kanonische KG-ID dafür erfinden.

### 8. Didaktisch brauchbaren Kern erhalten

Die qualitative Aussage bleibt sinnvoll: verschiedene Zucker entwickeln unter vergleichbaren Bedingungen unterschiedlich schnell Farbe; dieser Lernwert soll erhalten bleiben, ohne daraus starre Einzeltemperaturen abzuleiten.

## Source-of-Truth-Grenze

KG hält Research Candidate und kanonische Concept-/KnowledgeDomain-Identitäten. SSF bleibt Source of Truth für Didaktik, Lerntexte, Aufgaben, Experimente, lokale Experiment-IDs und Darstellung.

## Abnahme

Erledigt, wenn:
1. der bestehende Pfad auf die fünf KG-Concepts und `KD:CHE-FOOD-THERMAL:N2` ausgerichtet ist,
2. Messereignis, Zersetzung und Karamellisierung getrennt sind,
3. keine harte 160-°C-Grenze oder universelle Zucker-Temperaturtabelle mehr gelehrt wird,
4. die Interaktion mindestens Temperatur × Zeit modelliert,
5. `EXP:KARAMELL-TEMP` nur noch dem Karamellkontext gehört und die Zinseszins-ID-Kollision entfernt ist.

## Referenz

- Research ID: `RES-20260831-B813E7F4`
- Revision: `R1 — critical-review replacement`
- KG-Pfad: `research/candidates/RES-20260831-B813E7F4.md`
- KG Merge R1: `16dca20c1a2215157bd0dcabb1bc8f3e449295b0`
- SSF Karamell-Einführung: `80a5fe6ecb0fdfbbb2daccd3c70cc91892e7dc59`
- KG Export: `exports/chemistry-food-thermal-0.1.json`
