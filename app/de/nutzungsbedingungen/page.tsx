import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Nutzungsbedingungen · Solar Science Foundation',
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

export default function NutzungsbedingungenPage() {
  return (
    <main style={styles.main}>
      <h1 style={styles.h1}>Nutzungsbedingungen</h1>

      <h2 style={styles.h2}>Zweck der Plattform</h2>
      <p style={styles.p}>
        Die Solar Science Foundation ist eine Lern- und Forschungsplattform für
        Wissenschaft und Astronomie. Die Inhalte dienen der Bildung und wissenschaftlichen
        Information.
      </p>

      <h2 style={styles.h2}>Benutzerkonten</h2>
      <p style={styles.p}>
        Die Registrierung erfordert eine gültige E-Mail-Adresse. Zugangsdaten sind
        vertraulich zu behandeln. Die Weitergabe an Dritte ist nicht gestattet.
      </p>

      <h2 style={styles.h2}>Urheberrecht</h2>
      <p style={styles.p}>
        Alle Inhalte dieser Website — einschließlich Texte, Kursmaterialien, Grafiken
        und Strukturen — sind urheberrechtlich geschützt. Vervielfältigung und
        Verbreitung sind ohne ausdrückliche Genehmigung nicht gestattet. Zitate im
        Rahmen wissenschaftlicher Arbeit sind unter Quellenangabe zulässig.
      </p>

      <h2 style={styles.h2}>Haftung</h2>
      <p style={styles.p}>
        Die Inhalte der Plattform werden sorgfältig gepflegt, Vollständigkeit und
        Richtigkeit können jedoch nicht garantiert werden. Der Betreiber haftet nicht
        für Schäden, die aus der Nutzung der Inhalte entstehen. Verweise auf externe
        Seiten liegen außerhalb unseres Verantwortungsbereichs.
      </p>

      <h2 style={styles.h2}>Änderungen</h2>
      <p style={styles.p}>
        Der Betreiber behält sich vor, diese Nutzungsbedingungen jederzeit zu ändern.
        Es gilt jeweils die zum Zeitpunkt der Nutzung veröffentlichte Fassung.
      </p>

      <h2 style={styles.h2}>Anwendbares Recht</h2>
      <p style={styles.p}>
        Es gilt das Recht der Bundesrepublik Deutschland.
        Gerichtsstand ist Frankfurt am Main.
      </p>

      <p style={{ ...styles.p, marginTop: '2rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
        Stand: August 2026
      </p>
    </main>
  );
}
