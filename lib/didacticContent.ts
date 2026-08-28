export type DidacticExample = {
  title: string;
  body: string;
};

export type DidacticTask = {
  prompt: string;
  hint?: string;
  solution: string;
};

export type DidacticCheck = {
  question: string;
  options: string[];
  correctOption: number;
  explanation: string;
};

export type DidacticModuleContent = {
  moduleId: string;
  durationMinutes: number;
  learningGoals: string[];
  introduction: string[];
  examples: DidacticExample[];
  task: DidacticTask;
  check: DidacticCheck;
};

const content: Record<string, DidacticModuleContent> = {
  'MAT-L0-000001': {
    moduleId: 'MAT-L0-000001',
    durationMinutes: 8,
    learningGoals: [
      'Zahlen zum Zählen und Vergleichen verwenden.',
      'In einer Zahlenfolge eine einfache Regel erkennen.',
      'Ein Muster mit eigenen Worten beschreiben und fortsetzen.'
    ],
    introduction: [
      'Zahlen sagen nicht nur, wie viele Dinge vorhanden sind. Mit ihnen können wir Mengen vergleichen und Veränderungen beschreiben. Drei Steine sind mehr als zwei; fünf Schritte sind weiter als drei.',
      'Ein Muster entsteht, wenn sich etwas nach einer erkennbaren Regel wiederholt oder verändert. In der Mathematik versuchen wir deshalb nicht nur die nächsten Zahlen zu erraten, sondern die Regel zu finden, die sie verbindet.'
    ],
    examples: [
      {
        title: 'Immer zwei mehr',
        body: '2, 4, 6, 8, … — von einer Zahl zur nächsten kommen jeweils 2 hinzu. Die Regel lautet also „addiere 2“. Danach folgen 10 und 12.'
      },
      {
        title: 'Abwechselnd',
        body: '1, 3, 1, 3, 1, … — hier wird nicht immer dieselbe Zahl addiert. Stattdessen wechseln sich 1 und 3 regelmäßig ab. Auch Wiederholung kann eine Musterregel sein.'
      }
    ],
    task: {
      prompt: 'Setze die Folge 3, 6, 9, 12, … um zwei Zahlen fort. Beschreibe anschließend die Regel, ohne nur die beiden gesuchten Zahlen zu nennen.',
      hint: 'Vergleiche jeweils zwei benachbarte Zahlen: Was verändert sich immer gleich?',
      solution: '15, 18. Die Regel lautet: Von einer Zahl zur nächsten werden jeweils 3 addiert.'
    },
    check: {
      question: 'Welche Aussage beschreibt die Folge 5, 10, 15, 20, … am besten?',
      options: [
        'Jede Zahl ist doppelt so groß wie die vorherige.',
        'Zu jeder Zahl werden 5 addiert.',
        'Die Zahlen wechseln zwischen 5 und 10.',
        'Von jeder Zahl werden 5 abgezogen.'
      ],
      correctOption: 1,
      explanation: 'Richtig: Die Differenz zwischen zwei benachbarten Zahlen beträgt immer 5. Deshalb ist „addiere 5“ die Musterregel.'
    }
  },
  'MAT-L1-000001': {
    moduleId: 'MAT-L1-000001',
    durationMinutes: 12,
    learningGoals: [
      'Eine Funktion als eindeutige Zuordnung verstehen.',
      'Eingabewert, Ausgabewert und Funktionsregel unterscheiden.',
      'Einfache Funktionswerte aus einer Regel bestimmen.'
    ],
    introduction: [
      'Eine Funktion beschreibt, wie aus einem Eingabewert nach einer festen Regel genau ein Ausgabewert entsteht. Man kann sie sich wie eine Maschine vorstellen: Wert hinein, Regel anwenden, Wert heraus.',
      'Die Schreibweise f(x) bezeichnet den Ausgabewert der Funktion f an der Stelle x. Bei f(x) = 2x + 1 wird zum Beispiel zuerst x verdoppelt und danach 1 addiert.'
    ],
    examples: [
      {
        title: 'Eine einfache Zuordnung',
        body: 'Für f(x) = x + 3 gilt: f(2) = 5 und f(10) = 13. Die Regel bleibt gleich, nur der eingesetzte Wert ändert sich.'
      },
      {
        title: 'Nicht jede Zuordnung ist eine Funktion',
        body: 'Wenn derselbe Eingabewert gleichzeitig zwei verschiedene Ausgabewerte erhalten soll, ist die Zuordnung keine Funktion. Zu jedem x darf es genau einen Funktionswert geben.'
      }
    ],
    task: {
      prompt: 'Gegeben ist g(x) = 3x - 2. Berechne g(0), g(2) und g(5). Beschreibe außerdem in Worten, was die Regel mit einem Eingabewert macht.',
      hint: 'Setze jeden Wert einzeln anstelle von x ein und beachte die Reihenfolge: zuerst mal 3, dann minus 2.',
      solution: 'g(0) = -2, g(2) = 4, g(5) = 13. Die Regel verdreifacht den Eingabewert und zieht anschließend 2 ab.'
    },
    check: {
      question: 'Welche Aussage trifft auf eine Funktion zu?',
      options: [
        'Jeder Eingabewert hat genau einen Ausgabewert.',
        'Jeder Ausgabewert darf nur einmal vorkommen.',
        'Eine Funktion muss immer eine Gerade ergeben.',
        'Eine Funktion darf keine negativen Werte enthalten.'
      ],
      correctOption: 0,
      explanation: 'Entscheidend ist die Eindeutigkeit der Zuordnung: Jedem Eingabewert wird genau ein Ausgabewert zugeordnet.'
    }
  },
  'MAT-L1-000002': {
    moduleId: 'MAT-L1-000002',
    durationMinutes: 12,
    learningGoals: [
      'Daten als beobachtete oder gemessene Werte einordnen.',
      'Mittelwert und Median unterscheiden.',
      'Erkennen, warum einzelne Extremwerte eine Zusammenfassung verzerren können.'
    ],
    introduction: [
      'Statistik hilft dabei, viele einzelne Beobachtungen so zusammenzufassen, dass Strukturen sichtbar werden. Dabei ist wichtig, nicht nur eine Kennzahl zu berechnen, sondern zu verstehen, was sie über die Daten aussagt.',
      'Der Mittelwert entsteht, indem alle Werte addiert und durch ihre Anzahl geteilt werden. Der Median ist dagegen der mittlere Wert einer sortierten Liste. Beide beantworten unterschiedliche Fragen.'
    ],
    examples: [
      {
        title: 'Mittelwert',
        body: 'Bei 4, 5 und 6 ist der Mittelwert (4 + 5 + 6) / 3 = 5. Er berücksichtigt jeden einzelnen Wert.'
      },
      {
        title: 'Median bei einem Ausreißer',
        body: 'Bei 4, 5, 6, 7 und 100 ist der Median 6. Der Mittelwert beträgt dagegen 24,4 und wird stark vom Extremwert 100 beeinflusst.'
      }
    ],
    task: {
      prompt: 'Die Messwerte lauten 2, 3, 3, 4, 18. Bestimme Mittelwert und Median. Welche der beiden Kennzahlen beschreibt die typische Größenordnung hier besser?',
      hint: 'Für den Median sortierst du die Werte und suchst den mittleren. Für den Mittelwert addierst du alle Werte.',
      solution: 'Mittelwert: 6. Median: 3. Der Median beschreibt die typische Größenordnung hier besser, weil der Wert 18 den Mittelwert stark nach oben zieht.'
    },
    check: {
      question: 'Wann ist der Median häufig besonders nützlich?',
      options: [
        'Wenn einzelne sehr große oder sehr kleine Ausreißer vorkommen.',
        'Nur wenn alle Werte identisch sind.',
        'Nur bei genau zwei Messwerten.',
        'Wenn die Reihenfolge der Messung wichtig ist.'
      ],
      correctOption: 0,
      explanation: 'Der Median ist robust gegenüber Ausreißern, weil seine Lage vor allem von der Sortierreihenfolge und nicht von der Größe extremer Werte abhängt.'
    }
  },
  'MAT-L1-000003': {
    moduleId: 'MAT-L1-000003',
    durationMinutes: 12,
    learningGoals: [
      'Wahrscheinlichkeit als Maß zwischen 0 und 1 interpretieren.',
      'Bei einfachen gleichwahrscheinlichen Experimenten günstige und mögliche Fälle unterscheiden.',
      'Sichere, unmögliche und unsichere Ereignisse einordnen.'
    ],
    introduction: [
      'Wahrscheinlichkeit beschreibt nicht, was bei einem einzelnen Versuch sicher passieren wird. Sie beschreibt, wie plausibel ein Ereignis unter festgelegten Bedingungen ist.',
      'Eine Wahrscheinlichkeit von 0 bedeutet unmöglich, 1 bedeutet sicher. Werte dazwischen beschreiben Unsicherheit. 0,5 entspricht zum Beispiel 50 Prozent.'
    ],
    examples: [
      {
        title: 'Faire Münze',
        body: 'Bei einer idealisierten fairen Münze sind Kopf und Zahl gleichwahrscheinlich. Die Wahrscheinlichkeit für Kopf beträgt 1 von 2, also 1/2 = 0,5.'
      },
      {
        title: 'Ein Würfel',
        body: 'Bei einem fairen sechsseitigen Würfel gibt es sechs gleichwahrscheinliche Ergebnisse. Für eine gerade Zahl sind 2, 4 und 6 günstig: 3 von 6 Fällen, also 1/2.'
      }
    ],
    task: {
      prompt: 'Ein Beutel enthält 3 blaue und 2 rote Kugeln. Eine Kugel wird zufällig gezogen. Wie groß ist die Wahrscheinlichkeit für Blau? Gib sie als Bruch und Prozentwert an.',
      hint: 'Zähle zuerst alle möglichen Kugeln und dann die günstigen blauen Kugeln.',
      solution: 'Es gibt 5 Kugeln insgesamt und 3 günstige Fälle. P(Blau) = 3/5 = 0,6 = 60 %.'
    },
    check: {
      question: 'Welche Aussage über eine Wahrscheinlichkeit von 25 % ist richtig?',
      options: [
        'Das Ereignis tritt sicher bei jedem vierten Versuch ein.',
        'Das Ereignis ist unmöglich.',
        'Unter gleichen Bedingungen ist das Ereignis langfristig ungefähr in einem Viertel der Fälle zu erwarten.',
        'Nach drei Fehlversuchen muss es beim vierten Versuch eintreten.'
      ],
      correctOption: 2,
      explanation: '25 % beschreibt eine langfristige Häufigkeit unter gleichen Bedingungen. Daraus folgt kein festes Muster für einzelne aufeinanderfolgende Versuche.'
    }
  }
};

export function getDidacticModuleContent(moduleId: string): DidacticModuleContent | undefined {
  return content[moduleId.toUpperCase()];
}
