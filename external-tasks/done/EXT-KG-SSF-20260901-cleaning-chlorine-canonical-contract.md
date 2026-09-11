---
id: EXT-KG-SSF-20260901-CLEANING-CHLORINE-CANONICAL-CONTRACT
title: SSF-Chlorreinigungspfad auf kanonischen Hypochlorit-Vertrag umstellen
status: done
source: KG
target: SSF
created: 2026-09-01
completed: 2026-09-11
priority: high
affects: [KG, SSF]
---

## Anlass

Der SSF-Request `SSF-KG-REQ-20260901-003-CLEANING-CHLORINE-CANON` ist KG-seitig abgeschlossen. Der bestehende Pfad `PATH:SSF:CHE-REINIGUNG-CHLOR-0001` sollte auf die kanonischen Identitäten und Sicherheitsleitplanken umgestellt werden.

## Kanonischer KG-Vertrag

Quelle: `exports/chemistry-cleaning-chlorine-0.1.json`, KG commit `aa26926a0f84a2a4fd3c9062ff6bd95c1ca767b1`.

Domains:
- `KD:CHM-REDOX:N2`
- `KD:CHM-CHEMICAL-SAFETY:N2`
- `KD:CHM-ACID-BASE:N2`

Learning Contract:
- `CHM-L1-000004`
- `LRN:SSF:CHM-CLEANING-HYPOCHLORITE-0001`
- Pfad: `PATH:SSF:CHE-REINIGUNG-CHLOR-0001`
- Prerequisites: `CHM-L1-000001`, `CHM-L1-000002`

Konzepte:
- `CON:CHM:hypochlorite-aqueous-system`
- `CON:CHM:hypochlorous-acid-hypochlorite-equilibrium`
- `CON:CHM:oxidative-bleaching-chromophores`
- `CON:CHM:hypochlorite-acidification-chlorine-release`
- `CON:CHM:incompatible-cleaner-mixing`
- `CON:CHM:chlorine-inhalation-hazard`

Sicherheitsanforderungen:
- `REQ:CHM:HYPOCHLORITE-ACID-MIX-SAFETY-0001`
- `REQ:CHM:BLEACH-MECHANISM-QUALIFIER-0001`

## Umsetzung

Der kanonische SSF-Pfad liegt in `lib/learningPaths/chlorineCleaning.ts` und ist im governeden Registry-Pfad aktiv. Er verwendet ausschließlich den KG-Vertrag `CHM-L1-000004` / `LRN:SSF:CHM-CLEANING-HYPOCHLORITE-0001` sowie die drei kanonischen Domains. Die beiden Prerequisites und beide Sicherheitsanforderungen sind explizit im Contract-Metadatenblock hinterlegt.

Die didaktische Umsetzung trennt oxidative Veränderung von Chromophoren von einer vermeintlich universellen Bleichreaktion, verzichtet auf einen universellen pH-Grenzwert und erklärt den Sicherheitsfall als Ansäuerung eines hypochlorithaltigen/aktivchlorhaltigen Systems mit möglicher Freisetzung von Chlor bzw. gefährlichen chlorhaltigen Dämpfen. Der Ammoniak-/Chloramin-Fall bleibt ausdrücklich getrennt.

Der frühere Legacy-Eintrag mit `SSF-CHE-2003` / `LRN:SSF:CHE-2003` wird durch `SUPERSEDED_LEGACY_PATH_IDS` aus dem konsumierbaren Registry-Bestand ausgeschlossen. Damit existiert keine aktive oder registrierte Parallelidentität mehr. Die kanonischen Modul- und KXF-IDs sind zusätzlich als eindeutige Registry-Aliase auf den Pfad gebunden.

## Abnahmenachweis

- Implementierungs-/Registrierungscommit: `d6e27c5d4a54360c4fcadf462e4005b9257c71e2` (`feat: register canonical hypochlorite cleaning path`).
- Contract-Regressionstest: `914141d7dd50a9cdc17566a1851848e683cf9977` (`test: lock canonical hypochlorite learning contract`).
- `tests/learningPathRegistry.test.ts` prüft nun explizit:
  - kanonische Source-ID `CHM-L1-000004`,
  - kanonische KXF-ID `LRN:SSF:CHM-CLEANING-HYPOCHLORITE-0001`,
  - exakt die drei kanonischen Domains,
  - eindeutige Auflösung beider kanonischen Modulidentitäten,
  - **keine** Auflösung der Legacy-IDs `SSF-CHE-2003` und `LRN:SSF:CHE-2003`,
  - Prerequisites `CHM-L1-000001` + `CHM-L1-000002`,
  - beide KG-Sicherheitsanforderungen.
- GitHub Actions `SSF tests`, Run `120` / `34644084572`: **success** am 2026-09-11.

## Ergebnis

Der aktive/registrierte SSF-Chlorreinigungspfad erfüllt den kanonischen KG-Vertrag. Der Task ist abgeschlossen.
