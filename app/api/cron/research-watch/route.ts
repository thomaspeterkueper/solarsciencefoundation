// app/api/cron/research-watch/route.ts
// Erstellt:     24.08.2026
// Aktualisiert: 24.08.2026
// Version:      1.0.0
//
// SSF Research Watch v0.1 — Watch-and-Triage (docs/RESEARCH-WATCH.md)
// Entdeckt neue wissenschaftliche Werke, dedupliziert sie, bewertet Relevanz
// und Impact-Klasse und erzeugt begrenzte TaskCandidates (RESEARCH_DISCOVERY
// / CANON_VALIDATION). Schreibt NIE direkt Lerninhalte um.
//
// TROCKENMODUS (Default): RESEARCH_WATCH_DRY_RUN != 'false' → In-Memory-Store,
// nichts wird persistiert. Aktivierung: RESEARCH_WATCH_DRY_RUN=false
// (Supabase-Service-Role erforderlich, Migration 20260824120000_research_watch.sql).
//
// Outbox: Nur wenn RESEARCH_WATCH_OUTBOX_DIR gesetzt ist (schreibbares
// Verzeichnis, z. B. ein lokaler Checkout), werden Cross-Project-Envelopes
// (.kueper/outbox/*.json) für KG-gerichtete CANON_VALIDATION-Kandidaten
// geschrieben. SSF-interne Kandidaten bleiben im Candidate-Store.

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { verifyCronSecret } from '@/lib/cronSecret'
import { runResearchWatch } from '@/lib/research-watch/engine'
import { MemoryEvidenceStore } from '@/lib/research-watch/store'
import { SupabaseEvidenceStore } from '@/lib/research-watch/supabaseStore'

export const maxDuration = 60

const DRY_RUN = process.env.RESEARCH_WATCH_DRY_RUN !== 'false'

function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function GET(req: NextRequest) {
  if (!verifyCronSecret(req.headers.get('authorization'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const outboxDir = process.env.RESEARCH_WATCH_OUTBOX_DIR?.trim() || undefined

  let summary
  if (DRY_RUN) {
    // Nichts persistieren — komplette Pipeline auf In-Memory-Store.
    summary = await runResearchWatch({
      store: new MemoryEvidenceStore(),
      outboxDir,
      parentTask: 'EXT-ECO-SSF-20260821-001',
    })
  } else {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) {
      return NextResponse.json(
        { error: 'RESEARCH_WATCH_DRY_RUN=false requires Supabase service-role environment' },
        { status: 503 }
      )
    }
    summary = await runResearchWatch({
      store: new SupabaseEvidenceStore(getServiceClient()),
      outboxDir,
      parentTask: 'EXT-ECO-SSF-20260821-001',
    })
  }

  return NextResponse.json({
    ok: true,
    dry_run: DRY_RUN,
    ...summary,
  })
}
