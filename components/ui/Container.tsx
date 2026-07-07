import type { ReactNode } from 'react';

type ContainerProps = {
  children: ReactNode;
  className?: string;
  size?: 'default' | 'wide' | 'narrow';
};

export function Container({ children, className = '', size = 'default' }: ContainerProps) {
  return <div className={`ui-container ui-container-${size} ${className}`.trim()}>{children}</div>;
}
