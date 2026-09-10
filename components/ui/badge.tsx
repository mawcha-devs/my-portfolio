import * as React from 'react';
import { cn } from '@/lib/utils';

export type BadgeProps =
  React.HTMLAttributes<HTMLSpanElement>;

export function Badge({ className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-1 text-[0.68rem] font-medium uppercase tracking-[0.12em] text-muted-foreground',
        className,
      )}
      {...props}
    />
  );
}
