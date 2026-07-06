'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

function toGermanPath(pathname: string): string {
  if (pathname === '/') return '/de';
  if (pathname.startsWith('/de')) return pathname;
  return `/de${pathname}`;
}

function toEnglishPath(pathname: string): string {
  if (pathname === '/de') return '/';
  if (pathname.startsWith('/de/')) return pathname.replace(/^\/de/, '') || '/';
  return pathname || '/';
}

export default function SiteNav() {
  const pathname = usePathname() || '/';
  const isGerman = pathname === '/de' || pathname.startsWith('/de/');
  const prefix = isGerman ? '/de' : '';

  const labels = isGerman
    ? {
        explore: 'Entdecken',
        map: 'Wissenskarte',
        subjects: 'Fächer',
        paths: 'Lernpfade',
        research: 'Forschung',
        community: 'Community',
        login: 'Login'
      }
    : {
        explore: 'Explore',
        map: 'Knowledge Map',
        subjects: 'Subjects',
        paths: 'Learning Paths',
        research: 'Research',
        community: 'Community',
        login: 'Login'
      };

  return (
    <nav className="nav" aria-label={isGerman ? 'Hauptnavigation' : 'Main navigation'}>
      <Link href={`${prefix}/learn`}>{labels.explore}</Link>
      <Link href={`${prefix}/learn`}>{labels.map}</Link>
      <Link href={`${prefix}/subjects`}>{labels.subjects}</Link>
      <Link href={`${prefix}/learning-paths`}>{labels.paths}</Link>
      <Link href={`${prefix}/research`}>{labels.research}</Link>
      <Link href={`${prefix}/community`}>{labels.community}</Link>
      <a href="https://noxiagame.vercel.app" className="nav-noxia">NOχ¹Δ</a>
      <Link href={`${prefix}/login`} className="nav-login">{labels.login}</Link>
      <span className="lang-switcher" aria-label={isGerman ? 'Sprache wechseln' : 'Switch language'}>
        <Link href={toGermanPath(pathname)} className="mono" style={{ fontSize: 11 }}>DE</Link>
        <span className="mono" style={{ fontSize: 11, color: 'var(--border)' }}>/</span>
        <Link href={toEnglishPath(pathname)} className="mono" style={{ fontSize: 11 }}>EN</Link>
      </span>
    </nav>
  );
}
