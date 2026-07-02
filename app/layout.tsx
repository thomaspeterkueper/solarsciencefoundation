import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import Signet from '../components/Signet';
import SiteNav from '../components/SiteNav';
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
            <SiteNav />
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
