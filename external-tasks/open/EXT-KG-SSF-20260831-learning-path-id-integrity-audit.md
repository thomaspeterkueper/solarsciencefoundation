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

KG hat die `KNOW:*`-Migration inzwischen vollständig klassifiziert. Maßgebliche Verträge ab KXF 0.6.14:

- `exports/knowledge-domains-foundations-0.1.json` v0.1.0
- `exports/legacy-knowledge-domain-mappings-0.1.json` v0.1.0

`KNOW:*` ist damit ausdrücklich **Legacy**, nicht ein zweiter kanonischer KnowledgeDomain-Namespace.

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

## Befund D — `KNOW:*` ist ein Legacy-Namespace

Die vollständige Normalisierung des aktuellen Bestands ergibt **39 eindeutige `KNOW:*`-Legacy-IDs**. Wiederholte Verwendung derselben Legacy-ID in mehreren Pfaden wird dabei nur einmal gezählt.

Davon:

- 29 Legacy-IDs mappen auf bereits vorhandene kanonische `KD:*`-Domains,
- 10 Legacy-IDs benötigen neu angelegte stabile Fachdomains,
- dafür wurden inklusive zweier notwendiger Eltern-Domains insgesamt 12 neue `KD:*`-Domains registriert,
- 0 Legacy-IDs wurden als dauerhafte SSF-lokale Fachdomain akzeptiert.

Die vollständige maschinenlesbare Zuordnung steht in `exports/legacy-knowledge-domain-mappings-0.1.json`.

### Direkt zu verwendende Mappings

- `KNOW:PHY-THERMODYNAMICS` → `KD:PHYS-THERM:N1`
- `KNOW:CHE-ELECTROCHEMISTRY` → `KD:CHM-ELECTROCHEM:N2`
- `KNOW:PHY-ELECTRICITY` → `KD:ELEC:N1`
- `KNOW:ECO-FINANCE` → `KD:ECO-FINANCE:N2`
- `KNOW:MAT-ARITHMETIC` → `KD:MATH:N1`
- `KNOW:MAT-EXPONENTIAL` → `KD:MATH:N1`
- `KNOW:PHY-ORBITAL-MECHANICS` → `KD:SPACE-ORBITAL-MECHANICS:N2`
- `KNOW:PHY-GRAVITY` → `KD:PHYS:N1`
- `KNOW:AST-SOLAR-SYSTEM` → `KD:GEO-PLANET:N1`
- `KNOW:PHY-SPECTROSCOPY` → `KD:PHYS-SPECTROSCOPY:N2`
- `KNOW:PHY-QUANTUM` → `KD:PHYS-QM:N2`
- `KNOW:AST-STELLAR` → `KD:ASTRO-STELLAR:N2`
- `KNOW:CHE-MOLECULAR` → `KD:CHM:N1`
- `KNOW:PHY-ELECTROSTATICS` → `KD:PHYS-EM:N2`
- `KNOW:CHE-HYDROGEN-BOND` → `KD:CHM:N1`
- `KNOW:PHY-PHASE-TRANSITIONS` → `KD:PHYS-THERM:N1`
- `KNOW:AST-PLANETARY` → `KD:GEO-PLANET:N1`
- `KNOW:PHY-DENSITY` → `KD:PHYS:N1`
- `KNOW:CHE-CRYSTAL-STRUCTURE` → `KD:MTL:N1`
- `KNOW:PHY-VAPOR-PRESSURE` → `KD:PHYS-THERM:N1`
- `KNOW:PHY-HEAT-CAPACITY` → `KD:PHYS-THERM:N1`
- `KNOW:PHY-LATENT-HEAT` → `KD:PHYS-THERM:N1`
- `KNOW:ENV-CLIMATE` → `KD:ENV:N1`
- `KNOW:ENG-LIFE-SUPPORT` → `KD:SPACE-LIFE-SUPPORT:N2`
- `KNOW:ENV-RESOURCES` → `KD:ENV:N1`
- `KNOW:AST-ORBITAL` → `KD:SPACE-ORBITAL-MECHANICS:N2`
- `KNOW:PHY-MECHANICS` → `KD:PHYS:N1`
- `KNOW:AST-MARS` → `KD:GEO-PLANET:N1`
- `KNOW:ENG-ISRU` → `KD:SPACE-ISRU:N2`
- `KNOW:ENV-TOXICOLOGY` → `KD:ENV:N1`
- `KNOW:PHY-SURFACE` → `KD:PHYS:N1`
- `KNOW:AST-MOON` → `KD:GEO-PLANET:N1`
- `KNOW:ENG-MATERIALS` → `KD:MTL:N1`
- `KNOW:ENG-SAFETY` → `KD:ENG-SAFETY:N2`
- `KNOW:AST-NAVIGATION` → `KD:SPACE-NAVIGATION:N2`
- `KNOW:ENG-SYSTEMS` → `KD:ENG:N1`
- `KNOW:CHE-WATER` → `KD:CHM:N1`
- `KNOW:ENG-FILTRATION` → `KD:ENG-WATER-TREATMENT:N2`
- `KNOW:ENV-WATER` → `KD:ENV:N1`

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

### 4. `KNOW:*` vollständig migrieren

- `domainsNeeded` auf die oben festgelegten `KD:*`-IDs umstellen.
- Keine `KNOW:*`-ID mehr als KG-kanonische Domain ausgeben.
- `KNOW:*` darf nur noch als interner Legacy-Alias für Migration/Backward Compatibility vorkommen.
- SSF muss `exports/legacy-knowledge-domain-mappings-0.1.json` nicht dauerhaft zur Laufzeit benötigen, sobald alle aktiven Pfade auf `KD:*` umgestellt sind.
- Neue fachliche Domains künftig wieder über KG anfordern; die jetzige Klassifikation ist kein Freibrief für lokale `KD:*`-Erfindungen.

### 5. Bestehenden Karamell-R1-Auftrag mit berücksichtigen

`EXT-KG-SSF-20260831-karamellisierung-temperaturkinetik.md` bleibt fachlich maßgeblich für die Karamellkorrektur. Dieser Audit ergänzt dort nur die allgemeine ID-/Registry-Integrität.

## Abnahme

Erledigt, wenn:

1. keine semantisch verschiedenen Lernobjekte mehr dieselbe `EXP:/UNIT:/OBS:/QUIZ:/BRANCH:`-ID teilen,
2. Modul-zu-Pfad-Mehrdeutigkeiten nicht mehr stillschweigend per First-Wins aufgelöst werden,
3. Registry/CI diese Fehler automatisch erkennt,
4. `domainsNeeded` ausschließlich auflösbare kanonische `KD:*`-IDs verwendet,
5. `KNOW:*` nur noch als klarer Legacy-/Kompatibilitätslayer existiert und nicht mehr als aktiver KnowledgeDomain-Namespace.
