import React from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, fullWidth, disabled, ...props }, ref) => {
    const baseStyles = 'font-medium transition-all inline-flex items-center justify-center gap-2 rounded-lg';

    const variants = {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50',
      secondary: 'bg-secondary/10 text-secondary-foreground border border-secondary/20 hover:bg-secondary/20',
      outline: 'border border-border bg-background text-foreground hover:bg-muted',
      ghost: 'text-foreground hover:bg-muted',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2.5 text-base',
      lg: 'px-6 py-3 text-lg'
    };

    return (
      <button
        ref={ref}
        className={clsx(baseStyles, variants[variant], sizes[size], fullWidth && 'w-full', className)}
        disabled={loading || disabled}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
