import PlatformSectionLanding from '../../../components/PlatformSectionLanding';

export default function GermanFoundationPage() {
  return <PlatformSectionLanding
    eyebrow="Stiftung"
    title="Die Institution hinter der Lernplattform."
    intro="Die Solar Science Foundation ist nicht nur eine Oberfläche für Lernmodule. Zu ihrer Identität gehören auch Auftrag, Autorenschaft, Transparenz, Forschungspraxis und eine Community, die das Projekt unabhängig von NOχ¹Δ tragen kann."
    entries={[
      { eyebrow: 'Auftrag', title: 'Offenes Wissenschaftsverständnis', body: 'SSF übersetzt wissenschaftliche Grundlagen in verständliche, zweisprachige Lernerfahrungen, die eigenständig funktionieren.' },
      { eyebrow: 'Menschen', title: 'Autorinnen, Autoren und Beitragende', body: 'Die Stiftung ist für sichtbare Autorenschaft und mehrere Beitragende gedacht, nicht für anonyme Kursproduktion.' },
      { eyebrow: 'Vertrauen', title: 'Transparenz und Herkunft', body: 'Quellen, KI-Einsatz, Research-Watch-Provenienz und die Trennung zwischen Didaktik und kanonischem Wissen sollen nachvollziehbar bleiben.' },
    ]}
    note="Der fiktionale institutionelle Rahmen und die reale öffentliche Lernplattform müssen klar unterscheidbar bleiben. Governance-Seiten können das Projektmodell beschreiben, ohne eine juristisch eingetragene Stiftung oder aktive bezahlte Mitgliedschaft vorzutäuschen, solange es diese nicht gibt."
  />;
}
