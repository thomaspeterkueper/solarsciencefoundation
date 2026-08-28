# SSF Request — kanonische Lernpfad-ID für NOXIA In-Game-Lernen liefern

## Status
Done

## Umsetzung

`GET /api/noxia/modules` liefert jetzt `pathId`. Die ID wird aus dem bestehenden SSF-Lernpfadregister aufgelöst und nicht in einem NOXIA-spezifischen Mapping dupliziert. `ssfUrl` bleibt kompatibel; `detailUrl` verweist zusätzlich auf die maschinenlesbare Modulressource.
