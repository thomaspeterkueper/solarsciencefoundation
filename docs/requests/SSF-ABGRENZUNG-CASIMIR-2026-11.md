<!--
KUEPER · Solar Science Foundation (SSF)
Path:     docs/requests/SSF-ABGRENZUNG-CASIMIR-2026-11.md
Version:  0.1.0
Created:  2026-11-28
Source:   EXT-KG-SSF-20261127-001 (Research Candidate RES-20260917-0E02295F)
-->

# Casimir-Effekt und Vakuumenergie – Abgrenzung gegenüber dem fiktiven Casimir-Drift-Antrieb

**Status:** Vorgabe für ein künftiges Modul · kein Modul vorhanden  
**Entscheidung:** SSF, 2026-11-28 (Claude, Ökosystem-Kreislauf)

## Befund

- In SSF existiert kein Modul „Casimir-Effekt und Vakuumenergie (Grundlagen)“ – weder in `content/modules/` noch in `lib/learningPaths/` noch als KG-LearningModule-Identität.
- `overtime-archive.org/src/content/documents/OTA-TEC-0037-2026-DE.md` (§9 und Relationsblock) führt trotzdem `TAUGHT_BY → SSF-Modul "Casimir-Effekt und Vakuumenergie (Grundlagen)"`. Die Relation zeigt damit auf ein nicht vorhandenes Ziel.
- Der Casimir-Drift-Antrieb der VEX-47 ist [F] (fiktive χ-Feld-Technologie).

## Vorgabe für ein künftiges Modul

Legt SSF ein solches Modul an (erst nach KG-Identität, siehe `docs/KNOWLEDGE-MODEL.md`), muss es folgende Lernziele und Grenzen ausdrücklich enthalten:

1. **Statischer Casimir-Effekt [R]:** anziehende, konservative, von Geometrie und Randbedingungen abhängige Kraft zwischen eng benachbarten Leitern; präzise vermessen (Lamoreaux 1997, Abstände 0,6–6 µm). Kein gerichteter Schub, keine Energiequelle: Ein geschlossener Zyklus liefert keine Nettoarbeit.
2. **Deutung [R/T]:** Der Effekt lässt sich ohne Bezug auf die Nullpunktsenergie als retardierte van-der-Waals-Kraft berechnen (Jaffe 2005); er belegt keine „anzapfbare Vakuumenergie“.
3. **Dynamischer Casimir-Effekt [R]:** in supraleitenden Schaltkreisen beobachtet (Wilson et al. 2011, Photonenpaare und Zwei-Moden-Squeezing). Die Photonen stammen aus der aufgewendeten Modulationsarbeit; ein Schub wurde nicht gemessen.
4. **Abgrenzungsnotiz [F]:** „Der Casimir-Drift-Antrieb in NOXIA und im Overtime Archive ist fiktiv. Reale Casimir-Physik liefert weder Antrieb noch extrahierbare Vakuumenergie.“ Die Notiz steht sichtbar im Modul, nicht nur in Metadaten.
5. **Relation:** Eine `TAUGHT_BY`-Relation von einer fiktiven Technik auf das Modul bedeutet nur „das Modul lehrt die reale Physik, an die die Fiktion anknüpft“, nicht „das Modul erklärt, wie der Antrieb funktioniert“.

Quellen und Evidenzstufen: `kueper-knowledge-graph/research/candidates/RES-20260917-0E02295F.md` (nicht kanonisch; Quellen dort [S1]–[S3]).

## Weiterleitung

- An OTA (Umschlag `.kueper/outbox/20261128-ssf-to-ota-tec0037-taught-by.json`): `TAUGHT_BY` in OTA-TEC-0037 auf ein vorhandenes Ziel bringen oder als geplant kennzeichnen.
- Kein Umschlag an den KG: Ob ein Casimir-Modul angelegt wird, ist eine Curriculumsentscheidung, die nicht aus diesem Request folgt.
