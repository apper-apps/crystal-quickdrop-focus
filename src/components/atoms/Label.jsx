import React from 'react';
import { cn } from '@/utils/cn';

const Label = ({ className, children, ...props }) => {
  return (
    <label
      className={cn(
        'block text-sm font-medium text-gray-700 mb-2',
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;