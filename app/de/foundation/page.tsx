import FoundationHighlights from '../../../components/FoundationHighlights';
import FoundationJourney from '../../../components/FoundationJourney';
import PlatformSectionLanding from '../../../components/PlatformSectionLanding';

export default function GermanFoundationPage() {
  return <>
    <PlatformSectionLanding
      eyebrow="Foundation"
      title="Die öffentliche Ebene, die Lernen, Forschung und Menschen verbindet."
      intro="Die Solar Science Foundation ist mehr als ein Katalog von Lernmodulen. Sie verbindet offenes Lernen, nachvollziehbare Forschungsquellen, sichtbare Autorenschaft und geregelte Mitwirkung in einer gemeinsamen öffentlichen Plattform."
      entries={[
        { eyebrow: 'Auftrag', title: 'Verständnis vor Zertifikaten', body: 'Der Einstieg beginnt bei Fragen und führt so weit ins Verständnis, dass Quellen und Forschungsdokumente erreichbar werden.', href: '/de/learning', cta: 'Lernen beginnen →' },
        { eyebrow: 'Forschung', title: 'Wissen bis zu den Quellen verfolgen', body: 'Lernmodule können in Archivdokumente und Forschungsprovenienz führen, statt bei einem Quiz zu enden.', href: '/de/research', cta: 'Forschung erkunden →' },
        { eyebrow: 'Menschen', title: 'Sichtbare Autorenschaft', body: 'Veröffentlichte Beiträge behalten Autorenschaft, Review und Publikationsprovenienz, statt als anonymes Kursmaterial zu erscheinen.', href: '/de/authors', cta: 'Autorinnen und Autoren kennenlernen →' },
        { eyebrow: 'Mitwirkung', title: 'Beitragen mit klaren Rollen', body: 'Mitgliedschaft, Förderung, Autorenschaft, Review und redaktionelle Verantwortung bleiben bewusst getrennt.', href: '/de/participate', cta: 'Mitwirkung ansehen →' },
      ]}
      note="Der institutionelle Foundation-Rahmen und die reale öffentliche Lernplattform bleiben unterscheidbar. SSF stellt sich nicht als juristisch eingetragene Stiftung oder Organisation mit bezahlter Mitgliedschaft dar, solange diese Strukturen tatsächlich nicht bestehen."
    />
    <div className="container" style={{ paddingBottom: 88 }}>
      <FoundationHighlights locale="de" />
      <section style={{ marginTop: 56, maxWidth: '72ch', padding: 28, border: '1px solid var(--border)', borderRadius: 18 }}>
        <p className="section-eyebrow">Vertrauensschicht</p>
        <h2 style={{ marginTop: 8 }}>Herkunft ist Teil des Produkts.</h2>
        <p style={{ color: 'var(--muted)', lineHeight: 1.75 }}>Quellen, KI-Einsatz, Autorenzuordnung und die Grenze zwischen SSF-Didaktik und kanonischem Knowledge-Graph-Inhalt sollen nachvollziehbar bleiben, statt hinter der Oberfläche zu verschwinden.</p>
        <p style={{ marginBottom: 0 }}><a href="/ki-transparenz">KI-Transparenz →</a></p>
      </section>
      <FoundationJourney locale="de" current="foundation" />
    </div>
  </>;
}
