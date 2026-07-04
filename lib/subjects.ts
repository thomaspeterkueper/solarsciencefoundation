/**
 * KUEPER - Solar Science Foundation (SSF)
 * Path: lib/subjects.ts
 * Repo: github.com/thomaspeterkueper/solarsciencefoundation/blob/main/lib/subjects.ts
 * Name: subjects - subject and learning path registry
 * Version: 0.2.0
 * Created: 2026-06-27
 * Modified: 2026-07-04
 * Depends: lib/modules
 */

import type { LearningModule } from './modules';

export type Subject = {
  id: string;
  slug: string;
  title: string;
  mark: string;
  levelRange: string;
  description: string;
  longDescription: string;
};

export type LearningPath = {
  id: string;
  subject: string;
  title: string;
  description: string;
  moduleIds: string[];
};

export const subjects: Subject[] = [
  {
    id: 'SUB:MAT',
    slug: 'mathematics',
    title: 'Mathematics',
    mark: 'Σ',
    levelRange: 'Foundations to Abitur',
    description: 'Numbers, structures, functions and models: the language beneath science.',
    longDescription:
      'SSF Mathematics builds the prerequisites for physics, chemistry, astronomy and data literacy. It starts with numbers and arithmetic, then grows toward algebra, functions, geometry, statistics and calculus at Abitur level.'
  },
  {
    id: 'SUB:PHY',
    slug: 'physics',
    title: 'Physics',
    mark: 'α',
    levelRange: 'Foundations to Abitur',
    description: 'Matter, motion, energy, forces and the laws behind technological systems.',
    longDescription:
      'SSF Physics turns mathematical prerequisites into scientific explanations: motion, forces, energy, electricity, waves, matter and spaceflight applications.'
  },
  {
    id: 'SUB:CHE',
    slug: 'chemistry',
    title: 'Chemistry',
    mark: 'H₂',
    levelRange: 'Foundations to Abitur',
    description: 'Atoms, molecules, reactions, materials and the chemistry of life and habitats.',
    longDescription:
      'SSF Chemistry explains matter at the molecular level: atoms, bonds, reactions, acids, bases, materials, atmospheres and life-support chemistry.'
  },
  {
    id: 'SUB:AST',
    slug: 'astronomy',
    title: 'Astronomy',
    mark: '☉',
    levelRange: 'Foundations to advanced',
    description: 'Planets, stars, orbits, galaxies and the structure of the cosmos.',
    longDescription:
      'SSF Astronomy connects observation, physics and mathematics to understand the Solar System, stars, galaxies and cosmic distances.'
  },
  {
    id: 'SUB:BIO',
    slug: 'biology',
    title: 'Biology',
    mark: 'φ',
    levelRange: 'Foundations to Abitur',
    description: 'Cells, organisms, ecosystems, evolution and life-support systems.',
    longDescription:
      'SSF Biology covers life from cells to ecosystems and prepares later modules about closed habitats, medicine, evolution and extraterrestrial biospheres.'
  },
  {
    id: 'SUB:EAR',
    slug: 'earth-science',
    title: 'Earth science',
    mark: '△',
    levelRange: 'Foundations to Abitur',
    description: 'Earth systems, geology, climate, oceans and planetary comparison.',
    longDescription:
      'SSF Earth Science starts with our own planet and uses it as the reference point for understanding other worlds.'
  },
  {
    id: 'SUB:ENG',
    slug: 'engineering',
    title: 'Engineering',
    mark: '⚙',
    levelRange: 'Advanced school to university foundations',
    description: 'Mechanics, materials, structures, machines and applied technical systems.',
    longDescription:
      'SSF Engineering connects mathematics and physics with real technical systems. The first public test path is TM2 Festigkeitslehre: combined loading, pressure vessels, stress states, principal stresses, shafts and strain measurement.'
  }
];

export const learningPaths: LearningPath[] = [
  {
    id: 'PATH:MAT:numbers-arithmetic',
    subject: 'mathematics',
    title: 'Numbers and arithmetic',
    description:
      'The first mathematics path: number sense, addition, multiplication, fractions and percentages.',
    moduleIds: [
      'SSF-MAT-0001',
      'SSF-MAT-0002',
      'SSF-MAT-0003',
      'SSF-MAT-0004',
      'SSF-MAT-0005'
    ]
  },
  {
    id: 'PATH:ENG:tm2-combined-stress',
    subject: 'engineering',
    title: 'TM2 · Zusammengesetzte Beanspruchung',
    description:
      'A six-module learning path from stress superposition through pressure vessels and stress states to principal stresses, bending plus torsion, and multiaxial strain with DMS.',
    moduleIds: [
      'TM2-COMB-001',
      'TM2-PRESS-001',
      'TM2-STRESS-001',
      'TM2-PRINCIPAL-001',
      'TM2-COMB-002',
      'TM2-STRAIN-001'
    ]
  }
];

export function getSubjectBySlug(slug: string) {
  return subjects.find((subject) => subject.slug === slug) ?? null;
}

export function getPathsForSubject(slug: string) {
  return learningPaths.filter((path) => path.subject === slug);
}

export function getModulesForSubject(modules: LearningModule[], slug: string) {
  const subject = getSubjectBySlug(slug);
  if (!subject) return [];
  return modules.filter((module) => module.domain.toLowerCase() === subject.title.toLowerCase());
}
