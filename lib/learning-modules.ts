import type { KxfLearningModule, KxfLearningModulesExport, SubjectCode } from '@/components/LearnMap/types';

const KXF_MODULES_URL =
  process.env.KUEPER_KXF_MODULES_URL ??
  'https://raw.githubusercontent.com/thomaspeterkueper/kueper-knowledge-graph/main/exports/kxf-learning-modules-0.1.json';

function isValidExport(value: unknown): value is KxfLearningModulesExport {
  if (typeof value !== 'object' || value === null) return false;
  const record = value as Record<string, unknown>;
  const records = record.records as Record<string, unknown> | undefined;
  return typeof record.schema === 'string' && record.schema.startsWith('KXF-LEARNING-MODULES') && Array.isArray(records?.learning_modules);
}

export async function fetchLearningModules(): Promise<KxfLearningModule[]> {
  try {
    const response = await fetch(KXF_MODULES_URL, {
      next: { revalidate: 3600 },
      headers: { accept: 'application/json' }
    });

    if (!response.ok) return FALLBACK_MODULES;
    const data = await response.json();
    if (!isValidExport(data)) return FALLBACK_MODULES;
    return data.records.learning_modules.length > 0 ? data.records.learning_modules : FALLBACK_MODULES;
  } catch {
    return FALLBACK_MODULES;
  }
}

export function groupBySubject(modules: KxfLearningModule[]): Record<string, KxfLearningModule[]> {
  return modules.reduce<Record<string, KxfLearningModule[]>>((acc, item) => {
    (acc[item.meta.subject] ??= []).push(item);
    return acc;
  }, {});
}

export function assetCount(module: KxfLearningModule): number {
  return Object.values(module.assets).reduce((sum, entries) => sum + entries.length, 0);
}

export const SUBJECT_CONFIG: Record<SubjectCode, { name: string; color: string; bg: string; border: string }> = {
  PHY: { name: 'Physik', color: '#5B8FB9', bg: '#EBF3FA', border: '#B8D4EA' },
  CHE: { name: 'Chemie', color: '#3D7A5E', bg: '#EBF5F0', border: '#A8D4BB' },
  BIO: { name: 'Biologie', color: '#5E9E5E', bg: '#EEF6EE', border: '#A8CCA8' },
  MAT: { name: 'Mathematik', color: '#8B5CF6', bg: '#F3EFFD', border: '#C4ADEE' },
  AST: { name: 'Astronomie', color: '#C9A84C', bg: '#F5F0E0', border: '#DFC87A' },
  EAR: { name: 'Geowissenschaften', color: '#C0392B', bg: '#FDF0EE', border: '#E8B0A8' }
};

const FALLBACK_MODULES: KxfLearningModule[] = [
  {
    id: 'LRN:SSF:PHY-1101',
    version: '0.1.0',
    created: '2026-06-28',
    modified: '2026-07-02T18:00:00+02:00',
    meta: {
      title: 'Was die Welt aus sich macht',
      subject: 'PHY',
      type: 'learning_path',
      status: 'built',
      entry_question: 'Warum klingt eine Geige anders als eine Flöte — obwohl beide denselben Ton spielen?',
      depth_min: 0,
      depth_max: null,
      duration_min: 10,
      duration_max: 45
    },
    assets: { text: ['content/phy-1101/prose.md'], svg: ['assets/svg/wave-overtones.svg', 'assets/svg/em-spectrum.svg'], image: [], video: [], audio: [], experiment: [] },
    dependencies: { requires: [], module_unlocks: ['LRN:SSF:PHY-1102', 'LRN:SSF:CHE-1101'], path_unlocks: [], archive_unlocks: [], related: [] },
    noxia: { grants: ['SENSOR:SPECTRAL'], required_for: [] },
    branches: [
      { id: 'BR:PHY:ACOUSTICS', label: 'Akustik vertiefen', unlocks_at: 'u1_complete' },
      { id: 'BR:PHY:LIGHT-INTRO', label: 'Licht-Einstieg', unlocks_at: 'u1_complete' }
    ]
  },
  {
    id: 'LRN:SSF:PHY-1102',
    version: '0.1.0',
    created: '2026-06-28',
    modified: '2026-07-02T18:00:00+02:00',
    meta: {
      title: 'Licht als Informationsträger',
      subject: 'PHY',
      type: 'learning_path',
      status: 'built',
      entry_question: 'Warum ist Licht das wichtigste Werkzeug der Astronomie — und was steckt alles darin?',
      depth_min: 0,
      depth_max: null,
      duration_min: 20,
      duration_max: 90
    },
    assets: { text: ['content/phy-1102/prose.md'], svg: ['assets/svg/em-spectrum-full.svg'], image: [], video: [], audio: [], experiment: [] },
    dependencies: { requires: ['LRN:SSF:PHY-1101'], module_unlocks: ['LRN:SSF:PHY-2201', 'LRN:SSF:AST-1101'], path_unlocks: [], archive_unlocks: [], related: [] },
    noxia: { grants: ['SENSOR:SPECTRAL', 'MISSION:OBSERVATION-DECK'], required_for: [] },
    branches: [
      { id: 'BR:PHY:EM-SPECTRUM', label: 'EM-Spektrum', unlocks_at: 'd1_complete' },
      { id: 'BR:PHY:SPECTROSCOPY', label: 'Spektroskopie', unlocks_at: 'd3_complete' }
    ]
  },
  {
    id: 'LRN:SSF:CHE-1101',
    version: '0.1.0',
    created: '2026-06-28',
    modified: '2026-07-02T18:00:00+02:00',
    meta: {
      title: 'Was Wasser so besonders macht',
      subject: 'CHE',
      type: 'learning_path',
      status: 'built',
      entry_question: 'Warum ist Wasser flüssig — obwohl H₂ und O₂ beide Gase sind?',
      depth_min: 0,
      depth_max: null,
      duration_min: 15,
      duration_max: 60
    },
    assets: { text: ['content/che-1101/prose.md'], svg: ['assets/svg/h2o-molecule.svg'], image: [], video: [], audio: [], experiment: [] },
    dependencies: { requires: [], module_unlocks: ['LRN:SSF:CHE-1102', 'LRN:SSF:CHE-1103', 'LRN:SSF:BIO-1101'], path_unlocks: [], archive_unlocks: [], related: ['LRN:SSF:PHY-1101'] },
    noxia: { grants: ['REACT:ENERGY', 'MISSION:LAB-ALPHA'], required_for: ['MISSION:DEEP-OCEAN'] },
    branches: [
      { id: 'BR:CHE:PSE', label: 'Periodensystem', unlocks_at: 'u1_complete' },
      { id: 'BR:CHE:BIND', label: 'Bindungen', unlocks_at: 'u2_complete' }
    ]
  }
];
