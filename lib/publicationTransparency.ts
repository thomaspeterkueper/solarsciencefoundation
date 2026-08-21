/**
 * KUEPER - Solar Science Foundation (SSF)
 * Path: lib/publicationTransparency.ts
 * Name: Local mirror of the system-wide publication transparency policy
 * Version: 1.0.0
 * Created: 2026-08-21
 * Source: ECO-ARC-0028-2026-DE / kueper-ecosystem config/publication-transparency.json
 */
import policy from '../config/publication-transparency.json';

export interface IndividualDisclosure {
  requiredByPolicy: boolean;
  recommendedWhen: string;
  template: string;
}

export interface TransparencyGovernance {
  sourceOfTruth: string;
  decision: string;
  distribution: string;
}

export interface PublicationTransparencyPolicy {
  id: string;
  version: string;
  effectiveDate: string;
  language: string;
  scope: string;
  title: string;
  shortLabel: string;
  shortNotice: string;
  fullNotice: string[];
  individualDisclosure: IndividualDisclosure;
  governance: TransparencyGovernance;
}

export const publicationTransparencyPolicy: PublicationTransparencyPolicy = policy;

export const POLICY_VERSION = policy.version;
