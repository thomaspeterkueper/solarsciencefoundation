import type { MembershipRoleId } from './membership';

export type ParticipationRoleId =
  | 'learner'
  | 'member'
  | 'supporting-member'
  | 'author'
  | 'reviewer'
  | 'editor';

export type ParticipationRole = {
  id: ParticipationRoleId;
  titleDe: string;
  titleEn: string;
  purposeDe: string;
  purposeEn: string;
  capabilities: string[];
  requiresAdmission: boolean;
  mayPublishDirectly: boolean;
  technicalRoleIds: MembershipRoleId[];
};

export const participationRoles: ParticipationRole[] = [
  {
    id: 'learner',
    titleDe: 'Lernende',
    titleEn: 'Learner',
    purposeDe: 'Nutzt frei zugängliche Lerninhalte und dokumentiert den eigenen Lernfortschritt.',
    purposeEn: 'Uses open learning content and records personal learning progress.',
    capabilities: ['learn', 'track-own-progress'],
    requiresAdmission: false,
    mayPublishDirectly: false,
    technicalRoleIds: ['ROLE:SSF:guest', 'ROLE:SSF:free-member'],
  },
  {
    id: 'member',
    titleDe: 'Mitglied',
    titleEn: 'Member',
    purposeDe: 'Gehört zur SSF-Community und kann an Diskussionen, Rückmeldungen und gemeinschaftlichen Formaten teilnehmen.',
    purposeEn: 'Belongs to the SSF community and can participate in discussion, feedback and community formats.',
    capabilities: ['learn', 'track-own-progress', 'community-participation', 'submit-feedback'],
    requiresAdmission: true,
    mayPublishDirectly: false,
    technicalRoleIds: ['ROLE:SSF:free-member'],
  },
  {
    id: 'supporting-member',
    titleDe: 'Fördermitglied',
    titleEn: 'Supporting member',
    purposeDe: 'Unterstützt die Arbeit der SSF finanziell oder organisatorisch, ohne daraus redaktionelle Sonderrechte abzuleiten.',
    purposeEn: 'Supports SSF financially or organizationally without receiving special editorial authority.',
    capabilities: ['learn', 'community-participation', 'support-foundation'],
    requiresAdmission: true,
    mayPublishDirectly: false,
    technicalRoleIds: ['ROLE:SSF:supporting-member'],
  },
  {
    id: 'author',
    titleDe: 'Autorin oder Autor',
    titleEn: 'Author',
    purposeDe: 'Erarbeitet didaktische Beiträge und Module innerhalb der SSF und reicht sie zur fachlichen und redaktionellen Prüfung ein.',
    purposeEn: 'Creates didactic contributions and modules within SSF and submits them for scientific and editorial review.',
    capabilities: ['propose-didactic-content', 'revise-own-submissions', 'provide-sources'],
    requiresAdmission: true,
    mayPublishDirectly: false,
    technicalRoleIds: ['ROLE:SSF:contributor', 'ROLE:SSF:co-author'],
  },
  {
    id: 'reviewer',
    titleDe: 'Fachreview',
    titleEn: 'Reviewer',
    purposeDe: 'Prüft eingereichte Inhalte auf fachliche Belastbarkeit, Quellenlage und die korrekte Grenze zum Knowledge Graph.',
    purposeEn: 'Reviews submissions for scientific reliability, sourcing and the correct boundary to the Knowledge Graph.',
    capabilities: ['review-submissions', 'request-revision', 'recommend-publication'],
    requiresAdmission: true,
    mayPublishDirectly: false,
    technicalRoleIds: ['ROLE:SSF:co-author', 'ROLE:SSF:curator'],
  },
  {
    id: 'editor',
    titleDe: 'Redaktion',
    titleEn: 'Editor',
    purposeDe: 'Verantwortet die SSF-Veröffentlichung, didaktische Qualität und transparente Zuordnung von Autorenschaft und Review.',
    purposeEn: 'Owns SSF publication decisions, didactic quality and transparent attribution of authorship and review.',
    capabilities: ['editorial-decision', 'publish-ssf-content', 'manage-attribution'],
    requiresAdmission: true,
    mayPublishDirectly: true,
    technicalRoleIds: ['ROLE:SSF:curator'],
  },
];

export const editorialWorkflow = [
  'proposal',
  'editorial-screening',
  'scientific-review',
  'revision',
  'editorial-approval',
  'publication',
] as const;

export const governancePrinciples = {
  openLearning: 'Learning content remains accessible independently of membership.',
  supportIsNotAuthority: 'Financial support never grants scientific or editorial authority.',
  reviewedAuthorship: 'Author status permits contribution, not unreviewed publication.',
  sourceOfTruth: 'Canonical scientific facts and identifiers remain governed by the KUEPER Knowledge Graph.',
  ssfResponsibility: 'SSF governs didactics, presentation, exercises, learning progress and editorial publication.',
} as const;

export function getParticipationRole(id: ParticipationRoleId) {
  return participationRoles.find((role) => role.id === id) ?? null;
}
