import type { ReactNode } from 'react';

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <article className={`ui-card ${className}`.trim()}>{children}</article>;
}
