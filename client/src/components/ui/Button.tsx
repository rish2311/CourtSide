import React from 'react';
import { cn } from '@/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'cta' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  variant = 'primary',
  size = 'md',
  ...props
}, ref) => {
  const variants = {
    primary: 'bg-primary text-on-primary hover:bg-secondary',
    cta: 'bg-cta text-on-surface hover:opacity-90',
    secondary: 'bg-transparent border border-outline-variant text-on-surface hover:bg-surface-container',
  };

  const sizes = {
    sm: 'px-sm py-xs text-label-sm',
    md: 'px-md py-sm text-label-md',
    lg: 'px-lg py-md text-body-md',
  };

  return (
    <button
      ref={ref}
      className={cn(
        'rounded-soft transition-all duration-200 active:scale-95 font-label-md',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
});

Button.displayName = 'Button';
