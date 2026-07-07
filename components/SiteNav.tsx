'use client';

import { useState } from 'react';
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

export default function SiteNav({ mode = 'main' }: { mode?: 'main' | 'utility' }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || '/';
  const isGerman = pathname === '/de' || pathname.startsWith('/de/');
  const prefix = isGerman ? '/de' : '';

  const labels = isGerman
    ? {
        menu: 'Menü',
        close: 'Schließen',
        explore: 'Entdecken',
        map: 'Wissenskarte',
        subjects: 'Fächer',
        paths: 'Lernpfade',
        research: 'Forschung',
        login: 'Anmelden',
        lang: 'DE'
      }
    : {
        menu: 'Menu',
        close: 'Close',
        explore: 'Explore',
        map: 'Knowledge Map',
        subjects: 'Subjects',
        paths: 'Learning Paths',
        research: 'Research',
        login: 'Sign in',
        lang: 'EN'
      };

  const languageHref = isGerman ? toEnglishPath(pathname) : toGermanPath(pathname);

  if (mode === 'utility') {
    return (
      <nav className="nav nav-utility" aria-label={isGerman ? 'Systemnavigation' : 'System navigation'}>
        <a href="https://noxiagame.vercel.app" className="nav-noxia" target="_blank" rel="noreferrer">NOχ¹Δ ↗</a>
        <span className="lang-switcher" aria-label={isGerman ? 'Sprache wechseln' : 'Switch language'}>
          <span aria-hidden="true">◉</span>
          <Link href={languageHref} className="mono">{labels.lang}⌄</Link>
        </span>
        <Link href={`${prefix}/login`} className="nav-login">{labels.login}</Link>
        <button className="mobile-menu-button" type="button" aria-expanded={open} aria-controls="ssf-mobile-menu" onClick={() => setOpen((value) => !value)}>
          <span aria-hidden="true">☰</span>
          <span>{open ? labels.close : labels.menu}</span>
        </button>
        {open && (
          <div id="ssf-mobile-menu" className="mobile-menu">
            <Link href={`${prefix}/learn`} onClick={() => setOpen(false)}>{labels.explore}</Link>
            <Link href={`${prefix}/learn`} onClick={() => setOpen(false)}>{labels.map}</Link>
            <Link href={`${prefix}/subjects`} onClick={() => setOpen(false)}>{labels.subjects}</Link>
            <Link href={`${prefix}/learning-paths`} onClick={() => setOpen(false)}>{labels.paths}</Link>
            <Link href={`${prefix}/research`} onClick={() => setOpen(false)}>{labels.research}</Link>
            <a href="https://noxiagame.vercel.app" target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>NOχ¹Δ ↗</a>
            <Link href={languageHref} onClick={() => setOpen(false)}>◉ {labels.lang}⌄</Link>
            <Link href={`${prefix}/login`} onClick={() => setOpen(false)}>{labels.login}</Link>
          </div>
        )}
      </nav>
    );
  }

  return (
    <nav className="nav nav-main" aria-label={isGerman ? 'Hauptnavigation' : 'Main navigation'}>
      <Link href={`${prefix}/learn`}>{labels.explore}</Link>
      <Link href={`${prefix}/learn`}>{labels.map}</Link>
      <Link href={`${prefix}/subjects`}>{labels.subjects}</Link>
      <Link href={`${prefix}/learning-paths`}>{labels.paths}</Link>
      <Link href={`${prefix}/research`}>{labels.research}</Link>
    </nav>
  );
}
