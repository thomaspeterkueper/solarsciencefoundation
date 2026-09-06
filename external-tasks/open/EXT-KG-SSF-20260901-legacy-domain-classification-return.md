---
id: EXT-KG-SSF-20260901-LEGACY-DOMAIN-CLASSIFICATION-RETURN
title: Verbleibende KNOW-Domain-Quarantäne mit KG-Mapping auflösen
status: open
source: KG
target: SSF
created: 2026-09-01
priority: high
affects: [KG, SSF]
---

## Anlass

KG hat `SSF-KG-REQ-20260901-001-remaining-legacy-domains.md` abgeschlossen. Der kanonische Migrationsvertrag `exports/legacy-knowledge-domain-mappings-0.1.json` steht jetzt auf Version 0.1.1 und enthält 43 klassifizierte SSF-Legacy-IDs.

## Kanonische Zuordnung

- `KNOW:CHE-REACTIONS` -> `KD:CHM:N1`
- `KNOW:CHE-ORGANIC` -> `KD:CHM:N1`
- `KNOW:PHY-SURFACE-TENSION` -> `KD:PHYS:N1`
- `KNOW:PHY-CAPILLARITY` -> `KD:PHYS:N1`

Alle vier Klassifikationen sind `maps_existing`. Keine neue `KD:*`-Domain wurde hierfür angelegt.

## SSF-Anforderung

1. Die beiden quarantänisierten Pfade auf die kanonischen Domains umstellen:
   - `PATH:SSF:CHE-KUECHE-MAILLARD-0001`: die beiden CHE-Legacy-IDs durch `KD:CHM:N1` ersetzen/deduplizieren.
   - `PATH:SSF:PHY-WASSER-OBERFL-0001`: die beiden PHY-Legacy-IDs durch `KD:PHYS:N1` ersetzen/deduplizieren.
2. Danach die Quarantäne entfernen, sofern der Registry-Validator weiterhin `criticalIssueCount: 0` meldet.
3. Keine neuen schmalen `KD:*`-IDs lokal erzeugen. Falls später ein stabiler N2-Curriculum-Cluster für organische Chemie oder Grenzflächenphysik entsteht, separat beim KG anfordern.
4. Runtime-/CI-Health erneut prüfen und Ergebnis beim Abschluss dokumentieren.

## Zusätzlicher noch offener Befund

`lib/learningPaths/noxiaResourceExtraction.ts` verwendet derzeit `domainsNeeded: ['KD:ENGINEERING', 'KD:GEOLOGY', 'KD:PHYSICS']`. Diese drei Bezeichner sind keine freigegebenen kanonischen IDs. Bitte im selben Integritätslauf ersetzen durch:

- `KD:ENGINEERING` -> `KD:ENG:N1`
- `KD:GEOLOGY` -> `KD:GEO:N1`
- `KD:PHYSICS` -> `KD:PHYS:N1`

Die didaktische Implementierung bleibt SSF-Verantwortung.

## KG Review 2026-09-06

Abnahme weiterhin blockiert. Gegen aktuellen SSF-Stand geprüft:

- `lib/learningPaths/maillard.ts` verwendet weiterhin `KNOW:CHE-REACTIONS` und `KNOW:CHE-ORGANIC` in `domainsNeeded`; der Pfad bleibt damit durch `quarantineUnmappedLegacyDomains()` vom konsumierbaren Registry-Bestand ausgeschlossen.
- `PATH:SSF:PHY-WASSER-OBERFL-0001` im aktuellen `lib/learningPaths.ts` verwendet weiterhin `KNOW:PHY-SURFACE-TENSION` und `KNOW:PHY-CAPILLARITY`.
- `lib/learningPaths/noxiaResourceExtraction.ts` verwendet weiterhin `KD:ENGINEERING`, `KD:GEOLOGY`, `KD:PHYSICS` statt `KD:ENG:N1`, `KD:GEO:N1`, `KD:PHYS:N1`.
- `lib/learningPathRegistry.ts` enthält für die vier neuen Legacy-IDs noch keine Einträge im lokalen `LEGACY_DOMAIN_MAP`; deshalb werden insbesondere Maillard und der Oberflächen-/Kapillaritätspfad nicht automatisch auf die KG-Zuordnung 0.1.1 normalisiert.

Vor `done/` sind die drei genannten Stellen tatsächlich zu korrigieren und Registry-/Runtime-Health erneut nachzuweisen. Ein bloßes Ergänzen weiterer lokaler Alias-IDs ist nicht ausreichend; Ziel ist der direkte kanonische `KD:*`-Stand in den betroffenen governed/aktiven Pfaden.

## KG-Referenz

- KG commit `847fbe3ce3e0055573efb1da34ea606cea37da5f`
- `exports/legacy-knowledge-domain-mappings-0.1.json` v0.1.1
