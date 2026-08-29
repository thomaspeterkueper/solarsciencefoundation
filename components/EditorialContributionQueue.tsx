'use client';

import { useEffect, useState } from 'react';
import { createBrowserSupabaseClient } from '../lib/supabase/client';
import ContributionPreview from './ContributionPreview';

type Item = { id: string; title: string; summary: string; body_markdown: string; status: string; subject_code?: string | null; target_module_id?: string | null; source_notes?: string | null; canonical_change_required: boolean; kg_request_ref?: string | null; reviewer_note?: string | null; editor_note?: string | null; profiles?: { display_name?: string | null } | null };
type History = { id: string; version: number; module_id: string; title: string; summary: string; body_markdown: string; source_notes?: string | null; author_display_name?: string | null; reviewer_note_snapshot?: string | null; editor_note_snapshot?: string | null; published_by_display_name?: string | null; published_at: string; superseded_at?: string | null };
type Action = readonly [string, string];

function actionsFor(status: string): Action[] {
  switch (status) {
    case 'submitted': return [['scientific_review', 'Ins Fachreview'], ['revision_requested', 'Überarbeitung anfordern'], ['rejected', 'Ablehnen']];
    case 'scientific_review': return [['editorial_review', 'Zur redaktionellen Prüfung'], ['revision_requested', 'Überarbeitung anfordern'], ['rejected', 'Ablehnen']];
    case 'editorial_review': return [['approved', 'Freigeben'], ['revision_requested', 'Überarbeitung anfordern'], ['rejected', 'Ablehnen']];
    case 'approved': return [['archived', 'Archivieren']];
    case 'published': return [['revision_requested', 'Neue Version anfordern'], ['archived', 'Archivieren']];
    default: return [];
  }
}

export default function EditorialContributionQueue() {
  const [token, setToken] = useState<string | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [histories, setHistories] = useState<Record<string, History[]>>({});
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

  async function loadHistory(id: string) {
    const supabase = createBrowserSupabaseClient();
    const { data, error } = await supabase.rpc('ssf_editorial_publication_history', { p_contribution_id: id });
    if (error) { setMessage(error.message); return; }
    setHistories((current) => ({ ...current, [id]: (data ?? []) as History[] }));
  }

  if (!token) return <p>Bitte anmelden.</p>;
  return <div style={{ marginTop: 32 }}>{message && <p>{message}</p>}{items.map(item => {
    const actions = actionsFor(item.status);
    const history = histories[item.id];
    const newest = history?.[0];
    const previous = history?.[1];
    return <article key={item.id} className="entry-card" style={{ marginTop: 18 }}>
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

      {(item.status === 'published' || item.status === 'revision_requested' || item.status === 'submitted' || item.status === 'scientific_review' || item.status === 'editorial_review' || item.status === 'approved') && (
        <div style={{ marginTop: 16 }}>
          <button className="btn secondary" type="button" onClick={() => loadHistory(item.id)}>Versionsverlauf laden</button>
          {history && history.length === 0 && <p style={{ color: 'var(--muted)' }}>Noch keine materialisierte Version vorhanden.</p>}
          {history && history.length > 0 && (
            <details open style={{ marginTop: 14 }}>
              <summary>{history.length} veröffentlichte Version{history.length === 1 ? '' : 'en'}</summary>
              {newest && previous ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginTop: 14 }}>
                  {[newest, previous].map((version, index) => <div className="platform-card" key={version.id}>
                    <p className="section-eyebrow">{index === 0 ? 'Neueste' : 'Vorherige'} · Version {version.version}</p>
                    <h3>{version.title}</h3>
                    <p style={{ color: 'var(--muted)' }}>{version.summary}</p>
                    <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{version.body_markdown}</div>
                    <p className="mono" style={{ fontSize: 12, color: 'var(--muted)' }}>{version.body_markdown.length} Zeichen · {new Date(version.published_at).toLocaleDateString('de-DE')}</p>
                  </div>)}
                </div>
              ) : newest ? (
                <p style={{ color: 'var(--muted)' }}>Version {newest.version} vom {new Date(newest.published_at).toLocaleDateString('de-DE')} ist bislang die einzige Veröffentlichung.</p>
              ) : null}
            </details>
          )}
        </div>
      )}

      {actions.length > 0 && <textarea placeholder={item.status === 'published' ? 'Begründung für die neue Version (erforderlich)' : 'Review-/Redaktionsnotiz'} value={notes[item.id] ?? ''} onChange={e => setNotes({ ...notes, [item.id]: e.target.value })} rows={3} style={{ width: '100%', padding: 10, marginTop: 14 }} />}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>{actions.map(([status, label]) => <button key={status} className={status === 'approved' ? 'btn' : 'btn secondary'} onClick={() => transition(item.id, status)}>{label}</button>)}</div>
      {item.status === 'approved' && <p style={{ color: 'var(--muted)', marginBottom: 0 }}>Die Veröffentlichung erfolgt separat über die kontrollierte Materialisierung. Dadurch bleibt Freigabe von Publikation getrennt.</p>}
      {item.status === 'revision_requested' && <p style={{ color: 'var(--muted)', marginBottom: 0 }}>Die aktuell veröffentlichte Version bleibt unverändert sichtbar, bis die Überarbeitung erneut geprüft, freigegeben und materialisiert wurde.</p>}
    </article>;
  })}</div>;
}
