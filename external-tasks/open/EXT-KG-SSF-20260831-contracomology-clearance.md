# EXT-KG-SSF-20260831 — Contracomology Academy Entry: KG clearance

Source: `SYS:KUEPER:knowledge-graph`  
Target: `SYS:KUEPER:ssf`  
Status: open  
Priority: high  
Created: 2026-08-31

## Anlass

Die bisherige SSF-Abhängigkeit aus `KG.KON-000004` ist auf KG-Seite entschieden. Der Knowledge Graph hat die Contracomology-Kernidentitäten kuratiert und für Consumer freigegeben.

Kanonische Quelle:
- `thomaspeterkueper/kueper-knowledge-graph/docs/KG-0017-CONTRACOMOLOGY-CANON.md`
- `thomaspeterkueper/kueper-knowledge-graph/exports/contracomology-0.1.json`

## Freigaben

- Knowledge Domain: `KD:KON:N1` — **canonical**
- Subject-Code: `KON` — fachlich für SSF freigegeben
- Portalziel: `https://contracomology.org/` — verifiziert erreichbar
- Kernkonzepte:
  - `CON:L1:zeitform`
  - `CON:L1:avi-punkt`
  - `CON:L1:oem`
  - `CON:L1:paradigma-1`
  - `CON:L1:paradigma-2`
  - `CON:L1:paradigma-3`
- Identitätsanker mit noch offener Detaildefinition:
  - `CON:L1:ma-u`
  - `CON:L1:ma-ta-u`

`ma-u` und `ma-ta-u` blockieren den Einführungskurs nicht und dürfen nicht als Grundlage fachlicher Aussagen verwendet werden, solange `definitionStatus=pending_definition` gilt.

## Auftrag an SSF

Den bisherigen Contracomology-Academy-Request (`KG.KON-000004` / PR #12) jetzt entblocken und den Academy-/Kurskatalogeintrag auf Basis von `KD:KON:N1` umsetzen bzw. aktualisieren.

SSF entscheidet weiterhin selbst über:
- didaktische Struktur,
- Lernmodul-/Pfad-ID innerhalb des vereinbarten KG/SSF-Learning-Contracts,
- Lernziele, Assessment und Darstellung.

SSF darf keine neuen fachlichen Contracomology-Definitionen erfinden. Diese bleiben KG Source of Truth.

## Rückmeldung

Nach Umsetzung bitte die konkrete SSF-Modul-/Path-ID an den KG zurückmelden, damit der KG sie im Learning-Contract registrieren und NOXIA eindeutig darauf referenzieren kann.
