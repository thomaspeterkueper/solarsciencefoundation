import PlatformSectionLanding from '../../../components/PlatformSectionLanding';

export default function GermanParticipatePage() {
  return <PlatformSectionLanding
    eyebrow="Mitwirken"
    title="SSF soll mehr sein als ein Kurskatalog."
    intro="Die Plattform ist als Ort gedacht, an dem Lernende, Autorinnen und Autoren sowie Unterstützende in unterschiedlichen Rollen mitwirken können. Diese Seite macht diesen Teil des Projekts sichtbar, ohne unfertige Mitgliedschaftsprozesse bereits als aktiv darzustellen."
    entries={[
      { eyebrow: 'Community', title: 'Mitgliedschaft', body: 'Eine reguläre Mitgliedschaft soll Menschen verbinden, die lernen, diskutieren und die Stiftung langfristig mitgestalten möchten.' },
      { eyebrow: 'Unterstützen', title: 'Fördermitgliedschaft', body: 'Eine eigene Förderrolle ist für Menschen vorgesehen, die offenes wissenschaftliches Lernen finanziell oder organisatorisch stärken möchten, ohne selbst Autorin oder Autor sein zu müssen.' },
      { eyebrow: 'Wissen beitragen', title: 'Autorin oder Autor werden', body: 'SSF ist ausdrücklich für mehrere Autorinnen und Autoren gedacht. Beiträge sollen didaktische Module vorschlagen können, während kanonisches Fachwissen weiterhin im Knowledge Graph verankert bleibt.' },
    ]}
    note="Anträge, Zahlungen und Autoren-Onboarding sind noch nicht aktiv. Vor Formularen sollten Rollen, Rechte, Review-Prozess und die Grenze zwischen redaktionellem SSF-Inhalt und kanonischem KG-Wissen sauber definiert werden."
  />;
}
