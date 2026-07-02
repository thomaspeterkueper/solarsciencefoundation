import { NextResponse } from 'next/server';
import { learningPaths } from '../../../lib/learningPaths';

export async function GET() {
  return NextResponse.json({
    schema: 'SSF-LEARNING-PATHS-0.1',
    paths: learningPaths
  });
}
