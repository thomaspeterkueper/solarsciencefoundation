'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SiteFooter() {
  const pathname = usePathname() || '/';
  const isGerman = pathname === '/de' || pathname.startsWith('/de/');
  const prefix = isGerman ? '/de' : '';

  return (
    <footer className="site-footer">
      <div className="ui-container ui-container-wide site-footer-inner">
        <div className="site-footer-brand">
          <strong>Solar Science Foundation</strong>
          <p>
            {isGerman
              ? 'Eine unabhängige Plattform für wissenschaftliche Neugier — offen für alle, überall.'
              : 'An independent platform for scientific curiosity — open to everyone, everywhere.'}
          </p>
          <span className="site-footer-fiction">
            {isGerman
              ? 'Gegründet in Sundern 2045 · NOχ¹Δ Universe · Fiktives Wissenschaftsprojekt'
              : 'Founded in Sundern 2045 · NOχ¹Δ Universe · Fictional science project'}
          </span>
        </div>

        <nav className="site-footer-nav" aria-label={isGerman ? 'Fußnavigation' : 'Footer navigation'}>
          <div className="site-footer-group">
            <span>{isGerman ? 'Projekt' : 'Project'}</span>
            <Link href={`${prefix}/about`}>{isGerman ? 'Über die SSF' : 'About'}</Link>
            <Link href={`${prefix}/membership`}>{isGerman ? 'Mitgliedschaft' : 'Membership'}</Link>
            <Link href={`${prefix}/login`}>{isGerman ? 'Anmelden' : 'Sign in'}</Link>
          </div>

          <div className="site-footer-group">
            <span>{isGerman ? 'Rechtliches' : 'Legal'}</span>
            <Link href={`${prefix}/impressum`}>
              {isGerman ? 'Impressum' : 'Imprint'}
            </Link>
            <Link href={`${prefix}/datenschutz`}>
              {isGerman ? 'Datenschutz' : 'Privacy'}
            </Link>
            <Link href={`${prefix}/nutzungsbedingungen`}>
              {isGerman ? 'Nutzungsbedingungen' : 'Terms'}
            </Link>
          </div>
        </nav>
      </div>

      <div className="ui-container ui-container-wide site-footer-bottom">
        <span>© {new Date().getFullYear()} Thomas Peter Küper</span>
        <span>{isGerman ? 'Wissen verbindet.' : 'Knowledge connects.'}</span>
      </div>
    </footer>
  );
}
