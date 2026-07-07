import type { ReactNode } from 'react';

export function Badge({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`ui-badge ${className}`.trim()}>{children}</span>;
}
