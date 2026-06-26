/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      app/layout.tsx
 * Repo:      github.com/thomaspeterkueper/solarsciencefoundation/blob/main/app/layout.tsx
 * Name:      RootLayout
 * Version:   0.1.0
 * Created:   2026-06-26
 * Modified:  2026-06-26 13:00 CEST
 * Depends:   next, next/link, components/Signet, app/globals.css
 */

import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import Signet from '../components/Signet';
import './globals.css';

export const metadata: Metadata = {
  title: 'Solar Science Foundation',
  description:
    'An independent science learning project by Thomas Peter Küper. Short, connected learning modules in German and English.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container">
            <Link href="/" className="brand" style={{ color: 'inherit' }}>
              <Signet />
              <span className="wordmark">Solar Science Foundation</span>
            </Link>
            <nav className="nav">
              <a href="#">Knowledge</a>
              <a href="#">Courses</a>
              <a href="#">Library</a>
              <a href="#">Community</a>
              <a href="#" className="accent">NOXIA</a>
              <span className="sep">·</span>
              <span className="mono" style={{ fontSize: 11 }}>DE / EN</span>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="site-footer">
          <div className="container">
            <div className="honest">A science learning project by Thomas Peter Küper.</div>
            <div className="meta">
              <span>Not an accredited institution. NOXIA is the first partner project.</span>
            </div>
            <div className="meta">
              <a href="#">Impressum</a>
              <a href="#">Datenschutz</a>
              <Link href="/about">About</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
