import PlatformSectionLanding from '../../../components/PlatformSectionLanding';

export default function GermanLearningHubPage() {
  return <PlatformSectionLanding
    eyebrow="Lernen"
    title="Ein Ort für alle Lernwege."
    intro="Wissenskarte, Fächer und Lernpfade sind drei Ansichten desselben Lernsystems. Sie gehören deshalb zusammen und nicht als fast gleichwertige Punkte nebeneinander in die Hauptnavigation."
    entries={[
      { eyebrow: 'Geführt', title: 'Lernpfade', body: 'Folge strukturierten Lernreisen von einer Alltagsfrage über Experimente und Erklärungen bis zur Wissensprüfung.', href: '/de/learning-paths', cta: 'Lernpfade öffnen →' },
      { eyebrow: 'Nach Fach', title: 'Fächer', body: 'Steige direkt über Physik, Chemie, Mathematik, Astronomie und weitere Wissensgebiete ein.', href: '/de/subjects', cta: 'Fächer ansehen →' },
      { eyebrow: 'Vernetzt', title: 'Wissenskarte', body: 'Erkunde Zusammenhänge zwischen Modulen und Ideen, wenn du keinem festen Weg folgen möchtest.', href: '/de/learn', cta: 'Wissenskarte erkunden →' },
    ]}
    note="SSF bleibt als eigenständige Lernplattform nutzbar. NOχ¹Δ kann Lernfortschritt und Freischaltungen konsumieren, die Lernstruktur selbst hängt aber nicht vom Spiel ab."
  />;
}
