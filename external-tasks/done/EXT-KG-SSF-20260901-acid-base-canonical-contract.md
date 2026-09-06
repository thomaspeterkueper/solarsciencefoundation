---
id: EXT-KG-SSF-20260901-ACID-BASE-CANONICAL-CONTRACT
title: Säure/Base-Grundlagen auf KG-Kanon umsetzen
status: done
source: KG
target: SSF
created: 2026-09-01
completed: 2026-09-06
priority: high
affects: [KG, SSF, NOXIA]
---

## Kanonischer KG-Vertrag

Quelle: `exports/chemistry-acid-base-0.1.json`, KG commit `53ec208d249803a02fd84f5e627677820624e809`.

Domains:
- `KD:CHM-ACID-BASE:N2`
- `KD:CHM-CARBONATE:N2`

LearningModule-Identitäten:
- `CHM-L1-000001` / `LRN:SSF:CHM-ACID-BASE-FOUND-0001`
- `CHM-L1-000002` / `LRN:SSF:CHM-PH-FOUND-0001`; requires `CHM-L1-000001`
- `CHM-L1-000003` / `LRN:SSF:CHM-NEUTRALIZATION-FOUND-0001`; requires `CHM-L1-000001`, `CHM-L1-000002`

## Abnahme 2026-09-06

KG-Review gegen SSF `main` bestätigt die Umsetzung:

- `lib/learningPaths/acidBaseFoundations.ts` bindet die drei Foundation-Reisen an `CHM-L1-000001`, `CHM-L1-000002`, `CHM-L1-000003` und die vorgegebenen `LRN:SSF:*`-IDs.
- Die Foundation-Reisen verwenden `KD:CHM-ACID-BASE:N2` und referenzieren die KG-kanonischen Concepts/Prerequisites.
- `lib/learningPaths/limescaleCleaning.ts` verwendet für `PATH:SSF:CHE-REINIGUNG-KALK-0001` ausschließlich `KD:CHM-ACID-BASE:N2` und `KD:CHM-CARBONATE:N2` und bindet die Foundation-Module als Wissensgrundlage ein.
- Der aktive Registry-Pfad verwendet die modularen governed Implementierungen; der alte monolithische Kalkpfad ist über `SUPERSEDED_LEGACY_PATH_IDS` ausgeschlossen.
- Relevanter Implementierungscommit: `1d166c718b5a865609ae07abb8559d01d731200d` (`learning: bind acid-base foundations to KG canon`).

Damit ist der KG-Vertrag erfüllt. Der historische alte Block in `lib/learningPaths.ts` ist kein aktiver paralleler Kanonpfad; seine Bereinigung kann separat als technische Altlast erfolgen.