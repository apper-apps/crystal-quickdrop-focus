import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white border-b border-gray-200 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <ApperIcon name="CloudUpload" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold gradient-text">
                QuickDrop
              </h1>
              <p className="text-sm text-gray-600">
                Upload & Share Files Instantly
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">Fast</div>
              <div className="text-xs text-gray-500">Upload Speed</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">Secure</div>
              <div className="text-xs text-gray-500">File Transfer</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">Simple</div>
              <div className="text-xs text-gray-500">Sharing</div>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;