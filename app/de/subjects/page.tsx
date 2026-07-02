import Link from 'next/link';
import { subjects } from '../../../lib/subjects';

export default function GermanSubjectsPage() {
  return (
    <div className="container" style={{ paddingTop: 56 }}>
      <p className="kicker">SSF-Bibliothek</p>
      <h1 className="hero" style={{ fontSize: 56 }}>Faecher</h1>
      <p className="lede" style={{ maxWidth: '64ch' }}>
        SSF ist nach Voraussetzungen geordnet. Mathematik steht am Anfang, weil sie Physik,
        Chemie, Astronomie, Biologie und spaetere Anwendungen in Partnerprojekten stuetzt.
      </p>

      <div className="subject-grid" style={{ marginTop: 34 }}>
        {subjects.map((subject) => (
          <Link key={subject.id} href={`/de/subjects/${subject.slug}`} style={{ color: 'inherit' }}>
            <article className="subject-card">
              <div className="subject-mark">{subject.mark}</div>
              <strong>{subject.title}</strong>
              <small>{subject.levelRange}</small>
              <p>{subject.description}</p>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
