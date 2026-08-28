# SSF Research Watch v0.1

Research Watch separates discovery from accepted knowledge. A publication is evidence to triage, never an automatic curriculum rewrite.

The v0.1 domain layer provides configurable topics and source adapters, normalized discovery records, DOI/arXiv/registry deduplication, relevance scoring, impact classes `NEW`, `CONFIRMS`, `REVISES`, `CONTRADICTS`, `DEPRECATES`, `NO_IMPACT`, `UNCERTAIN`, bounded promotion to `RESEARCH_DISCOVERY` or `CANON_VALIDATION`, provenance and evidence-state fields, and cost-policy metadata.

Cross-project effects are emitted only as `KUEPER-OUTBOX-1.0` envelopes. SSF does not directly modify KG or NOXIA. Discovery adapters are replaceable and provider/model identity is not hard-coded.

## Deterministic acceptance fixtures

1. Two records with the same DOI normalize to one discovery.
2. An unrelated record with no watch-topic keyword classifies as `NO_IMPACT` and is not promoted.
3. A relevant correction/retraction classifies as `REVISES`/`DEPRECATES` and promotes to `CANON_VALIDATION`.

Persistence adapters may store the normalized records in a database or file store without changing this domain contract.
