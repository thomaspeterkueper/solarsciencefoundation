---
id: SSF-0008-noxia-uid-completion
requester: SYS:KUEPER:noxia
recipient: SYS:KUEPER:ssf
type: feature
priority: high
created: 2026-07-19
blocking: [NOXIA-BETA]
status: done
---

# SSF-0008 — NOXIA uid-Parameter: Abschluss dem richtigen Spieler zuordnen

## Kontext

NOXIA öffnet SSF-Modulseiten mit URL-Parametern:
```
/modules/ECO-L0-000001?ref=noxia&uid={noxia-user-id}
```

- `ref=noxia` — Herkunft NOXIA
- `uid` — Supabase User-ID des NOXIA-Spielers

Nach Quiz-Abschluss auf SSF ruft NOXIA `/api/player/{uid}/progress` ab
um zu prüfen ob das Modul abgeschlossen wurde.

## Problem

SSF speichert Completions aktuell für den **SSF-eigenen** eingeloggten User.
Wenn ein NOXIA-Spieler **nicht** bei SSF eingeloggt ist, landet der Abschluss
nirgendwo und NOXIA findet ihn nicht beim Sync.

## Gewünschtes Verhalten

**Option A (empfohlen):** Wenn `?uid=` vorhanden und Spieler nicht bei SSF eingeloggt →
Quiz-Abschluss wird unter der NOXIA-uid gespeichert (als "externer Spieler").

**Option B:** Nach Quiz-Abschluss Redirect zurück zu NOXIA mit Completion-Token:
```
noxiagame.vercel.app/dashboard?module_completed=ECO-L0-000001&token=xxx
```

NOXIA verifiziert den Token und schreibt den Abschluss selbst.

## Bevorzugte Lösung

**Option A** — kein Redirect nötig, nahtlose UX.

Konkret:
1. Modul-Seite liest `?uid=` aus URL-Parametern
2. Nach Quiz-Abschluss: `saveCompletionToSupabase(uid, moduleId)` 
   (statt aktuell nur für eingeloggten SSF-User)
3. `/api/player/{uid}/progress` gibt diesen Abschluss zurück
4. NOXIA `sync_from_ssf` findet ihn beim nächsten Sync

## Rücklink

Wenn `ref=noxia` vorhanden → nach Abschluss Button anzeigen:
```
← Zurück zu NOXIA
```
Link: `https://noxiagame.vercel.app/dashboard`

## Blocks

- NOXIA Beta-Start
- `UNL:NOX:bank-credit` Gate (erster echter Unlock für Spieler)


## Erledigt 2026-07-19

- `app/modules/[id]/page.tsx`: uid/ref params durch Redirects weitergeleitet
- `app/learning-paths/[id]/page.tsx`: NOXIA-Banner + Zurück-Link wenn ref=noxia
- `PathRunner.tsx` v1.1.4: noxiaUid Prop, saveNoxiaCompletion()
- `app/api/noxia/completion/route.ts`: POST (Abschluss speichern) + GET (Sync-Abfrage)


## NOXIA-Seite umgesetzt — 2026-07-19

Done
