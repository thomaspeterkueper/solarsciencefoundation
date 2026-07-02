'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

function toGermanPath(pathname: string): string {
  if (pathname === '/') return '/de';
  if (pathname.startsWith('/de')) return pathname;
  if (pathname.startsWith('/subjects') || pathname.startsWith('/learn')) return `/de${pathname}`;
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
      <Link href={`${prefix}/learn`}>{isGerman ? 'Lernen' : 'Learn'}</Link>
      <Link href={`${prefix}/subjects`}>{isGerman ? 'Faecher' : 'Subjects'}</Link>
      <Link href={`${prefix}/subjects/mathematics`}>{isGerman ? 'Mathematik' : 'Mathematics'}</Link>
      <Link href={`${prefix}/progress`}>{isGerman ? 'Fortschritt' : 'Progress'}</Link>
      <Link href={`${prefix}/membership`}>{isGerman ? 'Mitgliedschaft' : 'Membership'}</Link>
      <Link href={`${prefix}/login`}>{isGerman ? 'Login' : 'Login'}</Link>
      <Link href="/api/kxf">KXF</Link>
      <a href="https://noxiagame.vercel.app" className="accent">NO&#967;&#185;&#916;</a>
      <span className="sep">·</span>
      <Link href={toGermanPath(pathname)} className="mono" style={{ fontSize: 11 }}>DE</Link>
      <span className="mono" style={{ fontSize: 11 }}>/</span>
      <Link href={toEnglishPath(pathname)} className="mono" style={{ fontSize: 11 }}>EN</Link>
    </nav>
  );
}
