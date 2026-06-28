import { fetchKxfSnapshot } from './kxf';

export type LegalProjectInfo = {
  projectId: string;
  projectName: string;
  operatorName: string;
  websiteUrl: string;
  privacyUrl: string;
  imprintUrl: string;
  statusNote: string;
  source: 'kxf' | 'fallback';
};

const fallbackLegalInfo: LegalProjectInfo = {
  projectId: 'ORG:SSF',
  projectName: 'Solar Science Foundation',
  operatorName: 'Thomas Peter Küper',
  websiteUrl: 'https://solarsciencefoundation.vercel.app',
  privacyUrl: 'https://solarsciencefoundation.vercel.app/privacy',
  imprintUrl: 'https://solarsciencefoundation.vercel.app/imprint',
  statusNote: 'Independent science learning project. Not an accredited institution.',
  source: 'fallback'
};

type ExtendedKxfEntity = {
  id: string;
  type?: string;
  name?: string;
  operatorName?: string;
  websiteUrl?: string;
  privacyUrl?: string;
  imprintUrl?: string;
  statusNote?: string;
};

function stringOr(value: unknown, fallback: string) {
  return typeof value === 'string' && value.trim() ? value : fallback;
}

export async function getLegalProjectInfo(projectId = 'ORG:SSF'): Promise<LegalProjectInfo> {
  const snapshot = await fetchKxfSnapshot();
  const entities = snapshot.data?.records?.entities as ExtendedKxfEntity[] | undefined;
  const entity = entities?.find((item) => item.id === projectId);

  if (!entity) return fallbackLegalInfo;

  return {
    projectId,
    projectName: stringOr(entity.name, fallbackLegalInfo.projectName),
    operatorName: stringOr(entity.operatorName, fallbackLegalInfo.operatorName),
    websiteUrl: stringOr(entity.websiteUrl, fallbackLegalInfo.websiteUrl),
    privacyUrl: stringOr(entity.privacyUrl, fallbackLegalInfo.privacyUrl),
    imprintUrl: stringOr(entity.imprintUrl, fallbackLegalInfo.imprintUrl),
    statusNote: stringOr(entity.statusNote, fallbackLegalInfo.statusNote),
    source: 'kxf'
  };
}

export function buildConfirmSignupEmailText(info: LegalProjectInfo, locale: 'de' | 'en' = 'de') {
  if (locale === 'en') {
    return `Subject: Please confirm your email address for ${info.projectName}\n\nHello,\n\nYou have created an account for ${info.projectName}.\n\nPlease confirm your email address by opening the following link:\n\n{{ .ConfirmationURL }}\n\nYour account will only be activated after confirmation. Once active, SSF can store your learning progress, achievements and partner-project unlocks.\n\n${info.projectName} is an independent science learning project by ${info.operatorName}. It provides short, connected science learning modules in German and English.\n\nIf you did not request this registration, you can ignore this email.\n\nPrivacy policy:\n${info.privacyUrl}\n\nImprint:\n${info.imprintUrl}\n\nWebsite:\n${info.websiteUrl}\n\nKind regards\n\n${info.projectName}\n${info.operatorName}`;
  }

  return `Betreff: Bitte bestätige deine E-Mail-Adresse für die ${info.projectName}\n\nHallo,\n\ndu hast gerade ein Konto für die ${info.projectName} erstellt.\n\nBitte bestätige deine E-Mail-Adresse über den folgenden Link:\n\n{{ .ConfirmationURL }}\n\nErst nach dieser Bestätigung wird dein Konto aktiviert. Danach kann SSF deinen Lernfortschritt, deine Achievements und Freischaltungen für Partnerprojekte speichern.\n\nDie ${info.projectName} ist ein unabhängiges Wissenschafts-Lernprojekt von ${info.operatorName}. Sie bietet kurze, miteinander verknüpfte Lernmodule in deutscher und englischer Sprache an.\n\nFalls du diese Registrierung nicht selbst vorgenommen hast, kannst du diese E-Mail ignorieren.\n\nDatenschutz:\n${info.privacyUrl}\n\nImpressum:\n${info.imprintUrl}\n\nWebsite:\n${info.websiteUrl}\n\nViele Grüße\n\n${info.projectName}\n${info.operatorName}`;
}
