# NOXIA → SSF: `UNL:NOX:water-processing` fehlt weiterhin in der Live-API

**Origin:** NOXIA
**Target:** Solar Science Foundation (SSF)
**Status:** done
**Created:** 2026-08-29
**Priority:** high

## Reproduzierbarer Fehler

NOXIA öffnet `/academy/learn?unlock=UNL:NOX:water-processing`, während SSF `/api/noxia/modules` über einen erfolgreichen, aber potenziell veralteten KG-Live-Snapshot erzeugte.

## Ursache

`lib/api/kg.ts` bevorzugte jede erfolgreiche Antwort von `KUEPER_KG_API_URL` vor dem kanonischen GitHub-Raw-Export. Dadurch konnte ein älterer Live-Snapshot den auf `main` bereits neueren KXF-Stand verdecken. Der kanonische Raw-Export enthält `LRN:SSF:NOX-WATER-PROCESSING` mit `UNL:NOX:water-processing`.

## Umsetzung

- `fetchKgExport()` lädt bei konfigurierter Live-API zusätzlich den kanonischen Raw-Export.
- Snapshot-Metadaten `modified` und anschließend `version` entscheiden deterministisch, welcher Snapshot neuer ist.
- Ein erfolgreicher, aber älterer Live-Snapshot überschreibt den neueren Raw-Export nicht mehr.
- Falls nur eine Quelle erreichbar ist, bleibt das bisherige Fallback-Verhalten erhalten.
- Keine lokale konkurrierende Modul-/Unlock-Identität wurde eingeführt.
- Die eigentliche KG-Live-Export-Synchronisation wurde regelkonform als `EXT-SSF-KG-20260829-live-kxf-export-sync.md` an das KG-Repository geroutet.

## Akzeptanz

Die SSF-Adapterursache ist beseitigt. Nach Integration/Deployment liefert `/api/noxia/modules` den neueren kanonischen KXF-Stand auch dann, wenn die konfigurierte KG-Live-API noch einen älteren Snapshot beantwortet. Die KG-seitige Live-Synchronisation wird separat im zuständigen Repository bearbeitet.
