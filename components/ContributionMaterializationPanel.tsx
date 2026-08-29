'use client';

import { useEffect, useState } from 'react';
import { createBrowserSupabaseClient } from '../lib/supabase/client';

type Contribution = {
  id: string;
  title: string;
  summary: string;
  target_module_id: string | null;
  status: string;
  canonical_change_required: boolean;
  kg_request_ref: string | null;
  approved_at: string | null;
};

export default function ContributionMaterializationPanel() {
  const [token, setToken] = useState<string | null>(null);
  const [rows, setRows] = useState<Contribution[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function load(accessToken: string) {
    const supabase = createBrowserSupabaseClient();
    const { data, error } = await supabase
      .from('author_contributions')
      .select('id, title, summary, target_module_id, status, canonical_change_required, kg_request_ref, approved_at')
      .eq('status', 'approved')
      .order('approved_at', { ascending: true });
    if (error) throw error;
    setRows((data ?? []) as Contribution[]);
    setToken(accessToken);
  }

  useEffect(() => {
    let active = true;
    async function init() {
      try {
        const supabase = createBrowserSupabaseClient();
        const { data } = await supabase.auth.getSession();
        const accessToken = data.session?.access_token ?? null;
        if (!active) return;
        if (!accessToken) {
          setMessage('Bitte anmelden.');
          return;
        }
        await load(accessToken);
      } catch {
        if (active) setMessage('Freigegebene Beiträge konnten nicht geladen werden.');
      }
    }
    void init();
    return () => { active = false; };
  }, []);

  async function materialize(contribution: Contribution) {
    if (!token) return;
    setBusyId(contribution.id);
    setMessage(null);
    try {
      const response = await fetch('/api/author/contributions/materialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          contributionId: contribution.id,
          note: `Materialized into ${contribution.target_module_id ?? 'module'}`,
        }),
      });
      const body = await response.json().catch(() => null) as { error?: string } | null;
      if (!response.ok) {
        setMessage(body?.error ?? 'Materialisierung fehlgeschlagen.');
        return;
      }
      setMessage(`„${contribution.title}“ wurde als versionierter Modulbeitrag veröffentlicht.`);
      await load(token);
    } catch {
      setMessage('Materialisierung fehlgeschlagen.');
    } finally {
      setBusyId(null);
    }
  }

  return (
    <section style={{ marginTop: 36, maxWidth: 900 }}>
      {message && <p style={{ color: 'var(--muted)' }}>{message}</p>}
      {rows.length === 0 ? (
        <div className="platform-card"><p style={{ margin: 0 }}>Zurzeit wartet kein freigegebener Beitrag auf Veröffentlichung.</p></div>
      ) : (
        <div style={{ display: 'grid', gap: 18 }}>
          {rows.map((row) => {
            const blocked = !row.target_module_id || (row.canonical_change_required && !row.kg_request_ref);
            return (
              <article className="platform-card" key={row.id}>
                <p className="section-eyebrow">Freigegeben · {row.target_module_id ?? 'Kein Zielmodul'}</p>
                <h3>{row.title}</h3>
                <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>{row.summary}</p>
                {row.canonical_change_required && (
                  <p className="mono" style={{ fontSize: 12 }}>KG-Anforderung: {row.kg_request_ref ?? 'FEHLT'}</p>
                )}
                {blocked ? (
                  <p style={{ color: 'var(--muted)' }}>Vor Veröffentlichung müssen Zielmodul und ggf. KG-Anforderung vollständig sein.</p>
                ) : (
                  <button className="btn" type="button" disabled={busyId === row.id} onClick={() => materialize(row)}>
                    {busyId === row.id ? 'Wird veröffentlicht …' : 'Versioniert veröffentlichen'}
                  </button>
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
