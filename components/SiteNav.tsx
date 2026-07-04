'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

function toGermanPath(pathname: string): string {
  if (pathname === '/') return '/de';
  if (pathname.startsWith('/de')) return pathname;
  if (pathname.startsWith('/subjects') || pathname.startsWith('/learn') || pathname.startsWith('/learning-paths')) return `/de${pathname}`;
  if (pathname === '/about' || pathname === '/membership' || pathname === '/progress' || pathname === '/login') return `/de${pathname}`;
  return '/de';
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

  return (
    <nav className="nav">
      <Link href={`${prefix}/learn`}>{isGerman ? 'Entdecken' : 'Explore'}</Link>
      <Link href={`${prefix}/learning-paths`}>{isGerman ? 'Lernpfade' : 'Paths'}</Link>
      <Link href={`${prefix}/subjects`}>{isGerman ? 'Fächer' : 'Fields'}</Link>
      <Link href={`${prefix}/membership`}>{isGerman ? 'Mitgliedschaft' : 'Membership'}</Link>
      <Link href={`${prefix}/progress`}>{isGerman ? 'Fortschritt' : 'Progress'}</Link>
      <Link href={`${prefix}/login`}>Login</Link>
      <a href="https://noxiagame.vercel.app" className="accent">NO&#967;&#185;&#916;</a>
      <span className="sep">·</span>
      <span className="lang-switcher">
        <Link href={toGermanPath(pathname)} className="mono" style={{ fontSize: 11 }}>DE</Link>
        <span className="mono" style={{ fontSize: 11, color: 'var(--border)' }}>/</span>
        <Link href={toEnglishPath(pathname)} className="mono" style={{ fontSize: 11 }}>EN</Link>
      </span>
    </nav>
  );
}
