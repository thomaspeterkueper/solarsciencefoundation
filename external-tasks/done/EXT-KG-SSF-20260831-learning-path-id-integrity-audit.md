---
id: EXT-KG-SSF-20260831-LEARNING-PATH-ID-INTEGRITY-AUDIT
title: Lernpfad-ID-Kollisionen und nicht-kanonische Referenzen bereinigen
status: done
source: KG
target: SSF
created: 2026-08-31
completed: 2026-09-01
priority: high
affects: [KG, SSF]
---

## Ergebnis

Der konsumierbare SSF-Lernpfadbestand besitzt jetzt eine explizite Integritätsprüfung statt einer stillen First-Wins-Auflösung.

Umgesetzt wurden:

- Prüfung auf doppelte Path-, Source-Module-, KXF-Module- und Learning-Object-IDs,
- Prüfung auf ungültige Unit-Gates und Alias-Ziele,
- explizite Erkennung mehrdeutiger Modulzuordnungen,
- `moduleId -> LearningPath[]`-Lookup zusätzlich zum eindeutigen Einzel-Lookup,
- automatische Pfad-Scope-Normalisierung kollidierender `UNIT:/OBS:/EXP:/QUIZ:/BRANCH:`-IDs,
- getrennte `interactiveId`-Auflösung, damit gemeinsam genutzte React-Komponenten nicht länger eine gemeinsam genutzte Learning-Object-ID erzwingen,
- Entfernung bzw. Ablösung supersedierter Legacy-Pfade aus dem konsumierbaren Registry,
- Migration der 39 vom KG freigegebenen `KNOW:*`-Mappings auf `KD:*`,
- Quarantäne von Pfaden mit noch nicht vom KG klassifizierten Legacy-Domains,
- Runtime-Health-Endpunkt `/api/learning-paths/registry-health`,
- automatischer Registry-Test und GitHub-Actions-CI.

## Abnahmezustand

Produktionsprüfung am 2026-09-01:

- `ok: true`
- `criticalIssueCount: 0`
- 75 konsumierbare Lernpfade
- keine aktiven `KNOW:*`-Domains
- keine aktiven ID-/Gate-/Alias-Integritätsblocker

Vier noch nicht vom KG klassifizierte Legacy-Domains sind **nicht** Teil des konsumierbaren Registry, sondern quarantänisiert. Die KG-seitige Klassifikation wurde governance-konform ausgelagert nach:

`kueper-knowledge-graph/external-tasks/open/SSF-KG-REQ-20260901-001-remaining-legacy-domains.md`

Betroffen sind nur:
- `KNOW:CHE-REACTIONS`
- `KNOW:CHE-ORGANIC`
- `KNOW:PHY-SURFACE-TENSION`
- `KNOW:PHY-CAPILLARITY`

Damit ist die SSF-seitige Abnahme erfüllt: Nicht-kanonische Domains werden nicht mehr als aktive KG-Domains ausgegeben; fehlende KG-Entscheidungen werden nicht lokal erfunden.

## Wichtige Commits

- `7e5d0ec15c1e0b79eb55a2159b34574d26402955` — Registry-Validator erweitert
- `0fbf1769722e2d6a8d0499f0ffd356f619407eb5` — `interactiveId`-Auflösung im PathRunner
- `90396b09c71d95f8d3f48b92b44ffbcd44e33b9e` — Runtime-Normalisierung und Quarantäne
- `d64e4185e402b7c32b5ff8aa9dc871afbd987399` — letzte aktive Alias-/NOXIA-Wasser-Mehrdeutigkeit bereinigt
- `9ade06020a9b2311feab410140b95e98b9971428` — Registry-Tests in Test-Compilation aufgenommen
- `fb0bd3b9e1283b23dd15d4c166958ebdd92ddd02` — GitHub-Actions-CI aktiviert
