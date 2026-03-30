import React from 'react';
import { clsx } from 'clsx';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
}

export const Badge: React.FC<BadgeProps> = ({ className, variant = 'primary', size = 'md', ...props }) => {
  const variants = {
    primary: 'bg-primary/10 text-primary border border-primary/20',
    secondary: 'bg-secondary/10 text-secondary border border-secondary/20',
    success: 'bg-green-500/10 text-green-700 border border-green-500/20 dark:text-green-400',
    warning: 'bg-yellow-500/10 text-yellow-700 border border-yellow-500/20 dark:text-yellow-400',
    destructive: 'bg-destructive/10 text-destructive border border-destructive/20'
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <span
      className={clsx('inline-block font-medium rounded-full whitespace-nowrap', variants[variant], sizes[size], className)}
      {...props}
    />
  );
};
