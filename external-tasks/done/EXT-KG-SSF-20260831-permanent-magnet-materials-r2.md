---
id: EXT-KG-SSF-20260831-PERMANENT-MAGNET-MATERIALS-R2
status: done
source: KG
target: SSF
created: 2026-08-31
completed: 2026-09-01
---

# Completion

MAG-004 and MAG-005 now consume `KD:MAT-MAGNETIC-MATERIALS:N2` and retain the seven supplied canonical concept IDs unchanged.

MAG-004 now separates:
1. family/material properties,
2. grade- and application-dependent design limits,
3. dated market/supply-chain evidence.

It explicitly covers the requested Ferrite, AlNiCo, SmCo and NdFeB boundaries without universal price, coating or Tmax claims.

MAG-005 now explicitly teaches `Curie temperature != maximum working temperature`, separates reversible temperature effects from irreversible demagnetization, and makes working limits dependent on grade, geometry, magnetic circuit/counter-field and permitted flux change.

Both modules remain local SSF drafts and explicitly require later KG promotion to canonical `MAT-L2-NNNNNN` LearningModule IDs before publication.

Implementation commits: `ca7c9fe3d9c7e5a318a29a3f950f9b4931e76057`, `9e7e12f5ba03e2eb1c53f6d3e919203ea8c02b6b`.
