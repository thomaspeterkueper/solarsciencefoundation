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

## Kanonischer KG-Vertrag

Quelle: `exports/energy-power-generation-0.1.json`, KG commit `1c146b8d2ecaea7df96f5740b41177e8636de26b`.

- KnowledgeDomain: `KD:ENG-POWER-GENERATION:N2`
- LearningModule: `ENG-L1-000001`
- KXF/Consumer-ID: `LRN:SSF:ENG-POWER-GENERATION-0001`
- NOXIA-local Unlock: `UNL:NOX:power-generation`
- Prerequisites: `KD:PHYS:N1`, `KD:ENG:N1`

Konzepte:
- `CON:ENG:power-vs-energy`
- `CON:ENG:energy-conversion-chain`
- `CON:ENG:generation-efficiency`
- `CON:ENG:generation-profile`
- `CON:ENG:dispatchability`
- `CON:ENG:electrical-generation-balance`

## SSF-Umsetzung

1. Ein Foundation-Lernmodul mit `ENG-L1-000001` / `LRN:SSF:ENG-POWER-GENERATION-0001` anlegen bzw. registrieren.
2. Das Modul auf `KD:ENG-POWER-GENERATION:N2` abbilden.
3. `UNL:NOX:power-generation` exakt als Unlock exportieren, damit NOXIA es über `/api/noxia/modules` auflösen kann.
4. Technologieunabhängig beginnen: Leistung vs. Energie, Umwandlungskette, Wirkungsgrad, Erzeugungsprofil, Regelbarkeit/Verfügbarkeit, elektrische Bilanz. Solar/Wind/Turbine/Generator etc. dürfen Anwendungen sein, aber nicht die Identität des Grundlagenmoduls ersetzen.
5. Registry-/KXF-Validierung und NOXIA-API-Export prüfen.
6. Nach Umsetzung Request nach `external-tasks/done/` verschieben und relevante Commit-/Testnachweise dokumentieren.

SSF bleibt Source of Truth für Didaktik und Modulinhalt; KG für IDs, Domain, Konzepte und Mapping.
