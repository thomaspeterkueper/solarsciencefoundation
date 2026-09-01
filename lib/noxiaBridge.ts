import { getKxfLearningModuleById, getKxfLearningModules } from './kxf';
import { getDidacticModuleContent, type DidacticModuleContent } from './didacticContent';
import { getScienceFoundationContent } from './didacticScienceFoundations';
import { getRegisteredLearningPathById, getRegisteredLearningPathForModule } from './learningPathRegistry';
import type { LearningPath, LearningPathSection } from './learningPaths';
import { getLearningInteractive, type LearningInteractiveParams } from './learningInteractives';
import { gravitationsbrunnenLearningPath } from './learningPaths/gravitationsbrunnen';
import { buildUnlocks } from './progress';

export type NoxiaKnowledgeModule = {
  id: string;
  pathId: string | null;
  title: string;
  domain: string;
  difficulty: number;
  durationMinutes: number;
  summary: string;
  unlocks: string[];
  sourceEntityIds: string[];
  ssfUrl: string;
  detailUrl: string;
};

export type NoxiaModuleSection =
  | { type: 'heading'; text: string }
  | { type: 'text'; text: string }
  | { type: 'key_point'; text: string }
  | { type: 'example'; title: string; text: string }
  | { type: 'task'; prompt: string; hint?: string }
  | {
      type: 'interactive';
      interactiveId: string;
      title: string;
      instruction: string;
      params: LearningInteractiveParams;
      fallback: string;
    };

export type NoxiaModuleDetail = NoxiaKnowledgeModule & {
  schemaVersion: '1.0';
  contentVersion: '1.1';
  sections: NoxiaModuleSection[];
  assessment: Array<{
    type: 'multiple_choice';
    question: string;
    options: string[];
    correctOption: number;
    explanation: string;
  }>;
  prerequisites: string[];
  sources: Array<{ authority: string; entityIds: string[] }>;
};

function getDidactic(moduleId: string): DidacticModuleContent | undefined {
  return getDidacticModuleContent(moduleId) ?? getScienceFoundationContent(moduleId);
}

function getPathForModule(moduleId: string) {
  const registered = getRegisteredLearningPathForModule(moduleId) ?? getRegisteredLearningPathById(moduleId);
  if (registered) return registered;
  const canonicalGravityIds = new Set([
    'PHY-L2-000005',
    'LRN:SSF:PHY-ENERGIE-ARBEIT-0001',
  ]);
  return canonicalGravityIds.has(moduleId) ? gravitationsbrunnenLearningPath : null;
}

function collectInteractiveSections(moduleId: string): NoxiaModuleSection[] {
  const path = getPathForModule(moduleId);
  if (!path) return [];
  const seen = new Set<string>();
  const sections: NoxiaModuleSection[] = [];
  for (const unit of path.units) {
    for (const section of unit.sections) {
      if (!section.interactiveId || seen.has(section.interactiveId)) continue;
      const interactive = getLearningInteractive(section.interactiveId);
      if (!interactive) continue;
      seen.add(section.interactiveId);
      sections.push({ type: 'interactive', ...interactive });
    }
  }
  return sections;
}

function baseUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? 'https://solarsciencefoundation.vercel.app';
}

function toNoxiaModule(module: Awaited<ReturnType<typeof getKxfLearningModules>>[number]): NoxiaKnowledgeModule {
  const didactic = getDidactic(module.id);
  const path = getPathForModule(module.id);
  const site = baseUrl();
  return {
    id: module.id,
    pathId: path?.id ?? null,
    title: module.title,
    domain: module.domain,
    difficulty: module.difficulty,
    durationMinutes: didactic?.durationMinutes ?? module.durationMinutes,
    summary: module.summary,
    unlocks: module.unlocks,
    sourceEntityIds: module.source.kxfEntityIds,
    ssfUrl: `${site}/modules/${module.id}`,
    detailUrl: `${site}/api/noxia/modules/${encodeURIComponent(module.id)}`
  };
}

function pathModuleId(path: LearningPath) {
  return path.kxfModuleId || path.sourceModuleId || path.id;
}

function pathDomain(path: LearningPath) {
  return path.domainsNeeded?.[0] ?? 'Science';
}

