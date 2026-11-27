/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:      tests/next-fetch.d.ts
 * Name:      test-only Next fetch augmentation
 * Version:   0.1.0
 * Created:   2026-11-27
 *
 * lib/kxf.ts uses Next's `next.revalidate` fetch option. tsconfig.test.json
 * compiles lib/kxf.ts without Next's generated next-env.d.ts, so mirror the
 * augmentation Next provides in node_modules/next/types/global.d.ts.
 */

interface NextFetchRequestConfig {
  revalidate?: number | false;
  tags?: string[];
}

interface RequestInit {
  next?: NextFetchRequestConfig | undefined;
}
