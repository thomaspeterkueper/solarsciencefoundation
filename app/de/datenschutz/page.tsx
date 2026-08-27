import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung · Solar Science Foundation',
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

export default function DatenschutzPage() {
  return (
    <main style={styles.main}>
      <h1 style={styles.h1}>Datenschutzerklärung</h1>

      <h2 style={styles.h2}>1. Verantwortlicher</h2>
      <p style={styles.p}>
        Thomas Peter Küper<br />
        Mörfelder Landstraße 103<br />
        60598 Frankfurt am Main<br />
        E-Mail: <a href="mailto:t.kueper@camaleo.de" style={styles.a}>t.kueper@camaleo.de</a>
      </p>

      <h2 style={styles.h2}>2. Hosting</h2>
      <p style={styles.p}>
        Diese Website wird über <strong>Vercel Inc.</strong>, 340 Pine Street, Suite 701,
        San Francisco, CA 94104, USA gehostet. Beim Seitenaufruf verarbeitet Vercel technisch
        notwendige Zugriffsdaten (IP-Adresse, Zeitpunkt, Ressource, Referrer, Browser).
        Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO. Mit Vercel besteht ein
        Auftragsverarbeitungsvertrag gemäß Art. 28 DSGVO.
      </p>

      <h2 style={styles.h2}>3. Benutzerkonten und Authentifizierung</h2>
      <p style={styles.p}>
        Die Solar Science Foundation verwendet <strong>Supabase</strong> (Supabase Inc.,
        970 Trestle Glen Rd, Oakland, CA 94610, USA) als Datenbank- und Authentifizierungsdienst.
        Die Datenbank-Server befinden sich in einer EU-Region. Row Level Security ist aktiv —
        Nutzer haben ausschließlich Zugriff auf ihre eigenen Datensätze.
      </p>
      <p style={styles.p}>
        <strong>Registrierung:</strong> E-Mail-Adresse und Passwort mit E-Mail-Bestätigung.
        Sitzungsverwaltung über Browser-localStorage.
      </p>
      <p style={styles.p}><strong>Gespeicherte Daten:</strong></p>
      <ul style={styles.ul}>
        <li>Authentifizierungsdaten: E-Mail-Adresse und gehashtes Passwort</li>
        <li>Mitgliedsprofil: Nutzer-UUID, Anzeigename</li>
        <li>Mitgliedschaft und Rollen: Mitgliedsstatus, Rollen, Unterstützereinträge</li>
        <li>Lernfortschritt: Kursfortschritt, Übungsversuche, freigeschaltete Inhalte, Erfolge</li>
        <li>Zugriffsprotokoll: Projektbezogene Zugriffsnachweise (bei Löschung auf NULL gesetzt)</li>
      </ul>
      <p style={styles.p}>
        <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).
      </p>
      <p style={styles.p}>
        <strong>Speicherdauer:</strong> Inaktive Konten werden nach 6 Monaten gelöscht.
        Unbestätigte Registrierungen nach 1 Monat. Die Kontolöschung entfernt alle
        verknüpften Datensätze.
      </p>
      <p style={styles.p}>
        Mit Supabase besteht ein Auftragsverarbeitungsvertrag gemäß Art. 28 DSGVO.
      </p>

      <h2 style={styles.h2}>4. Cookies und Tracking</h2>
      <p style={styles.p}>
        Es werden ausschließlich technisch notwendige Authentifizierungsdaten im
        Browser-localStorage gespeichert. Keine Analyse-, Marketing- oder Tracking-Cookies.
      </p>

      <h2 style={styles.h2}>5. Betroffenenrechte</h2>
      <p style={styles.p}>
        Sie haben das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17),
        Einschränkung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21 DSGVO)
        sowie ein Beschwerderecht bei der zuständigen Aufsichtsbehörde.
      </p>
      <p style={styles.p}>
        Anfragen: <a href="mailto:t.kueper@camaleo.de" style={styles.a}>t.kueper@camaleo.de</a>
      </p>

      <h2 style={styles.h2}>6. Aufsichtsbehörde</h2>
      <p style={styles.p}>
        Hessischer Beauftragter für Datenschutz und Informationsfreiheit,
        Postfach 3163, 65021 Wiesbaden.
      </p>

      <p style={{ ...styles.p, marginTop: '2rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
        Stand: August 2026
      </p>
    </main>
  );
}
