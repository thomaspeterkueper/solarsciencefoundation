import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'KI-Transparenz · Solar Science Foundation',
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

export default function KiTransparenzPage() {
  return (
    <main style={styles.main}>
      <h1 style={styles.h1}>Transparenz zum Einsatz von KI</h1>

      <p style={styles.p}>
        Bei der Erstellung und Bearbeitung von Inhalten nutze ich auch KI-gestützte Werkzeuge.
        Je nach Text kann ihr Einsatz von Rechtschreib- und Stilkorrekturen über redaktionelle
        Strukturierung bis zur dialogischen, konzeptionellen Mitarbeit reichen.
      </p>
      <p style={styles.p}>
        Die veröffentlichten Fassungen werden von mir ausgewählt und redaktionell verantwortet.
        Inhaltliche Entscheidungen, Einordnung, Annahme oder Verwerfung von Vorschlägen sowie die
        Endredaktion liegen bei Thomas Peter Küper.
      </p>
      <p style={styles.p}>
        Reine Korrektur-, Lektorats- oder Formatierungsschritte werden nicht bei jedem einzelnen
        Inhalt gesondert ausgewiesen. Wo generative KI substanziell an der Entwicklung eines
        Textes, Modells oder Konzepts beteiligt war und ein zusätzlicher werkbezogener Hinweis zur
        Einordnung sinnvoll ist, kann dieser direkt am jeweiligen Inhalt ergänzt werden.
      </p>

      <h2 style={styles.h2}>Governance</h2>
      <p style={styles.p}>
        Diese Seite setzt die systemweite Publikationstransparenz des KUEPER-Ökosystems um.
        Maßgeblich ist die Policy <strong>ECO:POLICY:PUBLICATION-TRANSPARENCY</strong>, Version 1.0.0,
        beschlossen mit <strong>ECO-ARC-0028-2026-DE</strong>.
      </p>

      <p style={styles.note}>Stand: August 2026</p>
    </main>
  );
}
