# EXTERNAL TASK KG-0002

## Target System

KUEPER Knowledge Graph

## Origin

Solar Science Foundation

## Reason

SSF now has a prototype LearningPath model with units, optional branches, quiz gates, depth scoring and NOXIA unlocks. The path can be rendered locally, but the cross-system source contract is not yet represented in KXF.

## Requested Change

Extend KXF so learning paths can reference the sources they require from the ecosystem.

## Needed Fields

For each learning path:

- id
- title
- status
- sourceModuleId
- knowledgeDomains
- prerequisites
- sourceDocuments
- archiveDocuments
- unlocks
- nextPaths

For each source reference:

- id
- sourceSystem: KG | KUEPER.COM | OTA | SSF | NOXIA
- type: concept | document | archive-document | module | unlock
- role: authority | background | observation | exercise-source | unlock-target
- required: true | false

## Current Prototype

PATH:SSF:PHY-WAVE-SPECTRUM-0001

Title: Was die Welt aus sich macht

Needs domains:

- KNOW:PHYS-WAVE
- KNOW:ASTRO-SPEC
- KNOW:LANG-SCI

Unlocks:

- SENSOR:SPECTRAL
- MISSION:OBSERVATION-DECK

## Impact

Allows SSF to build learning paths from KG metadata while keeping didactic content inside SSF.

## Priority

Medium

## Created

2026-07-02
