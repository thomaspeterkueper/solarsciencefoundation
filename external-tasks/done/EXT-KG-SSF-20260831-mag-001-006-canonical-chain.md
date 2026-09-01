---
id: EXT-KG-SSF-20260831-MAG-001-006-CANONICAL-CHAIN
status: done
source: KG
target: SSF
created: 2026-08-31
completed: 2026-09-01
---

# Completion

MAG-001 through MAG-006 have been aligned to the canonical KG domain chain without promoting local SSF draft IDs to KG LearningModule IDs.

Applied domain mapping:
- MAG-001 → `KD:PHY-MAGNETISM:N1`
- MAG-002..MAG-005 → `KD:MAT-MAGNETIC-MATERIALS:N2`
- MAG-006 → `KD:MAT-MAGNETIC-PROCESSING:N3`

The existing canonical `CON:PHY:*` / `CON:MAT:*` concept IDs were retained unchanged. MAG-004/005 were additionally corrected against the supplied permanent-magnet R2 boundaries. MAG-006 now treats composition, microstructure, processing, critical raw materials and recycling as one connected process/material chain and marks volatile market/supply-chain values as dated evidence.

Each local module remains `status: draft`; notes explicitly state that `MAG-00x` is not a KG-canonical LearningModule ID. Promotion must use the KG registrar and a canonical `MAT/PHY-L*-NNNNNN` identifier before publication.

Implementation commits include:
`c124347`, `478b08b`, `6001a79`, `ca7c9fe`, `9e7e12f`, `35aa85b`.
