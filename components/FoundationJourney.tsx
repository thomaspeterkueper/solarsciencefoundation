import Link from 'next/link';

type AreaId = 'learning' | 'research' | 'people' | 'participate' | 'foundation';

type Props = {
  locale?: 'de' | 'en';
  current?: AreaId;
  compact?: boolean;
};

const areas = {
  en: [
    { id: 'learning' as const, title: 'Learn', body: 'Questions, subjects, learning paths and the knowledge map.', href: '/learning' },
    { id: 'research' as const, title: 'Research', body: 'Sources, archive documents and research provenance.', href: '/research' },
    { id: 'people' as const, title: 'People', body: 'Visible authorship and published contributions.', href: '/authors' },
    { id: 'participate' as const, title: 'Participate', body: 'Membership, support and reviewed authorship.', href: '/participate' },
    { id: 'foundation' as const, title: 'Foundation', body: 'Mission, governance, transparency and current work.', href: '/foundation' },
  ],
  de: [
    { id: 'learning' as const, title: 'Lernen', body: 'Fragen, Fächer, Lernpfade und Wissenskarte.', href: '/de/learning' },
    { id: 'research' as const, title: 'Forschung', body: 'Quellen, Archivdokumente und Forschungsprovenienz.', href: '/de/research' },
    { id: 'people' as const, title: 'Menschen', body: 'Sichtbare Autorenschaft und veröffentlichte Beiträge.', href: '/de/authors' },
    { id: 'participate' as const, title: 'Mitwirken', body: 'Mitgliedschaft, Förderung und geprüfte Autorenschaft.', href: '/de/participate' },
    { id: 'foundation' as const, title: 'Foundation', body: 'Auftrag, Governance, Transparenz und aktuelle Arbeit.', href: '/de/foundation' },
  ],
};

export default function FoundationJourney({ locale = 'en', current, compact = false }: Props) {
  const de = locale === 'de';
  const items = areas[locale];

  return (
    <section style={{ marginTop: compact ? 36 : 64, paddingTop: 28, borderTop: '1px solid var(--border)' }}>
      <p className="section-eyebrow">{de ? 'Eine Plattform, fünf Zugänge' : 'One platform, five entry points'}</p>
      <h2 className="section-title" style={{ fontSize: compact ? 28 : 34, maxWidth: '24ch' }}>
        {de ? 'Lernen, Forschung und Mitwirkung gehören zusammen.' : 'Learning, research and participation belong together.'}
      </h2>
      {!compact && (
        <p style={{ color: 'var(--muted)', lineHeight: 1.7, maxWidth: '70ch' }}>
          {de
            ? 'Die Bereiche sind keine getrennten Produkte. Lernmodule führen zu Quellen, Quellen zu neuen Fragen, Autorinnen und Autoren erweitern die didaktische Ebene, und die Foundation macht Herkunft und Verantwortung sichtbar.'
            : 'These areas are not separate products. Learning modules lead to sources, sources lead to new questions, authors extend the didactic layer, and the Foundation makes provenance and responsibility visible.'}
        </p>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginTop: 22 }}>
        {items.map((item) => {
          const active = item.id === current;
          return (
            <Link key={item.id} href={item.href} style={{ color: 'inherit', textDecoration: 'none' }}>
              <article className="entry-card" style={{ height: '100%', borderColor: active ? 'var(--gold)' : undefined }}>
                <p className="section-eyebrow" style={{ marginBottom: 8 }}>{active ? (de ? 'Hier bist du' : 'You are here') : 'SSF'}</p>
                <h3 style={{ marginTop: 0 }}>{item.title}</h3>
                {!compact && <p>{item.body}</p>}
                <span className="entry-link">{active ? (de ? 'Bereich' : 'Current area') : (de ? 'Öffnen →' : 'Open →')}</span>
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
