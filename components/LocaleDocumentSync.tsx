'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function LocaleDocumentSync() {
  const pathname = usePathname() || '/';

  useEffect(() => {
    const isGerman = pathname === '/de' || pathname.startsWith('/de/');
    document.documentElement.lang = isGerman ? 'de' : 'en';
  }, [pathname]);

  return null;
}
