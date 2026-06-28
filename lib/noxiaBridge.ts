import { getKxfLearningModules } from './kxf';
import { buildUnlocks } from './progress';

export type NoxiaKnowledgeModule = {
  id: string;
  title: string;
  domain: string;
  difficulty: number;
  durationMinutes: number;
  summary: string;
  unlocks: string[];
  sourceEntityIds: string[];
  ssfUrl: string;
};

export async function getNoxiaKnowledgeModules(): Promise<NoxiaKnowledgeModule[]> {
  const modules = await getKxfLearningModules();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://solarsciencefoundation.vercel.app';

  return modules.map((module) => ({
    id: module.id,
    title: module.title,
    domain: module.domain,
    difficulty: module.difficulty,
    durationMinutes: module.durationMinutes,
    summary: module.summary,
    unlocks: module.unlocks,
    sourceEntityIds: module.source.kxfEntityIds,
    ssfUrl: `${baseUrl}/modules/${module.id}`
  }));
}

export function getNoxiaDemoUnlockState(completedModules: string[]) {
  const unlocks = buildUnlocks(completedModules);
  return {
    completedModules,
    unlocks,
    hasOrbitalNavigation: unlocks.some((unlock) => unlock.id === 'UNL:NOX:orbital-navigation')
  };
}
