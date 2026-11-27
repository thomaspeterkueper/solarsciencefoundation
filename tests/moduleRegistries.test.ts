/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      tests/moduleRegistries.test.ts
 * Name:      module registries - domain and publication governance
 * Version:   0.1.0
 * Created:   2026-11-27
 * Depends:   lib/modules.ts, lib/subjects.ts, lib/kxf.ts
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  isPublishedModule,
  learningModules,
  publishedLearningModules
} from '../lib/modules';
import { subjects } from '../lib/subjects';
import { normaliseKxfModules } from '../lib/kxf';

test('every module domain resolves to a registered subject', () => {
  const subjectTitles = new Set(subjects.map((subject) => subject.title.toLowerCase()));
  for (const module of learningModules) {
    assert.ok(
      subjectTitles.has(module.domain.toLowerCase()),
      `module ${module.id} has domain "${module.domain}" without a matching subject`
    );
  }
});

test('draft modules are excluded from the public module view', () => {
  const publicModules = normaliseKxfModules({ schema: 'KXF-0.1', records: {} });
  for (const module of learningModules) {
    if (!isPublishedModule(module)) {
      assert.ok(
        !publicModules.some((candidate) => candidate.id === module.id),
        `draft module ${module.id} must not be exposed through the KXF adapter`
      );
    }
  }
});

test('SSF-GEO-2101 stays draft until its KG document is registered', () => {
  const module = learningModules.find((candidate) => candidate.id === 'SSF-GEO-2101');
  assert.ok(module, 'expected the Dione module to remain in the local registry');
  assert.equal(module.status, 'draft');
  assert.equal(module.domain, 'Earth science');
  assert.equal(module.source.authority, 'DOC:KUE:KUE-GEO-DIONE-2026-DE');
  assert.deepEqual(module.source.kxfEntityIds, []);
  assert.ok(!publishedLearningModules.some((candidate) => candidate.id === module.id));
});
