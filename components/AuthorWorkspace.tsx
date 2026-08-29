'use client';

import { useEffect, useState } from 'react';
import { createBrowserSupabaseClient } from '../lib/supabase/client';
import ContributionPreview from './ContributionPreview';

type Contribution = {
  id: string; title: string; summary: string; body_markdown: string; subject_code?: string | null; target_module_id?: string | null;
  source_notes?: string | null; canonical_change_required: boolean; kg_request_ref?: string | null; status: string; reviewer_note?: string | null; editor_note?: string | null; updated_at: string;
};

const empty = { title: '', summary: '', bodyMarkdown: '', subjectCode: '', targetModuleId: '', sourceNotes: '', canonicalChangeRequired: false, kgRequestRef: '' };

export default function AuthorWorkspace() {
  const [token, setToken] = useState<string | null>(null);
  const [items, setItems] = useState<Contribution[]>([]);
  const [draft, setDraft] = useState(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  async function load(accessToken: string) {
    const response = await fetch('/api/author/contributions', { headers: { Authorization: `Bearer ${accessToken}` } });
    const body = await response.json();
    if (!response.ok) throw new Error(body.error || 'Could not load contributions');
    setItems(body.contributions ?? []);
  }

  useEffect(() => { void (async () => { const supabase = createBrowserSupabaseClient(); const { data } = await supabase.auth.getSession(); const accessToken = data.session?.access_token ?? null; setToken(accessToken); if (accessToken) { try { await load(accessToken); } catch (error) { setMessage(error instanceof Error ? error.message : 'Could not load contributions'); } } })(); }, []);

  function edit(item: Contribution) {
    setEditingId(item.id);
    setDraft({ title: item.title, summary: item.summary, bodyMarkdown: item.body_markdown, subjectCode: item.subject_code ?? '', targetModuleId: item.target_module_id ?? '', sourceNotes: item.source_notes ?? '', canonicalChangeRequired: item.canonical_change_required, kgRequestRef: item.kg_request_ref ?? '' });
  }

  async function save() {
    if (!token) return;
    const response = await fetch('/api/author/contributions', { method: editingId ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ ...draft, id: editingId }) });
    const body = await response.json();
    setMessage(response.ok ? 'Entwurf gespeichert.' : body.error || 'Speichern fehlgeschlagen.');
    if (response.ok) { setDraft(empty); setEditingId(null); await load(token); }
  }

  async function submit(id: string) {
    if (!token) return;
    const response = await fetch('/api/author/contributions/submit', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ id }) });
    const body = await response.json();
    setMessage(response.ok ? 'Beitrag zur Prüfung eingereicht.' : body.error || 'Einreichen fehlgeschlagen.');
    if (response.ok) await load(token);
  }

  if (!token) return <div className="card"><p>Bitte zuerst mit einem freigeschalteten Autorenkonto anmelden.</p></div>;

  return <div style={{ display: 'grid', gap: 32 }}>
    <section style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 24, alignItems: 'start' }}>
      <div className="card">
        <p className="section-eyebrow">Arbeitsfassung</p>
        <h2>{editingId ? 'Entwurf bearbeiten' : 'Neuen didaktischen Beitrag anlegen'}</h2>
        <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>SSF-Beiträge beschreiben die didaktische Ebene. Wenn eine kanonische wissenschaftliche Änderung nötig ist, muss vor dem Einreichen die zugehörige KG-Anforderung referenziert werden.</p>
        <input placeholder="Titel" value={draft.title} onChange={e => setDraft({ ...draft, title: e.target.value })} style={{ width: '100%', padding: 12, marginTop: 10 }} />
        <textarea placeholder="Kurzfassung" value={draft.summary} onChange={e => setDraft({ ...draft, summary: e.target.value })} rows={3} style={{ width: '100%', padding: 12, marginTop: 10 }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}><input placeholder="Fachcode, z. B. PHY" value={draft.subjectCode} onChange={e => setDraft({ ...draft, subjectCode: e.target.value })} style={{ padding: 12 }} /><input placeholder="Zielmodul (optional)" value={draft.targetModuleId} onChange={e => setDraft({ ...draft, targetModuleId: e.target.value })} style={{ padding: 12 }} /></div>
        <textarea placeholder="Beitrag in Markdown" value={draft.bodyMarkdown} onChange={e => setDraft({ ...draft, bodyMarkdown: e.target.value })} rows={14} style={{ width: '100%', padding: 12, marginTop: 10, fontFamily: 'monospace' }} />
        <textarea placeholder="Quellen und Hinweise" value={draft.sourceNotes} onChange={e => setDraft({ ...draft, sourceNotes: e.target.value })} rows={4} style={{ width: '100%', padding: 12, marginTop: 10 }} />
        <label style={{ display: 'block', marginTop: 12 }}><input type="checkbox" checked={draft.canonicalChangeRequired} onChange={e => setDraft({ ...draft, canonicalChangeRequired: e.target.checked })} /> Kanonische Änderung im Knowledge Graph erforderlich</label>
        {draft.canonicalChangeRequired && <input placeholder="KG external-task Referenz" value={draft.kgRequestRef} onChange={e => setDraft({ ...draft, kgRequestRef: e.target.value })} style={{ width: '100%', padding: 12, marginTop: 10 }} />}
        <button className="btn" onClick={save} style={{ marginTop: 16 }}>{editingId ? 'Änderungen speichern' : 'Entwurf anlegen'}</button>
        {editingId && <button className="btn secondary" onClick={() => { setEditingId(null); setDraft(empty); }} style={{ marginLeft: 10 }}>Abbrechen</button>}
        {message && <p>{message}</p>}
      </div>
      <div style={{ position: 'sticky', top: 24 }}>
        <p className="section-eyebrow">Vorschau im Modulkontext</p>
        <ContributionPreview title={draft.title} summary={draft.summary} bodyMarkdown={draft.bodyMarkdown} sourceNotes={draft.sourceNotes} targetModuleId={draft.targetModuleId || null} statusLabel="Entwurf" />
        {draft.targetModuleId && <p style={{ marginTop: 10 }}><a href={`/modules/${encodeURIComponent(draft.targetModuleId.trim().toUpperCase())}`} target="_blank" rel="noreferrer">Zielmodul separat öffnen →</a></p>}
      </div>
    </section>

    <section><h2>Meine Beiträge</h2>{items.length === 0 ? <p style={{ color: 'var(--muted)' }}>Noch keine Beiträge.</p> : items.map(item => <article className="entry-card" key={item.id} style={{ marginTop: 14 }}>
      <p className="section-eyebrow">{item.status}</p><h3>{item.title}</h3><p>{item.summary}</p>
      {item.target_module_id && <p className="mono" style={{ fontSize: 12 }}>Zielmodul: {item.target_module_id}</p>}
      {item.reviewer_note && <p><strong>Fachreview:</strong> {item.reviewer_note}</p>}{item.editor_note && <p><strong>Redaktion:</strong> {item.editor_note}</p>}
      {(item.status === 'draft' || item.status === 'revision_requested') && <><button className="btn secondary" onClick={() => edit(item)}>Bearbeiten</button><button className="btn" onClick={() => submit(item.id)} style={{ marginLeft: 10 }}>Zur Prüfung einreichen</button></>}
    </article>)}</section>
  </div>;
}
