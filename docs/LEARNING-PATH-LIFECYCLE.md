# SSF Learning Path Lifecycle

**Version:** 1.1.0  
**Status:** Active  
**Scope:** Solar Science Foundation learning paths
**Updated:** 2026-09-13

## Purpose

Learning paths are the learner-facing experience of the SSF. KXF learning modules and KG concepts remain canonical knowledge anchors; a learning path translates one or more anchors into observations, explanations, visualizations or experiments, exercises, quiz gates and onward connections.

The didactic sequence is defined by `SSF-DIDAKTIK.md`. A learning path must therefore not be reduced to `Text → Quiz` or `Experiment → Quiz`.

## Status lifecycle

### `prototype`

Publicly testable, but not yet canonical as a finished learning experience.

A prototype may still change in:

- didactic order;
- wording and examples;
- visualizations and interactive experiments;
- quiz questions and gates;
- depth-point allocation;
- accessibility and responsive behaviour.

Prototype paths may be shown to learners, but progress and unlock behaviour must not be treated as permanently stable unless explicitly documented.

### `active`

Didactically reviewed, technically integrated and released for regular learning progress.

An active path requires:

- unique path, unit and section IDs;
- all required sections available in the native SSF runtime;
- the necessary mental model before any interaction that depends on it;
- every interaction to have a genuine subject-matter learning purpose;
- quiz gates tested and placed only after sufficient explanation/experience;
- responsive and keyboard-usable interaction;
- source and image credits present where required;
- unlock mappings reviewed;
- no unresolved registry validation errors.

## Runtime registry

`lib/learningPathRegistry.ts` is the **only consumer-facing registry layer**.

It:

- combines governed specialized path definitions with still-supported legacy definitions;
- validates path, module, unit and section identities;
- exposes one deterministic record per path ID;
- canonicalizes mapped legacy domain references;
- quarantines unresolved legacy-domain paths;
- excludes superseded legacy definitions from the consumable registry;
- supplies overview/detail routes and module lookup.

Application code should consume the registry API rather than importing the raw legacy array from `lib/learningPaths.ts`.

## Source hierarchy

The project is in a controlled migration from one large historical source file to governed per-topic files.

Priority is:

1. **Governed specialized path file** under `lib/learningPaths/*.ts`
2. **Consumer registry** in `lib/learningPathRegistry.ts`
3. **Legacy source** in `lib/learningPaths.ts` only for paths not yet migrated

If the same path ID exists in a governed specialized file and in the legacy source, the specialized path is the authoritative SSF definition and the legacy copy must be listed as superseded until physically removed.

A new or substantially revised learning path must **not** be added to the giant legacy file.

## Legacy-removal rule

A legacy path block may be physically removed from `lib/learningPaths.ts` when all of the following are true:

1. an equivalent or intentionally revised specialized path exists;
2. the specialized path is registered;
3. canonical source/KXF/domain identities are verified;
4. regression tests cover the canonical lookup(s);
5. no consumer imports the raw legacy array for that path;
6. removal does not break gates/unlocks of another still-legacy path.

After physical removal, its ID should also be removed from the registry's superseded-ID set. The goal is that this set shrinks monotonically toward zero.

The migration inventory and removal order are documented in `LEARNING-PATH-LEGACY-MIGRATION.md`.

## Migration rule for interactive prototypes

Interactive standalone prototypes are migrated one path at a time into native Next.js components.

A path may move from `prototype` to `active` only after the native route renders its actual learning experience rather than only descriptive metadata.

Where interactivity adds no learning value, a schema, illustration, animation, image or comparison is preferable; `active` does not imply that a path must contain an interactive experiment.

The first reference migration was:

`PATH:SSF:PHY-SKY-0001` → native Rayleigh-scattering experiment.
