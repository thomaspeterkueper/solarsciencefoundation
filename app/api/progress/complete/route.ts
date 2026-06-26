/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      app/api/progress/complete/route.ts
 * Repo:      github.com/thomaspeterkueper/solarsciencefoundation/blob/main/app/api/progress/complete/route.ts
 * Name:      POST /api/progress/complete
 * Version:   0.1.0
 * Created:   2026-06-26
 * Modified:  2026-06-26 13:00 CEST
 * Depends:   next/server, lib/progress
 */

import { NextResponse } from 'next/server';
import { recordCompletion, type SubmittedAnswer } from '../../../../lib/progress';

type CompleteBody = {
  playerId?: unknown;
  moduleId?: unknown;
  answers?: unknown;
};

function parseAnswers(value: unknown): SubmittedAnswer[] | null {
  if (!Array.isArray(value)) return null;

  const answers: SubmittedAnswer[] = [];
  for (const item of value) {
    if (typeof item !== 'object' || item === null) return null;
    const record = item as Record<string, unknown>;
    if (
      typeof record.exerciseId !== 'string' ||
      typeof record.selectedOption !== 'number'
    ) {
      return null;
    }
    answers.push({
      exerciseId: record.exerciseId,
      selectedOption: record.selectedOption
    });
  }
  return answers;
}

export async function POST(request: Request) {
  let body: CompleteBody;
  try {
    body = (await request.json()) as CompleteBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { playerId, moduleId, answers } = body;

  if (typeof playerId !== 'string' || typeof moduleId !== 'string') {
    return NextResponse.json(
      { error: 'playerId and moduleId are required strings' },
      { status: 400 }
    );
  }

  const parsedAnswers = parseAnswers(answers);
  if (!parsedAnswers) {
    return NextResponse.json(
      { error: 'answers must be an array of { exerciseId, selectedOption }' },
      { status: 400 }
    );
  }

  const result = recordCompletion(playerId, moduleId, parsedAnswers);

  if (result.status === 'module_not_found') {
    return NextResponse.json({ error: 'Module not found' }, { status: 404 });
  }

  return NextResponse.json({
    schema: 'SSF-API-0.1',
    playerId,
    ...result
  });
}
