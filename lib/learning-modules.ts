import type { KxfLearningModule, KxfLearningModulesExport, SubjectCode } from '../components/LearnMap/types';

const KXF_MODULES_URL =
  process.env.KUEPER_KXF_MODULES_URL ??
  'https://raw.githubusercontent.com/thomaspeterkueper/kueper-knowledge-graph/main/exports/kxf-learning-modules-0.1.json';

// ── KG v0.2.0 → SSF shape normalization ──────────────────────────────────────
// KG uses camelCase (entryQuestion, depthMin, moduleUnlocks, noxiaGrants).
// SSF KxfLearningModule interface uses snake_case. This bridges both schemas.
const SUBJECT_REMAP: Record<string, string> = {
  CHM: 'CHE', // KG taxonomy uses CHM; SSF types use CHE
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeModule(raw: any): KxfLearningModule {
  const meta = raw.meta ?? {};
  const deps = raw.dependencies ?? {};
  const subject = SUBJECT_REMAP[meta.subject] ?? meta.subject;
  return {
    id:       raw.id,
    version:  raw.version  ?? '0.2.0',
    created:  raw.created  ?? '',
    modified: raw.modified ?? '',
    meta: {
      title:          (raw.title as any)?.de ?? (raw.title as any)?.en ?? meta.title ?? '',
      subject:        subject             as SubjectCode,
      type:           meta.type           ?? 'learning_path',
      status:         meta.status         ?? 'planned',
      entry_question: meta.entryQuestion  ?? meta.entry_question ?? '',
      depth_min:      meta.depthMin       ?? meta.depth_min      ?? 0,
      depth_max:      meta.depthMax       ?? meta.depth_max      ?? null,
      duration_min:   meta.durationMin    ?? meta.duration_min   ?? 0,
      duration_max:   meta.durationMax    ?? meta.duration_max   ?? 0,
    },
    assets: {
      text:       raw.assets?.text       ?? [],
      svg:        raw.assets?.svg        ?? [],
      image:      raw.assets?.image      ?? [],
      video:      raw.assets?.video      ?? [],
      audio:      raw.assets?.audio      ?? [],
      experiment: raw.assets?.experiment ?? [],
    },
    dependencies: {
      requires:        deps.requires        ?? [],
      module_unlocks:  deps.moduleUnlocks   ?? deps.module_unlocks  ?? [],
      path_unlocks:    deps.pathUnlocks     ?? deps.path_unlocks    ?? [],
      archive_unlocks: deps.archiveUnlocks  ?? deps.archive_unlocks ?? [],
      related:         deps.related         ?? [],
    },
    noxia: {
      grants:       raw.noxiaGrants ?? raw.noxia?.grants ?? [],
      required_for: raw.noxia?.required_for ?? [],
    },
    branches: (raw.branches ?? []).map((b: { id: string; label: string; unlocks_at?: string; unlocksAt?: string }) => ({
      id:         b.id,
      label:      b.label,
      unlocks_at: b.unlocks_at ?? b.unlocksAt ?? '',
    })),
  };
}

function isValidExport(value: unknown): value is KxfLearningModulesExport {
  if (typeof value !== 'object' || value === null) return false;
  const record = value as Record<string, unknown>;
  const records = record.records as Record<string, unknown> | undefined;
  return typeof record.schema === 'string' && record.schema.startsWith('KXF-LEARNING-MODULES') && Array.isArray(records?.learning_modules);
}

function mergeLocalModules(remoteModules: KxfLearningModule[]): KxfLearningModule[] {
  const byId = new Map<string, KxfLearningModule>();
  for (const module of remoteModules) byId.set(module.id, module);
  for (const module of LOCAL_TMQ_MODULES) byId.set(module.id, module);
  return [...byId.values()];
}

export async function fetchLearningModules(): Promise<KxfLearningModule[]> {
  try {
    const response = await fetch(KXF_MODULES_URL, {
      next: { revalidate: 3600 },
      headers: { accept: 'application/json' }
    });

    if (!response.ok) return mergeLocalModules(FALLBACK_MODULES);
    const data = await response.json();
    if (!isValidExport(data)) return mergeLocalModules(FALLBACK_MODULES);
    const remote: KxfLearningModule[] = (data.records.learning_modules as unknown[]).map(normalizeModule);
    return mergeLocalModules(remote.length > 0 ? remote : FALLBACK_MODULES);
  } catch {
    return mergeLocalModules(FALLBACK_MODULES);
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
  EAR: { name: 'Geowissenschaften', color: '#C0392B', bg: '#FDF0EE', border: '#E8B0A8' },
  ENG: { name: 'Engineering', color: '#64748B', bg: '#F1F5F9', border: '#CBD5E1' }
};

const emptyAssets = { image: [], video: [], audio: [], experiment: [] };

const LOCAL_TMQ_MODULES: KxfLearningModule[] = [
  {
    id: 'TM2-COMB-001',
    version: '0.1.0',
    created: '2026-07-04',
    modified: '2026-07-04T08:45:00+02:00',
    meta: {
      title: 'Überlagerung von Spannungen',
      subject: 'ENG',
      type: 'learning_path',
      status: 'built',
      entry_question: 'Wann darf man Spannungen addieren — und wann entsteht ein Spannungszustand?',
      depth_min: 3,
      depth_max: 4,
      duration_min: 60,
      duration_max: 60
    },
    assets: { text: ['modules/tm2/TM2-COMB-001.yaml'], svg: [], ...emptyAssets },
    dependencies: { requires: [], module_unlocks: ['TM2-PRESS-001', 'TM2-STRESS-001'], path_unlocks: [], archive_unlocks: [], related: [] },
    noxia: { grants: [], required_for: [] },
    branches: [{ id: 'BR:ENG:TM2', label: 'TM2 Festigkeitslehre', unlocks_at: 'module_complete' }]
  },
  {
    id: 'TM2-PRESS-001',
    version: '0.1.0',
    created: '2026-07-04',
    modified: '2026-07-04T08:45:00+02:00',
    meta: {
      title: 'Dünnwandige Druckbehälter und Kesselformeln',
      subject: 'ENG',
      type: 'learning_path',
      status: 'built',
      entry_question: 'Warum ist die Umfangsspannung beim Kessel doppelt so groß wie die Längsspannung?',
      depth_min: 3,
      depth_max: 4,
      duration_min: 45,
      duration_max: 45
    },
    assets: { text: ['modules/tm2/TM2-PRESS-001.yaml'], svg: [], ...emptyAssets },
    dependencies: { requires: ['TM2-COMB-001'], module_unlocks: ['TM2-STRESS-001'], path_unlocks: [], archive_unlocks: [], related: [] },
    noxia: { grants: [], required_for: [] },
    branches: [{ id: 'BR:ENG:PRESSURE-VESSELS', label: 'Druckbehälter', unlocks_at: 'module_complete' }]
  },
  {
    id: 'TM2-STRESS-001',
    version: '0.1.0',
    created: '2026-07-04',
    modified: '2026-07-04T08:45:00+02:00',
    meta: {
      title: 'Spannungszustand im Punkt',
      subject: 'ENG',
      type: 'learning_path',
      status: 'built',
      entry_question: 'Warum gibt es nicht die eine Spannung im Punkt?',
      depth_min: 3,
      depth_max: 4,
      duration_min: 75,
      duration_max: 75
    },
    assets: { text: ['modules/tm2/TM2-STRESS-001.yaml'], svg: [], ...emptyAssets },
    dependencies: { requires: ['TM2-COMB-001'], module_unlocks: ['TM2-PRINCIPAL-001'], path_unlocks: [], archive_unlocks: [], related: ['TM2-PRESS-001'] },
    noxia: { grants: [], required_for: [] },
    branches: [{ id: 'BR:ENG:STRESS-STATE', label: 'Spannungszustände', unlocks_at: 'module_complete' }]
  },
  {
    id: 'TM2-PRINCIPAL-001',
    version: '0.1.0',
    created: '2026-07-04',
    modified: '2026-07-04T08:45:00+02:00',
    meta: {
      title: 'Hauptspannungen und Mohrscher Kreis',
      subject: 'ENG',
      type: 'learning_path',
      status: 'built',
      entry_question: 'In welcher Richtung wird die Normalspannung maximal?',
      depth_min: 4,
      depth_max: 4,
      duration_min: 90,
      duration_max: 90
    },
    assets: { text: ['modules/tm2/TM2-PRINCIPAL-001.yaml'], svg: [], ...emptyAssets },
    dependencies: { requires: ['TM2-STRESS-001'], module_unlocks: ['TM2-COMB-002'], path_unlocks: [], archive_unlocks: [], related: [] },
    noxia: { grants: [], required_for: [] },
    branches: [{ id: 'BR:ENG:MOHR', label: 'Mohrscher Kreis', unlocks_at: 'module_complete' }]
  },
  {
    id: 'TM2-COMB-002',
    version: '0.1.0',
    created: '2026-07-04',
    modified: '2026-07-04T08:45:00+02:00',
    meta: {
      title: 'Biegung und Torsion an Wellen',
      subject: 'ENG',
      type: 'learning_path',
      status: 'built',
      entry_question: 'Warum ist der Randpunkt einer Welle bei Biegung und Torsion kritisch?',
      depth_min: 4,
      depth_max: 4,
      duration_min: 75,
      duration_max: 75
    },
    assets: { text: ['modules/tm2/TM2-COMB-002.yaml'], svg: [], ...emptyAssets },
    dependencies: { requires: ['TM2-COMB-001', 'TM2-PRINCIPAL-001'], module_unlocks: ['TM2-STRAIN-001'], path_unlocks: [], archive_unlocks: [], related: [] },
    noxia: { grants: [], required_for: [] },
    branches: [{ id: 'BR:ENG:SHAFTS', label: 'Wellen', unlocks_at: 'module_complete' }]
  },
  {
    id: 'TM2-STRAIN-001',
    version: '0.1.0',
    created: '2026-07-04',
    modified: '2026-07-04T08:45:00+02:00',
    meta: {
      title: 'Mehrachsige Dehnung, Hooke und DMS',
      subject: 'ENG',
      type: 'learning_path',
      status: 'built',
      entry_question: 'Wie kommt man experimentell von gemessenen Dehnungen zu Spannungen?',
      depth_min: 4,
      depth_max: 4,
      duration_min: 60,
      duration_max: 60
    },
    assets: { text: ['modules/tm2/TM2-STRAIN-001.yaml'], svg: [], ...emptyAssets },
    dependencies: { requires: ['TM2-STRESS-001'], module_unlocks: [], path_unlocks: [], archive_unlocks: [], related: ['TM2-PRINCIPAL-001'] },
    noxia: { grants: [], required_for: [] },
    branches: [{ id: 'BR:ENG:DMS', label: 'DMS und Messung', unlocks_at: 'module_complete' }]
  }
];

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
