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

  return (
    <nav className="nav">
      <Link href={`${prefix}/learn`}>Explore</Link>
      <Link href={`${prefix}/learning-paths`}>Paths</Link>
      <Link href={`${prefix}/subjects`}>Fields</Link>
      <Link href={`${prefix}/membership`}>Membership</Link>
      <Link href={`${prefix}/progress`}>Progress</Link>
      <Link href={`${prefix}/login`}>Login</Link>
      <a href="https://noxiagame.vercel.app" className="nav-noxia">NOχ¹Δ</a>
      <span className="sep">·</span>
      <span className="lang-switcher">
        <Link href={toGermanPath(pathname)} className="mono" style={{ fontSize: 11 }}>DE</Link>
        <span className="mono" style={{ fontSize: 11, color: 'var(--border)' }}>/</span>
        <Link href={toEnglishPath(pathname)} className="mono" style={{ fontSize: 11 }}>EN</Link>
      </span>
    </nav>
  );
}
