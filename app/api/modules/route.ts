import { NextResponse } from 'next/server';
import { learningModules } from '../../../lib/modules';

export function GET() {
  return NextResponse.json({
    schema: 'SSF-API-0.1',
    modules: learningModules
  });
}
