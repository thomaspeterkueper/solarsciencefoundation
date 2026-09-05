---
id: EXT-KG-SSF-20260905-MAG-008-CANONICAL-ALIGNMENT
title: MAG-008 auf kanonische fortgeschrittene Magnetfunktionen ausrichten
status: open
source: KG
target: SSF
created: 2026-09-05
priority: normal
affects: [KG, SSF]
---

## Anlass

`modules/materials/MAG-008.yaml` ist das Abschlussmodul der lokalen SSF-Magnetismus-Kette. Es behandelt Elektromagnete, Wirbelströme, magnetische Abschirmung, Magnetokalorik, Supraleitung und Flux Pinning. Die sechs dort verwendeten Concept-IDs waren bislang im KG nicht kanonisiert.

## Kanonischer KG-Vertrag

Quelle: `exports/materials-magnetics-0.1.json` v0.1.3, KG commit `edb0e2983213a513660012268835cdb41acc6ba7`.

KnowledgeDomain:
- `KD:MAT-MAGNETIC-FUNCTIONS:N3`
- parent `KD:MAT-MAGNETIC-MATERIALS:N2`
- requires `KD:PHYS-EM:N2`
- requires `KD:MAT-MAGNETIC-MATERIALS:N2`

MAG-008 Mapping:
- local ID: `MAG-008`
- relation: `COVERS`
- domain: `KD:MAT-MAGNETIC-FUNCTIONS:N3`
- additionally requires prior application domain `KD:ENG-ELECTROMAGNETIC-SYSTEMS:N3`

Kanonische Concepts:
- `CON:PHY:electromagnet`
- `CON:PHY:eddy-current`
- `CON:MAT:magnetic-shielding`
- `CON:MAT:magnetocaloric-effect`
- `CON:PHY:superconductivity`
- `CON:PHY:flux-pinning`

## SSF-Umsetzung / Auditkorrekturen

1. `MAG-008` bleibt eine lokale SSF-Draft-ID; keine Promotion ohne KG-Registrar.
2. `knowledge_domain: KD:MAT-MAGNETIC-FUNCTIONS:N3` ergänzen.
3. Die sechs bestehenden `key_concepts` unverändert verwenden; sie sind jetzt KG-kanonisch.
4. Die sechs Themen nicht als einen gemeinsamen Magnetwerkstoffmechanismus darstellen. Es sind unterschiedliche physikalische bzw. materialbezogene Funktionsprinzipien.
5. Elektromagnet: Feld wird wesentlich durch elektrischen Strom erzeugt; ein ferromagnetischer Kern ist häufig, aber nicht begriffsnotwendig.
6. Wirbelströme: sowohl Verlust-/Erwärmungsmechanismus als auch gezielt nutzbarer Effekt. Stärke hängt insbesondere von Leitfähigkeit, Geometrie und zeitlicher Änderung/Frequenz des Feldes ab.
7. Magnetische Abschirmung nicht als universelles Materialprinzip lehren. Hochpermeable Flussführung, leitfähige/Wirbelstrom-Abschirmung und supraleitende magnetische Reaktion sind mechanismisch verschieden und frequenzabhängig.
8. Magnetokalorik: als feldinduzierte reversible thermische Reaktion geeigneter Materialien behandeln. Effektstärke, Temperaturfenster, Systemwirkungsgrad und Technologiereife nicht verallgemeinern; letztere sind datierte Evidenz.
9. Supraleitung: nicht auf `Widerstand = 0` reduzieren. Magnetisches Verhalten und kritische Temperatur/Feld/Stromdichte gehören zur Einordnung.
10. Flux Pinning explizit vom Meissner-Effekt unterscheiden. Bei Typ-II-Supraleitern werden Flussvortizes an Pinning-Zentren festgehalten; das ist relevant für kritische Stromdichte, Hysterese und stabile Levitation und nicht bloß `magnetische Abstoßung`.
11. Prerequisite `MAG-007` und lokale Sequenz beibehalten. Die kanonische Domain-Zuordnung ergänzt die Sequenz.
12. Nach Umsetzung Registry-/Modulvalidierung ausführen und Task mit Commit-/Testnachweisen nach `done/` verschieben.

## Evidenzgrenzen

Die KG-Korrekturen wurden gegen etablierte Referenzpunkte zu magnetokalorischer Kühlung und Flux Pinning geprüft. Insbesondere ist Flux Pinning als Vortex-Pinning in Typ-II-Supraleitern zu behandeln; magnetokalorische Leistungs-/Effizienzangaben sind nicht als zeitlose Concept-Eigenschaften zu übernehmen.

SSF bleibt Source of Truth für Didaktik und lokale Modulstruktur; KG für Domains, Concepts und kanonische Identitäten.
