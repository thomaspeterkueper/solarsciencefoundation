---
id: EXT-KG-SSF-20260901-POWER-GENERATION
title: SSF-Lernmodul für NOXIA power-generation bereitstellen
status: done
source: KG
target: SSF
created: 2026-09-01
completed: 2026-09-06
priority: high
affects: [KG, SSF, NOXIA]
---

## Kanonischer KG-Vertrag

Quelle: `exports/energy-power-generation-0.1.json`, Version `0.1.1`, KG commit `4738b98cef12f7a257c68fca7352c9f7216f1633`.

- KnowledgeDomain: `KD:ENG-POWER-GENERATION:N2`
- LearningModule: `ENG-L1-000001`
- KXF/Consumer-ID: `LRN:SSF:ENG-POWER-GENERATION-0001`
- SSF Path: `PATH:SSF:NOX-POWER-GENERATION-0001`
- NOXIA-local Unlock: `UNL:NOX:power-generation`
- Prerequisites: `KD:PHYS:N1`, `KD:ENG:N1`

## Abnahme 2026-09-06

KG-Review gegen aktuellen SSF-Code bestätigt die Umsetzung:

- `lib/learningPaths/powerGeneration.ts` implementiert `PATH:SSF:NOX-POWER-GENERATION-0001`.
- `sourceModuleId` ist `ENG-L1-000001`; `kxfModuleId` ist `LRN:SSF:ENG-POWER-GENERATION-0001`.
- `domainsNeeded` enthält `KD:ENG-POWER-GENERATION:N2`, `KD:PHYS:N1`, `KD:ENG:N1`.
- `unlocks` exportiert exakt `UNL:NOX:power-generation`.
- Die Lernsequenz deckt Energieumwandlung, Leistung vs. Energie, Wirkungsgrad, zeitliches Erzeugungs-/Lastprofil sowie Speicher/Netz/Redundanz ab.
- `lib/learningPathRegistry.ts` importiert `powerGenerationLearningPath`, führt Alias-Mappings für `ENG-L1-000001` und `LRN:SSF:ENG-POWER-GENERATION-0001` auf denselben Pfad und nimmt den Pfad in `governedPaths` auf.
- Implementierungscommit: `1f425f7a97d40101bb3a80aad46e91ea437d74e7` (`learning: add canonical NOXIA power generation path`).
- Interaktivitätsintegration: `b44bc4728d563e17f2dfd0219d29c3aae50db059` (`learning: integrate experiments into power generation path`).

Damit ist der KG→SSF-Vertrag erfüllt und der Task kann geschlossen bleiben.