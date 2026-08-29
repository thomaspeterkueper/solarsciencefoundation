'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { createBrowserSupabaseClient } from '../lib/supabase/client';

type Locale = 'de' | 'en';
type ApplicationType = 'member' | 'supporting_member' | 'author';
type ExistingApplication = {
  id: string;
  application_type: ApplicationType;
  status: string;
  submitted_at: string;
  decision_note?: string | null;
};

const copy = {
  de: {
    eyebrow: 'Antrag stellen',
    title: 'Wenn du mitwirken möchtest',
    intro: 'Anträge werden deinem SSF-Konto zugeordnet. Es werden keine Rollen automatisch vergeben und es findet hier keine Zahlung statt.',
    member: 'Mitgliedschaft',
    supporting: 'Fördermitgliedschaft',
    author: 'Autorenschaft',
    motivation: 'Warum möchtest du mitwirken?',
    expertise: 'Fachlicher Hintergrund oder Erfahrung',
    contribution: 'Welche Themen oder Beiträge möchtest du einbringen?',
    authorHint: 'Für eine Autorenbewerbung sind fachlicher Hintergrund und geplante Beiträge erforderlich.',
    submit: 'Antrag einreichen',
    working: 'Wird gesendet …',
    login: 'Zum Antrag bitte anmelden',
    loginText: 'Du brauchst ein SSF-Konto, damit der Antrag eindeutig dir zugeordnet werden kann.',
    success: 'Der Antrag wurde eingereicht.',
    existing: 'Deine Anträge',
    noApplications: 'Noch keine Anträge vorhanden.',
    loadError: 'Anträge konnten nicht geladen werden.',
    submitError: 'Der Antrag konnte nicht eingereicht werden.',
  },
  en: {
    eyebrow: 'Apply',
    title: 'If you want to participate',
    intro: 'Applications are linked to your SSF account. No role is granted automatically and no payment takes place here.',
    member: 'Membership',
    supporting: 'Supporting membership',
    author: 'Authorship',
    motivation: 'Why would you like to participate?',
    expertise: 'Scientific background or relevant experience',
    contribution: 'Which topics or contributions would you like to work on?',
    authorHint: 'Author applications require both background information and intended contributions.',
    submit: 'Submit application',
    working: 'Submitting …',
    login: 'Sign in to apply',
    loginText: 'An SSF account is required so the application can be attributed to you.',
    success: 'Your application has been submitted.',
    existing: 'Your applications',
    noApplications: 'No applications yet.',
    loadError: 'Applications could not be loaded.',
    submitError: 'The application could not be submitted.',
  },
} as const;

function applicationLabel(locale: Locale, type: ApplicationType) {
  const c = copy[locale];
  if (type === 'member') return c.member;
  if (type === 'supporting_member') return c.supporting;
  return c.author;
}

