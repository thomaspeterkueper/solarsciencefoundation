---
id: EXT-KG-SSF-20260901-LEGACY-DOMAIN-CLASSIFICATION-RETURN
title: Verbleibende KNOW-Domain-Quarantäne mit KG-Mapping auflösen
status: done
source: KG
target: SSF
created: 2026-09-01
completed: 2026-09-06
priority: high
affects: [KG, SSF]
---

## KG-Vorgabe

Kanonischer Migrationsvertrag `exports/legacy-knowledge-domain-mappings-0.1.json` v0.1.1:

- `KNOW:CHE-REACTIONS` -> `KD:CHM:N1`
- `KNOW:CHE-ORGANIC` -> `KD:CHM:N1`
- `KNOW:PHY-SURFACE-TENSION` -> `KD:PHYS:N1`
- `KNOW:PHY-CAPILLARITY` -> `KD:PHYS:N1`
- `KD:ENGINEERING` -> `KD:ENG:N1`
- `KD:GEOLOGY` -> `KD:GEO:N1`
- `KD:PHYSICS` -> `KD:PHYS:N1`

Keine neue lokale `KD:*`-Domain wurde angelegt.

## SSF-Umsetzung

- `lib/learningPaths/maillard.ts`: `domainsNeeded` direkt auf `KD:CHM:N1` und `KD:PHYS-THERM:N1` kanonisiert; die beiden CHE-Legacy-IDs sind entfernt und dedupliziert. Commit `7110bd7339bba1678405fe77a0f513728b89e233`.
- `lib/learningPaths/noxiaResourceExtraction.ts`: nichtkanonische Alias-Domains durch `KD:ENG:N1`, `KD:GEO:N1`, `KD:PHYS:N1` ersetzt. Commit `68d72ac223490db2177e918aba3419f211131a47`.
- Der aktuelle Legacy-Wasseroberflächenpfad verwendet nicht mehr die im KG-Review genannten `KNOW:*`-IDs, sondern ältere lokale `KD:PHY-*`-Bezeichnungen. Statt diese als neue Kanon-IDs fortzuführen, wurde ein SSF-Science-Override `lib/learningPaths/waterSurface.ts` mit ausschließlich `KD:PHYS:N1` angelegt. Commit `7b45137ccafcb403f8735dbd967156331f66925e`.
- `lib/learningPathScienceOverrides.ts` aktiviert den kanonischen Wasseroberflächenpfad zusammen mit den fachlich überarbeiteten Osmose-, Siedepunkt- und Emulsionspfaden. Commit `0dcd4222dbc56b4de2b114cf9d174c5ed5ffd872`.

## Integritätsentscheidung

Die KG-Zuordnung wurde als Source of Truth übernommen. SSF erzeugt keine schmalen Ersatz-Domains für die vier Legacy-Begriffe. Die Science-Override-Schicht ersetzt den älteren Wasseroberflächeninhalt im konsumierten Lernpfad durch die kanonische `KD:PHYS:N1`-Fassung.

## KG-Referenz

- KG commit `847fbe3ce3e0055573efb1da34ea606cea37da5f`
- `exports/legacy-knowledge-domain-mappings-0.1.json` v0.1.1
