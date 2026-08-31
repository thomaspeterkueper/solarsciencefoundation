/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      lib/learningPaths/contracomology.ts
 * Repo:      github.com/thomaspeterkueper/solarsciencefoundation/blob/main/lib/learningPaths/contracomology.ts
 * Name:      Contracomology introductory course (Academy catalogue entry)
 * Version:   0.1.0
 * Created:   2026-08-31
 * Modified:  2026-08-31 12:00 CEST
 * Depends:   lib/learningPaths (LearningPath type), lib/learningPathRegistry
 *
 * Catalogue entry for the Contracomology introductory course.
 * Source of truth:
 *   - Knowledge Graph canon KG-0017-CONTRACOMOLOGY-CANON (KD:KON:N1)
 *   - KG export contracomology-0.1.json
 * SSF owns didactics and catalogue presentation only; all concept
 * definitions below restate the KG-canonical definitions verbatim.
 * The reserved anchors CON:L1:ma-u / CON:L1:ma-ta-u are intentionally
 * not used (definitionStatus=pending_definition).
 */

import type { LearningPath, LearningPathSection } from '../learningPaths';

function sections(
  slug: string,
  topic: string,
  observationTitle: string,
  observationSummary: string,
  explanationTitle: string,
  explanationSummary: string,
  quizTitle: string,
  quizSummary: string,
  extra?: LearningPathSection[],
): LearningPathSection[] {
  return [
    {
      id: `OBS:${slug}-${topic}`,
      kind: 'observation',
      title: observationTitle,
      summary: observationSummary,
      depthPoints: 4,
    },
    {
      id: `EXPL:${slug}-${topic}`,
      kind: 'explanation',
      title: explanationTitle,
      summary: explanationSummary,
      depthPoints: 8,
    },
    ...(extra ?? []),
    {
      id: `QUIZ:${slug}-${topic}`,
      kind: 'quiz',
      title: quizTitle,
      summary: quizSummary,
      depthPoints: 12,
    },
  ];
}

