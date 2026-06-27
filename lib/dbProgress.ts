import { buildUnlocks, type ModuleCompletion, type SubmittedAnswer, type Unlock } from './progress';
import { createServerSupabaseClient } from './supabase/server';

export type DbProgress = {
  playerId: string;
  completedModules: ModuleCompletion[];
  attempts: number;
};

export async function saveCompletionToSupabase(args: {
  userId: string;
  moduleId: string;
  score: number;
  answers: SubmittedAnswer[];
  graded: { exerciseId: string; selectedOption: number; correct: boolean }[];
}): Promise<{ saved: boolean; unlocks: Unlock[] }> {
  try {
    const supabase = createServerSupabaseClient();
    const now = new Date().toISOString();

    await supabase.from('learning_progress').upsert({
      user_id: args.userId,
      module_id: args.moduleId,
      score: args.score,
      completed_at: now,
      source: 'ssf'
    });

    if (args.graded.length > 0) {
      await supabase.from('exercise_attempts').insert(
        args.graded.map((answer) => ({
          user_id: args.userId,
          module_id: args.moduleId,
          exercise_id: answer.exerciseId,
          selected_option: answer.selectedOption,
          correct: answer.correct
        }))
      );
    }

    const unlocks = buildUnlocks([args.moduleId]);
    if (unlocks.length > 0) {
      await supabase.from('unlocks').upsert(
        unlocks.map((unlock) => ({
          user_id: args.userId,
          unlock_id: unlock.id,
          source_module: unlock.sourceModule,
          target_system: unlock.target,
          status: unlock.status,
          granted_at: now
        })),
        { onConflict: 'user_id,unlock_id' }
      );
    }

    return { saved: true, unlocks };
  } catch {
    return { saved: false, unlocks: buildUnlocks([args.moduleId]) };
  }
}

export async function getDbProgress(userId: string): Promise<DbProgress | null> {
  try {
    const supabase = createServerSupabaseClient();
    const [{ data: progress }, { count }] = await Promise.all([
      supabase
        .from('learning_progress')
        .select('module_id, completed_at, score')
        .eq('user_id', userId)
        .order('completed_at', { ascending: false }),
      supabase
        .from('exercise_attempts')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', userId)
    ]);

    return {
      playerId: userId,
      completedModules: (progress ?? []).map((item) => ({
        moduleId: String(item.module_id),
        completedAt: String(item.completed_at),
        score: Number(item.score)
      })),
      attempts: count ?? 0
    };
  } catch {
    return null;
  }
}

export async function getDbCompletedModuleIds(userId: string): Promise<string[] | null> {
  const progress = await getDbProgress(userId);
  return progress?.completedModules.map((module) => module.moduleId) ?? null;
}

export async function getDbUnlocks(userId: string): Promise<Unlock[] | null> {
  try {
    const supabase = createServerSupabaseClient();
    const { data } = await supabase
      .from('unlocks')
      .select('unlock_id, source_module, target_system, status')
      .eq('user_id', userId)
      .eq('status', 'granted');

    return (data ?? []).map((item) => ({
      id: String(item.unlock_id),
      sourceModule: String(item.source_module),
      target: 'NOXIA',
      type: 'research_unlock',
      status: 'granted'
    }));
  } catch {
    return null;
  }
}
