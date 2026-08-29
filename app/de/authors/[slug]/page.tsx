import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPublicAuthorBySlug, getPublishedContributionsByAuthor } from '../../../../lib/foundationCommunity';

type Props = { params: Promise<{ slug: string }> };

export default async function PublicAuthorPage({ params }: Props) {
  const { slug } = await params;
  const author = await getPublicAuthorBySlug(slug);
  if (!author) notFound();
  const contributions = await getPublishedContributionsByAuthor(author.authorId);
  return <div className="container" style={{ paddingTop: 56, paddingBottom: 80 }}>
    <Link href="/de/authors">← Autorinnen und Autoren</Link>
    <header style={{ marginTop: 28, maxWidth: 780 }}>
      <p className="section-eyebrow">SSF Autorenschaft</p>
      <h1 className="section-headline">{author.publicName}</h1>
      {author.expertise && <p className="mono" style={{ color: 'var(--muted)' }}>{author.expertise}</p>}
      {author.shortBio && <p className="lede">{author.shortBio}</p>}
      {author.websiteUrl && <p><a href={author.websiteUrl} target="_blank" rel="noreferrer">Persönliche Website →</a></p>}
    </header>
    <section className="subject-section" style={{ maxWidth: 900 }}>
      <h2 className="section-title">Veröffentlichte SSF-Beiträge</h2>
      {contributions.length === 0 ? <p style={{ color: 'var(--muted)' }}>Keine aktuell veröffentlichten Beiträge.</p> : <div style={{ display: 'grid', gap: 16 }}>{contributions.map(item => <article className="platform-card" key={item.id}>
        <p className="section-eyebrow">{item.moduleId} · Version {item.version}</p>
        <h3>{item.title}</h3><p>{item.summary}</p>
        <Link href={`/modules/${encodeURIComponent(item.moduleId)}`}>Lernmodul öffnen →</Link>
      </article>)}</div>}
    </section>
  </div>;
}
