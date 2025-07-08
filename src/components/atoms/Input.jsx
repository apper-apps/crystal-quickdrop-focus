import React from 'react';
import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

const Input = forwardRef(({ 
  className, 
  type = 'text', 
  error = false,
  ...props 
}, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        'w-full px-4 py-3 rounded-lg border-2 transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-primary/20',
        'placeholder-gray-400 bg-white',
        error 
          ? 'border-error focus:border-error' 
          : 'border-gray-200 focus:border-primary',
        className
      )}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;