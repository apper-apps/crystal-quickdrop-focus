import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import { formatBytes } from '@/utils/formatBytes';

const FilePreviewModal = ({ file, isOpen, onClose }) => {
  if (!isOpen || !file) return null;

  const renderPreview = () => {
    if (file.type.startsWith('image/')) {
      return (
        <div className="max-w-4xl max-h-[70vh] overflow-hidden rounded-lg">
          <img
            src={file.thumbnailUrl || URL.createObjectURL(file)}
            alt={file.name}
            className="w-full h-full object-contain"
          />
        </div>
      );
    }

    if (file.type.startsWith('video/')) {
      return (
        <div className="max-w-4xl max-h-[70vh] overflow-hidden rounded-lg">
          <video
            src={URL.createObjectURL(file)}
            controls
            className="w-full h-full"
          />
        </div>
      );
    }

    // Default preview for other file types
    return (
      <div className="max-w-md p-8 text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <ApperIcon name="File" className="w-10 h-10 text-primary" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">{file.name}</h3>
        <p className="text-gray-600 mb-4">Preview not available for this file type</p>
        <p className="text-sm text-gray-500">{formatBytes(file.size)}</p>
      </div>
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-xl p-6 max-w-5xl max-h-[90vh] overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-display font-semibold text-gray-900">
                {file.name}
              </h2>
              <p className="text-sm text-gray-600">
                {formatBytes(file.size)} • {file.type}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <ApperIcon name="X" className="w-5 h-5" />
            </Button>
          </div>

          {/* Preview */}
          <div className="flex justify-center">
            {renderPreview()}
          </div>

          {/* Footer */}
          <div className="flex justify-center mt-6 pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Close Preview
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FilePreviewModal;