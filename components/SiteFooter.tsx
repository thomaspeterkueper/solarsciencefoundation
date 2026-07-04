'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SiteFooter() {
  const pathname = usePathname() || '/';
  const isGerman = pathname === '/de' || pathname.startsWith('/de/');
  const prefix = isGerman ? '/de' : '';

  return (
    <footer className="site-footer">
      <div className="container">
        <div>
          <div className="honest">
            {isGerman
              ? 'Eine unabhängige Institution für wissenschaftliche Neugier — offen für alle, überall.'
              : 'An independent institution for scientific curiosity — open to everyone, everywhere.'}
          </div>
          <div className="meta" style={{ marginTop: 8 }}>
            {isGerman
              ? 'Gegründet in Genf. Teil des NOχ¹Δ-Universums.'
              : 'Founded in Geneva. Part of the NOχ¹Δ universe.'}
          </div>
        </div>
        <div className="meta">
          <a href="#">Impressum</a>
          <a href="#">Datenschutz</a>
          <Link href={`${prefix}/about`}>{isGerman ? 'Über die SSF' : 'About'}</Link>
          <Link href={`${prefix}/membership`}>{isGerman ? 'Mitgliedschaft' : 'Membership'}</Link>
          <Link href={`${prefix}/progress`}>{isGerman ? 'Fortschritt' : 'Progress'}</Link>
          <Link href={`${prefix}/login`}>Login</Link>
        </div>
      </div>
    </footer>
  );
}