function toNoxiaPathModule(path: LearningPath): NoxiaKnowledgeModule {
  const site = baseUrl();
  const id = pathModuleId(path);
  return {
    id,
    pathId: path.id,
    title: path.title,
    domain: pathDomain(path),
    difficulty: 1,
    durationMinutes: Math.max(5, (path.units?.length ?? 1) * 7),
    summary: path.subtitle ?? '',
    unlocks: path.unlocks ?? [],
    sourceEntityIds: path.suppliedBy?.knowledgeGraph ?? [],
    ssfUrl: `${site}/learning-paths/${encodeURIComponent(path.id)}`,
    detailUrl: `${site}/api/noxia/modules/${encodeURIComponent(id)}`
  };
}

function sectionToNoxia(section: LearningPathSection): NoxiaModuleSection[] {
  if (section.interactiveId) {
    const interactive = getLearningInteractive(section.interactiveId);
    if (interactive) return [{ type: 'interactive', ...interactive }];
  }
  if (section.kind === 'example') {
    return [{ type: 'example', title: section.title, text: section.summary }];
  }
  if (section.kind === 'exercise') {
    return [{ type: 'task', prompt: section.summary }];
  }
  if (section.kind === 'quiz') {
    return [{ type: 'task', prompt: section.summary, hint: 'Prüfe die Ursache-Wirkungs-Kette, bevor du das Modul abschließt.' }];
  }
  if (section.kind === 'observation') {
    return [{ type: 'text', text: section.summary }];
  }
  if (section.kind === 'experiment') {
    return [{ type: 'example', title: section.title, text: section.summary }];
  }
  return [{ type: 'key_point', text: section.summary }];
}

function pathDetail(path: LearningPath): NoxiaModuleDetail {
  const sections: NoxiaModuleSection[] = [];
  for (const unit of path.units) {
    sections.push({ type: 'heading', text: unit.title });
    if (unit.entryQuestion) sections.push({ type: 'text', text: unit.entryQuestion });
    for (const section of unit.sections) sections.push(...sectionToNoxia(section));
    if (unit.takeaway) sections.push({ type: 'key_point', text: `Merksatz: ${unit.takeaway}` });
  }
  const base = toNoxiaPathModule(path);
  return {
    ...base,
    schemaVersion: '1.0',
    contentVersion: '1.1',
    sections,
    assessment: [],
    prerequisites: path.domainsNeeded ?? [],
    sources: [{ authority: 'kueper-knowledge-graph', entityIds: base.sourceEntityIds }]
  };
}

export async function getNoxiaKnowledgeModules(): Promise<NoxiaKnowledgeModule[]> {
  const modules = await getKxfLearningModules();
  return modules.map(toNoxiaModule);
}

export async function getNoxiaKnowledgeModule(moduleId: string): Promise<NoxiaModuleDetail | null> {
  const module = await getKxfLearningModuleById(moduleId);
  if (!module) {
    const path = getPathForModule(moduleId);
    return path ? pathDetail(path) : null;
  }
  const didactic = getDidactic(module.id);
  const sections: NoxiaModuleSection[] = [];
  if (didactic) {
    sections.push({ type: 'heading', text: 'Lernziele' });
    for (const goal of didactic.learningGoals) sections.push({ type: 'key_point', text: goal });
    sections.push({ type: 'heading', text: 'Entdecken' });
    for (const paragraph of didactic.introduction) sections.push({ type: 'text', text: paragraph });
  }
  sections.push(...collectInteractiveSections(module.id));
  if (didactic) {
    sections.push({ type: 'heading', text: 'Beispiele' });
    for (const example of didactic.examples) sections.push({ type: 'example', title: example.title, text: example.body });
    sections.push({ type: 'heading', text: 'Jetzt du' });
    sections.push({ type: 'task', prompt: didactic.task.prompt, ...(didactic.task.hint ? { hint: didactic.task.hint } : {}) });
  }
  return {
    ...toNoxiaModule(module),
    schemaVersion: '1.0',
    contentVersion: '1.1',
    sections,
    assessment: didactic ? [{ type: 'multiple_choice', ...didactic.check }] : [],
    prerequisites: [],
    sources: [{ authority: module.source.authority, entityIds: module.source.kxfEntityIds }]
  };
}

export function getNoxiaDemoUnlockState(completedModules: string[]) {
  const unlocks = buildUnlocks(completedModules);
  return {
    completedModules,
    unlocks,
    hasOrbitalNavigation: unlocks.some((unlock) => unlock.id === 'UNL:NOX:orbital-navigation')
  };
}
