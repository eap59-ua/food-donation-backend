import React from 'react';
import { clsx } from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && <label className="text-sm font-semibold text-foreground block">{label}</label>}
        <input
          ref={ref}
          className={clsx(
            'w-full px-4 py-2.5 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 transition-all placeholder:text-muted-foreground',
            error ? 'border-destructive focus:ring-destructive/50' : 'border-border focus:ring-primary/50',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-destructive font-medium">{error}</p>}
        {helperText && <p className="text-xs text-muted-foreground">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
