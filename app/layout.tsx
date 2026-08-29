import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import LocaleDocumentSync from '../components/LocaleDocumentSync';
import SiteBrand from '../components/SiteBrand';
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
    <html lang="en" suppressHydrationWarning>
      <body>
        <LocaleDocumentSync />
        <header className="site-header">
          <div className="header-shell">
            <div className="brand-grid">
              <SiteBrand />
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
