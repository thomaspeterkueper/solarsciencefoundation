import type { LearningPath } from '../learningPaths';

/**
 * SSF foundation path for NOXIA's canonical water-processing unlock.
 * NOXIA owns unlock semantics; the Knowledge Graph owns the canonical learning-module identity;
 * SSF owns the didactic implementation.
 */
export const noxiaWaterProcessingLearningPath: LearningPath = {
  id: 'PATH:SSF:NOX-WATER-PROCESSING-0001',
  title: 'Wie wird aus Rohwasser nutzbares Wasser?',
  subtitle: 'Erkennen, was im Wasser steckt, die passende Trennmethode wählen und eine Aufbereitungskette zusammenstellen.',
  status: 'prototype',
  sourceModuleId: 'SSF-NOX-WATER-0001',
  kxfModuleId: 'LRN:SSF:NOX-WATER-PROCESSING',
  domainsNeeded: ['KD:CHEMISTRY', 'KD:PHYSICS', 'KD:ENVIRONMENT'],
  suppliedBy: {
    knowledgeGraph: [
      'Grundlagen zu Stoffgemischen, Teilchengrößen, Lösungen und Membrantransport',
      'Fachliche Voraussetzungen und Begriffsrelationen',
      'Kanonische Lernmodul-Identität LRN:SSF:NOX-WATER-PROCESSING (KG commit 81aad150ac7b2180b00e73daa90b57a523d9490e)',
    ],
    kueperCom: [],
    overtimeArchive: [],
    ssf: [
      'Problemorientierte Lernsequenz und NOXIA-Transfer',
      'Praktischer Trial-and-Error-Pfad zur Auswahl einer Aufbereitungskette',
      'Verständnisprüfung nach Beobachtung, Erklärung und Anwendung',
    ],
  },
  unlocks: ['UNL:NOX:water-processing'],
  units: [
    {
      id: 'UNIT:NOX-WATER-1',
      title: 'Was bedeutet eigentlich sauberes Wasser?',
      entryQuestion: 'Das Wasser sieht klar aus. Würdest du es deshalb trinken?',
      takeaway: 'Klares Wasser kann gelöste Stoffe und Mikroorganismen enthalten — Aussehen allein bestimmt die Wasserqualität nicht.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:NOX-WATER-2' },
      sections: [
        {
          id: 'OBS:NOX-WATER-ROHWASSER',
          kind: 'observation',
          title: 'Drei Gläser, drei Probleme',
          summary: 'Ein Glas enthält sichtbaren Sand, eines klares Salzwasser und eines optisch klares, mikrobiell belastetes Wasser. Alle drei können ähnlich aussehen, benötigen aber unterschiedliche Behandlung.',
          depthPoints: 5,
        },
        {
          id: 'EXP:NOX-WATER-ANALYSE',
          kind: 'exercise',
          title: 'Erst untersuchen, dann behandeln',
          summary: 'Ordne mögliche Belastungen drei Gruppen zu: Schwebstoffe, gelöste Stoffe und Mikroorganismen. Entscheide anschließend, welche Informationen du vor der Wahl eines Verfahrens brauchst.',
          depthPoints: 8,
        },
        {
          id: 'EXPL:NOX-WATER-QUALITAET',
          kind: 'explanation',
          title: 'Wasserqualität ist kein einzelner Messwert',
          summary: 'Partikel können mechanisch zurückgehalten werden. Gelöste Ionen passieren gewöhnliche Filter. Mikroorganismen können unsichtbar sein. Deshalb beginnt Wasseraufbereitung mit der Frage, welche Stoffe oder Organismen entfernt werden müssen.',
          depthPoints: 8,
        },
        {
          id: 'QUIZ:NOX-WATER-1',
          kind: 'quiz',
          title: 'Kann man klares Wasser automatisch trinken?',
          summary: 'Ein klares Wasser aus unbekannter Quelle soll genutzt werden. Welche Entscheidung ist fachlich sinnvoll?||Es ohne weitere Prüfung trinken||Zuerst mögliche gelöste Stoffe und Mikroorganismen beurteilen — denn beide sind mit bloßem Auge nicht erkennbar*||Nur nach sichtbaren Partikeln suchen||Es ausschließlich durch ein grobes Sieb geben---Warum kann optisch klares Wasser trotzdem ungeeignet sein?||Weil nur gefärbtes Wasser gelöste Stoffe enthält||Weil gelöste Stoffe und Mikroorganismen unsichtbar sein können — Klarheit bedeutet nicht, dass keine Gefahr vorhanden ist*||Weil klares Wasser keine Mikroorganismen enthalten kann||Weil sich alle Gefahren durch Farbe, Geruch oder Geschmack bemerkbar machen---Ein zweites klares Wasser enthält viel gelöstes Salz. Was folgt aus dem bisher Gelernten?||Sein Aussehen reicht nicht zur Beurteilung der Nutzbarkeit — gelöste Ionen bleiben auch in klarem Wasser unsichtbar*||Ein normaler Partikelfilter entfernt das Salz sicher||Klares Salzwasser enthält keine gelösten Stoffe||Nur sichtbarer Sand bestimmt die Wasserqualität',
          depthPoints: 5,
        },
      ],
    },
    {
      id: 'UNIT:NOX-WATER-2',
      title: 'Trennen, adsorbieren, desinfizieren',
      entryQuestion: 'Warum gibt es nicht einfach einen Filter, der jedes Wasserproblem löst?',
      takeaway: 'Ein Aufbereitungsverfahren wirkt nur gegen bestimmte Arten von Belastung — deshalb werden Verfahren zu Prozessketten kombiniert.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:NOX-WATER-3' },
      sections: [
        {
          id: 'EXPL:NOX-WATER-MECHANISCH',
          kind: 'explanation',
          title: 'Sedimentation und Filtration',
          summary: 'Größere und dichtere Partikel können sich absetzen; Filter halten Teilchen oberhalb ihrer wirksamen Porengröße zurück. Gelöstes Salz verschwindet dadurch jedoch nicht.',
          depthPoints: 8,
        },
        {
          id: 'EXPL:NOX-WATER-ADSORPTION',
          kind: 'explanation',
          title: 'Adsorption: Stoffe an Oberflächen binden',
          summary: 'Materialien wie Aktivkohle besitzen eine große innere Oberfläche. Bestimmte gelöste organische Stoffe können daran gebunden werden. Adsorption ist keine universelle Entsalzung.',
          depthPoints: 8,
        },
        {
          id: 'EXPL:NOX-WATER-DESINFEKTION',
          kind: 'explanation',
          title: 'Desinfektion löst ein anderes Problem',
          summary: 'Desinfektion soll Mikroorganismen inaktivieren oder ihre Zahl ausreichend reduzieren. Sie entfernt nicht automatisch Salze, Sand oder alle chemischen Verunreinigungen.',
          depthPoints: 8,
        },
        {
          id: 'EXP:NOX-WATER-FILTER',
          kind: 'experiment',
          title: 'Was kann ein Filter wirklich?',
          summary: 'Probiere mechanische Trennung an einem Stoffgemisch aus und beobachte, welche Bestandteile zurückgehalten werden. Entscheidend ist anschließend die Frage: Was ist noch im Wasser, obwohl man es nicht mehr sieht?',
          interactive: true,
          depthPoints: 10,
        },
        {
          id: 'QUIZ:NOX-WATER-2',
          kind: 'quiz',
          title: 'Verfahren passend zum Problem',
          summary: 'Trübes Wasser enthält Partikel und Mikroorganismen. Welche Kombination adressiert beide Belastungsarten am direktesten?||Nur Sedimentation||Mechanische Filtration und anschließend Desinfektion — Filtration hält Partikel zurück, Desinfektion wirkt gegen Mikroorganismen*||Nur Aktivkohle||Nur ein grobes Sieb---Warum werden Filtration, Adsorption und Desinfektion unterschieden?||Weil jedes Verfahren gegen andere Belastungsarten wirkt — Partikel, gelöste Stoffe und Mikroorganismen brauchen unterschiedliche Wirkprinzipien*||Weil alle drei Verfahren ausschließlich Salze entfernen||Weil Desinfektion Sand mechanisch zurückhält||Weil Adsorption jedes Wasserproblem vollständig löst---Nach Filtration und Desinfektion wird zusätzlich eine problematische organische Spur festgestellt. Welches Prinzip ergänzt die Kette sinnvoll?||Sedimentation als universelle Entsalzung||Adsorption an einem geeigneten Material — organische Spuren binden an großen inneren Oberflächen wie Aktivkohle*||Ein größeres Partikelsieb als einzige Maßnahme||Keine weitere Behandlung, weil das Wasser klar ist',
          depthPoints: 5,
        },
      ],
    },
    {
      id: 'UNIT:NOX-WATER-3',
      title: 'Wenn Stoffe wirklich gelöst sind',
      entryQuestion: 'Meerwasser durch einen Kaffeefilter — wird daraus Süßwasser?',
      takeaway: 'Gelöste Salze erfordern andere Trennprinzipien als sichtbare Partikel, etwa Membranverfahren oder Phasenwechsel.',
      gate: { type: 'quiz_all_correct', unlocksUnitId: 'UNIT:NOX-WATER-4' },
      sections: [
        {
          id: 'EXPL:NOX-WATER-RO',
          kind: 'explanation',
          title: 'Membranen und Umkehrosmose',
          summary: 'Bei geeigneten Membranverfahren werden Wasser und gelöste Stoffe aufgrund unterschiedlicher Durchlässigkeit getrennt. Umkehrosmose benötigt Druck und damit Energie; außerdem entsteht ein konzentrierter Reststrom.',
          depthPoints: 10,
        },
        {
          id: 'EXP:NOX-WATER-DESTILLATION',
          kind: 'experiment',
          title: 'Verdampfen und wieder kondensieren',
          summary: 'Verfolge den Phasenwechsel von flüssigem Wasser zu Dampf und zurück. Nichtflüchtige gelöste Salze bleiben dabei weitgehend zurück. Beobachte zugleich, warum Destillation Energie benötigt.',
          interactive: true,
          depthPoints: 10,
        },
        {
          id: 'EXPL:NOX-WATER-RESTSTROM',
          kind: 'explanation',
          title: 'Aufbereitung lässt Stoffe nicht verschwinden',
          summary: 'Trennung erzeugt neben dem gewünschten Wasser auch Rückstände: Filterkuchen, konzentrierte Sole oder beladene Adsorber. Eine reale Anlage muss deshalb auch mit diesen Stoffströmen umgehen.',
          depthPoints: 8,
        },
        {
          id: 'QUIZ:NOX-WATER-3',
          kind: 'quiz',
          title: 'Warum reicht ein normaler Filter nicht gegen Salz?',
          summary: 'Salzhaltiges Wasser soll entsalzt werden. Welches Verfahren passt zum Problem?||Ein grobes Sieb||Sedimentation allein||Umkehrosmose mit geeigneter Membran — sie hält gelöste Ionen zurück, benötigt dafür aber Druck und Energie*||Nur mechanische Vorfiltration---Warum entfernt ein gewöhnlicher Partikelfilter gelöstes Salz nicht zuverlässig?||Gelöste Ionen sind nicht wie suspendierte Partikel mechanisch zurückzuhalten — sie sind molekular verteilt und passieren die Poren*||Weil gelöstes Salz beim Auflösen verschwindet und nicht mehr im Wasser ist||Partikelfilter erhöhen automatisch den Salzgehalt||Gelöste Stoffe existieren nur in trübem Wasser---Eine Marsbasis entsalzt Wasser mit Umkehrosmose. Welche zusätzliche Systemfrage muss sie berücksichtigen?||Wie der konzentrierte Reststrom behandelt wird — Umkehrosmose erzeugt neben Süßwasser eine konzentrierte Sole, mit der die Anlage umgehen muss*||Wie die Membran ohne zusätzliche Energie von selbst trennt||Wie Adsorption jede Sole vollständig beseitigt||Wie das Salz in der Membran zurückbleibt und kein Reststrom entsteht',
          depthPoints: 5,
        },
      ],
    },
    {
      id: 'UNIT:NOX-WATER-4',
      title: 'Baue deine Aufbereitungskette',
      entryQuestion: 'Du hast nur begrenzte Energie und Wasser ist zu wertvoll zum Wegwerfen. Welche Prozesskette wählst du?',
      takeaway: 'Die beste Wasseraufbereitung ist keine maximale Technikliste, sondern eine zum Rohwasser und zum Ziel passende Prozesskette.',
      sections: [
        {
          id: 'EXP:NOX-WATER-CHAIN',
          kind: 'exercise',
          title: 'Trial and Error: die richtige Reihenfolge',
          summary: 'Stelle für verschiedene Rohwässer eine Behandlungskette zusammen. Teste Varianten und prüfe nach jedem Schritt: Welche Belastung wurde entfernt, welche bleibt, wie viel Energie wird benötigt und welcher Reststoff entsteht?',
          interactive: true,
          depthPoints: 15,
        },
        {
          id: 'EXPL:NOX-WATER-RECYCLING',
          kind: 'explanation',
          title: 'Auf dem Mars wird Abwasser wieder Rohwasser',
          summary: 'In geschlossenen oder ressourcenarmen Systemen ist gebrauchtes Wasser eine Rohwasserquelle. Je höher die Rückgewinnung, desto weniger neues Wasser muss bereitgestellt werden — zugleich steigen Anforderungen an Überwachung, Energie und Prozesssicherheit.',
          depthPoints: 10,
        },
        {
          id: 'EXAMPLE:NOX-WATER-MARS',
          kind: 'example',
          title: 'NOXIA: Von der Quelle zum Kreislauf',
          summary: 'Eine Basis kann Eis, salzhaltiges Wasser oder Recyclingwasser nutzen. Die sinnvolle Anlage hängt von der jeweiligen Belastung ab. Mit diesem Verständnis kann NOXIA die basale Wasseraufbereitung freischalten.',
          depthPoints: 8,
        },
        {
          id: 'QUIZ:NOX-WATER-FINAL',
          kind: 'quiz',
          title: 'Kannst du eine Prozesskette begründen?',
          summary: 'Ein Rohwasser enthält Partikel, gelöste Salze und mögliche Mikroorganismen. Welche Kette ist als Lernmodell am plausibelsten?||Nur Desinfektion||Mechanische Vorbehandlung, Entsalzung und geeignete Desinfektionsbarriere — jede Belastungsart braucht ein eigenes Wirkprinzip in der Kette*||Nur Aktivkohle||Nur Sedimentation---Was ist das zentrale Prinzip beim Entwurf einer Aufbereitungskette?||Möglichst jedes verfügbare Verfahren einsetzen||Verfahren passend zu Rohwasser, Zielqualität und verbleibenden Belastungen kombinieren — die Kette richtet sich nach der konkreten Belastung, nicht nach maximaler Technik*||Nur die sichtbare Klarheit maximieren||Restströme grundsätzlich ignorieren---Eine Marsbasis kann dieselbe Zielqualität mit zwei Prozessketten erreichen. Was sollte sie zusätzlich vergleichen?||Nur die Anschaffungskosten der Anlage||Energiebedarf, Rückgewinnung und entstehende Restströme — bei gleicher Zielqualität entscheidet der Betriebsaufwand über die sinnvollste Kette*||Nur die Leistungsfähigkeit der größten Einzelkomponente||Nur die Größe der Anlage',
          depthPoints: 8,
        },
      ],
    },
  ],
};
