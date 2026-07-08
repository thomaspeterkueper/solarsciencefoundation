# KG-0003

Status: done
Completed: 2026-07-08

## Resolution

app/api/noxia/unlocks/check/route.ts v0.2.0:

1. API-Key-Auth via X-NOXIA-API-KEY header (env: NOXIA_API_KEY)
2. CORS: explizit auf noxiagame.vercel.app + noxia.kueper.com + NOXIA_ORIGIN begrenzt
3. Demo-Endpunkt an /api/noxia/unlocks/demo/ ausgelagert — kein Auth, explizite Warnung
4. Produktiv-Pfad trennt Demo (kein Key konfiguriert → 503) von Auth-Fehler (Key falsch → 401)
5. TODO: playerId → Supabase-Lookup wenn Progress-Tracking bereit

Blocking für SSF↔NOXIA produktive Aktivierung entfernt sobald NOXIA_API_KEY gesetzt.
