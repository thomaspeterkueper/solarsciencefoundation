import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import Signet from '../components/Signet';
import SiteFooter from '../components/SiteFooter';
import SiteNav from '../components/SiteNav';
import './globals.css';
import './design-system.css';
import './footer-legal.css';
import './module-experience.css';

export const metadata: Metadata = {
  title: 'Solar Science Foundation',
  description: 'An independent institution for scientific curiosity — open to everyone, everywhere.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="header-shell">
            <div className="brand-grid">
              <Link href="/" className="brand" style={{ color: 'inherit' }}>
                <span className="brand-signet"><Signet size={58} /></span>
                <span className="brand-text">
                  <span className="wordmark">Solar Science Foundation</span>
                  <span className="tagline">Founded Sundern 2045 · NOχ¹Δ Universe</span>
                </span>
              </Link>
              <SiteNav mode="utility" />
            </div>
            <div className="nav-row">
              <div className="nav-indent" aria-hidden="true" />
              <SiteNav />
            </div>
          </div>
        </header>

        <main>{children}</main>

        <SiteFooter />
      </body>
    </html>
  );
}
