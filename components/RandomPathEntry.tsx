'use client';

/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      components/RandomPathEntry.tsx
 * Name:      RandomPathEntry — picks a random learning path entry question on mount
 * Version:   0.1.0
 * Created:   2026-07-05
 */

import { useEffect, useState } from 'react';
import Link from 'next/link';

type PathEntry = {
  id: string;
  question: string;
  image?: string;
};

const ENTRIES: PathEntry[] = [
  {
    id: 'PATH%3ASSF%3APHY-WAVE-SPECTRUM-0001',
    question: 'Warum klingt eine Kaffeetasse anders, je nachdem wie voll sie ist?',
    image: '/images/observations/kaffeetasse-tku.jpg',
  },
];

export default function RandomPathEntry() {
  const [entry, setEntry] = useState<PathEntry | null>(null);

  useEffect(() => {
    const picked = ENTRIES[Math.floor(Math.random() * ENTRIES.length)];
    setEntry(picked);
  }, []);

  if (!entry) return null;

  return (
    <Link
      href={`/learning-paths/${entry.id}`}
      style={{
        display: 'block',
        marginTop: 32,
        padding: '18px 22px',
        background: 'rgba(255,255,255,0.07)',
        border: '1px solid rgba(255,255,255,0.18)',
        borderRadius: 8,
        textDecoration: 'none',
        color: 'inherit',
        maxWidth: '62ch',
        transition: 'background 0.15s, border-color 0.15s',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.12)';
        (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(201,168,76,0.5)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.07)';
        (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.18)';
      }}
    >
      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        color: 'var(--gold, #C9A84C)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        marginBottom: 8,
      }}>
        Einstiegsfrage
      </p>
      <p style={{
        fontFamily: 'var(--font-serif, Georgia, serif)',
        fontSize: 18,
        lineHeight: 1.4,
        color: '#fff',
        margin: 0,
      }}>
        {entry.question}
      </p>
      <p style={{
        fontSize: 13,
        color: 'rgba(255,255,255,0.5)',
        marginTop: 10,
        marginBottom: 0,
      }}>
        Lernpfad beginnen →
      </p>
    </Link>
  );
}
