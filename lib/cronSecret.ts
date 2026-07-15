// lib/cronSecret.ts
// Erstellt:     15.07.2026
// Aktualisiert: 15.07.2026
// Version:      1.0.0
// Vercel sendet CRON_SECRET als Header 'x-vercel-cron-auth'.

export const CRON_SECRET_HEADER = 'authorization'

export function verifyCronSecret(authHeader: string | null): boolean {
  if (!authHeader) return false
  const secret = process.env.CRON_SECRET
  if (!secret) return false
  return authHeader === `Bearer ${secret}`
}
