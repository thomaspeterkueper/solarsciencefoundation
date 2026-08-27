import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'AI transparency · Solar Science Foundation',
};

const styles = {
  main: { maxWidth: '680px', margin: '3rem auto', padding: '0 2rem 6rem' } as React.CSSProperties,
  h1: { fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 400,
        marginBottom: '2.5rem', paddingBottom: '1rem', borderBottom: '0.5px solid var(--border)' } as React.CSSProperties,
  h2: { fontSize: '0.7rem', textTransform: 'uppercase' as const, letterSpacing: '0.12em',
        color: 'var(--muted)', marginTop: '2rem', marginBottom: '0.75rem' },
  p: { fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '0.9rem' } as React.CSSProperties,
  note: { fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.7, marginTop: '2rem' } as React.CSSProperties,
};

export default function AiTransparencyPage() {
  return (
    <main style={styles.main}>
      <h1 style={styles.h1}>Transparency about the use of AI</h1>

      <p style={styles.p}>
        I also use AI-assisted tools when creating and editing content. Depending on the text,
        their use may range from spelling and style corrections to editorial structuring and
        dialogical, conceptual collaboration.
      </p>
      <p style={styles.p}>
        Published versions are selected and editorially controlled by me. Content decisions,
        contextualisation, acceptance or rejection of suggestions, and final editing remain the
        responsibility of Thomas Peter Küper.
      </p>
      <p style={styles.p}>
        Pure correction, proofreading or formatting steps are not disclosed separately for every
        individual item. Where generative AI has made a substantial contribution to developing a
        text, model or concept and an additional work-specific notice is useful for context, such a
        notice may be added directly to that item.
      </p>

      <h2 style={styles.h2}>Governance</h2>
      <p style={styles.p}>
        This page implements the KUEPER ecosystem-wide publication transparency policy. The
        authoritative source is <strong>ECO:POLICY:PUBLICATION-TRANSPARENCY</strong>, version 1.0.0,
        adopted through <strong>ECO-ARC-0028-2026-DE</strong>.
      </p>

      <p style={styles.note}>Last updated: August 2026</p>
    </main>
  );
}
