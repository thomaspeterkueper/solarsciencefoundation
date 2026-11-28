---
id: EXT-KG-SSF-20261023-REFRACTION
title: SSF-Refraktion auf kanonische KG-KXF-Identitäten umstellen
status: done
source: KG
target: SSF
created: 2026-10-23
priority: high
---

# SSF-Consumer-Integrationsauftrag: Atmosphärische Refraktion

## Ausgangslage
KG PR #146 ist auf main per Squash-Commit `fe78b2d7` integriert. `exports/kxf-learning-modules-0.1.json` ist Version `0.2.15` und enthält `PHY-L1-000030` mit Voraussetzung `PHY-L1-000003`.

Verbindliche KG-Identitäten:
- LearningModule: `PHY-L1-000030` (nicht `PHY-L1-000004`)
- Concept: `CON:L1:atmosphaerische-refraktion`
- Model: `MOD:L2:bennett-atmosphaerische-refraktion`
- Simulator-Consumer (nicht KG-LearningModule): `NOXIA:DEMO:PHY:ATMOSPHERIC-REFRACTION:V1`
- Kuratierte Autorenquelle: `learning/ssf-phy-atmosphaerische-refraktion.yaml`
- Consumer-Projektion: `exports/kxf-learning-modules-0.1.json`

## Befund bei der Bestandsprüfung
- SSF PR #61 verwendet in `content/modules/phy-l1-000004.md` die abweichende Identität `PHY-L1-000004`. Diese keinesfalls als zweite kanonische Refraktionsmodul-ID behandeln.
- SSF PR #60 verwendet in `lib/learningPaths/harvestMoonRefraction.ts` noch `sourceModuleId: SSF-PHY-HORIZON-REFRACTION-0001` und `kxfModuleId: LRN:SSF:PHY-HORIZON-REFRACTION-0001` sowie `suppliedBy.knowledgeGraph: []`. Vor Integration gegen die kanonische KG-Projektion abgleichen; historische Referenzen nur als ausdrücklich markierte Aliase führen, soweit überhaupt notwendig.

## Gewünschte Änderungen im SSF-Repository
1. PR #60/#61 auf aktuellen main-Stand prüfen, keine unkontrollierte Parallelidentität einführen.
2. Alle Lernmodule-/KXF-Referenzen auf `PHY-L1-000030` vereinheitlichen und Voraussetzungen `PHY-L1-000003` konsumieren.
3. `CON:L1:atmosphaerische-refraktion` und `MOD:L2:bennett-atmosphaerische-refraktion` als KG-Quellenidentitäten benutzen; keine zweite fachliche Autorenquelle anlegen.
4. Lehrinhalt, Simulator-Fallback und Lernpfad-/Quiz-Gates SSF-seitig belassen. Modelloutput nicht als Messung ausgeben; Miragen/Inversionen als Gültigkeitsgrenzen markieren.
5. Relevante SSF-Tests und KG-KXF-Auflösung nachweisbar ausführen und erst nach erfolgreicher Abnahme mergen.

## Zuständigkeit
KG verwaltet IDs, Ontologie und KXF; SSF besitzt Lerninhalte und Prüfungen; NOXIA besitzt Simulatorphysik. Diese Datei ist ein Auftrag, keine Implementierung auf SSF.

Quellen: https://github.com/thomaspeterkueper/kueper-knowledge-graph/pull/146 ; https://github.com/thomaspeterkueper/solarsciencefoundation/pull/60 ; https://github.com/thomaspeterkueper/solarsciencefoundation/pull/61

## Erledigt

Status: done – Ökosystem-Kreislauf (Claude), 28.11.2026, Branch `claude/EXT-KG-SSF-20261023-REFRACTION`.

## Umgesetzt

- Neuer Lernpfad `PATH:SSF:PHY-ATMOSPHAERISCHE-REFRAKTION-0001` in `lib/learningPaths/atmosphericRefraction.ts`: `sourceModuleId`/`kxfModuleId` `PHY-L1-000030`, Domain `KD:PHYS:N1`, KG-Quellenidentitäten `PHY-L1-000003` (Voraussetzung), `CON:L1:atmosphaerische-refraktion`, `MOD:L2:bennett-atmosphaerische-refraktion`; im Registry registriert.
- Fünf Kapitel nach Autorenleitfaden (Beobachtung, Erklärung, gelöste Aufgabe, Kurztest mit drei Fragen); Inhalte aus PR #60 übernommen und fachlich ergänzt. Bennett-Ergebnis ausdrücklich als Modellwert für eine Standardatmosphäre, Inversionen und Luftspiegelungen als Gültigkeitsgrenzen. Simulator `NOXIA:DEMO:PHY:ATMOSPHERIC-REFRACTION:V1` nur als Consumer, mit SSF-Fallback ohne Simulator; keine Änderung an `noxiaBridge.ts`.
- Keine Parallelidentität: `PHY-L1-000004` (KG: Wasser-Phasenmodul) und `SSF-PHY-HORIZON-REFRACTION-0001` werden nicht verwendet; Regressionstest `tests/atmosphericRefractionLearningPath.test.ts`.
- PR #60 und #61 sind damit überholt und sollten ohne Merge geschlossen werden (im Lauf nicht geschlossen, Entscheidung bei Thomas).
- Prüfungen: `npm test` (139/139) und `npm run build` grün.
