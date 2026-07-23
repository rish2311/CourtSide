import React from 'react';
import { cn } from '@/utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  className,
  label,
  ...props
}, ref) => {
  return (
    <div className="flex flex-col gap-xs">
      {label && <label className="text-label-sm text-on-surface-variant">{label}</label>}
      <input
        ref={ref}
        className={cn(
          'bg-surface-bright border border-outline-variant rounded-lg px-md py-sm',
          'text-on-surface placeholder:text-outline/70',
          'focus:ring-2 focus:ring-primary outline-none transition-all',
          className
        )}
        {...props}
      />
    </div>
  );
});

Input.displayName = 'Input';
