---
id: EXT-KG-SSF-20260831-LEARNING-PATH-ID-INTEGRITY-AUDIT
title: Lernpfad-ID-Kollisionen und nicht-kanonische Referenzen bereinigen
status: open
source: KG
target: SSF
created: 2026-08-31
requested_by: knowledge-graph-curation
priority: high
affects: [KG, SSF]
---

## Anlass

Der aktuelle Lernpfadbestand in `lib/learningPaths.ts` und `lib/learningPathRegistry.ts` wurde gegen die KG-Identitätsregeln geprüft.

Der Befund betrifft nicht die didaktische Qualität einzelner Pfade, sondern Identitäts- und Registry-Integrität.

## Befund A — lokale Section-/Experiment-IDs kollidieren semantisch

Mehrere `EXP:*`-IDs werden für fachlich völlig verschiedene Interaktionen wiederverwendet. Konkrete Fälle:

- `EXP:KARAMELL-TEMP`
  - Karamell-Temperatur-Experiment
  - Zinseszins-Simulator
  - Linear-vs.-Exponentiell-Simulator im NOXIA-Zinseszins-Pfad
- `EXP:ARBEITSPUNKT`
  - Dioden-Arbeitspunkt / Lastgerade
  - Tilgungsplan eines Kredits
  - NOXIA-ROI-Rechner
- `EXP:REIHE`
  - geometrische Reihe
  - einfacher Zins
  - Verdopplungszeit / Regel 70
- `EXP:GAUSS`
  - Gauß-Elimination
  - Kredit-Rechner
- `EXP:KAPILLAR`
  - Dichte-/Gefrierrohr-Simulation
  - Kapillarsteighöhe
- `EXP:ABSORPTIONSLINIEN`
  - Erklärung/Absorptionslinien im Wellenpfad
  - eigenständiges Spektralexperiment im Spektroskopiepfad
- `EXP:LICHTSPEKTRUM`
  - Lichtfrequenz-/Spektrum-Slider
  - Sterntypen-/Fraunhofer-Vergleich

Ob technisch Komponenten geteilt werden, ist davon unabhängig. Eine ID muss semantisch genau ein Lernobjekt/Experiment identifizieren.

## Befund B — Module werden mehreren Pfaden gleichzeitig zugeordnet

Mindestens diese `sourceModuleId`/`kxfModuleId`-Paare werden doppelt verwendet:

- `ECO-L0-000001` / `LRN:SSF:ECO-L0-000001`
  - `PATH:SSF:ECO-KREDIT-0001`
  - `PATH:SSF:ECO-KREDIT-NOXIA-0001`
- `ECO-L0-000002` / `LRN:SSF:ECO-L0-000002`
  - `PATH:SSF:ECO-ZINS-0001`
  - `PATH:SSF:ECO-ZINSESZINS-NOXIA-0001`

`buildRegistry()` verwendet derzeit für `byModuleId` stillschweigend den ersten Treffer (`if (!byModuleId.has(normalized)) ...`). Dadurch bleibt diese Mehrdeutigkeit im Runtime-Vertrag verborgen.

## Befund C — Registry-Validator prüft nur doppelte Path-IDs

`LearningPathRegistryIssue` kennt aktuell nur `duplicate_id`, und `counts` zählt ausschließlich `path.id`.

Nicht geprüft werden derzeit mindestens:

- doppelte `sourceModuleId`,
- doppelte `kxfModuleId`,
- doppelte `UNIT:*`, `OBS:*`, `EXP:*`, `QUIZ:*`, `BRANCH:*` IDs,
- Gate-Ziele auf nicht vorhandene Units,
- Alias-Ziele auf nicht vorhandene Pfade,
- semantisch widersprüchliche Alias-Auflösungen.

## Befund D — nicht-kanonische Knowledge-Domain-Namespace-Referenzen

Im aktuellen `lib/learningPaths.ts` existieren mindestens 22 Verwendungen des Legacy-/lokalen Namespace `KNOW:*` in `domainsNeeded`, z. B.:

