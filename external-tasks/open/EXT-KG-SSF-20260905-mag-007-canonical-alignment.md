---
id: EXT-KG-SSF-20260905-MAG-007-CANONICAL-ALIGNMENT
title: MAG-007 auf kanonische elektromagnetische Systemanwendungen ausrichten
status: open
source: KG
target: SSF
created: 2026-09-05
priority: normal
affects: [KG, SSF]
---

## Anlass

`modules/materials/MAG-007.yaml` ist der nächste lokale SSF-Draft nach der bereits abgestimmten MAG-001..006-Kette. Das Modul behandelt Anwendungen magnetischer Materialien in Motoren, Generatoren, Transformatoren, Hall-Sensoren und Magnetlagern. Die dort verwendeten `CON:ENG:*`-Identitäten waren bislang im KG nicht kanonisiert.

## Kanonischer KG-Vertrag

Quelle: `exports/materials-magnetics-0.1.json` v0.1.2, KG commit `158a76b4eba2de720d833e9c44c3302e9308e39f`.

KnowledgeDomain:
- `KD:ENG-ELECTROMAGNETIC-SYSTEMS:N3`
- requires `KD:PHYS-EM:N2`
- requires `KD:MAT-MAGNETIC-MATERIALS:N2`

MAG-007 Mapping:
- local ID: `MAG-007`
- relation: `COVERS`
- domain: `KD:ENG-ELECTROMAGNETIC-SYSTEMS:N3`
- additionally requires prior chain domain `KD:MAT-MAGNETIC-PROCESSING:N3`

Kanonische Concepts:
- `CON:ENG:electric-motor`
- `CON:ENG:generator`
- `CON:ENG:transformer`
- `CON:ENG:hall-sensor`
- `CON:ENG:magnetic-bearing`

## SSF-Umsetzung / Auditkorrekturen

1. `MAG-007` bleibt eine lokale SSF-Draft-ID. Nicht als kanonische LearningModule-ID behandeln; eine spätere Publikation braucht KG-Registrar-Promotion.
2. `knowledge_domain: KD:ENG-ELECTROMAGNETIC-SYSTEMS:N3` ergänzen.
3. Die fünf bestehenden `key_concepts` dürfen unverändert bleiben; sie sind jetzt KG-kanonisch.
4. Die Didaktik muss **Systemfunktion und Werkstofffunktion unterscheiden**:
   - Elektromotoren/Generatoren können je nach Topologie Permanentmagnete, Elektromagnete und weichmagnetische Flussführungen unterschiedlich einsetzen.
   - Transformatoren sind kein Permanentmagnet-Anwendungsfall; der Kern ist typischerweise weichmagnetisch und wird nach Verlusten/Sättigung/Frequenz gewählt.
   - Hall-Sensoren nutzen den Hall-Effekt zur Magnetfelderfassung; der Sensor selbst ist nicht notwendig ein Magnetwerkstoff-Bauteil.
   - Magnetlager können permanentmagnetisch, elektromagnetisch oder hybrid arbeiten.
5. Vergleiche dürfen keine universelle Rangfolge magnetischer Werkstoffe behaupten. Auswahl hängt u. a. von Feldanforderung, Verlusten, Temperatur, mechanischen Randbedingungen und Systemtopologie ab.
6. Die im Summary zusätzlich genannten MRT, Lautsprecher und Datenspeicherung dürfen als Beispiele verbleiben, aber keine neuen lokalen `CON:*`-IDs dafür erfinden. Falls sie zu eigenständigen Lehrzielen werden, vorher KG-Kanonisierung anfordern.
7. Prerequisite `MAG-006` und Relation `requires: [MAG-006]` beibehalten; die kanonische Domain-Zuordnung ergänzt diese lokale Sequenz und ersetzt sie nicht.
8. Nach Umsetzung Registry-/Modulvalidierung ausführen und Task mit Commit-/Testnachweisen nach `done/` verschieben.

SSF bleibt Source of Truth für Didaktik und lokale Modulstruktur; KG für Domains, Concepts und kanonische Identitäten.
