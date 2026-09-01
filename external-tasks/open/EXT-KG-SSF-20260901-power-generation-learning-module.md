---
id: EXT-KG-SSF-20260901-POWER-GENERATION
title: SSF-Lernmodul für NOXIA power-generation bereitstellen
status: open
source: KG
target: SSF
created: 2026-09-01
priority: high
affects: [KG, SSF, NOXIA]
---

## Anlass

NOXIA fordert aktuell `UNL:NOX:power-generation` an. Die In-Game-Akademie findet dafür kein SSF-Lernmodul und zeigt deshalb: „Für diese Voraussetzung wurde noch kein SSF-Lernmodul gefunden.“

Der SSF→KG-Request `SSF-KG-REQ-20260901-004-power-generation-learning-contract` wurde inzwischen vollständig beantwortet und im KG nach `done/` verschoben.

## Kanonischer KG-Vertrag

Quelle: `exports/energy-power-generation-0.1.json`, Version `0.1.1`, KG commit `4738b98cef12f7a257c68fca7352c9f7216f1633`.

- KnowledgeDomain: `KD:ENG-POWER-GENERATION:N2`
- LearningModule: `ENG-L1-000001`
- KXF/Consumer-ID: `LRN:SSF:ENG-POWER-GENERATION-0001`
- SSF Path: `PATH:SSF:NOX-POWER-GENERATION-0001`
- NOXIA-local Unlock: `UNL:NOX:power-generation`
- Prerequisites: `KD:PHYS:N1`, `KD:ENG:N1`

Konzepte:
- `CON:ENG:power-vs-energy`
- `CON:ENG:energy-conversion-chain`
- `CON:ENG:generation-efficiency`
- `CON:ENG:generation-profile`
- `CON:ENG:dispatchability`
- `CON:ENG:electrical-generation-balance`
- `CON:ENG:storage-grid-redundancy`

## SSF-Umsetzung

1. `PATH:SSF:NOX-POWER-GENERATION-0001` als SSF-lokalen Pfad implementieren und explizit an `ENG-L1-000001` / `LRN:SSF:ENG-POWER-GENERATION-0001` binden.
2. Das Modul auf `KD:ENG-POWER-GENERATION:N2` abbilden.
3. `UNL:NOX:power-generation` exakt als Unlock exportieren, damit NOXIA es über `/api/noxia/modules` auflösen kann.
4. Technologieunabhängig beginnen: Energiequelle → Energiewandlung → elektrische Leistung/Energie → Verluste/Wirkungsgrad → zeitlicher Bedarf und Erzeugung → Speicher/Netz/Redundanz → Systementscheidung.
5. Solar-PV, Generatorprinzip, Speicher-/Netzkopplung und Redundanz als Anwendungen behandeln. Technologiespezifische Merkmale nicht zu universellen Eigenschaften jeder Erzeugungstechnologie verallgemeinern.
6. Interaktivität nur dort einsetzen, wo Manipulation fachlichen Erkenntnisgewinn erzeugt.
7. Registry-/KXF-Validierung und NOXIA-API-Export prüfen.
8. Nach Umsetzung Request nach `external-tasks/done/` verschieben und relevante Commit-/Testnachweise dokumentieren.

SSF bleibt Source of Truth für Didaktik und Modulinhalt; KG für IDs, Domain, Konzepte und Mapping.