- `KNOW:PHY-THERMODYNAMICS`
- `KNOW:CHE-ELECTROCHEMISTRY`
- `KNOW:ECO-FINANCE`
- `KNOW:MAT-ARITHMETIC`
- `KNOW:PHY-ORBITAL-MECHANICS`
- `KNOW:PHY-SPECTROSCOPY`
- `KNOW:CHE-MOLECULAR`
- `KNOW:PHY-PHASE-TRANSITIONS`

Diese IDs sind im KG nicht als kanonische KnowledgeDomain-IDs registriert. Der KG-Kanon verwendet `KD:*`.

`KNOW:*` darf daher nicht als KG-kanonisch ausgegeben werden. Falls eine solche Domain fachlich benötigt wird, muss SSF eine KG-Registrierung bzw. ein Mapping anfordern; bis dahin ist die Referenz ausdrücklich lokal/legacy.

## Anforderungen

### 1. Lokale Lernobjekt-IDs eindeutig machen

Alle `UNIT:*`, `OBS:*`, `EXP:*`, `QUIZ:*`, `BRANCH:*` IDs müssen innerhalb des konsumierbaren SSF-Lernpfadbestands eindeutig sein.

Empfohlene Konvention:

`<TYPE>:<PATH-SHORT-SLUG>:<OBJECT-SLUG>`

Beispiele:

- `EXP:ECO-ZINS:COMPOUND-CURVE`
- `EXP:ECO-KREDIT:NOXIA-ROI`
- `EXP:MAT-SERIES:GEOMETRIC-SERIES`
- `EXP:CHE-KARAMELL:TEMP-TIME`

Komponenten dürfen weiter geteilt werden; die Learning-Object-ID bleibt trotzdem eindeutig.

### 2. Modul-zu-Pfad-Mapping eindeutig oder explizit 1:n modellieren

Nicht länger zwei verschiedene Pfade über denselben `sourceModuleId`/`kxfModuleId` stillschweigend auf einen First-Wins-Eintrag reduzieren.

Entweder:

- einen primären Pfad pro Modul festlegen und weitere Pfade als Varianten/Anwendungspfade explizit modellieren,

oder

- Registry strukturell auf `moduleId -> LearningPath[]` umstellen.

Eine implizite First-Wins-Auflösung ist nicht zulässig.

### 3. Registry-Validierung erweitern

`learningPathRegistryIssues` soll mindestens melden:

- `duplicate_path_id`
- `duplicate_source_module_id`
- `duplicate_kxf_module_id`
- `duplicate_learning_object_id`
- `broken_unit_gate`
- `broken_alias_target`
- `ambiguous_module_mapping`

CI/Test hinzufügen, der bei den ersten fünf Integritätsfehlern fehlschlägt; bei bewusstem 1:n-Modulmapping muss die Mehrdeutigkeit explizit deklariert sein.

### 4. `KNOW:*` bereinigen

- Keine `KNOW:*`-ID als KG-kanonische Domain deklarieren.
- Bereits vorhandene passende `KD:*`-IDs verwenden.
- Für fehlende fachliche Domains gesammelt KG-Anforderungen stellen statt neue `KD:*` selbst zu erfinden.
- Übergangsweise `KNOW:*` nur als klar markierte SSF-Legacy-Aliase behandeln.

### 5. Bestehenden Karamell-R1-Auftrag mit berücksichtigen

`EXT-KG-SSF-20260831-karamellisierung-temperaturkinetik.md` bleibt fachlich maßgeblich für die Karamellkorrektur. Dieser Audit ergänzt dort nur die allgemeine ID-/Registry-Integrität.

## Abnahme

Erledigt, wenn:

1. keine semantisch verschiedenen Lernobjekte mehr dieselbe `EXP:/UNIT:/OBS:/QUIZ:/BRANCH:`-ID teilen,
2. Modul-zu-Pfad-Mehrdeutigkeiten nicht mehr stillschweigend per First-Wins aufgelöst werden,
3. Registry/CI diese Fehler automatisch erkennt,
4. `domainsNeeded` keine nicht auflösbaren `KNOW:*`-IDs mehr als kanonische KnowledgeDomains ausgibt,
5. fehlende Domains über KG-Anforderungen statt lokale kanonische Erfindungen nachgezogen werden.
