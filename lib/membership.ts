/**
 * KUEPER - Solar Science Foundation (SSF)
 * Path: lib/membership.ts
 * Repo: github.com/thomaspeterkueper/solarsciencefoundation/blob/main/lib/membership.ts
 * Name: membership - ecosystem-compatible membership model
 * Version: 0.1.0
 * Created: 2026-06-27
 * Modified: 2026-06-27 09:20 CEST
 * Depends: none
 */

export type EcosystemSystemId =
  | 'SYS:KUEPER:ssf'
  | 'SYS:KUEPER:noxia'
  | 'SYS:KUEPER:kueper-com'
  | 'SYS:KUEPER:knowledge-graph'
  | 'SYS:KUEPER:ota';

export type MembershipRoleId =
  | 'ROLE:SSF:guest'
  | 'ROLE:SSF:free-member'
  | 'ROLE:SSF:supporting-member'
  | 'ROLE:SSF:donor'
  | 'ROLE:SSF:contributor'
  | 'ROLE:SSF:co-author'
  | 'ROLE:SSF:curator'
  | 'ROLE:SSF:admin';

export type ProjectAccessScope =
  | 'read_public_content'
  | 'store_learning_progress'
  | 'earn_learning_unlocks'
  | 'support_project'
  | 'submit_content'
  | 'review_content'
  | 'publish_content'
  | 'manage_membership';

export type MembershipRole = {
  id: MembershipRoleId;
  label: string;
  publicLabel: string;
  description: string;
  scopes: ProjectAccessScope[];
  canGrantGamePower: false;
};

export type MembershipRecord = {
  memberId: string;
  displayName: string;
  roles: MembershipRoleId[];
  systems: EcosystemSystemId[];
  supporterSince?: string;
  publicCredit?: boolean;
};

export const membershipRoles: MembershipRole[] = [
  {
    id: 'ROLE:SSF:guest',
    label: 'Guest',
    publicLabel: 'Guest',
    description: 'Can read public learning content without an account.',
    scopes: ['read_public_content'],
    canGrantGamePower: false
  },
  {
    id: 'ROLE:SSF:free-member',
    label: 'Free Member',
    publicLabel: 'Free member',
    description: 'Can store progress and earn learning-based unlocks.',
    scopes: ['read_public_content', 'store_learning_progress', 'earn_learning_unlocks'],
    canGrantGamePower: false
  },
  {
    id: 'ROLE:SSF:supporting-member',
    label: 'Supporting Member',
    publicLabel: 'Supporting member',
    description: 'Supports SSF financially and may receive recognition or community access.',
    scopes: ['read_public_content', 'store_learning_progress', 'earn_learning_unlocks', 'support_project'],
    canGrantGamePower: false
  },
  {
    id: 'ROLE:SSF:donor',
    label: 'Donor',
    publicLabel: 'Donor',
    description: 'Supports the project through donations. Does not buy NOXIA power.',
    scopes: ['support_project'],
    canGrantGamePower: false
  },
  {
    id: 'ROLE:SSF:contributor',
    label: 'Contributor',
    publicLabel: 'Contributor',
    description: 'Can submit modules, exercises, corrections or translations for review.',
    scopes: ['read_public_content', 'store_learning_progress', 'earn_learning_unlocks', 'submit_content'],
    canGrantGamePower: false
  },
  {
    id: 'ROLE:SSF:co-author',
    label: 'Co-Author',
    publicLabel: 'Co-author',
    description: 'Creates and maintains curated learning material with attribution.',
    scopes: ['read_public_content', 'store_learning_progress', 'earn_learning_unlocks', 'submit_content', 'review_content'],
    canGrantGamePower: false
  },
  {
    id: 'ROLE:SSF:curator',
    label: 'Curator',
    publicLabel: 'Curator',
    description: 'Reviews, maps and prepares learning content for publication.',
    scopes: ['read_public_content', 'submit_content', 'review_content', 'publish_content'],
    canGrantGamePower: false
  },
  {
    id: 'ROLE:SSF:admin',
    label: 'Admin',
    publicLabel: 'Admin',
    description: 'Can manage memberships, publication state and system settings.',
    scopes: ['read_public_content', 'submit_content', 'review_content', 'publish_content', 'manage_membership'],
    canGrantGamePower: false
  }
];

export const demoMembers: MembershipRecord[] = [
  {
    memberId: 'MEM:SSF:demo-free',
    displayName: 'Demo learner',
    roles: ['ROLE:SSF:free-member'],
    systems: ['SYS:KUEPER:ssf', 'SYS:KUEPER:noxia'],
    publicCredit: false
  },
  {
    memberId: 'MEM:SSF:demo-supporter',
    displayName: 'Demo supporter',
    roles: ['ROLE:SSF:supporting-member'],
    systems: ['SYS:KUEPER:ssf', 'SYS:KUEPER:noxia'],
    supporterSince: '2026-06-27',
    publicCredit: true
  },
  {
    memberId: 'MEM:SSF:demo-coauthor',
    displayName: 'Demo co-author',
    roles: ['ROLE:SSF:co-author'],
    systems: ['SYS:KUEPER:ssf', 'SYS:KUEPER:knowledge-graph'],
    publicCredit: true
  }
];

export function getRoleById(id: MembershipRoleId) {
  return membershipRoles.find((role) => role.id === id) ?? null;
}

export function getMemberById(memberId: string) {
  return demoMembers.find((member) => member.memberId === memberId) ?? null;
}

export function expandMemberRoles(member: MembershipRecord) {
  return member.roles.map((roleId) => getRoleById(roleId)).filter((role): role is MembershipRole => role !== null);
}

export function toProjectAccess(member: MembershipRecord, system: EcosystemSystemId) {
  const roles = expandMemberRoles(member);
  const scopes = new Set<ProjectAccessScope>();

  for (const role of roles) {
    for (const scope of role.scopes) scopes.add(scope);
  }

  return {
    memberId: member.memberId,
    system,
    active: member.systems.includes(system),
    roles: roles.map((role) => role.id),
    scopes: [...scopes],
    canGrantGamePower: false
  };
}
