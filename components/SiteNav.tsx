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
        learn: 'Lernen',
        research: 'Forschung',
        participate: 'Mitwirken',
        foundation: 'Stiftung',
        login: 'Anmelden',
        lang: 'DE'
      }
    : {
        menu: 'Menu',
        close: 'Close',
        learn: 'Learn',
        research: 'Research',
        participate: 'Participate',
        foundation: 'Foundation',
        login: 'Sign in',
        lang: 'EN'
      };

  const languageHref = isGerman ? toEnglishPath(pathname) : toGermanPath(pathname);
  const mainLinks = [
    { href: `${prefix}/learning`, label: labels.learn },
    { href: `${prefix}/research`, label: labels.research },
    { href: `${prefix}/participate`, label: labels.participate },
    { href: `${prefix}/foundation`, label: labels.foundation },
  ];

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
            {mainLinks.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>
            ))}
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
      {mainLinks.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
    </nav>
  );
}
