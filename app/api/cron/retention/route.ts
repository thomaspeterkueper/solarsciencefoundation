// app/api/cron/retention/route.ts
// Erstellt:     15.07.2026
// Aktualisiert: 15.07.2026
// Version:      1.0.0
//
// EXT-ECO-SSF-20260712-001 — Retention-Löschjob
// Läuft täglich 03:00 UTC.
//
// Regel 1: Inaktive Konten > 6 Monate → löschen (last_sign_in_at)
// Regel 2: Unbestätigte E-Mails > 1 Monat → löschen
//
// SSF-Besonderheit: project_access_audit steht auf ON DELETE SET NULL —
// Audit-Einträge bleiben erhalten, user_id wird NULL gesetzt.
//
// TROCKENMODUS (Default): RETENTION_DRY_RUN != 'false' → nur loggen
// Aktivierung: RETENTION_DRY_RUN=false in Vercel Environment Variables

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { verifyCronSecret } from '@/lib/cronSecret'

const DRY_RUN = process.env.RETENTION_DRY_RUN !== 'false'

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

  const supabase = getServiceClient()
  const now = new Date()
  const sixMonthsAgo = new Date(now.getTime() - 6 * 30 * 24 * 60 * 60 * 1000).toISOString()
  const oneMonthAgo  = new Date(now.getTime() - 1 * 30 * 24 * 60 * 60 * 1000).toISOString()

  const { data: listData, error: listErr } = await supabase.auth.admin.listUsers()
  if (listErr) {
    console.error('[retention:ssf] listUsers error:', listErr)
    return NextResponse.json({ error: 'listUsers failed' }, { status: 500 })
  }

  const users = listData?.users ?? []

  const toDeleteInactive = users.filter(u =>
    u.last_sign_in_at && u.last_sign_in_at < sixMonthsAgo
  )
  const toDeleteUnconfirmed = users.filter(u =>
    !u.email_confirmed_at && u.created_at < oneMonthAgo
  )

  console.log(`[retention:ssf] dry_run=${DRY_RUN} inactive=${toDeleteInactive.length} unconfirmed=${toDeleteUnconfirmed.length}`)

  if (DRY_RUN) {
    return NextResponse.json({
      ok: true,
      dry_run: true,
      would_delete_inactive:    toDeleteInactive.length,
      would_delete_unconfirmed: toDeleteUnconfirmed.length,
      note: 'project_access_audit rows will have user_id set to NULL (ON DELETE SET NULL)',
    })
  }

  let deletedInactive = 0
  let deletedUnconfirmed = 0
  const errors: string[] = []

  for (const u of toDeleteInactive) {
    const { error } = await supabase.auth.admin.deleteUser(u.id)
    if (error) errors.push(`inactive:${u.id}: ${error.message}`)
    else deletedInactive++
  }

  for (const u of toDeleteUnconfirmed) {
    if (toDeleteInactive.find(i => i.id === u.id)) continue
    const { error } = await supabase.auth.admin.deleteUser(u.id)
    if (error) errors.push(`unconfirmed:${u.id}: ${error.message}`)
    else deletedUnconfirmed++
  }

  console.log(`[retention:ssf] deleted inactive=${deletedInactive} unconfirmed=${deletedUnconfirmed}`)

  return NextResponse.json({
    ok: true,
    dry_run: false,
    deleted_inactive:    deletedInactive,
    deleted_unconfirmed: deletedUnconfirmed,
    errors: errors.length > 0 ? errors : undefined,
  })
}
