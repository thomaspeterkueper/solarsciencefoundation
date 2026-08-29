import type { DidacticModuleContent } from './didacticContent';

const scienceContent: Record<string, DidacticModuleContent> = {
  'SSF-PHY-GRAVITATIONSBRUNNEN-0001': {
    moduleId: 'SSF-PHY-GRAVITATIONSBRUNNEN-0001',
    durationMinutes: 20,
    learningGoals: [
      'Gravitationspotential und Potentialdifferenz als Energie pro Kilogramm verstehen.',
      'Den Zusammenhang zwischen Abstand, potentieller Energie und notwendiger Hubarbeit erklären.',
      'Begründen, warum das Verlassen eines Gravitationsfeldes Energie benötigt.',
      'Verschiedene Himmelskörper anhand ihrer Brunnentiefe vergleichen.'
    ],
    introduction: [
      'Jeder Himmelskörper sitzt in einem Gravitationsbrunnen. Das Gravitationspotential Φ = −G·M/r beschreibt die potentielle Energie pro Kilogramm an einem Ort: Es ist überall negativ und wird mit wachsendem Abstand r vom Zentrum weniger negativ. An der Erdoberfläche beträgt es etwa −62,5 MJ/kg.',
      'Wer eine Masse aus dem Brunnen hinaushebt, muss die Potentialdifferenz zwischen Start- und Zielort bezahlen: W = m·(Φ(r₂) − Φ(r₁)). Deshalb kostet das Verlassen eines Gravitationsfeldes immer Energie — auch wenn man im All nichts mehr „wiegt“.'
    ],
    examples: [
      {
        title: 'Erde: 62,5 GJ für eine Tonne',
        body: 'Um 1 Tonne von der Erdoberfläche ins Unendliche zu heben, sind theoretisch m·|Φ₀| ≈ 1000 kg · 62,5 MJ/kg = 62,5 GJ Arbeit nötig. Die Fluchtgeschwindigkeit 11,2 km/s steckt dieselbe Energie in Bewegungsform.'
      },
      {
        title: 'Mond: ein flacher Brunnen',
        body: 'Der Mond hat nur Φ₀ ≈ −2,8 MJ/kg und eine Fluchtgeschwindigkeit von 2,4 km/s. Dieselbe Tonne Nutzlast benötigt dort nur rund 2,8 GJ. Der Brunnen ist flacher, weil der Mond etwa 81-mal weniger Masse hat als die Erde.'
      }
    ],
    task: {
      prompt: 'Ein Raumschiff startet von der Erdoberfläche. Erkläre mit dem Gravitationspotential, warum die meiste Hubarbeit in den ersten Kilometern über der Oberfläche steckt und nicht erst weit draußen im All.',
      hint: 'Vergleiche die Potentialdifferenz zwischen r₁ = R und r₂ = 2R mit der zwischen r₁ = 5R und r₂ = 10R.',
      solution: 'Das Potential Φ = −G·M/r wird nach außen flacher. Von R auf 2R steigt Φ von −GM/R auf −GM/(2R) — die Differenz ist GM/(2R), die Hälfte der gesamten Fluchtarbeit. Zwischen 5R und 10R beträgt die Differenz dagegen nur noch GM/(10R). Der Brunnen ist an der Oberfläche am steilsten, deshalb steckt dort die meiste Arbeit.'
    },
    check: {
      question: 'Was passiert mit der nötigen Hubarbeit pro Kilometer, wenn man sich immer weiter von einem Himmelskörper entfernt?',
      options: [
        'Sie bleibt überall gleich groß.',
        'Sie wird kleiner, weil der Potentialbrunnen nach außen flacher wird.',
        'Sie wird größer, weil das Potential negativer wird.',
        'Sie verschwindet sofort nach dem Verlassen der Atmosphäre.'
      ],
      correctOption: 1,
      explanation: 'Das Potential Φ = −G·M/r wird mit wachsendem r weniger negativ und verändert sich immer langsamer. Die Potentialdifferenz pro Strecke — und damit die nötige Arbeit pro Kilometer — nimmt nach außen ab.'
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
