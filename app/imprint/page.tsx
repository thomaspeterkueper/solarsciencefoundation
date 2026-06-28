import { getLegalProjectInfo } from '../../lib/legal';

export default async function ImprintPage() {
  const info = await getLegalProjectInfo();
  const contactEmail = 'BITTE-IM-KNOWLEDGE-GRAPH-ERGAENZEN';
  const postalAddress = 'BITTE-IM-KNOWLEDGE-GRAPH-ERGAENZEN';

  return (
    <div className="container reading" style={{ paddingTop: 56 }}>
      <p className="kicker">Legal</p>
      <h1 className="hero" style={{ fontSize: 56 }}>Impressum</h1>

      <div className="card" style={{ marginTop: 28 }}>
        <p className="section-title">Angaben gemaess Anbieterkennzeichnung</p>
        <p><strong>{info.projectName}</strong></p>
        <p>{info.statusNote}</p>

        <p className="section-title" style={{ marginTop: 28 }}>Diensteanbieter und verantwortlich fuer den Inhalt</p>
        <p>{info.operatorName}</p>
        <p>{postalAddress}</p>

        <p className="section-title" style={{ marginTop: 28 }}>Kontakt</p>
        <p>E-Mail: {contactEmail}</p>
        <p>Website: <a href={info.websiteUrl}>{info.websiteUrl}</a></p>

        <p className="section-title" style={{ marginTop: 28 }}>Art des Angebots</p>
        <p>
          Die Solar Science Foundation ist ein unabhaengiges Wissenschafts-Lernprojekt.
          Sie ist keine akkreditierte Bildungseinrichtung und keine rechtsfaehige Stiftung.
        </p>

        <p className="section-title" style={{ marginTop: 28 }}>Verantwortlich im Sinne des Medienrechts</p>
        <p>{info.operatorName}</p>
        <p>{postalAddress}</p>

        <p className="section-title" style={{ marginTop: 28 }}>Haftung fuer Inhalte</p>
        <p>
          Die Inhalte dieses Projekts werden mit Sorgfalt erstellt. Eine Gewaehr fuer Richtigkeit,
          Vollstaendigkeit und Aktualitaet kann dennoch nicht uebernommen werden.
        </p>

        <p className="section-title" style={{ marginTop: 28 }}>Haftung fuer Links</p>
        <p>
          Diese Website kann Links zu externen Websites enthalten. Fuer deren Inhalte sind die jeweiligen
          Anbieter verantwortlich.
        </p>

        <p className="section-title" style={{ marginTop: 28 }}>Urheberrecht</p>
        <p>
          Texte, Lernmodule, Grafiken, Datenstrukturen und sonstige Inhalte dieses Projekts unterliegen,
          soweit nicht anders angegeben, dem Urheberrecht des jeweiligen Rechteinhabers.
        </p>

        <p className="section-title" style={{ marginTop: 28 }}>Datenschutz</p>
        <p><a href={info.privacyUrl}>{info.privacyUrl}</a></p>

        <p className="mono" style={{ color: 'var(--steel)', marginTop: 28 }}>
          Stand: 28.06.2026 · Source: {info.source === 'kxf' ? 'KUEPER Knowledge Graph / KXF' : 'SSF fallback'}
        </p>
      </div>
    </div>
  );
}
