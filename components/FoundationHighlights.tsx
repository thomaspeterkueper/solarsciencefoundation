import Link from 'next/link';
import { getFeaturedContributions } from '../lib/foundationCommunity';

export default async function FoundationHighlights({ locale = 'en' }: { locale?: 'de' | 'en' }) {
  const items = await getFeaturedContributions('foundation', 6);
  const de = locale === 'de';
  return <section className="subject-section" style={{ maxWidth: 1000 }}>
    <p className="section-eyebrow">{de ? 'Aus der Foundation' : 'From the Foundation'}</p>
    <h2 className="section-title">{de ? 'Redaktionell ausgewählte Beiträge' : 'Editorially selected contributions'}</h2>
    <p style={{ color: 'var(--muted)', lineHeight: 1.7, maxWidth: '70ch' }}>{de ? 'Diese Auswahl wird von der SSF-Redaktion aus bereits veröffentlichten, versionierten Beiträgen kuratiert.' : 'This selection is curated by the SSF editorial team from contributions that have already passed review and versioned publication.'}</p>
    {items.length === 0 ? <div className="platform-card" style={{ marginTop: 22 }}><p style={{ margin: 0 }}>{de ? 'Noch keine Beiträge für diese Fläche ausgewählt.' : 'No contributions have been selected for this area yet.'}</p></div> :
      <div className="subject-grid" style={{ marginTop: 24 }}>{items.map(item => <article className="subject-card" key={item.id}>
        <p className="section-eyebrow">{item.moduleId} · v{item.version}</p>
        <h3>{item.title}</h3><p>{item.summary}</p>
        {item.editorialNote && <p style={{ color: 'var(--muted)' }}><strong>{de ? 'Redaktion:' : 'Editorial note:'}</strong> {item.editorialNote}</p>}
        {item.authorName && <p className="mono" style={{ fontSize: 12 }}>{de ? 'Von' : 'By'} {item.authorSlug ? <Link href={`${de ? '/de' : ''}/authors/${encodeURIComponent(item.authorSlug)}`}>{item.authorName}</Link> : item.authorName}</p>}
        <Link href={`/modules/${encodeURIComponent(item.moduleId)}`}>{de ? 'Im Lernmodul lesen →' : 'Read in learning module →'}</Link>
      </article>)}</div>}
  </section>;
}
