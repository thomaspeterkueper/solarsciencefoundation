'use client';

import { useEffect, useState } from 'react';
import { createBrowserSupabaseClient } from '../lib/supabase/client';
import ContributionPreview from './ContributionPreview';

type Item = { id: string; title: string; summary: string; body_markdown: string; status: string; subject_code?: string | null; target_module_id?: string | null; source_notes?: string | null; canonical_change_required: boolean; kg_request_ref?: string | null; reviewer_note?: string | null; editor_note?: string | null; profiles?: { display_name?: string | null } | null };

const actions = [
  ['scientific_review', 'Ins Fachreview'],
  ['revision_requested', 'Überarbeitung anfordern'],
  ['editorial_review', 'Redaktionelle Prüfung'],
  ['approved', 'Freigeben'],
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
    <div className="mono" style={{ fontSize: 12, color: 'var(--muted)', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <span>Autor: {item.profiles?.display_name ?? 'SSF-Konto'}</span>
      {item.target_module_id && <span>Zielmodul: {item.target_module_id}</span>}
    </div>
    {item.canonical_change_required && <p><strong>KG-Anforderung:</strong> {item.kg_request_ref || 'FEHLT'}</p>}
    {item.reviewer_note && <p><strong>Bisheriges Fachreview:</strong> {item.reviewer_note}</p>}
    {item.editor_note && <p><strong>Bisherige Redaktionsnotiz:</strong> {item.editor_note}</p>}
    <details open style={{ marginTop: 18 }}>
      <summary>Beitrag im späteren Modulstil prüfen</summary>
      <div style={{ marginTop: 16 }}><ContributionPreview title={item.title} summary={item.summary} bodyMarkdown={item.body_markdown} sourceNotes={item.source_notes} targetModuleId={item.target_module_id} authorLabel={item.profiles?.display_name ?? 'SSF-Konto'} statusLabel={item.status} /></div>
    </details>
    {item.target_module_id && <p style={{ marginTop: 12 }}><a href={`/modules/${encodeURIComponent(item.target_module_id.trim().toUpperCase())}`} target="_blank" rel="noreferrer">Bestehendes Zielmodul daneben öffnen →</a></p>}
    <textarea placeholder="Review-/Redaktionsnotiz" value={notes[item.id] ?? ''} onChange={e => setNotes({ ...notes, [item.id]: e.target.value })} rows={3} style={{ width: '100%', padding: 10, marginTop: 14 }} />
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>{actions.map(([status, label]) => <button key={status} className={status === 'approved' ? 'btn' : 'btn secondary'} onClick={() => transition(item.id, status)}>{label}</button>)}</div>
    {item.status === 'approved' && <p style={{ color: 'var(--muted)', marginBottom: 0 }}>Die Veröffentlichung erfolgt separat über die kontrollierte Materialisierung. Dadurch bleibt Freigabe von Publikation getrennt.</p>}
  </article>)}</div>;
}
