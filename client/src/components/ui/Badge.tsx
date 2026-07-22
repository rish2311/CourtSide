import React from 'react';
import { cn } from '@/utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
}

export const Badge = ({
  children,
  variant = 'primary',
  className,
}: BadgeProps) => {
  const variants = {
    primary: 'bg-secondary-container text-on-secondary-container border-secondary/20',
    secondary: 'bg-surface-container text-primary border-outline-variant/30',
    outline: 'bg-transparent text-on-surface-variant border-outline-variant',
  };

  return (
    <span className={cn(
      'inline-flex items-center gap-xs px-sm py-xs rounded-full border font-label-sm text-label-sm shadow-sm',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};
