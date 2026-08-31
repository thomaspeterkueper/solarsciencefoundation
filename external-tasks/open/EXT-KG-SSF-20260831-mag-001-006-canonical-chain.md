---
id: EXT-KG-SSF-20260831-MAG-001-006-CANONICAL-CHAIN
title: MAG-001 bis MAG-006 an vollständige KG-Konzept- und Domainkette anbinden
status: open
source: KG
target: SSF
created: 2026-08-31
requested_by: knowledge-graph-curation
priority: high
affects: [KG, SSF]
---

## Anlass

Der Abgleich von `modules/materials/MAG-001.yaml` bis `MAG-006.yaml` hat ergeben, dass die dort bereits verwendeten `CON:PHY:*`- und `CON:MAT:*`-IDs außerhalb von MAG-004/005 bislang nicht im KG registriert waren.

KG hat diese Identitäten nun in `exports/materials-magnetics-0.1.json` v0.1.1 vollständig kanonisiert. KXF 0.6.12 exponiert den Registry-Vertrag.

## Kanonische Domains

- `KD:PHY-MAGNETISM:N1` — MAG-001
- `KD:MAT-MAGNETIC-MATERIALS:N2` — MAG-002 bis MAG-005
- `KD:MAT-MAGNETIC-PROCESSING:N3` — MAG-006

Prerequisite-Kette:

`KD:PHY-MAGNETISM:N1 -> KD:MAT-MAGNETIC-MATERIALS:N2 -> KD:MAT-MAGNETIC-PROCESSING:N3`

## Kanonische Konzepte

### MAG-001
- `CON:PHY:magnetic-field`
- `CON:PHY:magnetic-dipole`
- `CON:PHY:electromagnetism`

### MAG-002
- `CON:MAT:magnetic-moment`
- `CON:MAT:diamagnetism`
- `CON:MAT:paramagnetism`
- `CON:MAT:ferromagnetism`
- `CON:MAT:magnetic-domain`

### MAG-003
- `CON:MAT:hysteresis`
- `CON:MAT:remanence`
- `CON:MAT:coercivity`
- `CON:MAT:soft-magnetic`
- `CON:MAT:hard-magnetic`

### MAG-004/005
Die sieben IDs aus `EXT-KG-SSF-20260831-PERMANENT-MAGNET-MATERIALS-R2` bleiben unverändert maßgeblich.

### MAG-006
- `CON:MAT:composition`
- `CON:MAT:microstructure`
- `CON:MAT:processing`
- `CON:MAT:critical-raw-materials`
- `CON:MAT:recycling`

## Anforderung

1. Die bestehenden `key_concepts` in MAG-001 bis MAG-006 nicht umbenennen; sie sind jetzt KG-kanonisch.
2. SSF darf die oben genannten KnowledgeDomains konsumieren, aber keine konkurrierenden kanonischen Domain-IDs anlegen.
3. Die lokale Modulfolge `MAG-001` ... `MAG-006` darf als SSF-Draftstruktur bestehen bleiben.
4. Vor `published`/kanonischer Ausgabe müssen die Module durch KG auf `MAT/PHY-L*-NNNNNN`-LearningModule-IDs promoviert werden.
5. MAG-004/005 zusätzlich nach dem bereits offenen R2-Auftrag fachlich korrigieren.
6. MAG-006 soll Zusammensetzung, Mikrostruktur, Verarbeitung, kritische Rohstoffe und Recycling als zusammenhängende Werkstoff-Prozesskette behandeln; volatile Marktwerte bleiben datierte Evidenz und keine invarianten Concept-Eigenschaften.

## Abnahme

Erledigt, wenn:
- MAG-001 bis MAG-006 ausschließlich die oben kanonisierten Concept-IDs verwenden,
- die drei KnowledgeDomains korrekt zugeordnet sind,
- keine lokale SSF-ID als KG-kanonische LearningModule-ID ausgegeben wird,
- eine Promotion der sechs Module explizit über KG angefordert wird, sobald SSF sie veröffentlichen will.
