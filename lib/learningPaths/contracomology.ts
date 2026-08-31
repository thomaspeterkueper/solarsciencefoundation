import type { LearningPath, LearningPathSection } from '../learningPaths';

function conceptUnit(
  slug: string,
  title: string,
  entryQuestion: string,
  takeaway: string,
  observation: string,
  explanation: string,
  quiz: string,
  unlocksUnitId?: string,
  extra: LearningPathSection[] = [],
) {
  return {
    id: `UNIT:${slug}`,
    title,
    entryQuestion,
    takeaway,
    gate: unlocksUnitId ? { type: 'quiz_all_correct' as const, unlocksUnitId } : undefined,
    sections: [
      {
        id: `OBS:${slug}`,
        kind: 'observation' as const,
        title: 'Ausgangsbeobachtung',
        summary: observation,
        depthPoints: 4,
      },
      {
        id: `EXPL:${slug}`,
        kind: 'explanation' as const,
        title: 'Begriff und Einordnung',
        summary: explanation,
        depthPoints: 8,
      },
      ...extra,
      {
        id: `QUIZ:${slug}`,
        kind: 'quiz' as const,
        title: 'Kurztest',
        summary: quiz,
        depthPoints: 8,
      },
    ],
  };
}

export const contracomologyLearningPath: LearningPath = {
  id: 'PATH:SSF:KON-EINFUEHRUNG-0001',
  title: 'Was ändert sich, wenn dieselbe Sache anders beschrieben wird?',
  subtitle: 'Ein Orientierungskurs zu Zeitform, AVI-Punkt, OEM sowie Objekt-, Beziehungs- und Transformationsperspektive.',
  status: 'prototype',
  sourceModuleId: 'KON-L1-000001',
  kxfModuleId: 'LRN:SSF:KON-L1-000001',
  domainsNeeded: ['KD:KON:N1'],
  suppliedBy: {
    knowledgeGraph: [
      'KD:KON:N1 und die dafür freigegebenen kanonischen Concept-Identitäten',
      'Epistemische Einordnung als Werk-Theorie [W], nicht als empirisch bestätigte Naturwissenschaft',
    ],
    kueperCom: [],
    overtimeArchive: [],
    ssf: [
      'Didaktische Einführung und Alltagstransfer',
      'Kompetenztests im kanonischen SSF-Format: Anwendung → Verständnis → Transfer',
    ],
  },
  unlocks: [],
  units: [
    conceptUnit(
      'KON-ZEITFORM',
      'Zeitform — zeitliche Abläufe ordnen',
      'Warum kann dieselbe gemessene Zeitspanne in zwei Situationen völlig unterschiedlich gegliedert und erlebt werden?',
      'Zeitform ist hier ein Denk- und Ordnungsrahmen für zeitliche Abläufe, keine neue physikalische Zeitvariable.',
      'Eine Warteminute und eine Minute in einem intensiven Gespräch dauern auf der Uhr gleich lang, werden aber unterschiedlich gegliedert, gewichtet und erlebt.',
      'Im Contracomology-Rahmen bezeichnet Zeitform die Ordnung und Gewichtung zeitlicher Abläufe. Der Begriff gehört zur Werk-Theorie [W]. Er ersetzt keine physikalische Zeitmessung und behauptet keine neue experimentell bestätigte Zeitgröße.',
      'Zwei gleich lange Abläufe werden unterschiedlich erlebt. Welche Aussage passt zum Begriff Zeitform?||Die Uhr muss in einer Situation falsch gehen||Zeitform beschreibt, wie zeitliche Abläufe gegliedert und gewichtet werden*||Zeitform ersetzt die SI-Sekunde||Zeitform beweist eine neue Naturkraft---Was ist Zeitform in diesem Kurs ausdrücklich nicht?||Ein Denkrahmen||Eine neue physikalische Zeitvariable*||Eine Perspektive auf zeitliche Abläufe||Ein Begriff der Werk-Theorie---Eine Person vergleicht Wartezeit, Arbeitsroutine und ein spannendes Gespräch. Wozu kann die Zeitform-Perspektive dienen?||Die drei Uhrzeiten ohne Messgerät exakt bestimmen||Unterschiede in Gliederung und Gewichtung der Abläufe beschreiben*||Die Lichtgeschwindigkeit neu definieren||Aus subjektivem Erleben eine Naturkonstante berechnen',
      'UNIT:KON-AVI-PUNKT',
    ),
    conceptUnit(
      'KON-AVI-PUNKT',
      'AVI-Punkt — den Bezugspunkt explizit machen',
      'Was verändert sich an einer Beschreibung, wenn der Standpunkt des Beobachters wechselt?',
      'Der AVI-Punkt macht den Bezugspunkt einer Beschreibung explizit und führt dort Beobachtung, Interpretation und Orientierung zusammen.',
      'Eine Straßenkreuzung sieht aus Sicht einer Fußgängerin anders aus als aus dem Auto oder auf einem Lageplan. Die Situation bleibt dieselbe, aber Sichtbarkeit und Relevanz ändern sich mit dem Bezugspunkt.',
      'Der AVI-Punkt bezeichnet im freigegebenen Contracomology-Kontext einen expliziten Bezugspunkt, an dem Beobachtung, Interpretation und Orientierung zusammengeführt werden. Der Kurs behandelt ihn als Werk-Theorie-Begriff, nicht als eigenständigen empirischen Befund.',
      'Drei Personen beschreiben dieselbe Kreuzung verschieden. Was wäre der erste Schritt mit dem AVI-Punkt?||Einen Standpunkt als einzig richtigen erklären||Den jeweiligen Bezugspunkt explizit machen*||Alle Unterschiede als Messfehler verwerfen||Eine neue physikalische Koordinate erfinden---Was wird am AVI-Punkt zusammengeführt?||Masse, Ladung und Temperatur||Beobachtung, Interpretation und Orientierung*||Vergangenheit, Gegenwart und Zukunft als Messwerte||Nur subjektive Gefühle---Zwei Analysen widersprechen sich scheinbar. Wie hilft die AVI-Punkt-Perspektive zuerst?||Prüfen, ob sie von unterschiedlichen Bezugspunkten ausgehen*||Beide Aussagen automatisch verwerfen||Den Bezugspunkt absichtlich verschweigen||Eine der Analysen ohne Prüfung zur Naturgesetz-Aussage erklären',
      'UNIT:KON-OEM',
    ),
    conceptUnit(
      'KON-OEM',
      'OEM — Transformation als Prozess beschreiben',
      'Was fehlt, wenn nur Anfangs- und Endzustand beschrieben werden?',
      'Das Omnizedente Entfaltungsmodul beschreibt einen Transformationsprozess von einer offenen Ausgangslage über einen Übergang zu veränderter Offenheit.',
      'Ein Hefeteig vor und nach der Gärung lässt sich als zwei Zustände beschreiben. Damit ist aber noch nicht beschrieben, welche Transformation zwischen beiden stattgefunden hat.',
      'Das Omnizedente Entfaltungsmodul (OEM) dient in der Werk-Theorie als strukturelle Beschreibung eines vollständigen Transformationsprozesses. Zentral ist der Übergang; ein OEM ist daher kein bloßer statischer Zustand.',
      'Du vergleichst einen Ausgangszustand mit einem veränderten Endzustand. Was verlangt die OEM-Perspektive zusätzlich?||Den Übergang als Teil des Prozesses beschreiben*||Nur den Endzustand benennen||Alle Zustände als identisch behandeln||Eine physikalische Kraft namens OEM annehmen---Was ist ein OEM im Kurs?||Ein statischer Zustand||Ein vollständiger Transformationsprozess*||Eine Maßeinheit für Energie||Ein empirisch bestätigtes Elementarteilchen---Eine Produktionsanlage liefert unerwartet ein anderes Ergebnis. Welche Beschreibung ist im OEM-Sinn informativer?||Nur Vorher- und Nachher-Fotos||Ausgangslage, Übergang und veränderte Offenheit gemeinsam untersuchen*||Nur das Endprodukt benennen||Den Prozess grundsätzlich ignorieren',
      'UNIT:KON-PARADIGMEN',
    ),
    conceptUnit(
      'KON-PARADIGMEN',
      'Drei Perspektiven — Objekt, Beziehung, Transformation',
      'Was wird sichtbar, wenn dieselbe Situation nacheinander als Objekt, Beziehungsgeflecht und Prozess beschrieben wird?',
      'Die drei Perspektiven setzen unterschiedliche primäre Beschreibungseinheiten, ohne dass eine davon automatisch die einzig richtige sein muss.',
      'Ein Fahrrad kann über Bauteile und Eigenschaften, über Kopplungen zwischen Fahrerin, Pedalen, Kette und Straße oder über Vorgänge wie Anfahren, Beschleunigen und Bremsen beschrieben werden.',
      'Die Objektperspektive priorisiert abgegrenzte Objekte, Eigenschaften und Zustände. Die Beziehungsperspektive priorisiert Beziehungen, Kopplungen und Abhängigkeiten. Die Transformationsperspektive priorisiert Übergänge, Prozesse und Veränderungsregeln.',
      'Eine Maschine fällt aus, weil zwei intakte Baugruppen nicht mehr korrekt gekoppelt sind. Welche Perspektive ist zunächst besonders hilfreich?||Nur die Objektperspektive||Die Beziehungsperspektive*||Nur eine Farbbeschreibung||Keine der drei Perspektiven---Was steht in der Transformationsperspektive im Vordergrund?||Abgegrenzte Objekte allein||Übergänge, Prozesse und Veränderungsregeln*||Nur räumliche Positionen||Ausschließlich subjektives Zeitempfinden---Du analysierst ein Fahrrad vollständig. Welche Vorgehensweise nutzt die drei Perspektiven sinnvoll?||Bauteile, Kopplungen und Zustandsübergänge getrennt betrachten und anschließend zusammenführen*||Nur die Farbe des Rahmens erfassen||Beziehungen grundsätzlich als Objekte umbenennen||Nur einen Endzustand dokumentieren',
      undefined,
      [
        {
          id: 'EXERCISE:KON-PARADIGMEN-TRANSFER',
          kind: 'exercise',
          title: 'Drei Beschreibungen derselben Sache',
          summary: 'Wähle eine Alltagssituation oder ein technisches System. Beschreibe zuerst Objekte und Zustände, danach Beziehungen und Abhängigkeiten und zuletzt Übergänge oder Veränderungsregeln. Vergleiche, welche Information jeweils neu sichtbar wird.',
          depthPoints: 10,
        },
      ],
    ),
  ],
};
