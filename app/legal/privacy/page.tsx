import { getLegalProjectInfo } from '../../../lib/legal';

const sections = [
  ['Verantwortlicher', 'Der verantwortliche Betreiber ist unten angegeben. Kontakt- und Postanschrift werden aus dem KUEPER Knowledge Graph bezogen.'],
  ['Zweck des Projekts', 'Die SSF stellt wissenschaftliche Lernmodule, Übungen, Fortschrittsspeicherung, Auszeichnungen und begrenzte Freischaltungen für Partnerprojekte bereit.'],
  ['Verarbeitete Daten', 'Der Dienst kann Kontodaten, E-Mail-Adresse, Login- und Sitzungsdaten, abgeschlossene Module, Übungsversuche, Auszeichnungen, Freischaltungen und technische Zugriffsprotokolle verarbeiten.'],
  ['Zweck der Verarbeitung', 'Die Daten werden verwendet, um Konten zu betreiben, Lernfortschritte zu speichern, Modulabschlüsse auszuwerten, Auszeichnungen zu vergeben und begrenzte Freischaltungssignale an Partnerprojekte wie NOXIA zu übermitteln.'],
  ['Dienstleister', 'Die Website wird über Vercel bereitgestellt. Authentifizierung und Datenbankfunktionen nutzen Supabase. GitHub wird für Versionsverwaltung und Deployment-Integration verwendet.'],
  ['Partnersignale', 'Partnerprojekte sollen nur erforderliche Lernsignale wie abgeschlossene Module, aktive Freischaltungen und nächste empfohlene Module erhalten. E-Mail-Adressen, Passwörter und einzelne falsche Antworten sind keine Partner- oder Spielsignale.'],
  ['Speicherdauer', 'Konto- und Fortschrittsdaten werden gespeichert, solange das Konto besteht oder sie für die Lernfunktionen benötigt werden. Betroffene Personen können Auskunft, Berichtigung oder Löschung verlangen.'],
  ['Rechte', 'Betroffene Personen können im Rahmen der gesetzlichen Voraussetzungen Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch verlangen. Einwilligungen können für die Zukunft widerrufen werden.'],
  ['Lokale Speicherung', 'Die Plattform kann technisch notwendige Cookies oder Local Storage für Loginstatus, Sitzungsverwaltung und lokalen Demofortschritt verwenden.'],
  ['Testbetrieb', 'Diese Hinweise beschreiben den aktuellen Testbetrieb und müssen angepasst werden, sobald Zahlungen, Newsletter, zusätzliche Analytics-Funktionen, öffentliche Profile oder neue Community-Funktionen hinzukommen.']
];

export default async function Page() {
  const info = await getLegalProjectInfo();

  return (
    <main className="legal-page">
      <header className="ui-page-header">
        <div className="ui-container ui-container-narrow">
          <p className="ui-eyebrow">Datenschutz</p>
          <h1 className="ui-page-title">Datenschutzerklärung</h1>
          <p className="ui-page-lead">
            Informationen zur Verarbeitung personenbezogener Daten im aktuellen Testbetrieb der SSF.
          </p>
        </div>
      </header>

      <div className="ui-container ui-container-narrow legal-content">
        <section className="ui-card legal-card">
          <h2>Projekt</h2>
          <p><strong>{info.projectName}</strong></p>
          <p>{info.statusNote}</p>

          <h2>Betreiber</h2>
          <p>{info.operatorName}</p>
          {info.postalAddress ? <p className="legal-preline">{info.postalAddress}</p> : null}
          {info.contactEmail ? <p>E-Mail: <a href={`mailto:${info.contactEmail}`}>{info.contactEmail}</a></p> : <p className="legal-missing">Kontaktadresse ist im Knowledge Graph noch nicht veröffentlicht.</p>}
          <p>Impressum: <a href="/imprint">/imprint</a></p>

          {sections.map(([title, body], index) => (
            <section key={title}>
              <h2>{index + 1}. {title}</h2>
              <p>{body}</p>
            </section>
          ))}

          <p className="legal-meta">Stand: {info.updated} · Quelle: {info.source === 'kxf' ? 'KUEPER Knowledge Graph' : 'SSF-Fallback'}</p>
        </section>
      </div>
    </main>
  );
}
