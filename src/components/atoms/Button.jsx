import React from 'react';
import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

const Button = forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  children, 
  ...props 
}, ref) => {
  const variants = {
    primary: 'gradient-primary text-white shadow-lg hover:shadow-xl',
    secondary: 'gradient-secondary text-white shadow-lg hover:shadow-xl',
    accent: 'gradient-accent text-white shadow-lg hover:shadow-xl',
    outline: 'border-2 border-primary text-primary hover:gradient-primary hover:text-white',
    ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
      className={cn(
        'rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;