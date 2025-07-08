import React from 'react';
import { motion } from 'framer-motion';
import { formatBytes } from '@/utils/formatBytes';
import { getFileIcon } from '@/utils/getFileIcon';
import ApperIcon from '@/components/ApperIcon';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import ProgressBar from '@/components/atoms/ProgressBar';

const FileCard = ({ 
  file, 
  onDelete, 
  onCopyLink, 
  onPreview,
  className 
}) => {
  const isUploading = file.progress < 100;
  const hasError = file.error;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <Card 
        className="p-4 hover:shadow-lg transition-all duration-200 border-l-4 border-l-primary"
        hover
      >
        <div className="flex items-start space-x-4">
          {/* File Icon */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
              <ApperIcon 
                name={getFileIcon(file.type)} 
                className="w-6 h-6 text-primary" 
              />
            </div>
          </div>

          {/* File Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {file.name}
              </h3>
              <span className="text-xs text-gray-500 ml-2">
                {formatBytes(file.size)}
              </span>
            </div>

            {/* Progress Bar */}
            {isUploading && (
              <div className="mb-3">
                <ProgressBar 
                  value={file.progress} 
                  showLabel={false} 
                  className="mb-1"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Uploading...</span>
                  <span>{Math.round(file.progress)}%</span>
                </div>
              </div>
            )}

            {/* Error Message */}
            {hasError && (
              <div className="mb-3 p-2 bg-red-50 rounded-lg">
                <div className="flex items-center">
                  <ApperIcon name="AlertCircle" className="w-4 h-4 text-red-500 mr-2" />
                  <span className="text-xs text-red-600">{file.error}</span>
                </div>
              </div>
            )}

            {/* Success State */}
            {!isUploading && !hasError && (
              <div className="mb-3">
                <div className="flex items-center text-xs text-green-600">
                  <ApperIcon name="CheckCircle" className="w-4 h-4 mr-1" />
                  <span>Upload complete</span>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center space-x-2">
              {file.shareLink && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onCopyLink(file.shareLink)}
                  className="text-xs"
                >
                  <ApperIcon name="Copy" className="w-3 h-3 mr-1" />
                  Copy Link
                </Button>
              )}
              
              {file.type.startsWith('image/') && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onPreview(file)}
                  className="text-xs"
                >
                  <ApperIcon name="Eye" className="w-3 h-3 mr-1" />
                  Preview
                </Button>
              )}
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(file.Id)}
                className="text-xs text-red-600 hover:text-red-700"
              >
                <ApperIcon name="Trash2" className="w-3 h-3 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default FileCard;