'use client';

import { useEffect, useState } from 'react';
import { createBrowserSupabaseClient } from '../lib/supabase/client';

type Row = {
  publication_id: string;
  module_id: string;
  title: string;
  version: number;
  author_display_name: string | null;
  published_at: string;
  placement: string | null;
  sort_order: number | null;
  editorial_note: string | null;
  is_active: boolean;
};

export default function FoundationFeatureAdmin() {
  const [rows, setRows] = useState<Row[]>([]);
  const [message, setMessage] = useState('');
  const [busyId, setBusyId] = useState<string | null>(null);

  async function load() {
    const supabase = createBrowserSupabaseClient();
    const { data, error } = await supabase.rpc('ssf_admin_list_feature_candidates');
    if (error) throw error;
    setRows((data ?? []) as Row[]);
  }

  useEffect(() => { void load().catch(error => setMessage(error instanceof Error ? error.message : 'Keine redaktionelle Berechtigung')); }, []);

  function patch(id: string, changes: Partial<Row>) {
    setRows(rows => rows.map(row => row.publication_id === id ? { ...row, ...changes } : row));
  }

  async function save(row: Row, active = row.is_active) {
    setBusyId(row.publication_id); setMessage('');
    const supabase = createBrowserSupabaseClient();
    const { error } = await supabase.rpc('ssf_set_featured_contribution', {
      p_publication_id: row.publication_id,
      p_placement: row.placement ?? 'foundation',
      p_sort_order: row.sort_order ?? 100,
      p_editorial_note: row.editorial_note ?? null,
      p_active: active,
    });
    setMessage(error ? error.message : active ? `„${row.title}“ ist kuratiert.` : `„${row.title}“ wurde aus der Auswahl entfernt.`);
    if (!error) await load();
    setBusyId(null);
  }

  return <div style={{ display: 'grid', gap: 18, marginTop: 32 }}>
    {message && <p style={{ color: 'var(--muted)' }}>{message}</p>}
    {rows.map(row => <article className="platform-card" key={row.publication_id}>
      <p className="section-eyebrow">{row.module_id} · v{row.version} · {row.is_active ? 'ausgewählt' : 'nicht ausgewählt'}</p>
      <h3>{row.title}</h3>
      <p className="mono" style={{ fontSize: 12, color: 'var(--muted)' }}>{row.author_display_name ?? 'SSF-Autorenkonto'} · {new Date(row.published_at).toLocaleDateString('de-DE')}</p>
      <div style={{ display: 'grid', gridTemplateColumns: '160px 120px 1fr', gap: 10, alignItems: 'start' }}>
        <select value={row.placement ?? 'foundation'} onChange={e => patch(row.publication_id, { placement: e.target.value })} style={{ padding: 10 }}>
          <option value="foundation">Foundation</option><option value="home">Startseite</option>
        </select>
        <input type="number" value={row.sort_order ?? 100} onChange={e => patch(row.publication_id, { sort_order: Number(e.target.value) })} style={{ padding: 10 }} />
        <textarea placeholder="Kuratorische Einordnung (optional)" rows={3} value={row.editorial_note ?? ''} onChange={e => patch(row.publication_id, { editorial_note: e.target.value })} style={{ padding: 10, width: '100%' }} />
      </div>
      <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
        <button className="btn" disabled={busyId === row.publication_id} onClick={() => save(row, true)}>{row.is_active ? 'Auswahl aktualisieren' : 'Für Fläche auswählen'}</button>
        {row.is_active && <button className="btn secondary" disabled={busyId === row.publication_id} onClick={() => save(row, false)}>Aus Auswahl entfernen</button>}
      </div>
    </article>)}
  </div>;
}
