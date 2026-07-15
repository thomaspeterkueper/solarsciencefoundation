import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  getLearningPathStatus,
  learningPathRegistryIssues,
  registeredLearningPaths,
} from '../../lib/learningPathRegistry';

export const metadata: Metadata = {
  title: 'Learning Paths · Solar Science Foundation',
  description: 'Structured paths through connected knowledge — from everyday observations to deeper understanding.',
};

const HORIZON_PATHS = [
  {
    title: 'Wie alt ist ein Stern — und wie kann man das wissen?',
    tag: 'Astronomie · Spektren',
    note: 'Baut auf Absorptionslinien und Atmosphärenphysik auf',
  },
  {
    title: 'Wie verstärkt man ein Signal ohne es zu verzerren?',
    tag: 'Elektronik · Verstärker',
    note: 'Öffnet sich nach dem Dioden-Pfad',
  },
  {
    title: 'Wo liegt das Optimum — wenn alles von mehreren Dingen abhängt?',
    tag: 'Mathematik · Optimierung',
    note: 'Extremwerte mehrerer Variablen — Hesse-Kriterium',
  },
  {
    title: 'Wie transformiert man viele Vektoren gleichzeitig?',
    tag: 'Mathematik · Matrizen',
    note: 'Öffnet sich nach dem Vektor-Pfad',
  },
  {
    title: 'Wie entsteht der Entladekreis beim Erodieren?',
    tag: 'Elektrotechnik · Kondensatoren',
    note: 'Verbindet Fertigungstechnik mit Elektrotechnik',
  },
];

const PATH_IMAGES: Record<string, { src: string; alt: string }> = {
  'PATH:SSF:PHY-WAVE-SPECTRUM-0001': {
    src: '/images/observations/kaffeetasse-tku.jpg',
    alt: 'Kaffeetasse als Einstieg in Klang und Schwingungen',
  },
  'PATH:SSF:PHY-SKY-0001': {
    src: '/images/observations/rolladen-tku.jpg',
    alt: 'Lichtspektren als Einstieg in Licht und Streuung',
  },
  'PATH:SSF:MAT-ERROR-0001': {
    src: '/images/observations/wasserglas-tku.jpg',
    alt: 'Wasserglas als Einstieg in Messung und Ungenauigkeit',
  },
  'PATH:SSF:EL-DIODE-0001': {
    src: '/images/observations/cd-spektrum-tku.jpg',
    alt: 'Licht und Elektronik',
  },
  'PATH:SSF:MAT-SERIES-0001': {
    src: '/images/observations/rolladen-tku.jpg',
    alt: 'Lichtstreifen als Einstieg in Wellen und Reihen',
  },
  'PATH:SSF:MAT-DIFFGEO-0001': {
    src: '/images/observations/cd-spektrum-tku.jpg',
    alt: 'Spiralen als Einstieg in Polarkurven und Geometrie',
  },
  'PATH:SSF:MAT-VEC-0001': {
    src: '/images/observations/kaffeetasse-tku.jpg',
    alt: 'Kräfte und Hebelarm im Alltag',
  },
  'PATH:SSF:ENG-EDM-0001': {
    src: '/images/observations/cd-spektrum-tku.jpg',
    alt: 'Präzision und Fertigungstechnik',
  },
};

export default function LearningPathsPage() {
  return (
    <div style={{ paddingBottom: 96 }}>
      <header className="container" style={{ paddingTop: 56 }}>
        <p className="section-eyebrow">Lernpfade</p>
        <h1 className="section-headline" style={{ maxWidth: '18ch' }}>
          Wissen ist kein Weg.<br />Es ist ein Netz.
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: 17, lineHeight: 1.7, maxWidth: '58ch' }}>
          Jeder Pfad beginnt mit einer Beobachtung. Er endet nicht, sondern verzweigt.
          Manche Pfade führen bis in NOχ¹Δ.
        </p>
      </header>

      {learningPathRegistryIssues.length > 0 && process.env.NODE_ENV !== 'production' && (
        <div className="container" style={{ marginTop: 24 }}>
          <div style={{ padding: 14, border: '1px solid #d6a85c', borderRadius: 8, background: '#fff8e7', fontSize: 13 }}>
            Registry-Hinweis: {learningPathRegistryIssues.map((issue) => `${issue.id} (${issue.occurrences}×)`).join(', ')}.
            Die Anzeige wurde deterministisch dedupliziert.
          </div>
        </div>
      )}

      <main className="container" style={{ marginTop: 52 }}>
        <p className="section-eyebrow">Öffentlich testbar</p>
        <div style={{ display: 'grid', gap: 20 }}>
          {registeredLearningPaths.map((path) => {
            const image = PATH_IMAGES[path.id];
            const firstUnit = path.units[0];
            const sectionCount = path.units.reduce((sum, unit) => sum + unit.sections.length, 0);
            const lifecycle = getLearningPathStatus(path.status);

            return (
              <Link key={path.id} href={`/learning-paths/${encodeURIComponent(path.id)}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                <article className="path-card" style={{
                  display: 'grid',
                  gridTemplateColumns: image ? 'minmax(220px, 280px) 1fr' : '1fr',
                  overflow: 'hidden',
                  borderRadius: 16,
                  background: 'var(--panel)',
                }}>
                  {image && (
                    <div style={{ position: 'relative', minHeight: 230 }}>
                      <Image src={image.src} alt={image.alt} fill style={{ objectFit: 'cover' }} sizes="280px" />
                    </div>
                  )}

                  <div style={{ padding: '30px 34px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: path.status === 'active' ? 'var(--success)' : 'var(--gold-2)', textTransform: 'uppercase', letterSpacing: '1.3px' }}>
                        {lifecycle.label}
                      </span>
                      <span style={{ color: 'var(--border)' }}>·</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)' }}>
                        {path.units.length} Einheiten · {sectionCount} Abschnitte
                      </span>
                    </div>

                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(20px, 2vw, 26px)', color: 'var(--navy)', lineHeight: 1.25, margin: 0 }}>
                      {firstUnit?.entryQuestion ?? path.title}
                    </h2>
                    <p style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.65, margin: 0, maxWidth: '56ch' }}>
                      {path.subtitle}
                    </p>
                    <p style={{ color: 'var(--muted)', fontSize: 12, lineHeight: 1.5, margin: 0 }}>
                      {lifecycle.description}
                    </p>

                    <div style={{ marginTop: 'auto', paddingTop: 8, color: 'var(--navy)', fontWeight: 700, fontSize: 14 }}>
                      Pfad öffnen →
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        <section style={{ marginTop: 64 }}>
          <p className="section-eyebrow">Nächster Horizont</p>
          <p style={{ color: 'var(--muted)', fontSize: 15, maxWidth: '54ch', marginBottom: 24 }}>
            Diese Pfade entstehen aus dem, was bereits gelernt wurde. Sie warten, bis ihre Voraussetzungen erfüllt sind.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
            {HORIZON_PATHS.map((path) => (
              <article key={path.title} style={{ border: '1.5px dashed var(--border)', borderRadius: 14, padding: 24, background: 'var(--soft)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--gold-2)', textTransform: 'uppercase', letterSpacing: '1.3px' }}>
                  {path.tag}
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy)', fontSize: 18, lineHeight: 1.35, margin: '10px 0' }}>
                  {path.title}
                </h3>
                <p style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.55, margin: 0 }}>{path.note}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
