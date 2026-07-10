import { getLegalProjectInfo } from '../../lib/legal';

export default async function ImprintPage() {
  const info = await getLegalProjectInfo();

  return (
    <main className="legal-page">
      <header className="ui-page-header">
        <div className="ui-container ui-container-narrow">
          <p className="ui-eyebrow">Legal</p>
          <h1 className="ui-page-title">Impressum</h1>
          <p className="ui-page-lead">
            Anbieterkennzeichnung und rechtliche Informationen zur Solar Science Foundation.
          </p>
        </div>
      </header>

      <div className="ui-container ui-container-narrow legal-content">
        <section className="ui-card legal-card">
          <h2>Angaben gemäß Anbieterkennzeichnung</h2>
          <p><strong>{info.projectName}</strong></p>
          <p>{info.statusNote}</p>

          <h2>Diensteanbieter und verantwortlich für den Inhalt</h2>
          <p>{info.operatorName}</p>
          {info.postalAddress ? <p className="legal-preline">{info.postalAddress}</p> : <p className="legal-missing">Postanschrift ist im Knowledge Graph noch nicht veröffentlicht.</p>}

          <h2>Kontakt</h2>
          {info.contactEmail ? <p>E-Mail: <a href={`mailto:${info.contactEmail}`}>{info.contactEmail}</a></p> : <p className="legal-missing">Kontaktadresse ist im Knowledge Graph noch nicht veröffentlicht.</p>}
          <p>Website: <a href={info.websiteUrl}>{info.websiteUrl}</a></p>

          <h2>Art des Angebots</h2>
          <p>
            Die Solar Science Foundation ist ein unabhängiges Wissenschafts-Lernprojekt.
            Sie ist keine akkreditierte Bildungseinrichtung und keine rechtsfähige Stiftung.
          </p>

          <h2>Verantwortlich im Sinne des Medienrechts</h2>
          <p>{info.operatorName}</p>
          {info.postalAddress ? <p className="legal-preline">{info.postalAddress}</p> : null}

          <h2>Haftung für Inhalte</h2>
          <p>
            Die Inhalte dieses Projekts werden mit Sorgfalt erstellt. Eine Gewähr für Richtigkeit,
            Vollständigkeit und Aktualität kann dennoch nicht übernommen werden.
          </p>

          <h2>Haftung für Links</h2>
          <p>
            Diese Website kann Links zu externen Websites enthalten. Für deren Inhalte sind die jeweiligen
            Anbieter verantwortlich.
          </p>

          <h2>Urheberrecht</h2>
          <p>
            Texte, Lernmodule, Grafiken, Datenstrukturen und sonstige Inhalte dieses Projekts unterliegen,
            soweit nicht anders angegeben, dem Urheberrecht des jeweiligen Rechteinhabers.
          </p>

          <h2>Datenschutz</h2>
          <p><a href="/legal/privacy">Datenschutzerklärung öffnen →</a></p>

          <p className="legal-meta">
            Stand: {info.updated} · Quelle: {info.source === 'kxf' ? 'KUEPER Knowledge Graph' : 'SSF-Fallback'}
          </p>
        </section>
      </div>
    </main>
  );
}
