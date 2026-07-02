import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import Signet from '../components/Signet';
import './globals.css';

export const metadata: Metadata = {
  title: 'Solar Science Foundation',
  description:
    'A fictional science learning and archive platform within the NO&#967;&#185;&#916; universe.'
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
              <Link href="/login">Login</Link>
              <Link href="/api/kxf">KXF</Link>
              <a href="https://noxiagame.vercel.app" className="accent">NO&#967;&#185;&#916;</a>
              <span className="sep">·</span>
              <Link href="/de" className="mono" style={{ fontSize: 11 }}>DE</Link>
              <span className="mono" style={{ fontSize: 11 }}>/</span>
              <Link href="/" className="mono" style={{ fontSize: 11 }}>EN</Link>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="site-footer">
          <div className="container">
            <div>
              <div className="honest">A fictional science learning and archive platform within the NO&#967;&#185;&#916; universe.</div>
              <div className="meta">
                <span>Founded 2045 in Geneva. Not a real foundation or accredited institution.</span>
              </div>
            </div>
            <div className="meta">
              <a href="#">Impressum</a>
              <a href="#">Datenschutz</a>
              <Link href="/about">About</Link>
              <Link href="/membership">Membership</Link>
              <Link href="/progress">Progress</Link>
              <Link href="/login">Login</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
