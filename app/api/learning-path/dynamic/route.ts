import { NextResponse } from 'next/server';
import { buildDynamicLearningPath, type LearningPathTargetType } from '../../../../lib/learningPathEngine';

function parseCompletedModules(value: string | null) {
  if (!value) return [];
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseTargetType(value: string | null): LearningPathTargetType | undefined {
  return value === 'document' || value === 'module' ? value : undefined;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const targetId = url.searchParams.get('targetId');

  if (!targetId) {
    return NextResponse.json(
      {
        schema: 'SSF-DYNAMIC-LEARNING-PATH-0.1',
        error: 'Missing required query parameter: targetId'
      },
      { status: 400 }
    );
  }

  const path = await buildDynamicLearningPath({
    targetId: decodeURIComponent(targetId),
    targetType: parseTargetType(url.searchParams.get('targetType')),
    completedModules: parseCompletedModules(url.searchParams.get('completedModules')),
  });

  return NextResponse.json(path);
}
