/**
 * KUEPER - Solar Science Foundation (SSF)
 * Path: app/layout.tsx
 * Repo: github.com/thomaspeterkueper/solarsciencefoundation/blob/main/app/layout.tsx
 * Name: RootLayout
 * Version: 0.1.0
 * Created: 2026-06-26
 * Modified: 2026-06-27 10:25 CEST
 * Depends: next, next/link, components/Signet, app/globals.css
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
              <Link href="/subjects">Subjects</Link>
              <Link href="/subjects/mathematics">Mathematics</Link>
              <Link href="/progress">Progress</Link>
              <Link href="/membership">Membership</Link>
              <Link href="/api/kxf">KXF</Link>
              <a href="https://noxiagame.vercel.app" className="accent">NOXIA</a>
              <span className="sep">·</span>
              <span className="mono" style={{ fontSize: 11 }}>DE / EN</span>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="site-footer">
          <div className="container">
            <div>
              <div className="honest">A science learning project by Thomas Peter Küper.</div>
              <div className="meta">
                <span>Not an accredited institution. NOXIA is the first partner project.</span>
              </div>
            </div>
            <div className="meta">
              <a href="#">Impressum</a>
              <a href="#">Datenschutz</a>
              <Link href="/about">About</Link>
              <Link href="/membership">Membership</Link>
              <Link href="/progress">Progress</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
