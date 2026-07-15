import Link from 'next/link';
import { registeredLearningPaths, getLearningPathStatus } from '../../../lib/learningPathRegistry';

export default function GermanLearningPathsPage() {
  return (
    <div className="container reading" style={{ paddingTop: 56, paddingBottom: 96 }}>
      <p className="kicker">SSF-Lernpfade</p>
      <h1 className="hero" style={{ fontSize: 56 }}>Lernen als Pfad</h1>
      <p style={{ color: 'var(--steel)', maxWidth: '68ch', fontSize: 19 }}>
        Lernpfade verbinden Hauptlinie, optionale Seitenzweige, Quiz-Gates, Lerntiefe und NOχ¹Δ-Freischaltungen.
      </p>

      <div style={{ display: 'grid', gap: 18, marginTop: 34 }}>
        {registeredLearningPaths.map((path) => {
          const status = getLearningPathStatus(path.status);
          return (
            <Link key={path.id} href={`/de/learning-paths/${encodeURIComponent(path.id)}`} style={{ color: 'inherit', textDecoration: 'none' }}>
              <article className="card prominent">
                <div className="module-meta">
                  <span className="code">{path.id}</span>
                  <span className="mono" style={{ color: path.status === 'active' ? 'var(--success)' : 'var(--gold-2)', fontSize: 13 }}>
                    {status.label}
                  </span>
                </div>
                <h2 className="module-title" style={{ marginTop: 10 }}>{path.title}</h2>
                <p style={{ color: 'var(--steel)' }}>{path.subtitle}</p>
                <p style={{ color: 'var(--muted)', fontSize: 14 }}>{status.description}</p>
                <p className="mono" style={{ color: 'var(--link)', fontSize: 13 }}>{path.unlocks.join(' · ')}</p>
                <span style={{ color: 'var(--navy)', fontWeight: 600 }}>Pfad öffnen →</span>
              </article>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
