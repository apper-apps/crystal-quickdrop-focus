import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import { cn } from '@/utils/cn';

const DropZone = ({ 
  onFileSelect, 
  className, 
  accept = "*/*",
  maxSize = 10 * 1024 * 1024, // 10MB
  multiple = true 
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        console.warn(`File ${file.name} is too large`);
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      onFileSelect(validFiles);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={cn('w-full', className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileInputChange}
        className="hidden"
      />
      
      <motion.div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className={cn(
          'relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300',
          'hover:border-primary hover:bg-gradient-to-br hover:from-primary/5 hover:to-secondary/5',
          isDragOver 
            ? 'border-primary bg-gradient-to-br from-primary/10 to-secondary/10 scale-105' 
            : 'border-gray-300 bg-gradient-to-br from-gray-50 to-white',
          'min-h-[300px] flex flex-col items-center justify-center space-y-4'
        )}
      >
        {/* Upload Icon */}
        <motion.div
          animate={isDragOver ? { scale: 1.1 } : { scale: 1 }}
          transition={{ duration: 0.2 }}
          className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center"
        >
          <ApperIcon 
            name="CloudUpload" 
            className="w-8 h-8 text-primary" 
          />
        </motion.div>

        {/* Main Text */}
        <div className="space-y-2">
          <h3 className="text-xl font-display font-semibold text-gray-900">
            {isDragOver ? 'Drop your files here' : 'Drag & drop files here'}
          </h3>
          <p className="text-gray-600">
            Or click to browse your files
          </p>
        </div>

        {/* File Info */}
        <div className="text-sm text-gray-500 space-y-1">
          <p>Supports any file type</p>
          <p>Maximum file size: {Math.round(maxSize / 1024 / 1024)}MB</p>
        </div>

        {/* Browse Button */}
        <Button
          variant="outline"
          size="lg"
          onClick={handleClick}
          className="mt-4"
        >
          <ApperIcon name="FolderOpen" className="w-4 h-4 mr-2" />
          Browse Files
        </Button>

        {/* Drag Overlay */}
        {isDragOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl border-2 border-primary flex items-center justify-center"
          >
            <div className="text-center">
              <ApperIcon name="Upload" className="w-12 h-12 text-primary mx-auto mb-2" />
              <p className="text-lg font-medium text-primary">Drop files to upload</p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default DropZone;