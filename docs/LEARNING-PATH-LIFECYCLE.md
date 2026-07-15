# SSF Learning Path Lifecycle

**Version:** 1.0.0  
**Status:** Active  
**Scope:** Solar Science Foundation learning paths

## Purpose

Learning paths are the learner-facing experience of the SSF. KXF learning modules remain canonical knowledge anchors; a learning path translates one or more anchors into observations, explanations, experiments, exercises, quiz gates and onward connections.

## Status lifecycle

### `prototype`

Publicly testable, but not yet canonical as a finished learning experience.

A prototype may still change in:

- didactic order;
- wording and examples;
- interactive experiments;
- quiz questions and gates;
- depth-point allocation;
- accessibility and responsive behaviour.

Prototype paths may be shown to learners, but progress and unlock behaviour must not be treated as permanently stable unless explicitly documented.

### `active`

Didactically reviewed, technically integrated and released for regular learning progress.

An active path requires:

- unique path, unit and section IDs;
- all required sections available in the native SSF runtime;
- quiz gates tested;
- responsive and keyboard-usable interaction;
- source and image credits present where required;
- unlock mappings reviewed;
- no unresolved registry validation errors.

## Runtime registry

`lib/learningPathRegistry.ts` is the consumer-facing registry layer.

It:

- validates path IDs;
- exposes one deterministic record per ID;
- reports duplicate IDs during development;
- provides lifecycle metadata;
- supplies the overview and detail routes.

The source array in `lib/learningPaths.ts` remains the authored registry until it is split into per-path files. Consumers should not import that raw array directly.

## Migration rule

Interactive standalone prototypes are migrated one path at a time into native Next.js components.

A path may move from `prototype` to `active` only after the native route renders its actual learning interactions rather than only descriptive metadata.

The first reference migration is:

`PATH:SSF:PHY-SKY-0001` → native Rayleigh-scattering experiment.
