---
id: EXT-KG-SSF-20260905-MAG-007-CANONICAL-ALIGNMENT
title: MAG-007 auf kanonische elektromagnetische Systemanwendungen ausrichten
status: done
source: KG
target: SSF
created: 2026-09-05
completed: 2026-09-07
priority: normal
affects: [KG, SSF]
---

## Kanonischer KG-Vertrag

Quelle: `exports/materials-magnetics-0.1.json` v0.1.2, KG commit `158a76b4eba2de720d833e9c44c3302e9308e39f`.

- Domain: `KD:ENG-ELECTROMAGNETIC-SYSTEMS:N3`
- lokale SSF-ID: `MAG-007`
- Concepts: `CON:ENG:electric-motor`, `CON:ENG:generator`, `CON:ENG:transformer`, `CON:ENG:hall-sensor`, `CON:ENG:magnetic-bearing`
- lokale Voraussetzung `MAG-006` bleibt erhalten.

## Umsetzung

`modules/materials/MAG-007.yaml` wurde am 2026-09-07 auf den KG-Vertrag ausgerichtet:

- `knowledge_domain: KD:ENG-ELECTROMAGNETIC-SYSTEMS:N3` ergänzt.
- Systemfunktion und Werkstofffunktion didaktisch getrennt.
- Motoren und Generatoren werden topologieabhängig behandelt; keine pauschale Permanentmagnet-Aussage.
- Transformatoren werden als weichmagnetische Flusspfad-Anwendung mit Verlusten, Sättigung und Frequenz eingeordnet.
- Hall-Sensorik wird als Hall-Effekt-basierte Magnetfelderfassung beschrieben, nicht pauschal als Magnetwerkstoff-Bauteil.
- Magnetlager werden permanentmagnetisch, elektromagnetisch und hybrid unterschieden.
- Universelle Werkstoffrangfolgen werden vermieden.

Umsetzungscommit: `6ad9595becb00292b19286df19857f0bac4eebf9`.

Nachfolgender `main`-Stand einschließlich MAG-008 wurde über Vercel erfolgreich gebaut (`57deecfde1e98f19988c87c4b96d11f825176d6a`, Status `success`).

SSF bleibt Source of Truth für Didaktik und lokale Modulstruktur; KG für Domains, Concepts und kanonische Identitäten.
