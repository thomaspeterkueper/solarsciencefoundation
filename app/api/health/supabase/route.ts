import { NextResponse } from 'next/server';

export function GET() {
  const hasUrl = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const hasAnonKey = Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const hasPublishableKey = Boolean(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
  const hasAnyPublicKey = hasAnonKey || hasPublishableKey;
  const hasServiceKey = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);

  return NextResponse.json({
    schema: 'SSF-HEALTH-0.1',
    supabase: {
      hasUrl,
      hasAnonKey,
      hasPublishableKey,
      hasAnyPublicKey,
      hasServiceKey,
      readyForBrowserAuth: hasUrl && hasAnyPublicKey
    }
  });
}
