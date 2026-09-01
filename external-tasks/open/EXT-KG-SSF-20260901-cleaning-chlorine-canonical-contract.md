---
id: EXT-KG-SSF-20260901-CLEANING-CHLORINE-CANONICAL-CONTRACT
title: SSF-Chlorreinigungspfad auf kanonischen Hypochlorit-Vertrag umstellen
status: open
source: KG
target: SSF
created: 2026-09-01
priority: high
affects: [KG, SSF]
---

## Anlass

Der SSF-Request `SSF-KG-REQ-20260901-003-CLEANING-CHLORINE-CANON` ist KG-seitig abgeschlossen. Der bestehende Pfad `PATH:SSF:CHE-REINIGUNG-CHLOR-0001` soll nun auf die kanonischen Identitäten und Sicherheitsleitplanken umgestellt werden.

## Kanonischer KG-Vertrag

Quelle: `exports/chemistry-cleaning-chlorine-0.1.json`, KG commit `aa26926a0f84a2a4fd3c9062ff6bd95c1ca767b1`.

Domains:
- `KD:CHM-REDOX:N2`
- `KD:CHM-CHEMICAL-SAFETY:N2`
- zusätzlich bestehend `KD:CHM-ACID-BASE:N2`

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

## SSF-Umsetzung

1. Die lokalen/nicht kanonischen Domains `KD:CHE-OXIDATION`, `KD:CHE-REDOX`, `KD:CHE-SAFETY` entfernen bzw. durch die obigen kanonischen Domains ersetzen.
2. Den Pfad an `CHM-L1-000004` / `LRN:SSF:CHM-CLEANING-HYPOCHLORITE-0001` binden.
3. Säure-/pH-Grundlagen als Prerequisites `CHM-L1-000001` und `CHM-L1-000002` verwenden.
4. Keine Kurzformel `Chlor + Säure = Chlorgas` lehren. Der konkrete Gegenstand ist die Säuerung hypochlorithaltiger/aktivchlorhaltiger Systeme und die mögliche Freisetzung von Chlor bzw. gefährlichen chlorhaltigen Dämpfen.
5. Keinen universellen harten pH-Grenzwert kanonisieren oder didaktisch als allgemeingültig darstellen.
6. Bleichen auf Foundation-Level als oxidative Veränderung von Chromophoren erklären und ausdrücklich als vereinfachtes Modell kennzeichnen; nicht als universellen Einzelmechanismus aller Bleichfälle.
7. Hypochlorit + Ammoniak / Chloramin-Chemie nicht in den Säurefall hineinmischen. `CON:CHM:chloramine-cleaner-hazard` ist als separater späterer Sicherheitsfall vorgesehen.
8. Registry-/KXF-/Pfadvalidierung ausführen und sicherstellen, dass der Pfad erst nach korrekter Kanonisierung wieder aktiv ist.
9. Nach Umsetzung Task nach `external-tasks/done/` verschieben und Commit-/Testnachweise dokumentieren.

SSF bleibt Source of Truth für Didaktik; KG für IDs, Domains, Concepts, Prerequisites und Sicherheitsanforderungen.
