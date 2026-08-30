import { getKxfLearningModuleById, getKxfLearningModules } from './kxf';
import { getDidacticModuleContent, type DidacticModuleContent } from './didacticContent';
import { getScienceFoundationContent } from './didacticScienceFoundations';
import { getRegisteredLearningPathForModule } from './learningPathRegistry';
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
  const registered = getRegisteredLearningPathForModule(moduleId);
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

export async function getNoxiaKnowledgeModules(): Promise<NoxiaKnowledgeModule[]> {
  const modules = await getKxfLearningModules();
  return modules.map(toNoxiaModule);
}

export async function getNoxiaKnowledgeModule(moduleId: string): Promise<NoxiaModuleDetail | null> {
  const module = await getKxfLearningModuleById(moduleId);
  if (!module) return null;
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
