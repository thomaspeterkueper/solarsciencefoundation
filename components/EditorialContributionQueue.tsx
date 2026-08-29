'use client';

import { useEffect, useState } from 'react';
import { createBrowserSupabaseClient } from '../lib/supabase/client';

type Item = { id: string; title: string; summary: string; body_markdown: string; status: string; subject_code?: string | null; target_module_id?: string | null; source_notes?: string | null; canonical_change_required: boolean; kg_request_ref?: string | null; profiles?: { display_name?: string | null } | null };

const actions = [
  ['scientific_review', 'Ins Fachreview'],
  ['revision_requested', 'Überarbeitung anfordern'],
  ['editorial_review', 'Redaktionelle Prüfung'],
  ['approved', 'Freigeben'],
  ['published', 'Veröffentlichen'],
  ['rejected', 'Ablehnen'],
  ['archived', 'Archivieren'],
] as const;

export default function EditorialContributionQueue() {
  const [token, setToken] = useState<string | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [message, setMessage] = useState('');

  async function load(accessToken: string) {
    const response = await fetch('/api/admin/author-contributions', { headers: { Authorization: `Bearer ${accessToken}` } });
    const body = await response.json();
    if (!response.ok) throw new Error(body.error || 'Keine redaktionelle Berechtigung');
    setItems(body.contributions ?? []);
  }

  useEffect(() => { void (async () => { const supabase = createBrowserSupabaseClient(); const { data } = await supabase.auth.getSession(); const accessToken = data.session?.access_token ?? null; setToken(accessToken); if (accessToken) try { await load(accessToken); } catch (error) { setMessage(error instanceof Error ? error.message : 'Fehler'); } })(); }, []);

  async function transition(id: string, status: string) {
    if (!token) return;
    const response = await fetch('/api/admin/author-contributions', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ id, status, note: notes[id] || null }) });
    const body = await response.json();
    setMessage(response.ok ? `Status auf ${status} gesetzt.` : body.error || 'Änderung fehlgeschlagen.');
    if (response.ok) await load(token);
  }

  if (!token) return <p>Bitte anmelden.</p>;
  return <div style={{ marginTop: 32 }}>{message && <p>{message}</p>}{items.map(item => <article key={item.id} className="entry-card" style={{ marginTop: 18 }}>
    <p className="section-eyebrow">{item.status} · {item.subject_code ?? 'ohne Fachcode'}</p>
    <h2>{item.title}</h2><p>{item.summary}</p>
    <p><strong>Autor:</strong> {item.profiles?.display_name ?? 'SSF-Konto'}</p>
    {item.target_module_id && <p><strong>Zielmodul:</strong> {item.target_module_id}</p>}
    {item.canonical_change_required && <p><strong>KG-Anforderung:</strong> {item.kg_request_ref || 'FEHLT'}</p>}
    <details><summary>Beitrag anzeigen</summary><pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', lineHeight: 1.6 }}>{item.body_markdown}</pre>{item.source_notes && <p><strong>Quellen:</strong> {item.source_notes}</p>}</details>
    <textarea placeholder="Review-/Redaktionsnotiz" value={notes[item.id] ?? ''} onChange={e => setNotes({ ...notes, [item.id]: e.target.value })} rows={3} style={{ width: '100%', padding: 10, marginTop: 14 }} />
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>{actions.map(([status, label]) => <button key={status} className={status === 'approved' || status === 'published' ? 'btn' : 'btn secondary'} onClick={() => transition(item.id, status)}>{label}</button>)}</div>
  </article>)}</div>;
}
