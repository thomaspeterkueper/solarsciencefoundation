'use client';

import { useEffect, useState } from 'react';
import { createBrowserSupabaseClient } from '../lib/supabase/client';

type Application = {
  id: string;
  user_id: string;
  display_name: string | null;
  email: string | null;
  application_type: 'member' | 'supporting_member' | 'author';
  motivation: string;
  expertise: string | null;
  contribution_interest: string | null;
  status: string;
  submitted_at: string;
  decision_note: string | null;
};

const labels: Record<Application['application_type'], string> = {
  member: 'Mitgliedschaft',
  supporting_member: 'Fördermitgliedschaft',
  author: 'Autorenschaft',
};

export default function ParticipationAdminPanel() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});

  async function load(token: string) {
    const response = await fetch('/api/membership/admin/applications', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const body = await response.json().catch(() => null) as { applications?: Application[]; error?: string } | null;
    if (!response.ok) throw new Error(body?.error ?? 'Anträge konnten nicht geladen werden.');
    setApplications(body?.applications ?? []);
  }

  useEffect(() => {
    let active = true;
    async function init() {
      try {
        const supabase = createBrowserSupabaseClient();
        const { data } = await supabase.auth.getSession();
        const token = data.session?.access_token ?? null;
        if (!active) return;
        setAccessToken(token);
        if (!token) {
          setMessage('Bitte mit einem SSF-Administrationskonto anmelden.');
          return;
        }
        await load(token);
      } catch (error) {
        if (active) setMessage(error instanceof Error ? error.message : 'Anträge konnten nicht geladen werden.');
      } finally {
        if (active) setLoading(false);
      }
    }
    void init();
    return () => { active = false; };
  }, []);

  async function decide(application: Application, status: string) {
    if (!accessToken) return;
    const note = notes[application.id]?.trim() ?? '';
    if (status === 'revision_requested' && !note) {
      setMessage('Für eine Rückfrage/Überarbeitung ist eine Notiz erforderlich.');
      return;
    }

    setBusyId(application.id);
    setMessage(null);
    try {
      const response = await fetch('/api/membership/admin/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ applicationId: application.id, status, note: note || null }),
      });
      const body = await response.json().catch(() => null) as { error?: string } | null;
      if (!response.ok) throw new Error(body?.error ?? 'Entscheidung konnte nicht gespeichert werden.');
      await load(accessToken);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Entscheidung konnte nicht gespeichert werden.');
    } finally {
      setBusyId(null);
    }
  }

  if (loading) return <p style={{ color: 'var(--muted)' }}>Anträge werden geladen …</p>;

  return (
    <div style={{ marginTop: 32 }}>
      {message && <div className="card" style={{ marginBottom: 24 }}><p style={{ margin: 0 }}>{message}</p></div>}
      {applications.length === 0 ? (
        <p style={{ color: 'var(--muted)' }}>Keine Anträge vorhanden.</p>
      ) : applications.map((application) => {
        const closed = ['approved', 'rejected', 'withdrawn'].includes(application.status);
        return (
          <article key={application.id} className="card" style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <div>
                <p className="section-eyebrow" style={{ marginBottom: 8 }}>{labels[application.application_type]}</p>
                <h2 style={{ margin: 0 }}>{application.display_name || application.email || application.user_id}</h2>
                {application.email && <p className="mono" style={{ fontSize: 13 }}>{application.email}</p>}
              </div>
              <span className="mono" style={{ fontSize: 12 }}>{application.status}</span>
            </div>

            <p><strong>Motivation</strong><br />{application.motivation}</p>
            {application.expertise && <p><strong>Fachlicher Hintergrund</strong><br />{application.expertise}</p>}
            {application.contribution_interest && <p><strong>Geplanter Beitrag</strong><br />{application.contribution_interest}</p>}
            <p style={{ color: 'var(--muted)', fontSize: 13 }}>Eingereicht: {new Date(application.submitted_at).toLocaleString('de-DE')}</p>

            {!closed && (
              <>
                <label style={{ display: 'block', marginTop: 18 }}>
                  <span className="mono" style={{ fontSize: 13 }}>Interne Notiz / Rückmeldung</span>
                  <textarea
                    rows={3}
                    maxLength={4000}
                    value={notes[application.id] ?? application.decision_note ?? ''}
                    onChange={(event) => setNotes((current) => ({ ...current, [application.id]: event.target.value }))}
                    style={{ display: 'block', width: '100%', marginTop: 7, padding: 12, border: '1px solid var(--border)', borderRadius: 10, font: 'inherit' }}
                  />
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 16 }}>
                  <button className="btn secondary" disabled={busyId === application.id} onClick={() => decide(application, 'screening')} type="button">Vorprüfung</button>
                  {application.application_type === 'author' && <button className="btn secondary" disabled={busyId === application.id} onClick={() => decide(application, 'review')} type="button">Fachreview</button>}
                  <button className="btn secondary" disabled={busyId === application.id} onClick={() => decide(application, 'revision_requested')} type="button">Rückfrage</button>
                  <button className="btn" disabled={busyId === application.id} onClick={() => decide(application, 'approved')} type="button">Annehmen</button>
                  <button className="btn secondary" disabled={busyId === application.id} onClick={() => decide(application, 'rejected')} type="button">Ablehnen</button>
                </div>
              </>
            )}
          </article>
        );
      })}
    </div>
  );
}
