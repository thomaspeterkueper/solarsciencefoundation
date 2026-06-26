import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json({
    schema: 'SSF-NOXIA-0.1',
    playerId: 'demo',
    completedModules: ['SSF-PHY-1101'],
    unlocks: [
      {
        id: 'UNL:NOX:orbital-navigation',
        sourceModule: 'SSF-PHY-1101',
        target: 'NOXIA',
        type: 'research_unlock',
        status: 'granted'
      }
    ]
  });
}
