import Link from 'next/link';
import { getPublicAuthors } from '../../../lib/foundationCommunity';

export default async function AuthorsPage() {
  const authors = await getPublicAuthors();
  return <div className="container" style={{ paddingTop: 56, paddingBottom: 80 }}>
    <p className="section-eyebrow">Stiftung · Menschen</p>
    <h1 className="section-headline">Autorinnen, Autoren und Mitwirkende</h1>
    <p className="lede" style={{ maxWidth: '70ch' }}>Sichtbare Autorenschaft gehört zur SSF-Provenienz. Hier erscheinen nur Autorinnen und Autoren, die ihr Profil ausdrücklich veröffentlichen.</p>
    {authors.length === 0 ? <div className="platform-card" style={{ marginTop: 32 }}><p>Noch keine öffentlichen Autorenprofile.</p></div> :
      <div className="subject-grid" style={{ marginTop: 32 }}>{authors.map(author => <article className="subject-card" key={author.authorId}>
        <p className="section-eyebrow">SSF Autorenschaft</p>
        <h2>{author.publicName}</h2>
        {author.expertise && <p className="mono" style={{ color: 'var(--muted)' }}>{author.expertise}</p>}
        {author.shortBio && <p>{author.shortBio}</p>}
        <Link href={`/de/authors/${encodeURIComponent(author.slug)}`}>Beiträge ansehen →</Link>
      </article>)}</div>}
  </div>;
}
