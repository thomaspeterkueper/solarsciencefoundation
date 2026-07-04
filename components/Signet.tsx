/**
 * KUEPER · Solar Science Foundation (SSF)
 * Path:     components/Signet.tsx
 * Version:  0.2.0
 * Modified: 2026-07-04
 */

type SignetProps = { size?: number };

export default function Signet({ size = 36 }: SignetProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" style={{ display: 'block' }}>
      <circle cx="20" cy="20" r="16" fill="none" stroke="var(--navy)" strokeWidth="1.5" opacity="0.85" />
      <ellipse cx="20" cy="20" rx="16" ry="6.4" fill="none" stroke="var(--steel)" strokeWidth="1" opacity="0.7" />
      <circle cx="20" cy="20" r="5" fill="var(--gold)" />
      <circle cx="36" cy="20" r="2" fill="var(--navy)" />
    </svg>
  );
}
