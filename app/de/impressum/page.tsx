import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Impressum · Solar Science Foundation',
};

const styles = {
  main: { maxWidth: '680px', margin: '3rem auto', padding: '0 2rem 6rem' } as React.CSSProperties,
  h1: { fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 400,
        marginBottom: '2.5rem', paddingBottom: '1rem', borderBottom: '0.5px solid var(--border)' } as React.CSSProperties,
  h2: { fontSize: '0.7rem', textTransform: 'uppercase' as const, letterSpacing: '0.12em',
        color: 'var(--muted)', marginTop: '2rem', marginBottom: '0.75rem' },
  p: { fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '0.75rem' } as React.CSSProperties,
  ul: { fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.8,
        paddingLeft: '1.5rem', marginBottom: '0.75rem' } as React.CSSProperties,
  a: { color: 'var(--text)' } as React.CSSProperties,
};

export default function ImpressumPage() {
  return (
    <main style={styles.main}>
      <h1 style={styles.h1}>Impressum</h1>

      <h2 style={styles.h2}>Angaben gemäß § 5 TMG</h2>
      <p style={styles.p}>
        Thomas Peter Küper<br />
        Mörfelder Landstraße 103<br />
        60598 Frankfurt am Main<br />
        Deutschland
      </p>

      <h2 style={styles.h2}>Kontakt</h2>
      <p style={styles.p}>
        E-Mail: <a href="mailto:t.kueper@camaleo.de" style={styles.a}>t.kueper@camaleo.de</a>
      </p>

      <h2 style={styles.h2}>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p style={styles.p}>
        Thomas Peter Küper<br />
        Mörfelder Landstraße 103<br />
        60598 Frankfurt am Main
      </p>

      <h2 style={styles.h2}>Urheberrecht</h2>
      <p style={styles.p}>
        Alle Inhalte dieser Website — einschließlich Lernmaterialien, Kursstrukturen,
        wissenschaftlicher Texte und der Plattformarchitektur — sind urheberrechtlich
        geschützt und Eigentum von Thomas Peter Küper, sofern nicht anders angegeben.
        Vervielfältigung und Verbreitung bedürfen der schriftlichen Zustimmung.
      </p>
    </main>
  );
}
