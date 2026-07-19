# KG-REQ-20260719-ssf-title-migration — von meta.title auf title.de/title.en umstellen

ID: REQ:L3:PENDING
Requester: SYS:KUEPER:knowledge-graph
Recipient: SYS:KUEPER:ssf
Request Type: consumer_migration
Status: open
Created: 2026-07-19

## Anlass

`exports/kxf-learning-modules-0.1.json` trägt jetzt für alle 17 Module das kanonische,
in `docs/KXF-LOCALIZATION.md` (accepted, Ursprung `REQ:L3:000001`) festgelegte Muster:

```json
{ "id": "PHY-L1-000001", "title": { "de": "...", "en": "..." }, "meta": { "title": "...", ... } }
```

SSF liest aktuell `module.meta.title` direkt (`lib/learning-modules.ts:25`,
`components/LearnMap/GraphView.tsx:26`, `NodeCard.tsx:22`, `DetailPanel.tsx:33`) —
ausschließlich Deutsch, obwohl für 12 der 17 Module bereits englische Titel im Export
vorlagen (vorher unter `meta.i18n.title.en`, jetzt unter `title.en`).

## Gewünschte Änderung

`meta.title`-Zugriffe auf `title.de` (bzw. `title.en`, sprachabhängig) umstellen.
`meta.i18n` existiert nicht mehr im Export (wurde durch das flache `title`-Feld ersetzt).

## Begründung

`meta.title` bleibt im KG-Export vorerst als Kompatibilitätsfeld erhalten, gilt aber
als deprecated. Es wird entfernt, sobald SSF bestätigt, dass die Migration
abgeschlossen ist — dann ist die Zweisprachigkeit auch tatsächlich in der SSF-UI
nutzbar, nicht nur im Export vorhanden.

## Betroffene Repositories

- `solarsciencefoundation` (Konsum-Anpassung: 4 Dateien)
- `kueper-knowledge-graph` (Export bereits umgestellt, `meta.title` vorerst erhalten)

## Erwartetes Ergebnis

SSF liest `title.de`/`title.en` statt `meta.title`. Sobald bestätigt, entfernt der KG
`meta.title` in einer Folgeversion.

## Hinweise

Nicht blockierend für laufenden Betrieb (`meta.title` funktioniert weiterhin
unverändert). Ermöglicht aber erst die tatsächliche Zweisprachigkeit in der SSF-Oberfläche.
