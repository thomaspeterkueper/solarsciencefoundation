import { NextResponse } from 'next/server';
import { buildConfirmSignupEmailText, getLegalProjectInfo } from '../../../../lib/legal';

export async function GET() {
  const info = await getLegalProjectInfo();
  return NextResponse.json({
    schema: 'SSF-LEGAL-0.1',
    project: info,
    emailTemplates: {
      confirmSignup: {
        de: buildConfirmSignupEmailText(info, 'de'),
        en: buildConfirmSignupEmailText(info, 'en')
      }
    }
  });
}
