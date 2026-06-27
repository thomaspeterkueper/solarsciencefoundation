/**
 * KUEPER - Solar Science Foundation (SSF)
 * Path: app/subjects/page.tsx
 * Repo: github.com/thomaspeterkueper/solarsciencefoundation/blob/main/app/subjects/page.tsx
 * Name: SubjectsPage
 * Version: 0.1.0
 * Created: 2026-06-27
 * Modified: 2026-06-27 09:00 CEST
 * Depends: next/link, lib/subjects
 */

import Link from 'next/link';
import { subjects } from '../../lib/subjects';

export default function SubjectsPage() {
  return (
    <div className="container" style={{ paddingTop: 56 }}>
      <p className="kicker">SSF library</p>
      <h1 className="hero" style={{ fontSize: 56 }}>Subjects</h1>
      <p className="lede" style={{ maxWidth: '64ch' }}>
        SSF is organised by prerequisites. Mathematics comes first because it supports physics,
        chemistry, astronomy, biology and every later application in partner projects.
      </p>

      <div className="subject-grid" style={{ marginTop: 34 }}>
        {subjects.map((subject) => (
          <Link key={subject.id} href={`/subjects/${subject.slug}`} style={{ color: 'inherit' }}>
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
