---
id: EXT-KG-SSF-20260831-PERMANENT-MAGNET-MATERIALS-R2
title: MAG-004/005 an KG-0021 und Research R2 angleichen
status: open
source: KG
target: SSF
created: 2026-08-31
requested_by: knowledge-graph-curation
priority: high
affects: [KG, SSF]
---

## Anlass

SSF verwendet in `modules/materials/MAG-004.yaml` und `MAG-005.yaml` bereits `CON:MAT:*`-Referenzen. Diese Identitäten waren bisher im Knowledge Graph nicht registriert.

KG hat sie mit `docs/KG-0021-PERMANENT-MAGNET-MATERIALS.md` kanonisiert und in `exports/materials-magnetics-0.1.json` veröffentlicht. Grundlage für die wissenschaftliche Präzisierung ist `RES-20260831-EAA9EDD9` Revision R2.

## Kanonische Identitäten

KnowledgeDomain:
- `KD:MAT-MAGNETIC-MATERIALS:N2`

Konzepte:
- `CON:MAT:ferrite-magnet`
- `CON:MAT:alnico`
- `CON:MAT:smco`
- `CON:MAT:ndfeb`
- `CON:MAT:curie-temperature`
- `CON:MAT:working-temperature`
- `CON:MAT:demagnetization`

Die bisherigen `key_concepts` von MAG-004 und MAG-005 dürfen damit beibehalten werden; sie zeigen jetzt auf echte KG-kanonische Identitäten.

## Fachliche Anforderung MAG-004

Bitte die Lehrinhalte gegen `RES-20260831-EAA9EDD9` R2 prüfen und so formulieren, dass drei Ebenen getrennt bleiben:

1. Werkstoff-/Familieneigenschaften,
2. grade- und anwendungsabhängige Designgrenzen,
3. datierte Markt-/Lieferkettensnapshots.

Insbesondere:
- Ferrit: niedrige Energiedichte gegenüber NdFeB/SmCo, robuste Rohstoffbasis, keine Seltene-Erden-Abhängigkeit.
- AlNiCo: hohe Remanenz und hohe Temperaturtauglichkeit geeigneter Grades, aber vergleichsweise geringe Koerzitivität.
- SmCo: hohe Koerzitivität und Hochtemperaturfähigkeit geeigneter Grades; Sm/Co-Abhängigkeit.
- NdFeB: höchste verbreitete kommerzielle Energiedichte der vier Familien; starke Grade-Abhängigkeit bei Temperatur/Koerzitivität; gesintertes NdFeB häufig korrosionsschutzbedürftig.
- Keine universellen Aussagen wie `SmCo ist immer die teuerste Lösung`, `NdFeB muss immer beschichtet werden` oder zeitlose USD/kg-Werte lehren.

## Fachliche Anforderung MAG-005

Bitte ausdrücklich lehren:
- Curie-Temperatur != maximale Arbeitstemperatur.
- zulässige Arbeitstemperatur hängt von Grade, Geometrie, Magnetkreis/Gegenfeld und zulässiger Flussänderung ab.
- reversible und irreversible Entmagnetisierung getrennt behandeln.
- konkrete Hersteller-Tmax-Werte nur mit Grade-/Quellenkontext verwenden.

## Modul-IDs

`MAG-004` und `MAG-005` sind derzeit lokale SSF-Draft-IDs. Sie sind noch keine KG-kanonischen LearningModule-IDs.

Für eine spätere Promotion bitte keine neue kanonische ID in SSF erfinden. KG-Learning-Vertrag ist `DOMAIN-LX-NNNNNN`; für diese Module ist der Subject Code `MAT` bereits zugelassen. SSF soll eine Registrierungsanforderung an KG stellen bzw. den bestehenden KG-Registrarweg nutzen, bevor die Module als kanonisch/published geführt werden.

## Abnahme

Erledigt, wenn:
1. MAG-004/005 die sieben KG-Concept-IDs unverändert referenzieren,
2. die R2-Grenzen in den Lehrinhalten eingehalten werden,
3. Markt-/Lieferkettendaten als datierte Evidenz behandelt werden,
4. `MAG-004/005` nicht als kanonische Modul-IDs ausgegeben werden,
5. eine spätere Modulpromotion über KG-kanonische `MAT-L2-NNNNNN`-IDs erfolgt.
