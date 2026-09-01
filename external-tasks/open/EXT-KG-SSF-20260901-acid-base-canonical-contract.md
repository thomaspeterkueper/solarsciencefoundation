---
id: EXT-KG-SSF-20260901-ACID-BASE-CANONICAL-CONTRACT
title: Säure/Base-Grundlagen auf KG-Kanon umsetzen
status: open
source: KG
target: SSF
created: 2026-09-01
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

## Umsetzung in SSF

1. Die drei Grundlagenreisen mit den vorgegebenen LearningModule-Identitäten anbinden; SSF behält Didaktik, Texte, Experimente und Quiz.
2. `PATH:SSF:CHE-REINIGUNG-KALK-0001` auf `KD:CHM-ACID-BASE:N2` und `KD:CHM-CARBONATE:N2` normalisieren.
3. Lokale IDs `KD:CHE-ACID-BASE`, `KD:CHE-CARBONATE`, `KD:PHY-PH` aus KG-governed `domainsNeeded` entfernen. Insbesondere ist pH hier Chemie, nicht eine eigene `KD:PHY-PH`-Domain.
4. Der Kalk-/Reinigungspfad ist Anwendung und soll die Grundlagen nicht ersetzen; mindestens Säure/Base und pH als prerequisites behandeln.
5. Keine alternativen `KD:*`- oder LearningModule-IDs lokal erzeugen.

## Relevante Konzepte

`CON:CHM:bronsted-acid-base`, `CON:CHM:hydronium-hydroxide`, `CON:CHM:ph-scale`, `CON:CHM:neutralization`, `CON:CHM:acid-base-stoichiometry`, `CON:CHM:carbonate-acid-reaction`, `CON:CHM:calcium-carbonate-acid`, `CON:CHM:carbon-dioxide-evolution`.
