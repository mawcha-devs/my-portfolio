import * as React from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant =
  | 'default'
  | 'secondary'
  | 'outline'
  | 'ghost';
type ButtonSize = 'default' | 'sm' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variants: Record<ButtonVariant, string> = {
  default:
    'bg-primary text-primary-foreground shadow-[0_8px_24px_hsl(var(--primary)/0.18)] hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-[0_12px_30px_hsl(var(--primary)/0.25)]',
  secondary:
    'bg-muted text-foreground hover:-translate-y-0.5 hover:bg-muted/80',
  outline:
    'border border-border bg-transparent text-foreground hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/10',
  ghost: 'bg-transparent text-foreground hover:bg-muted',
};

const sizes: Record<ButtonSize, string> = {
  default: 'h-10 px-4 py-2 text-sm',
  sm: 'h-9 px-3 text-xs',
  lg: 'h-11 px-5 text-sm',
};

export function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium transition-[background-color,border-color,box-shadow,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
