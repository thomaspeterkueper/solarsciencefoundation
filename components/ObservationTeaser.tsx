'use client';

/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      components/ObservationTeaser.tsx
 * Name:      ObservationTeaser — rotating observation photo kacheln
 * Version:   0.1.1
 * Created:   2026-07-05
 * Updated:   2026-07-07 — duplicate transition style removed
 */

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const OBSERVATIONS = [
  {
    src: '/images/observations/kaffeetasse-tku.jpg',
    alt: 'Kaffeetasse mit Löffel auf Holztisch',
    caption: 'Warum klingt eine Tasse anders, je nachdem wie voll sie ist?',
    tag: 'Resonanz & Klang',
    href: '/learning-paths/PATH%3ASSF%3APHY-WAVE-SPECTRUM-0001',
  },
  {
    src: '/images/observations/rolladen-tku.jpg',
    alt: 'Rolladen-Lamellen mit Lichtspektren',
    caption: 'Warum entstehen Farben, wo Licht durch einen schmalen Spalt fällt?',
    tag: 'Licht & Beugung',
    href: '/learning-paths/PATH%3ASSF%3APHY-WAVE-SPECTRUM-0001',
  },
  {
    src: '/images/observations/wasserglas-tku.jpg',
    alt: 'Kaltes Wasserglas mit Kondensation',
    caption: 'Warum beschlägt ein kaltes Glas — und warum sieht alles dahinter verschoben aus?',
    tag: 'Kondensation & Brechung',
    href: '/learning-paths/PATH%3ASSF%3APHY-WAVE-SPECTRUM-0001',
  },
  {
    src: '/images/observations/cd-spektrum-tku.jpg',
    alt: 'CD im Sonnenlicht mit vollem Farbspektrum',
    caption: 'Wie zerlegt eine CD das Sonnenlicht in alle Farben?',
    tag: 'Interferenz & Spektrum',
    href: '/learning-paths/PATH%3ASSF%3APHY-WAVE-SPECTRUM-0001',
  },
];

export default function ObservationTeaser() {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);

  const rotateTo = useCallback((next: number) => {
    setFading(true);
    setTimeout(() => {
      setActive(next);
      setFading(false);
    }, 300);
  }, []);

  // Auto-rotate every 5s
  useEffect(() => {
    const id = setInterval(() => {
      rotateTo((active + 1) % OBSERVATIONS.length);
    }, 5000);
    return () => clearInterval(id);
  }, [active, rotateTo]);

  const obs = OBSERVATIONS[active];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24 }}>
        <div>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: 11,
            color: 'var(--gold-2)', letterSpacing: '2.2px',
            textTransform: 'uppercase', fontWeight: 600, marginBottom: 8
          }}>From everyday life</p>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(28px, 3vw, 40px)',
            color: 'var(--navy)', fontWeight: 600,
            lineHeight: 1.15, marginBottom: 0
          }}>What have you noticed?</h2>
        </div>
        <Link href="/learning-paths" style={{ fontWeight: 600, fontSize: 15, color: 'var(--navy)', whiteSpace: 'nowrap' }}>
          All paths →
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignItems: 'start' }}>

        {/* Featured / active observation — large */}
        <Link href={obs.href} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{
            borderRadius: 14, overflow: 'hidden',
            border: '1.5px solid var(--border)',
            boxShadow: '0 8px 28px rgba(30,78,140,.07)',
            cursor: 'pointer',
            opacity: fading ? 0 : 1,
            transition: 'opacity 0.3s ease, box-shadow .2s, border-color .2s',
          }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 40px rgba(30,78,140,.13)';
              (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--gold)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 28px rgba(30,78,140,.07)';
              (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)';
            }}
          >
            <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
              <Image src={obs.src} alt={obs.alt} fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 780px) 100vw, 580px"
                priority
              />
            </div>
            <div style={{ padding: '20px 24px 24px' }}>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 10,
                color: 'var(--gold-2)', letterSpacing: '1.5px',
                textTransform: 'uppercase', fontWeight: 600,
                display: 'block', marginBottom: 10
              }}>{obs.tag}</span>
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 20, lineHeight: 1.35,
                color: 'var(--navy)', margin: 0, fontWeight: 600
              }}>{obs.caption}</p>
              <p style={{
                fontSize: 14, color: 'var(--muted)',
                marginTop: 12, marginBottom: 0
              }}>Lernpfad beginnen →</p>
            </div>
          </div>
        </Link>

        {/* Thumbnail grid — the other 3 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {OBSERVATIONS.map((o, i) => {
            if (i === active) return null;
            return (
              <button key={o.src} onClick={() => rotateTo(i)} style={{
                display: 'grid', gridTemplateColumns: '80px 1fr',
                gap: 12, alignItems: 'center',
                background: 'var(--panel)', border: '1.5px solid var(--border)',
                borderRadius: 10, padding: '10px 14px', cursor: 'pointer',
                textAlign: 'left', transition: 'border-color .15s, box-shadow .15s',
                width: '100%',
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--navy)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 12px rgba(30,78,140,.08)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
                }}
              >
                <div style={{ position: 'relative', width: 80, height: 60, borderRadius: 7, overflow: 'hidden', flexShrink: 0 }}>
                  <Image src={o.src} alt={o.alt} fill
                    style={{ objectFit: 'cover' }}
                    sizes="80px"
                  />
                </div>
                <div>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 9.5,
                    color: 'var(--gold-2)', letterSpacing: '1.2px',
                    textTransform: 'uppercase', fontWeight: 600,
                    display: 'block', marginBottom: 4
                  }}>{o.tag}</span>
                  <p style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 13.5, lineHeight: 1.4,
                    color: 'var(--navy)', margin: 0,
                  }}>{o.caption}</p>
                </div>
              </button>
            );
          })}

          {/* Dot indicators */}
          <div style={{ display: 'flex', gap: 6, paddingTop: 4, paddingLeft: 2 }}>
            {OBSERVATIONS.map((_, i) => (
              <button key={i} onClick={() => rotateTo(i)} style={{
                width: i === active ? 20 : 7, height: 7,
                borderRadius: 4,
                background: i === active ? 'var(--gold)' : 'var(--border)',
                border: 'none', padding: 0, cursor: 'pointer',
                transition: 'width .3s, background .3s',
              }} aria-label={`Beobachtung ${i + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