export const contracomologyLearningPath: LearningPath = {
  id: 'PATH:SSF:KON-EINFUEHRUNG-0001',
  title: 'Was ändert sich, wenn du dieselbe Sache als Objekt, als Beziehung und als Prozess beschreibst?',
  subtitle:
    'Der Contracomology-Einführungskurs: Zeitform, AVI-Punkt und Omnizedentes Entfaltungsmodul — eine kuratierte Werk-Theorie [W] des KUEPER-Ökosystems, ohne Anspruch auf externe wissenschaftliche Validierung. Fachportal: contracomology.org.',
  status: 'prototype',
  sourceModuleId: 'KON-L1-000001',
  kxfModuleId: 'LRN:SSF:KON-L1-000001',
  domainsNeeded: ['KD:KON:N1'],
  suppliedBy: {
    knowledgeGraph: [
      'KD:KON:N1 — kanonische Knowledge Domain „Kontrakomologie – Orientierung“',
      'Kanonische Concept-Definitionen: CON:L1:zeitform, CON:L1:avi-punkt, CON:L1:oem, CON:L1:paradigma-1/2/3',
      'Epistemischer Status [W] — Werk-Theorie, keine externe Validierung, kein Peer-Review, kein empirischer Befund',
    ],
    kueperCom: [],
    overtimeArchive: [],
    ssf: [
      'Didaktische Reihenfolge: Beobachtung → Begriffsklärung → Verständnisprüfung je Konzept',
      'Transferübung: Alltagssituation aus Objekt-, Beziehungs- und Transformationsperspektive beschreiben',
      'Epistemische Einordnung des Werk-Theorie-Status [W] im ersten Kapitel',
      'Portal-Verweis auf contracomology.org (verifiziert erreichbar)',
    ],
  },
  unlocks: [],
  portalUrl: 'https://contracomology.org/',
  units: [
    {
      id: 'UNIT:KON-ZEITFORM',
      title: 'Zeitform — wie zeitliche Abläufe gegliedert und erlebt werden',
      entryQuestion: 'Warum erlebt man dieselbe Zeitspanne manchmal wie im Flug — und manchmal endlos lang?',
      takeaway:
        'Zeitform ist kein neues physikalisches Zeitmaß — sie ist ein Denk- und Ordnungsrahmen, in dem zeitliche Abläufe gegliedert, gewichtet und erlebt werden.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:KON-AVI-PUNKT' },
      sections: sections(
        'KON-ZEITFORM',
        '1',
        'Die Warteminute und die Flugstunde',
        'Zwei Minuten vor dem Bus, wenn er Verspätung hat, dehnen sich endlos. Zwei Stunden in einem guten Gespräch vergehen wie nichts. Dieselbe Uhr, dieselbe Zeitspanne — und doch völlig verschieden erlebt. Offenbar ist Zeit nicht nur das, was die Uhr misst, sondern auch das, wie wir Abläufe gliedern und gewichten.',
        'Zeitform: ein Denk- und Ordnungsrahmen',
        'Die Contracomology führt dafür den Begriff Zeitform ein: ein Denk- und Ordnungsrahmen, in dem zeitliche Abläufe gegliedert, gewichtet und erlebt werden. Sie ist ausdrücklich keine neue physikalische Zeitvariable, sondern eine theoretische Perspektive darauf, wie zeitliche Verhältnisse strukturiert und gedeutet werden. Einordnung: Die Contracomology ist eine Werk-Theorie [W] des KUEPER-Ökosystems — eine kuratierte, spekulative Theorie. Der Marker [W] steht für: keine Behauptung externer wissenschaftlicher Validierung, kein Peer-Review, kein empirischer Befund.',
        'Quiz: Zeitform',
        'Ist die Zeitform eine neue physikalische Zeitvariable? Nein — sie ist ein Denk- und Ordnungsrahmen. Was wird in der Zeitform gegliedert, gewichtet und erlebt? Zeitliche Abläufe. Was bedeutet der Marker [W]? Werk-Theorie — kuratiert, ohne externe wissenschaftliche Validierung.',
      ),
    },
    {
      id: 'UNIT:KON-AVI-PUNKT',
      title: 'Der AVI-Punkt — Beobachtung, Interpretation und Orientierung an einem Bezugspunkt',
      entryQuestion: 'Woher weißt du, von welchem Standpunkt aus du eine Situation gerade beschreibst?',
      takeaway:
        'Der AVI-Punkt ist ein expliziter Bezugspunkt, an dem Beobachtung, Interpretation und Orientierung zusammengeführt werden — eine Perspektive der Kursarbeit, keine eigenständige physikalische Aussage.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:KON-OEM' },
      sections: sections(
        'KON-AVI-PUNKT',
        '2',
        'Dieselbe Kreuzung — drei Beschreibungen',
        'Beschreibe eine belebte Kreuzung einmal aus der Sicht der Fußgängerin, einmal aus der Sicht des Autofahrers und einmal von oben, als Plan. Drei Beschreibungen derselben Situation — und doch sind andere Dinge sichtbar, wichtig und eindeutig. Der Standpunkt, von dem aus beobachtet wird, entscheidet mit, was überhaupt beobachtet werden kann.',
        'AVI-Punkt: ein expliziter Bezugspunkt',
        'Die Contracomology bündelt das im AVI-Punkt: ein expliziter Bezugspunkt, an dem Beobachtung, Interpretation und Orientierung zusammengeführt werden. Der AVI-Punkt ist keine eigenständige physikalische Aussage des AVI-Modells, sondern eine Referenzposition der Perspektive im Kurs. Er macht sichtbar, von wo aus eine Beschreibung erfolgt — statt den Standpunkt stillschweigend vorauszusetzen.',
        'Quiz: AVI-Punkt',
        'Was wird am AVI-Punkt zusammengeführt? Beobachtung, Interpretation und Orientierung. Ist der AVI-Punkt eine physikalische Aussage des AVI-Modells? Nein — ein expliziter Bezugspunkt der Perspektive. Warum ist ein expliziter Bezugspunkt hilfreich? Damit klar ist, von welchem Standpunkt aus eine Situation beschrieben wird.',
      ),
    },
    {
      id: 'UNIT:KON-OEM',
      title: 'Das Omnizedente Entfaltungsmodul — Transformation als Prozess',
      entryQuestion: 'Was unterscheidet einen Vorgang, der etwas verändert, von einem Zustand, der einfach besteht?',
      takeaway:
        'Das Omnizedente Entfaltungsmodul beschreibt einen vollständigen Transformationsprozess — von einer offenen Ausgangslage über einen Übergang zu einer veränderten Offenheit. Ein OEM ist ein Prozess, kein Zustand.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:KON-PARADIGMEN' },
      sections: sections(
        'KON-OEM',
        '3',
        'Vom Hefeteig zum Brot',
        'Ein Hefeteig, der über Nacht ruht, ist am Morgen nicht mehr derselbe: aufgegangen, gereift, verändert. Die Zutatenliste beschreibt den Zustand vorher und nachher — aber nicht das, was dazwischen geschieht. Wer nur Anfangs- und Endzustand vergleicht, übersieht den Vorgang selbst: die Gärung als Übergang.',
        'OEM: ein vollständiger Transformationsprozess',
        'Das Omnizedente Entfaltungsmodul (OEM) ist die strukturelle Einheit der Werk-Theorie, die einen vollständigen Transformationsprozess beschreibt: von einer offenen Ausgangslage über einen Übergang zu einer veränderten Offenheit. OEM bezeichnet einen Prozess, keinen statischen Zustand — die Offenheit am Anfang und die veränderte Offenheit am Ende gehören zum selben Prozess dazu.',
        'Quiz: Omnizedentes Entfaltungsmodul',
        'Ist ein OEM ein Zustand? Nein — es bezeichnet einen Prozess. Welche Schritte umfasst der OEM-Prozess? Offene Ausgangslage → Übergang → veränderte Offenheit. Woran erkennt man, dass der Prozess vollständig beschrieben ist? Daran, dass Ausgangslage, Übergang und veränderte Offenheit zusammen benannt sind.',
      ),
    },
    {
      id: 'UNIT:KON-PARADIGMEN',
      title: 'Drei Perspektiven — Objekt, Beziehung, Transformation',
      entryQuestion: 'Was ändert sich, wenn du dieselbe Sache einmal als Objekt, einmal als Beziehung und einmal als Prozess beschreibst?',
      takeaway:
        'Objekt-, Beziehungs- und Transformationsperspektive sind drei Beschreibungsweisen derselben Welt: In der ersten sind Objekte, Eigenschaften und Zustände primär, in der zweiten Beziehungen und Kopplungen, in der dritten Übergänge, Prozesse und Veränderungsregeln.',
      sections: sections(
        'KON-PARADIGMEN',
        '4',
        'Das Fahrrad: Objekt, Beziehung oder Prozess?',
        'Ein Fahrrad ist ein Objekt: Rahmen, Räder, Eigenschaften wie Gewicht und Farbe. Dasselbe Fahrrad ist aber auch ein Beziehungsgeflecht: Fahrerin, Pedale, Kette, Straße — alles gekoppelt. Und es ist ein Prozess: Fahren heißt, dauernd zwischen Zuständen überzugehen — Anfahren, Beschleunigen, Ausrollen. Drei Beschreibungen, eine Sache.',
        'Drei Paradigmen: drei primäre Beschreibungseinheiten',
        'Die Contracomology unterscheidet drei Perspektiven: die Objektperspektive (Paradigma 1), in der abgegrenzte Objekte, Eigenschaften und Zustände die primären Beschreibungseinheiten bilden; die Beziehungsperspektive (Paradigma 2), in der Beziehungen, Kopplungen und wechselseitige Abhängigkeiten primär sind; und die Transformationsperspektive (Paradigma 3), in der Übergänge, Prozesse und Veränderungsregeln zwischen Zuständen bzw. Relationen primär sind. Keine Perspektive ist „richtiger“ — sie legen nur fest, welche Einheiten zuerst beschrieben werden.',
        'Quiz: Drei Perspektiven',
        'Welche Einheiten sind in der Objektperspektive primär? Abgegrenzte Objekte, Eigenschaften und Zustände. Welche in der Beziehungsperspektive? Beziehungen, Kopplungen und wechselseitige Abhängigkeiten. Welche in der Transformationsperspektive? Übergänge, Prozesse und Veränderungsregeln zwischen Zuständen bzw. Relationen.',
        [
          {
            id: 'EXERCISE:KON-PARADIGMEN-TRANSFER',
            kind: 'exercise',
            title: 'Transfer: Drei Perspektiven auf deinen Alltag',
            summary:
              'Nimm einen Gegenstand oder eine Situation aus deinem Alltag — zum Beispiel deinen Schulweg, ein Spiel oder eine Maschine. Beschreibe ihn bzw. sie zuerst als Objekt (Eigenschaften, Zustände), dann als Beziehung (Kopplungen, Abhängigkeiten) und zuletzt als Prozess (Übergänge, Veränderungsregeln). Notiere, welche Beschreibung dir am leichtesten fällt und wo du etwas Neues gesehen hast.',
            depthPoints: 8,
          },
        ],
      ),
    },
  ],
};
