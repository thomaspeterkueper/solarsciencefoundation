---
id: EXT-KG-SSF-20260905-MAG-008-CANONICAL-ALIGNMENT
title: MAG-008 auf kanonische fortgeschrittene Magnetfunktionen ausrichten
status: done
source: KG
target: SSF
created: 2026-09-05
completed: 2026-09-07
priority: normal
affects: [KG, SSF]
---

## Kanonischer KG-Vertrag

Quelle: `exports/materials-magnetics-0.1.json` v0.1.3, KG commit `edb0e2983213a513660012268835cdb41acc6ba7`.

- Domain: `KD:MAT-MAGNETIC-FUNCTIONS:N3`
- lokale SSF-ID: `MAG-008`
- Concepts: `CON:PHY:electromagnet`, `CON:PHY:eddy-current`, `CON:MAT:magnetic-shielding`, `CON:MAT:magnetocaloric-effect`, `CON:PHY:superconductivity`, `CON:PHY:flux-pinning`
- lokale Voraussetzung `MAG-007` bleibt erhalten.

## Umsetzung

`modules/materials/MAG-008.yaml` wurde am 2026-09-07 auf den KG-Vertrag ausgerichtet:

- `knowledge_domain: KD:MAT-MAGNETIC-FUNCTIONS:N3` ergänzt.
- Die sechs Themen werden ausdrücklich als unterschiedliche physikalische bzw. materialbezogene Funktionsprinzipien behandelt.
- Elektromagnete werden über stromerzeugtes Feld definiert; ein ferromagnetischer Kern ist nicht begriffsnotwendig.
- Wirbelströme werden als Verlust-/Erwärmungsmechanismus und nutzbarer Effekt mit Abhängigkeit von Leitfähigkeit, Geometrie und zeitlicher Feldänderung eingeordnet.
- Abschirmmechanismen durch hochpermeable Flussführung, leitfähige Wirbelströme und supraleitende Reaktion werden getrennt.
- Magnetokalorik wird ohne universelle Leistungs- oder Wirkungsgradangaben behandelt.
- Supraleitung wird nicht auf `R = 0` reduziert.
- Flux Pinning wird explizit vom Meissner-Effekt unterschieden und als Vortex-Pinning in Typ-II-Supraleitern eingeordnet.

Umsetzungscommit: `57deecfde1e98f19988c87c4b96d11f825176d6a`.
Vercel-Status dieses Commits: `success`.

SSF bleibt Source of Truth für Didaktik und lokale Modulstruktur; KG für Domains, Concepts und kanonische Identitäten.
