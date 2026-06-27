<!--
KUEPER - Solar Science Foundation (SSF)
Path: docs/requests/KB-REQUEST-0001-mathematics-foundations.md
Repo: github.com/thomaspeterkueper/solarsciencefoundation/blob/main/docs/requests/KB-REQUEST-0001-mathematics-foundations.md
Name: Knowledge Graph request - mathematics foundations
Version: 0.1.0
Created: 2026-06-27
Modified: 2026-06-27 09:00 CEST
Depends: docs/KXF.md
-->

# KB-REQUEST-0001 - Mathematics foundations

## Needed by

Solar Science Foundation

## Purpose

SSF starts building a Khan-Academy-like mathematics track from basic arithmetic to Abitur level. The Knowledge Graph should provide the canonical subject hierarchy, concept IDs, prerequisite relations and learning-module mappings.

SSF can temporarily provide local didactic fallback content, but canonical IDs and dependencies should come from the KUEPER Knowledge Graph.

## Requested Knowledge Graph content

### Subject

```text
SUB:MAT
Mathematics
```

### Levels

```text
MAT:L0 Elementary foundations
MAT:L1 Foundations / Sekundarstufe I
MAT:L2 Secondary / Mittelstufe
MAT:L3 Advanced / Abitur
MAT:L4 University foundations
```

### Initial concepts

```text
CON:MAT:L0:numbers
CON:MAT:L0:place-value
CON:MAT:L0:addition
CON:MAT:L0:subtraction
CON:MAT:L0:multiplication
CON:MAT:L0:division
CON:MAT:L1:fractions
CON:MAT:L1:decimals
CON:MAT:L1:percentages
CON:MAT:L1:powers
CON:MAT:L1:roots
CON:MAT:L1:terms
CON:MAT:L1:equations
CON:MAT:L2:linear-functions
CON:MAT:L2:coordinate-systems
CON:MAT:L2:geometry
CON:MAT:L3:quadratic-functions
CON:MAT:L3:exponential-functions
CON:MAT:L3:logarithms
CON:MAT:L3:trigonometry
CON:MAT:L3:vectors
CON:MAT:L3:differential-calculus
CON:MAT:L3:integral-calculus
CON:MAT:L3:statistics
```

### Initial learning modules

```text
LRN:SSF:MAT-0001 Numbers and place value
LRN:SSF:MAT-0002 Addition as combining quantities
LRN:SSF:MAT-0003 Multiplication as repeated addition
LRN:SSF:MAT-0004 Fractions as parts of a whole
LRN:SSF:MAT-0005 Percentages as hundredths
```

### Suggested prerequisite chain

```text
CON:MAT:L0:numbers -> CON:MAT:L0:place-value
CON:MAT:L0:numbers -> CON:MAT:L0:addition
CON:MAT:L0:addition -> CON:MAT:L0:multiplication
CON:MAT:L0:multiplication -> CON:MAT:L0:division
CON:MAT:L0:division -> CON:MAT:L1:fractions
CON:MAT:L1:fractions -> CON:MAT:L1:percentages
CON:MAT:L1:fractions -> CON:MAT:L1:decimals
CON:MAT:L1:multiplication -> CON:MAT:L1:powers
CON:MAT:L1:powers -> CON:MAT:L3:exponential-functions
CON:MAT:L3:exponential-functions -> CON:MAT:L3:logarithms
CON:MAT:L3:trigonometry -> CON:L1:orbitalmechanik
CON:MAT:L3:vectors -> CON:L1:orbitalmechanik
CON:MAT:L3:differential-calculus -> CON:L1:gravitation
```

## KXF fields requested

For concepts:

```json
{
  "id": "CON:MAT:L0:numbers",
  "type": "Concept",
  "domain": "MAT",
  "level": "L0",
  "title": {
    "de": "Zahlen",
    "en": "Numbers"
  },
  "summary": {
    "de": "...",
    "en": "..."
  },
  "requires": [],
  "enables": []
}
```

For learning modules:

```json
{
  "id": "LRN:SSF:MAT-0001",
  "system": "SYS:KUEPER:ssf",
  "title": {
    "de": "Zahlen und Stellenwert",
    "en": "Numbers and place value"
  },
  "summary": {
    "de": "...",
    "en": "..."
  },
  "teaches": ["CON:MAT:L0:numbers", "CON:MAT:L0:place-value"],
  "requires": [],
  "unlocks": []
}
```

## Priority

High

## Blocks

- Automatic subject and learning-path generation in SSF
- Consistent prerequisite chains from mathematics to physics, chemistry and astronomy
- Later NOXIA unlock requirements based on real learning prerequisites

## Temporary SSF fallback

SSF currently provides local fallback content for the first five mathematics modules. Once KXF includes canonical mathematics concepts and module mappings, SSF should prefer KXF and keep local content only for didactic body text and exercises until those become part of KXF.
