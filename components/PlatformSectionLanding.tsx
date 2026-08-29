import Link from 'next/link';

type Entry = {
  eyebrow: string;
  title: string;
  body: string;
  href?: string;
  cta?: string;
};

type Props = {
  eyebrow: string;
  title: string;
  intro: string;
  entries: Entry[];
  note?: string;
};

export default function PlatformSectionLanding({ eyebrow, title, intro, entries, note }: Props) {
  return (
    <div className="container" style={{ paddingTop: 72, paddingBottom: 88 }}>
      <header style={{ maxWidth: 860, marginBottom: 48 }}>
        <p className="section-eyebrow">{eyebrow}</p>
        <h1 className="hero" style={{ fontSize: 56, maxWidth: '18ch' }}>{title}</h1>
        <p className="lede" style={{ maxWidth: '62ch' }}>{intro}</p>
      </header>

      <section className="entries-grid" aria-label={title}>
        {entries.map((entry) => {
          const content = (
            <div className="entry-card" style={{ height: '100%' }}>
              <p className="section-eyebrow" style={{ marginBottom: 10 }}>{entry.eyebrow}</p>
              <h2 style={{ fontSize: 28, marginTop: 0 }}>{entry.title}</h2>
              <p>{entry.body}</p>
              {entry.href && <span className="entry-link">{entry.cta ?? 'Öffnen →'}</span>}
            </div>
          );
          return entry.href ? (
            <Link key={entry.title} href={entry.href} style={{ color: 'inherit', textDecoration: 'none' }}>{content}</Link>
          ) : (
            <div key={entry.title}>{content}</div>
          );
        })}
      </section>

      {note && (
        <section style={{ marginTop: 52, maxWidth: '64ch', borderTop: '1px solid var(--border)', paddingTop: 28 }}>
          <p style={{ color: 'var(--muted)', lineHeight: 1.75 }}>{note}</p>
        </section>
      )}
    </div>
  );
}
