import Link from 'next/link';
import { learningPaths } from '../../lib/learningPaths';

export default function LearningPathsPage() {
  return (
    <div className="container reading" style={{ paddingTop: 56 }}>
      <p className="kicker">SSF learning paths</p>
      <h1 className="hero" style={{ fontSize: 56 }}>Lernen als Pfad</h1>
      <p style={{ color: 'var(--steel)', maxWidth: '68ch', fontSize: 19 }}>
        Lernpfade verbinden Hauptlinie, optionale Seitenaeste, Quiz-Gates, Lerntiefe und NOXIA-Freischaltungen.
      </p>

      <div style={{ display: 'grid', gap: 18, marginTop: 34 }}>
        {learningPaths.map((path) => (
          <Link key={path.id} href={`/learning-paths/${encodeURIComponent(path.id)}`} style={{ color: 'inherit' }}>
            <article className="card prominent">
              <div className="module-meta">
                <span className="code">{path.id}</span>
                <span className="mono" style={{ color: 'var(--steel)', fontSize: 13 }}>{path.status}</span>
              </div>
              <h2 className="module-title" style={{ marginTop: 10 }}>{path.title}</h2>
              <p style={{ color: 'var(--steel)' }}>{path.subtitle}</p>
              <p className="mono" style={{ color: 'var(--link)', fontSize: 13 }}>{path.unlocks.join(' · ')}</p>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
