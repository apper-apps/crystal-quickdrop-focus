import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

const ProgressBar = ({ 
  value = 0, 
  max = 100, 
  className, 
  showLabel = true,
  animated = true,
  ...props 
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={cn('w-full', className)} {...props}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Progress</span>
          <span className="text-sm font-medium text-gray-900">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: animated ? 0.3 : 0 }}
          className="h-full progress-bar-fill rounded-full"
        />
      </div>
    </div>
  );
};

export default ProgressBar;