/**
 * SSF · Impressum · 2026-07-10
 * Source: REQ-KG-LEGAL-ACCESS-20260710
 * Content: KG registry/legal/impressum-master.json
 */
import { fetchLegalContent } from '../../../lib/legal';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Impressum · Solar Science Foundation',
};

export default async function ImpressumPage() {
  const content = await fetchLegalContent();
  return (
    <main style={ maxWidth: '820px', margin: '3rem auto', padding: '0 2rem' }>
      <h1 style={ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '1.5rem' }>
        Impressum
      </h1>
      <p><strong>{content.impressum.name}</strong></p>
      <p>{content.impressum.address}</p>
      <p>E-Mail: <a href={`mailto:${content.impressum.email}`}>{content.impressum.email}</a></p>
      <p style={ marginTop: '2rem', fontSize: '0.85rem', color: 'var(--muted)' }>
        Verantwortlicher im Sinne des § 5 TMG und Art. 4 Nr. 7 DSGVO.
        Stand: {content.impressum.updated}
      </p>
      {content.status === 'draft_productive' && (
        <p style={ marginTop: '1rem', padding: '0.5rem 1rem', background: '#FFF8E7',
          border: '1px solid #F4A300', fontSize: '0.8rem' }>
          ⚠ Entwurf — nicht juristisch freigegeben.
        </p>
      )}
    </main>
  );
}
