import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';

const Error = ({ 
  message = "Something went wrong", 
  onRetry, 
  className = "" 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex items-center justify-center min-h-[400px] ${className}`}
    >
      <Card className="p-8 text-center max-w-md mx-auto">
        <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <ApperIcon name="AlertCircle" className="w-8 h-8 text-red-500" />
        </div>
        
        <h3 className="text-lg font-display font-semibold text-gray-900 mb-2">
          Upload Error
        </h3>
        
        <p className="text-gray-600 mb-6">
          {message}
        </p>
        
        <div className="space-y-3">
          {onRetry && (
            <Button 
              onClick={onRetry}
              variant="primary"
              className="w-full"
            >
              <ApperIcon name="RefreshCw" className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          )}
          
          <Button 
            onClick={() => window.location.reload()}
            variant="outline"
            className="w-full"
          >
            <ApperIcon name="RotateCcw" className="w-4 h-4 mr-2" />
            Refresh Page
          </Button>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200 text-sm text-gray-500">
          <p>If the problem persists, please check your internet connection and try again.</p>
        </div>
      </Card>
    </motion.div>
  );
};

export default Error;