'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Signet from './Signet';

export default function SiteBrand() {
  const pathname = usePathname() || '/';
  const isGerman = pathname === '/de' || pathname.startsWith('/de/');

  return (
    <Link href={isGerman ? '/de' : '/'} className="brand" style={{ color: 'inherit' }}>
      <span className="brand-signet"><Signet size={58} /></span>
      <span className="brand-text">
        <span className="wordmark">Solar Science Foundation</span>
        <span className="tagline">
          {isGerman ? 'Gegründet Sundern 2045 · NOχ¹Δ Universe' : 'Founded Sundern 2045 · NOχ¹Δ Universe'}
        </span>
      </span>
    </Link>
  );
}
