import React from 'react';
import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

const Card = forwardRef(({ 
  className, 
  variant = 'default',
  hover = false,
  children, 
  ...props 
}, ref) => {
  const variants = {
    default: 'bg-white shadow-md',
    gradient: 'gradient-primary text-white',
    glass: 'glass-effect',
  };

  return (
    <div
      ref={ref}
      className={cn(
        'rounded-xl border border-gray-200 transition-all duration-200',
        variants[variant],
        hover && 'hover:shadow-lg hover:scale-[1.02]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export default Card;