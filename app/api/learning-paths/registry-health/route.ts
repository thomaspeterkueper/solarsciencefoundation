import { NextResponse } from 'next/server';
import { learningPathRegistryIssues, registeredLearningPaths } from '../../../../lib/learningPathRegistry';

export const dynamic = 'force-dynamic';

export async function GET() {
  const criticalTypes = new Set([
    'duplicate_path_id',
    'duplicate_source_module_id',
    'duplicate_kxf_module_id',
    'duplicate_learning_object_id',
    'broken_unit_gate',
    'broken_alias_target',
    'legacy_domain_reference',
  ]);
  const critical = learningPathRegistryIssues.filter((issue) => criticalTypes.has(issue.type));

  return NextResponse.json({
    ok: critical.length === 0,
    pathCount: registeredLearningPaths.length,
    issueCount: learningPathRegistryIssues.length,
    criticalIssueCount: critical.length,
    issues: learningPathRegistryIssues,
  }, { status: critical.length === 0 ? 200 : 503 });
}
