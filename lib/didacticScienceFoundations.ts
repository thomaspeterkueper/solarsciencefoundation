import type { DidacticModuleContent } from './didacticContent';

const scienceContent: Record<string, DidacticModuleContent> = {
  'EAR-L1-000002': {
    moduleId: 'EAR-L1-000002',
    durationMinutes: 18,
    learningGoals: [
      'Geomagnetische Polumkehr von einer geographischen Polverlagerung unterscheiden.',
      'Umkehrrate und Paläointensität als verschiedene Messgrößen erklären.',
      'Zwischen zeitlicher Korrelation und einer gesicherten Ursache-Wirkungs-Kette unterscheiden.'
    ],
    introduction: [
      'Der Geodynamo erzeugt das Erdmagnetfeld durch Strömungen im flüssigen äußeren Erdkern. Über geologische Zeiträume kehrte seine dominierende Dipolpolarität mehrfach um; das ist keine Drehung der geographischen Erdachse.',
      'Eine Studie rekonstruierte eine Phase ungewöhnlich häufiger Magnetfeldwechsel um 261 Millionen Jahre vor heute. Gleichzeitig gab es eine biotische Krise. Die zeitliche Übereinstimmung beweist jedoch nicht, dass Magnetfeldwechsel das Artensterben verursacht haben.'
    ],
    examples: [
      { title: 'Magnetostratigraphie', body: 'Abfolgen magnetisierter Gesteinsschichten helfen frühere Polaritätswechsel zu rekonstruieren. Eine Magnetozone ist kein gemessenes Aussterbeereignis.' },
      { title: 'Wichtiger Gegenbefund', body: 'Paläointensitätsdaten begrenzen eine Erklärung, nach der die Magnetosphäre ausreichend geschwächt gewesen wäre, um allein durch Ozonabbau das Artensterben auszulösen.' }
    ],
    task: {
      prompt: 'In derselben Zeit treten häufige Magnetfeldwechsel und ein Rückgang von Arten auf. Welche weiteren Belege brauchst du für eine kausale Erklärung?',
      hint: 'Denke an Magnetfeldstärke, Teilchenexposition, Atmosphäre, zeitliche Auflösung und konkurrierende Ursachen.',
      solution: 'Nötig sind unabhängige Evidenz für ausreichende Feldschwächung, messbare Exposition und ökologische Wirkungen sowie ein Vergleich mit Vulkanismus, Klimawandel und anderen Stressoren.'
    },
    check: {
      question: 'Welche Aussage ist nach den bisherigen Studien fachlich zulässig?',
      options: [
        'Jede Polumkehr löst ein Artensterben aus.',
        'Häufige Polwechsel wurden rekonstruiert; eine kausale Rolle beim Artensterben bleibt offen.',
        'Der gesamte Erdkern hat sich um 180 Grad gedreht.',
        'Die Magnetostratigraphie misst unmittelbar die damalige UV-Belastung.'
      ],
      correctOption: 1,
      explanation: 'Die zeitliche Korrelation ist interessant, ersetzt aber nicht den Nachweis eines biologisch wirksamen Mechanismus.'
    }
  },
  'EAR-L1-000001': {
    moduleId: 'EAR-L1-000001',
    durationMinutes: 15,
    learningGoals: [
      'Mineralisch gespeichertes Wasser von einem flüssigen Ozean unterscheiden.',
      'Direkte lokale Evidenz von globalen Modellschätzungen unterscheiden.',
      'Speicherkapazität, Wasserinventar und Austauschfluss auseinanderhalten.'
    ],
    introduction: [
      'In etwa 410 bis 660 Kilometern Tiefe befinden sich Hochdruckminerale wie Wadsleyit und Ringwoodit. Wasserstoff und OH-Gruppen können in ihre festen Kristallstrukturen eingebaut werden. Die Mantelübergangszone ist deshalb kein entdecktes unterirdisches Meer.',
      'Ein Ringwoodit-Einschluss in einem Diamanten belegte 2014 lokale Hydratation. Die Gesamtmenge des Wassers in dieser Zone wird dagegen aus Modellen der Seismologie und Mineralphysik abgeschätzt; sie ist nicht direkt gemessen.'
    ],
    examples: [
      { title: 'Direkte Probe', body: 'Ein wasserhaltiger Ringwoodit-Einschluss ist eine lokale Beobachtung und belegt keine überall gleichmäßige Wasserverteilung.' },
      { title: 'Planetarer Haushalt', body: 'Die mögliche Speicherkapazität des Mantels, sein tatsächlicher Wasserbestand und seine langfristigen Austauschflüsse sind drei unterschiedliche Größen.' }
    ],
    task: {
      prompt: 'Eine Modellstudie schätzt den Mantelwasserbestand auf ein Ozeanäquivalent. Was darfst du daraus NICHT schließen?',
      hint: 'Prüfe, ob das Ergebnis direkt gemessen wurde und ob es sich um flüssiges Wasser handelt.',
      solution: 'Nicht zulässig sind die Aussagen, im Mantel liege ein flüssiger Ozean, sein Wasserbestand sei überall direkt gemessen oder es folge daraus eine kurzfristige Meeresspiegeländerung.'
    },
    check: {
      question: 'Was belegt ein wasserhaltiger Ringwoodit-Einschluss in einem Diamanten?',
      options: [
        'Einen frei fließenden Ozean unter der Erdkruste.',
        'Eine lokal wasserhaltige Hochdruckmineralphase.',
        'Die genaue globale Wassermenge der gesamten Erde.',
        'Eine unmittelbar bevorstehende Küstenverschiebung.'
      ],
      correctOption: 1,
      explanation: 'Der Mineraleinschluss ist direkte lokale Evidenz; globale Wasserinventare sind modellabhängige Schätzungen.'
    }
  },
  'PHY-L1-000001': {
    moduleId: 'PHY-L1-000001',
    durationMinutes: 14,
    learningGoals: [
      'Schwingungen als zeitliche Veränderungen physikalischer Größen erkennen.',
      'Frequenz und Amplitude begrifflich unterscheiden.',
      'Verstehen, warum derselbe Grundton bei verschiedenen Instrumenten unterschiedlich klingt.'
    ],
    introduction: [
      'Viele physikalische Vorgänge lassen sich als Schwingungen beschreiben. Eine Saite bewegt sich hin und her, Luftdruck schwankt, Lichtfelder ändern sich periodisch. Entscheidend ist nicht nur, dass etwas schwingt, sondern wie schnell und mit welcher Stärke.',
      'Die Frequenz beschreibt, wie viele Schwingungen pro Sekunde stattfinden. Die Amplitude beschreibt die Stärke der Auslenkung. Bei Klängen kommt noch die Zusammensetzung verschiedener Teilschwingungen hinzu. Sie prägt den Klangcharakter eines Instruments.'
    ],
    examples: [
      {
        title: 'Gleicher Ton, anderer Klang',
        body: 'Eine Geige und eine Flöte können denselben Grundton spielen. Trotzdem klingen sie verschieden, weil neben der Grundfrequenz unterschiedliche Obertöne mit unterschiedlicher Stärke enthalten sind.'
      },
      {
        title: 'Amplitude ist nicht Frequenz',
        body: 'Wird eine Saite stärker angeregt, wächst vor allem die Amplitude: Der Ton wird lauter. Die Frequenz bleibt bei gleicher Saitenlänge und Spannung im Wesentlichen gleich.'
      }
    ],
    task: {
      prompt: 'Zwei Töne haben dieselbe Frequenz, aber unterschiedliche Amplituden. Was ist gleich, was ist verschieden, und wie würdest du den Unterschied hören?',
      hint: 'Ordne Frequenz der Tonhöhe und Amplitude der Stärke der Schwingung zu.',
      solution: 'Die Tonhöhe ist gleich, weil die Frequenz gleich ist. Die Lautstärke ist verschieden, weil die Amplituden verschieden sind; der Ton mit größerer Amplitude wird lauter wahrgenommen.'
    },
    check: {
      question: 'Warum klingt eine Geige anders als eine Flöte, wenn beide denselben Grundton spielen?',
      options: [
        'Weil ihre Grundfrequenz zwingend verschieden ist.',
        'Weil ihre Mischung aus Grundton und Obertönen verschieden ist.',
        'Weil nur die Flöte Schwingungen erzeugt.',
        'Weil Tonhöhe ausschließlich von der Lautstärke abhängt.'
      ],
      correctOption: 1,
      explanation: 'Der Grundton kann gleich sein. Der Klangcharakter entsteht wesentlich durch unterschiedliche Obertöne und deren relative Stärke.'
    }
  },
  'CHE-L1-000001': {
    moduleId: 'CHE-L1-000001',
    durationMinutes: 14,
    learningGoals: [
      'Die polare Struktur des Wassermoleküls beschreiben.',
      'Wasserstoffbrücken als Ursache wichtiger Stoffeigenschaften einordnen.',
      'Erklären, warum Wasser viele ionische und polare Stoffe gut löst.'
    ],
    introduction: [
      'Ein Wassermolekül besteht aus zwei Wasserstoffatomen und einem Sauerstoffatom. Die Elektronen sind dabei nicht gleichmäßig verteilt: Der Sauerstoff zieht die gemeinsame Elektronendichte stärker an. Dadurch besitzt das Molekül eine leicht negative und eine leicht positive Seite.',
      'Diese Polarität führt dazu, dass sich Wassermoleküle gegenseitig anziehen. Zwischen ihnen entstehen Wasserstoffbrücken. Obwohl jede einzelne dieser Wechselwirkungen relativ schwach ist, prägen viele davon gemeinsam Siedepunkt, Oberflächenspannung und Löslichkeit von Wasser.'
    ],
    examples: [
      {
        title: 'Salz in Wasser',
        body: 'Kochsalz besteht aus positiv und negativ geladenen Ionen. Wassermoleküle richten ihre unterschiedlich geladenen Seiten an diesen Ionen aus und stabilisieren sie in Lösung.'
      },
      {
        title: 'Hohe Oberflächenspannung',
        body: 'Wassermoleküle ziehen einander an. An der Oberfläche fehlen Nachbarn nach oben, deshalb entsteht dort ein zusammenziehender Effekt, der die vergleichsweise hohe Oberflächenspannung erklärt.'
      }
    ],
    task: {
      prompt: 'Erkläre, warum sich Speiseöl und Wasser nur schlecht mischen. Verwende dabei die Begriffe polar und unpolar.',
      hint: 'Überlege, welche Wechselwirkungen Wasser bevorzugt und welche Struktur typische Ölmoleküle besitzen.',
      solution: 'Wasser ist polar und bildet bevorzugt Wechselwirkungen mit geladenen oder polaren Teilchen. Viele Ölmoleküle sind überwiegend unpolar. Deshalb ist die energetisch günstige Wechselwirkung zwischen beiden Stoffen schwach und sie trennen sich in zwei Phasen.'
    },
    check: {
      question: 'Welche Eigenschaft ist eine direkte Folge der Polarität des Wassermoleküls?',
      options: [
        'Wasser kann keine Ionen umgeben.',
        'Wassermoleküle können untereinander Wasserstoffbrücken bilden.',
        'Wasser besteht aus nur einem Element.',
        'Wasser ist bei jeder Temperatur gasförmig.'
      ],
      correctOption: 1,
      explanation: 'Die ungleichmäßige Ladungsverteilung ermöglicht die Anziehung zwischen partiell positiven und partiell negativen Bereichen benachbarter Wassermoleküle.'
    }
  },
  'AST-L1-000001': {
    moduleId: 'AST-L1-000001',
    durationMinutes: 14,
    learningGoals: [
      'Planetologie als vergleichende Untersuchung planetarer Körper einordnen.',
      'Masse, Radius und mittlere Dichte als zentrale Vergleichsgrößen nutzen.',
      'Aus beobachtbaren Eigenschaften erste Aussagen über Aufbau und Entwicklung eines Planeten ableiten.'
    ],
    introduction: [
      'Planetologie untersucht Planeten, Monde und andere planetare Körper nicht isoliert, sondern vergleichend. Aus Bahn, Masse, Größe, Dichte, Oberfläche, Atmosphäre und Magnetfeld entsteht ein Gesamtbild darüber, wie ein Körper aufgebaut ist und wie er sich entwickelt hat.',
      'Besonders wichtig ist die mittlere Dichte. Ein kleiner felsiger Planet kann dichter sein als ein viel größerer Gasplanet. Die Dichte allein verrät noch nicht den genauen inneren Aufbau, liefert aber zusammen mit weiteren Messungen wichtige Hinweise.'
    ],
    examples: [
      {
        title: 'Erde und Jupiter',
        body: 'Jupiter ist sehr viel massereicher als die Erde, besitzt aber eine deutlich geringere mittlere Dichte. Das passt zu seinem großen Anteil leichter Elemente wie Wasserstoff und Helium.'
      },
      {
        title: 'Oberfläche als Geschichtsbuch',
        body: 'Viele Einschlagkrater deuten auf eine alte, wenig erneuerte Oberfläche hin. Starke Erosion oder Vulkanismus können Krater dagegen überformen oder beseitigen.'
      }
    ],
    task: {
      prompt: 'Planet A und Planet B sind gleich groß. Planet A besitzt aber die doppelte Masse. Welcher Planet hat die höhere mittlere Dichte, und was könnte das über seine Zusammensetzung andeuten?',
      hint: 'Dichte ist Masse geteilt durch Volumen. Bei gleichem Radius ist auch das Volumen gleich.',
      solution: 'Planet A hat die doppelte mittlere Dichte. Das kann auf einen höheren Anteil dichter Materialien, etwa Gestein oder Metall, hindeuten. Für eine genaue Aussage wären weitere Messungen nötig.'
    },
    check: {
      question: 'Welche Beobachtung hilft besonders dabei, den inneren Aufbau eines Planeten indirekt einzugrenzen?',
      options: [
        'Nur seine Farbe auf einem einzelnen Foto.',
        'Masse, Radius und daraus abgeleitete mittlere Dichte.',
        'Ausschließlich sein Name.',
        'Nur die Anzahl seiner Monde.'
      ],
      correctOption: 1,
      explanation: 'Masse und Radius erlauben die Berechnung der mittleren Dichte. Zusammen mit weiteren Daten liefert sie wichtige Hinweise auf die Zusammensetzung und innere Struktur.'
    }
  }
};

export function getScienceFoundationContent(moduleId: string): DidacticModuleContent | undefined {
  return scienceContent[moduleId.toUpperCase()];
}
