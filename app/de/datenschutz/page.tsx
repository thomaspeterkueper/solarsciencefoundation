/**
 * SSF · Datenschutz · 2026-07-10
 * Source: REQ-KG-LEGAL-ACCESS-20260710
 * Content: KG registry/legal/datenschutz.de.md
 */
import { fetchLegalContent } from '../../../lib/legal';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung · Solar Science Foundation',
};

export default async function DatenschutzPage() {
  const content = await fetchLegalContent();
  return (
    <main style={{ maxWidth: '820px', margin: '3rem auto', padding: '0 2rem' }}>
      {content.status === 'draft_productive' && (
        <p style={{ marginBottom: '2rem', padding: '0.5rem 1rem', background: '#FFF8E7',
          border: '1px solid #F4A300', fontSize: '0.8rem' }}>
          ⚠ Entwurf — nicht juristisch freigegeben.
        </p>
      )}
      <div className="prose" style={{ fontFamily: 'var(--font-serif)', lineHeight: 1.8 }}
        dangerouslySetInnerHTML={{ __html: content.privacy.replace(/\n/g, '<br />') }}
      />
    </main>
  );
}
