import Link from 'next/link';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
};

export function Button({ children, href, variant = 'primary', className = '' }: Props) {
  const classNames = ['ui-button', `ui-button-${variant}`, className].filter(Boolean).join(' ');
  return href ? <Link href={href} className={classNames}>{children}</Link> : <button type="button" className={classNames}>{children}</button>;
}