export default function ParticipationApplicationPanel({ locale = 'en' }: { locale?: Locale }) {
  const c = copy[locale];
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [applicationType, setApplicationType] = useState<ApplicationType>('member');
  const [motivation, setMotivation] = useState('');
  const [expertise, setExpertise] = useState('');
  const [contributionInterest, setContributionInterest] = useState('');
  const [applications, setApplications] = useState<ExistingApplication[]>([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const loginHref = locale === 'de' ? '/de/login' : '/login';
  const isAuthor = applicationType === 'author';
  const canSubmit = useMemo(() => {
    if (motivation.trim().length < 20) return false;
    if (isAuthor && (!expertise.trim() || !contributionInterest.trim())) return false;
    return true;
  }, [motivation, expertise, contributionInterest, isAuthor]);

  async function loadApplications(token: string) {
    const response = await fetch('/api/membership/applications', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('load failed');
    const body = await response.json() as { applications?: ExistingApplication[] };
    setApplications(body.applications ?? []);
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
        if (token) {
          try {
            await loadApplications(token);
          } catch {
            setMessage(c.loadError);
          }
        }
      } finally {
        if (active) setAuthChecked(true);
      }
    }
    void init();
    return () => { active = false; };
  }, [c.loadError]);

  async function submit() {
    if (!accessToken || !canSubmit) return;
    setBusy(true);
    setMessage(null);
    try {
      const response = await fetch('/api/membership/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          applicationType,
          motivation,
          expertise: expertise || null,
          contributionInterest: contributionInterest || null,
        }),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => null) as { error?: string } | null;
        setMessage(body?.error ?? c.submitError);
        return;
      }
      setMotivation('');
      setExpertise('');
      setContributionInterest('');
      setMessage(c.success);
      await loadApplications(accessToken);
    } catch {
      setMessage(c.submitError);
    } finally {
      setBusy(false);
    }
  }

  if (!authChecked) return null;

  return (
    <section style={{ paddingTop: 64, maxWidth: 760 }}>
      <p className="section-eyebrow">{c.eyebrow}</p>
      <h2 className="section-headline">{c.title}</h2>
      <p style={{ color: 'var(--muted)', lineHeight: 1.8 }}>{c.intro}</p>

      {!accessToken ? (
        <div className="entry-card" style={{ marginTop: 24 }}>
          <h3>{c.login}</h3>
          <p>{c.loginText}</p>
          <Link className="btn" href={loginHref}>{c.login} →</Link>
        </div>
      ) : (
        <>
          <div className="card" style={{ marginTop: 24 }}>
            <label style={{ display: 'block' }}>
              <span className="mono" style={{ fontSize: 13 }}>Typ</span>
              <select value={applicationType} onChange={(event) => setApplicationType(event.target.value as ApplicationType)} style={{ display: 'block', width: '100%', marginTop: 7, padding: 12, border: '1px solid var(--border)', borderRadius: 10, font: 'inherit' }}>
                <option value="member">{c.member}</option>
                <option value="supporting_member">{c.supporting}</option>
                <option value="author">{c.author}</option>
              </select>
            </label>
            <label style={{ display: 'block', marginTop: 18 }}>
              <span className="mono" style={{ fontSize: 13 }}>{c.motivation}</span>
              <textarea value={motivation} onChange={(event) => setMotivation(event.target.value)} rows={5} maxLength={4000} style={{ display: 'block', width: '100%', marginTop: 7, padding: 12, border: '1px solid var(--border)', borderRadius: 10, font: 'inherit' }} />
            </label>
            {isAuthor && <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>{c.authorHint}</p>}
            <label style={{ display: 'block', marginTop: 18 }}>
              <span className="mono" style={{ fontSize: 13 }}>{c.expertise}</span>
              <textarea value={expertise} onChange={(event) => setExpertise(event.target.value)} rows={4} maxLength={4000} style={{ display: 'block', width: '100%', marginTop: 7, padding: 12, border: '1px solid var(--border)', borderRadius: 10, font: 'inherit' }} />
            </label>
            <label style={{ display: 'block', marginTop: 18 }}>
              <span className="mono" style={{ fontSize: 13 }}>{c.contribution}</span>
              <textarea value={contributionInterest} onChange={(event) => setContributionInterest(event.target.value)} rows={4} maxLength={4000} style={{ display: 'block', width: '100%', marginTop: 7, padding: 12, border: '1px solid var(--border)', borderRadius: 10, font: 'inherit' }} />
            </label>
            <button className="btn" type="button" disabled={busy || !canSubmit} onClick={submit} style={{ marginTop: 20 }}>
              {busy ? c.working : c.submit}
            </button>
            {message && <p style={{ color: 'var(--muted)' }}>{message}</p>}
          </div>

          <div style={{ marginTop: 36 }}>
            <h3>{c.existing}</h3>
            {applications.length === 0 ? <p style={{ color: 'var(--muted)' }}>{c.noApplications}</p> : applications.map((application) => (
              <div key={application.id} style={{ padding: '14px 0', borderBottom: '1px solid var(--border)' }}>
                <strong>{applicationLabel(locale, application.application_type)}</strong>
                <span className="mono" style={{ marginLeft: 12, fontSize: 12 }}>{application.status}</span>
                <div style={{ color: 'var(--muted)', fontSize: 13, marginTop: 4 }}>{new Date(application.submitted_at).toLocaleDateString(locale === 'de' ? 'de-DE' : 'en-US')}</div>
                {application.decision_note && <p style={{ color: 'var(--muted)' }}>{application.decision_note}</p>}
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
