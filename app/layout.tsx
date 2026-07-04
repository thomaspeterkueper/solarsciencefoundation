import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import Signet from '../components/Signet';
import SiteFooter from '../components/SiteFooter';
import SiteNav from '../components/SiteNav';
import './globals.css';

export const metadata: Metadata = {
  title: 'Solar Science Foundation',
  description: 'An independent institution for scientific curiosity — open to everyone, everywhere.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container">
            <Link href="/" className="brand" style={{ color: 'inherit' }}>
              <Signet />
              <span className="brand-text">
                <span className="wordmark">Solar Science Foundation</span>
                <span className="tagline">Sundern · Est. 2045 · NOχ¹Δ universe</span>
              </span>
            </Link>
            <SiteNav />
          </div>
        </header>

        <main>{children}</main>

        <SiteFooter />
      </body>
    </html>
  );
}
