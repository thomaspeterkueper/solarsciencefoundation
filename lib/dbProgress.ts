import { buildUnlocks, type ModuleCompletion, type SubmittedAnswer, type Unlock } from './progress';
import { createUserScopedSupabaseClient } from './supabase/server';

export type DbProgress = {
  playerId: string;
  completedModules: ModuleCompletion[];
  attempts: number;
};

export async function saveCompletionToSupabase(args: {
  accessToken: string;
  userId: string;
  moduleId: string;
  score: number;
  answers: SubmittedAnswer[];
  graded: { exerciseId: string; selectedOption: number; correct: boolean }[];
}): Promise<{ saved: boolean; unlocks: Unlock[] }> {
  try {
    const supabase = createUserScopedSupabaseClient(args.accessToken);
    const now = new Date().toISOString();

    const progressResult = await supabase.from('learning_progress').upsert({
      user_id: args.userId,
      module_id: args.moduleId,
      score: args.score,
      completed_at: now,
      source: 'ssf'
    });
    if (progressResult.error) throw progressResult.error;

    if (args.graded.length > 0) {
      const attemptsResult = await supabase.from('exercise_attempts').insert(
        args.graded.map((answer) => ({
          user_id: args.userId,
          module_id: args.moduleId,
          exercise_id: answer.exerciseId,
          selected_option: answer.selectedOption,
          correct: answer.correct
        }))
      );
      if (attemptsResult.error) throw attemptsResult.error;
    }

    const unlocks = buildUnlocks([args.moduleId]);
    if (unlocks.length > 0) {
      const unlockResult = await supabase.from('unlocks').upsert(
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
      if (unlockResult.error) throw unlockResult.error;
    }

    return { saved: true, unlocks };
  } catch {
    return { saved: false, unlocks: buildUnlocks([args.moduleId]) };
  }
}

export async function getDbProgress(userId: string, accessToken: string): Promise<DbProgress | null> {
  try {
    const supabase = createUserScopedSupabaseClient(accessToken);
    const [{ data: progress, error: progressError }, { count, error: countError }] = await Promise.all([
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

    if (progressError || countError) return null;

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

export async function getDbCompletedModuleIds(userId: string, accessToken: string): Promise<string[] | null> {
  const progress = await getDbProgress(userId, accessToken);
  return progress?.completedModules.map((module) => module.moduleId) ?? null;
}

export async function getDbUnlocks(userId: string, accessToken: string): Promise<Unlock[] | null> {
  try {
    const supabase = createUserScopedSupabaseClient(accessToken);
    const { data, error } = await supabase
      .from('unlocks')
      .select('unlock_id, source_module, target_system, status')
      .eq('user_id', userId)
      .eq('status', 'granted');

    if (error) return null;

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
