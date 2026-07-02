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
              ? 'Eine fiktive Wissenschafts-, Lern- und Archivplattform innerhalb des NOχ¹Δ-Universums.'
              : 'A fictional science learning and archive platform within the NOχ¹Δ universe.'}
          </div>
          <div className="meta">
            <span>
              {isGerman
                ? 'Gegruendet 2045 in Genf. Keine reale Stiftung oder akkreditierte Institution.'
                : 'Founded 2045 in Geneva. Not a real foundation or accredited institution.'}
            </span>
          </div>
        </div>
        <div className="meta">
          <a href="#">Impressum</a>
          <a href="#">Datenschutz</a>
          <Link href={`${prefix}/about`}>{isGerman ? 'Ueber SSF' : 'About'}</Link>
          <Link href={`${prefix}/membership`}>{isGerman ? 'Mitgliedschaft' : 'Membership'}</Link>
          <Link href={`${prefix}/progress`}>{isGerman ? 'Fortschritt' : 'Progress'}</Link>
          <Link href={`${prefix}/login`}>Login</Link>
        </div>
      </div>
    </footer>
  );
}
