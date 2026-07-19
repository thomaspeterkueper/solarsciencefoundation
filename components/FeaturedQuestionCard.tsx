'use client';

import Link from 'next/link';

type FeaturedQuestionCardProps = {
  q: string;
  path: string;
  cluster: string;
};

export default function FeaturedQuestionCard({ q, path, cluster }: FeaturedQuestionCardProps) {
  return (
    <Link
      href={'/learning-paths/' + encodeURIComponent(path)}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div
        style={{
          padding: '20px 22px',
          border: '1px solid var(--border)',
          borderRadius: 10,
          background: 'var(--panel)',
          cursor: 'pointer',
          transition: 'border-color 0.15s, transform 0.15s',
          height: '100%',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = 'var(--ink)';
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
          (e.currentTarget as HTMLElement).style.transform = 'none';
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: 'var(--muted)',
            letterSpacing: '.08em',
            textTransform: 'uppercase',
            marginBottom: 10,
          }}
        >
          {cluster}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-serif, Georgia, serif)',
            fontSize: 17,
            lineHeight: 1.35,
            color: 'var(--ink)',
            marginBottom: 14,
          }}
        >
          {q}
        </p>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--muted)',
            letterSpacing: '.06em',
          }}
        >
          Lernreise öffnen →
        </span>
      </div>
    </Link>
  );
}
