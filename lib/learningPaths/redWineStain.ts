import type { LearningPath } from '../learningPaths';

/**
 * Corrected runtime path for PATH:SSF:CHE-REINIGUNG-ROTWEIN-0001.
 *
 * Scientific boundary follows KG request EXT-KG-SSF-20260831-red-wine-stain-mechanism:
 * red wine on cotton is treated as an anthocyanin/polyphenol system on cellulose,
 * not as a protein-denaturation stain. No universal hot/cold washing law is asserted.
 */
export const redWineStainLearningPath: LearningPath = {
  id: 'PATH:SSF:CHE-REINIGUNG-ROTWEIN-0001',
  title: 'Warum ist ein Rotweinfleck chemisch komplizierter als er aussieht?',
  subtitle: 'Anthocyane, Polyphenole und Cellulose: erst den Fleck verstehen, dann über Behandlung sprechen.',
  status: 'prototype',
  sourceModuleId: 'SSF-CHE-2005',
  kxfModuleId: 'LRN:SSF:CHE-2005',
  // KG has not supplied canonical replacement KD IDs in the request. Do not invent them here.
  domainsNeeded: [],
  suppliedBy: {
    knowledgeGraph: [
      'RES-20260831-A397C7AD R1: Rotwein als Anthocyanin-/Polyphenol-System',
      'Baumwolle als Cellulosefaser',
      'Keine universelle Heiß-/Kalt-Waschregel aus der geprüften Primärliteratur',
    ],
    kueperCom: [],
    overtimeArchive: [],
    ssf: [
      'Didaktische Trennung von chemischem Mechanismus und konditionaler Pflegeempfehlung',
      'Kontrastfall Proteindenaturierung bei echten Proteinflecken',
    ],
  },
  unlocks: [],
  units: [
    {
      id: 'UNIT:ROTWEIN-CHEMIE',
      title: 'Was steckt eigentlich im Fleck?',
      entryQuestion: 'Ein roter Fleck auf einem weißen Baumwollhemd: Ist das wirklich ein Proteinproblem?',
      takeaway: 'Rotwein auf Baumwolle ist im Kern ein Polyphenol-/Anthocyanin-System auf einer Cellulosefaser — kein Protein-Denaturierungsmodell.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:ROTWEIN-EVIDENZ' },
      sections: [
        {
          id: 'OBS:ROTWEIN-CHEMIE',
          kind: 'observation',
          title: 'Beobachtung: gleiche Farbe, anderer Mechanismus',
          summary: 'Rotwein, Blut und Fruchtsaft können ähnlich auffällige Flecken erzeugen. Aus dem Aussehen allein folgt aber nicht, dass dieselbe Chemie dahintersteckt.',
          depthPoints: 4,
        },
        {
          id: 'EXPL:ROTWEIN-POLYPHENOLE',
          kind: 'explanation',
          title: 'Rotwein: Anthocyane und weitere Polyphenole',
          summary: 'Die sichtbare Rotweinfarbe wird wesentlich von Anthocyanen und weiteren Polyphenolen geprägt. Für Rotwein auf Baumwolle ist eine angebliche Proteinvernetzung deshalb nicht der tragende Fleckenmechanismus.',
          depthPoints: 7,
        },
        {
          id: 'EXPL:ROTWEIN-CELLULOSE',
          kind: 'explanation',
          title: 'Baumwolle ist Cellulose',
          summary: 'Baumwollfasern bestehen überwiegend aus Cellulose. Die frühere SSF-Erklärung, Rotweinproteine würden bei bestimmten Temperaturen mit einer Protein-Textilfaser vernetzen, passt zu diesem Substrat nicht.',
          depthPoints: 7,
        },
        {
          id: 'EXP:DENATURIERUNG',
          kind: 'experiment',
          title: 'Erkundung: Welcher Mechanismus gehört zu welchem Fleck?',
          summary: 'Vergleiche Rotwein auf Baumwolle mit echten Proteinflecken. Die Erkundung trennt Polyphenol-/Cellulosechemie von Proteindenaturierung und markiert die Grenzen der verfügbaren Evidenz.',
          interactive: true,
          depthPoints: 8,
        },
        {
          id: 'QUIZ:ROTWEIN-CHEMIE',
          kind: 'quiz',
          title: 'Kurztest',
          summary: 'Anwendung → Verständnis → Transfer: Fleckenmechanismus aus Stoff und Substrat ableiten, statt ihn aus Farbe oder Küchenregel zu erraten.',
          depthPoints: 10,
        },
      ],
    },
    {
      id: 'UNIT:ROTWEIN-EVIDENZ',
      title: 'Was darf man aus einem Experiment wirklich schließen?',
      entryQuestion: 'Wenn ein Modellversuch zeigt, dass Tanninsäure an Baumwolle adsorbiert: Haben wir damit schon die beste Waschtemperatur bewiesen?',
      takeaway: 'Ein Mechanismusbefund ist noch keine universelle Pflegeanweisung. Behandlung hängt vom konkreten Textil, Fleckenalter und Waschsystem ab.',
      sections: [
        {
          id: 'OBS:ROTWEIN-REGELN',
          kind: 'observation',
          title: 'Zwei einfache Regeln widersprechen sich',
          summary: 'Im Alltag kursieren sowohl „Rotwein niemals heiß behandeln“ als auch gegenteilige Tipps. Der Widerspruch zeigt, warum eine Haushaltsregel nicht mit einem chemischen Naturgesetz verwechselt werden darf.',
          depthPoints: 4,
        },
        {
          id: 'EXPL:ROTWEIN-EVIDENZGRENZE',
          kind: 'explanation',
          title: 'Was die geprüfte Evidenz trägt',
          summary: 'Ein publiziertes Modellsystem zeigt Adsorption von Tanninsäure an hydrophiler Baumwolle; dort nahm die Adsorption mit steigender Temperatur ab. Das widerlegt die simple Behauptung „Hitze verstärkt automatisch die Bindung“, liefert aber keine universelle Heiß-/Kalt-Waschregel.',
          depthPoints: 8,
        },
        {
          id: 'EXP:FLECK-BEHANDLUNG',
          kind: 'experiment',
          title: 'Erkundung: Evidenz und Pflegehinweis auseinanderhalten',
          summary: 'Unterscheide chemischen Kern, bekannte Einflussgrößen und konditionale Praxisempfehlungen. Es werden bewusst keine erfundenen 40/80-°C-Schwellen oder Prozentwerte für Behandlungserfolg angezeigt.',
          interactive: true,
          depthPoints: 8,
        },
        {
          id: 'EXPL:ROTWEIN-PRAXIS',
          kind: 'explanation',
          title: 'Pflege bleibt konditional',
          summary: 'Faserart, Textilausrüstung und Färbung, Fleckenalter, Waschchemie, Wassergehalt und thermische Vorgeschichte können das Ergebnis verändern. Konkrete Pflegehinweise müssen deshalb zum Textil passen und sind keine allgemeingültigen Naturgesetze.',
          depthPoints: 7,
        },
        {
          id: 'QUIZ:ROTWEIN-EVIDENZ',
          kind: 'quiz',
          title: 'Kurztest',
          summary: 'Anwendung → Verständnis → Transfer: von einem Einzelbefund nur das ableiten, was er tatsächlich trägt.',
          depthPoints: 10,
        },
      ],
    },
  ],
};
