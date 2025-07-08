import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import HistoryPanel from "@/components/organisms/HistoryPanel";
import { generateShareLink } from "@/utils/generateShareLink";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import DropZone from "@/components/molecules/DropZone";
import FileCard from "@/components/molecules/FileCard";
import FilePreviewModal from "@/components/molecules/FilePreviewModal";
import SharePanel from "@/components/molecules/SharePanel";
import { uploadFile } from "@/services/api/uploadService";

const FileUploader = () => {
  const [files, setFiles] = useState([]);
  const [previewFile, setPreviewFile] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const handleFileSelect = (selectedFiles) => {
    const newFiles = selectedFiles.map(file => ({
      Id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date().toISOString(),
      progress: 0,
      shareLink: '',
      thumbnailUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
      rawFile: file,
      error: null
    }));

    setFiles(prev => [...prev, ...newFiles]);
    
    // Start uploading each file
    newFiles.forEach(file => {
      uploadFileWithProgress(file);
    });

    toast.success(`${selectedFiles.length} file${selectedFiles.length !== 1 ? 's' : ''} added to queue`);
  };

  const uploadFileWithProgress = async (file) => {
    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setFiles(prev => prev.map(f => 
          f.Id === file.Id && f.progress < 100
            ? { ...f, progress: Math.min(f.progress + Math.random() * 20, 95) }
            : f
        ));
      }, 200);

      // Simulate actual upload
      await uploadFile(file.rawFile);

      // Complete upload
      clearInterval(progressInterval);
      
      const shareLink = generateShareLink(file.Id);
      
      setFiles(prev => prev.map(f => 
        f.Id === file.Id 
          ? { ...f, progress: 100, shareLink }
          : f
      ));

      toast.success(`${file.name} uploaded successfully!`);
    } catch (error) {
      setFiles(prev => prev.map(f => 
        f.Id === file.Id 
          ? { ...f, error: error.message || 'Upload failed' }
          : f
      ));

      toast.error(`Failed to upload ${file.name}`);
    }
  };

  const handleDeleteFile = (fileId) => {
    setFiles(prev => prev.filter(f => f.Id !== fileId));
    toast.success('File removed');
  };

  const handleCopyLink = async (link) => {
    try {
      await navigator.clipboard.writeText(link);
      toast.success('Link copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const handlePreview = (file) => {
    setPreviewFile(file);
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
    setPreviewFile(null);
  };

return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header with History Toggle */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold text-gray-900">
          {showHistory ? 'Upload History' : 'QuickDrop'}
        </h1>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowHistory(!showHistory)}
          className="flex items-center space-x-2"
        >
          <ApperIcon name={showHistory ? "Upload" : "History"} className="w-4 h-4" />
          <span>{showHistory ? 'Upload Files' : 'View History'}</span>
        </Button>
      </div>

      {!showHistory ? (
        <>
          {/* Drop Zone */}
          <DropZone onFileSelect={handleFileSelect} />

          {/* File List */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-display font-semibold text-gray-900">
              Upload Progress
            </h2>
            <div className="space-y-3">
              {files.map((file) => (
                <FileCard
                  key={file.Id}
                  file={file}
                  onDelete={handleDeleteFile}
                  onCopyLink={handleCopyLink}
                  onPreview={handlePreview}
                />
              ))}
            </div>
          </motion.div>
        )}
</AnimatePresence>

          {/* Share Panel */}
          <SharePanel files={files} />
        </>
      ) : (
        /* History Panel */
        <HistoryPanel 
          onPreview={handlePreview}
          onCopyLink={handleCopyLink}
        />
      )}

      {/* Preview Modal */}
      <FilePreviewModal
        file={previewFile}
        isOpen={isPreviewOpen}
        onClose={handleClosePreview}
      />
    </div>
  );
};

export default FileUploader;