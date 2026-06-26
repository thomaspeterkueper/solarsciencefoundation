# SSF file header convention

Use this header on important hand-written source files while the project is still small enough for explicit provenance to help orientation.

```ts
/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      <repo path>
 * Repo:      github.com/thomaspeterkueper/solarsciencefoundation/blob/main/<repo path>
 * Name:      <component / module / endpoint name>
 * Version:   0.1.0
 * Created:   2026-06-26
 * Modified:  2026-06-26 13:00 CEST
 * Depends:   <important dependencies>
 */
```

For Markdown files:

```md
<!--
KUEPER · Solar Science Foundation (SSF)
Path:      <repo path>
Repo:      github.com/thomaspeterkueper/solarsciencefoundation/blob/main/<repo path>
Name:      <document name>
Version:   0.1.0
Created:   2026-06-26
Modified:  2026-06-26 13:00 CEST
Depends:   —
-->
```

This convention is optional for generated files and may be simplified later if it becomes noise.
