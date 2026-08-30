# KG → SSF: kanonische NOXIA-Unlock-Lernmodulidentitäten stehen bereit

**Origin:** KUEPER Knowledge Graph (KG)
**Target:** Solar Science Foundation (SSF)
**Status:** done
**Created:** 2026-08-29
**Related:** `NOX-SSF-REQ-20260829-unlock-learning-paths.md`
**KG commit:** `81aad150ac7b2180b00e73daa90b57a523d9490e`

## Anlass

Der von SSF an KG gerichtete Request `EXT-SSF-KG-20260829-noxia-unlock-learning-module-identities` ist im Knowledge Graph abgeschlossen. Die benötigten kanonischen Modulidentitäten und NOXIA-Unlock-Referenzen sind im Learning-Modules-KXF exportiert.

SSF kann damit den eigenen Auftrag `NOX-SSF-REQ-20260829-unlock-learning-paths.md` fortsetzen. Die Source-of-Truth-Grenzen bleiben unverändert: KG besitzt Modulidentität und Struktur, SSF Didaktik und Lerninhalt, NOXIA Unlock-Identität und Spielwirkung.

## Kanonische Zuordnungen

| NOXIA Unlock | KG-Modul | Legacy-/SSF-Referenz |
| --- | --- | --- |
| `UNL:NOX:power-generation` | `PHY-L1-000025` | `LRN:SSF:PHY-1301` |
| `UNL:NOX:resource-extraction` | `ENG-L1-000005` | `LRN:SSF:NOX-RESOURCE-EXTRACTION` |
| `UNL:NOX:water-processing` | `CHE-L1-000015` | `LRN:SSF:NOX-WATER-PROCESSING` |
| `UNL:NOX:pressure-systems` | `PHY-L1-000026` | `LRN:SSF:NOX-PRESSURE-SYSTEMS` |
| `UNL:NOX:airlock` | `ENG-L1-000006` | `LRN:SSF:NOX-AIRLOCK` |
| `UNL:NOX:life-support` | `BIO-L1-000002` | `LRN:SSF:NOX-LIFE-SUPPORT` |
| `UNL:NOX:thermal-control` | `PHY-L1-000027` | `LRN:SSF:NOX-THERMAL-CONTROL` |
| `UNL:NOX:radiation-protection` | `PHY-L1-000028` | `LRN:SSF:NOX-RADIATION-PROTECTION` |
| `UNL:NOX:environment-monitoring` | `ENG-L1-000007` | `LRN:SSF:NOX-ENVIRONMENT-MONITORING` |
| `UNL:NOX:habitat-redundancy` | `ENG-L1-000008` | `LRN:SSF:NOX-HABITAT-REDUNDANCY` |
| `UNL:NOX:mars-habitat` | `ENG-L1-000009` | `LRN:SSF:NOX-MARS-HABITAT` |

## Struktur

Die von NOXIA vorgegebenen Abhängigkeiten sind im KXF als Modulabhängigkeiten abgebildet, insbesondere:

- `airlock` → `pressure-systems`
- `life-support` → `pressure-systems` + `water-processing` + `power-generation`
- `thermal-control` → `power-generation`
- `environment-monitoring` → `power-generation`
- `habitat-redundancy` → `life-support` + `environment-monitoring`
- `mars-habitat` → `water-processing` + `power-generation` + Habitat-Teilmodule

## SSF-Arbeit

Bitte die Lerninhalte, Übungen, Lernsequenzen und redaktionellen Dauern auf Basis dieser kanonischen Identitäten implementieren bzw. bestehende SSF-Inhalte daran anbinden. Die NOXIA-Unlock-IDs nicht umbenennen oder lokal ersetzen. Der KG/KXF-Export ist für die strukturelle Zuordnung maßgeblich.

Nach erfolgreicher SSF-Integration kann dieser Task nach `external-tasks/done/` verschoben werden.


## Erledigt 2026-08-30

KG-Zuordnungen übernommen. water-processing + resource-extraction Pfade implementiert. Registry-Aliases gesetzt. Weitere 9 Habitat-Unlock-Pfade folgen in nächstem Sprint.
