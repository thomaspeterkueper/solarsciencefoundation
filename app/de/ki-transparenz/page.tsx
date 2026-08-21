/**
 * SSF · KI-Transparenz · 2026-08-21
 * Source: ECO-ARC-0028-2026-DE / kueper-ecosystem config/publication-transparency.json v1.0.0
 * Local mirror: config/publication-transparency.json — rendered verbatim.
 */
import type { Metadata } from 'next';
import { publicationTransparencyPolicy, POLICY_VERSION } from '../../../lib/publicationTransparency';

export const metadata: Metadata = {
  title: 'Transparenz zum Einsatz von KI · Solar Science Foundation',
};

export default function KiTransparenzPage() {
  const policy = publicationTransparencyPolicy;
  return (
    <main style={{ maxWidth: '820px', margin: '3rem auto', padding: '0 2rem' }}>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '1.5rem' }}>
        {policy.title}
      </h1>

      <p style={{ fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
        {policy.shortNotice}
      </p>

      {policy.fullNotice.map((paragraph) => (
        <p key={paragraph.slice(0, 48)} style={{ lineHeight: 1.72, marginBottom: '1rem' }}>
          {paragraph}
        </p>
      ))}

      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', marginTop: '2.5rem', marginBottom: '0.75rem' }}>
        Hinweis am einzelnen Inhalt
      </h2>
      <p style={{ lineHeight: 1.72, marginBottom: '0.75rem' }}>
        {policy.individualDisclosure.requiredByPolicy
          ? 'Ein werkbezogener Hinweis direkt am Inhalt ist durch die Policy verpflichtend vorgesehen.'
          : 'Ein werkbezogener Hinweis direkt am Inhalt ist durch die Policy nicht für jeden Inhalt verpflichtend vorgesehen; er wird ergänzt, wenn generative KI substanziell an der Entwicklung eines Textes, Modells oder Konzepts beteiligt war.'}
      </p>
      <blockquote
        style={{
          margin: '0 0 1rem',
          padding: '0.75rem 1.25rem',
          borderLeft: '3px solid var(--gold, #d8b25a)',
          background: 'var(--gold-bg, #fbf7ec)',
          fontStyle: 'italic',
          lineHeight: 1.6,
        }}
      >
        {policy.individualDisclosure.template}
      </blockquote>

      <p
        style={{
          marginTop: '2.5rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid var(--border, #e5e0d5)',
          fontSize: '0.8rem',
          color: 'var(--muted)',
          fontFamily: 'var(--font-mono)',
          lineHeight: 1.7,
        }}
      >
        Version {POLICY_VERSION} · Stand {policy.effectiveDate} · Beschluss {policy.governance.decision} ·{' '}
        Kanonische Quelle: {policy.governance.sourceOfTruth}
      </p>
    </main>
  );
}
