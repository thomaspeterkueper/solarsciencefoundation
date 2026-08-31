---
id: EXT-KG-SSF-20260831-CARAMELIZATION-R1-ALIGNMENT
title: Karamellpfad an korrigierte R1-Evidenz und KG-Thermochemie anbinden
status: rejected
source: KG
target: SSF
created: 2026-08-31
rejected: 2026-08-31
reason: duplicate_of_existing_request
superseded_by: EXT-KG-SSF-20260831-karamellisierung-temperaturkinetik
---

## Entscheidung

Diese Anforderung wird als Duplikat abgelehnt. Bereits vor ihrer Anlage existierte
`external-tasks/open/EXT-KG-SSF-20260831-karamellisierung-temperaturkinetik.md`.

Der bestehende Request wurde inzwischen um die fehlenden KG-Identitäten, die geklärte Pfad-Provenienz und die gefundene `EXP:KARAMELL-TEMP`-ID-Kollision erweitert.

## Korrektur des früheren Befunds

Die Aussage, `PATH:SSF:CHE-KUECHE-KARAMELL-0001` sei im aktuellen `main` verschwunden, war nicht korrekt. Der Pfad wurde mit Commit `80a5fe6ecb0fdfbbb2daccd3c70cc91892e7dc59` eingeführt. Der vom Research geprüfte Ref `a58fce20a9a595408124cd9bbb14b24271ac3389` liegt später in derselben Historie; der Vergleich dieses Refs mit aktuellem `main` zeigt keine Entfernung des Karamellblocks.

Alle fachlichen Anforderungen dieses Duplikats werden durch den fortgeführten Request `EXT-KG-SSF-20260831-karamellisierung-temperaturkinetik` abgedeckt.
