import Link from 'next/link';
import FoundationJourney from '../../components/FoundationJourney';
import { getPublicAuthors } from '../../lib/foundationCommunity';

export default async function AuthorsPage() {
  const authors = await getPublicAuthors();
  return <div className="container" style={{ paddingTop: 56, paddingBottom: 80 }}>
    <p className="section-eyebrow">Foundation · People</p>
    <h1 className="section-headline">Authors and contributors</h1>
    <p className="lede" style={{ maxWidth: '70ch' }}>Visible authorship is part of SSF provenance. Only authors who explicitly publish a profile appear here, and their contribution lists only show current materialized publications.</p>
    {authors.length === 0 ? <div className="platform-card" style={{ marginTop: 32 }}><p>No public author profiles yet.</p></div> :
      <div className="subject-grid" style={{ marginTop: 32 }}>{authors.map(author => <article className="subject-card" key={author.authorId}>
        <p className="section-eyebrow">SSF Author</p>
        <h2>{author.publicName}</h2>
        {author.expertise && <p className="mono" style={{ color: 'var(--muted)' }}>{author.expertise}</p>}
        {author.shortBio && <p>{author.shortBio}</p>}
        <Link href={`/authors/${encodeURIComponent(author.slug)}`}>View contributions →</Link>
      </article>)}</div>}
    <section style={{ marginTop: 48, maxWidth: '70ch', padding: 24, border: '1px solid var(--border)', borderRadius: 16 }}>
      <p className="section-eyebrow">Become an author</p>
      <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>Public profiles are the visible end of a reviewed contribution process, not an open publishing directory.</p>
      <Link href="/participate">See authorship and application workflow →</Link>
    </section>
    <FoundationJourney locale="en" current="people" />
  </div>;
}
