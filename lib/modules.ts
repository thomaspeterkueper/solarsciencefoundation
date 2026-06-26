/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      lib/modules.ts
 * Repo:      github.com/thomaspeterkueper/solarsciencefoundation/blob/main/lib/modules.ts
 * Name:      modules — learning module registry
 * Version:   0.1.0
 * Created:   2026-06-26
 * Modified:  2026-06-26 14:25 CEST
 * Depends:   —
 */

export type Exercise = {
  id: string;
  type: 'single_choice';
  question: string;
  options: string[];
  correctOption: number;
};

export type LearningModule = {
  id: string;
  title: string;
  domain: string;
  difficulty: number;
  durationMinutes: number;
  summary: string;
  source: {
    authority: string;
    kxfEntityIds: string[];
  };
  unlocks: string[];
  exercises: Exercise[];
};

export const learningModules: LearningModule[] = [
  {
    id: 'SSF-PHY-1101',
    title: 'What is gravity?',
    domain: 'Physics',
    difficulty: 1,
    durationMinutes: 8,
    summary:
      'A short foundation module about gravity as attraction between masses and as the basis for orbits, falling bodies and space navigation.',
    source: {
      authority: 'kueper-knowledge-graph',
      kxfEntityIds: ['ENT:PHY:GRAVITY', 'ENT:AST:ORBIT']
    },
    unlocks: ['UNL:NOX:orbital-navigation'],
    exercises: [
      {
        id: 'EX:SSF-PHY-1101:001',
        type: 'single_choice',
        question: 'What does gravity do between masses?',
        options: ['It repels them.', 'It attracts them.', 'It removes inertia.', 'It creates light.'],
        correctOption: 1
      },
      {
        id: 'EX:SSF-PHY-1101:002',
        type: 'single_choice',
        question: 'Why is gravity important for NOXIA orbital navigation?',
        options: [
          'Because routes depend on orbital motion.',
          'Because ships do not need fuel.',
          'Because stations cannot move.',
          'Because planets have no mass.'
        ],
        correctOption: 0
      }
    ]
  }
];

export function getModuleById(id: string) {
  return learningModules.find((module) => module.id === id) ?? null;
}
