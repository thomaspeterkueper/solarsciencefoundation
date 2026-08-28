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
  }
};

export function getDidacticModuleContent(moduleId: string): DidacticModuleContent | undefined {
  return content[moduleId.toUpperCase()];
}
