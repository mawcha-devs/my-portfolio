import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface NavLinkProps extends Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  'href'
> {
  href: React.ComponentProps<typeof Link>['href'];
}

export function AppLink({
  href,
  className,
  children,
  ...props
}: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'text-sm font-medium text-foreground/80 transition-colors hover:text-foreground',
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
