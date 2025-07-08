import React from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import Input from '@/components/atoms/Input';
import Label from '@/components/atoms/Label';

const SharePanel = ({ files, className }) => {
  const completedFiles = files.filter(file => file.progress === 100 && file.shareLink);
  
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Link copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const shareViaEmail = (links) => {
    const subject = encodeURIComponent('Files shared via QuickDrop');
    const body = encodeURIComponent(`Here are the files I wanted to share:\n\n${links.join('\n\n')}`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const shareAllLinks = () => {
    const allLinks = completedFiles.map(file => file.shareLink);
    const linksText = allLinks.join('\n');
    copyToClipboard(linksText);
  };

  if (completedFiles.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mr-3">
            <ApperIcon name="Share2" className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-display font-semibold text-gray-900">
              Ready to Share
            </h3>
            <p className="text-sm text-gray-600">
              {completedFiles.length} file{completedFiles.length !== 1 ? 's' : ''} uploaded successfully
            </p>
          </div>
        </div>

        {/* Individual Links */}
        <div className="space-y-3 mb-6">
          {completedFiles.map((file) => (
            <div key={file.Id} className="flex items-center space-x-3">
              <div className="flex-1">
                <Label className="text-xs text-gray-600 mb-1">
                  {file.name}
                </Label>
                <div className="flex">
                  <Input
                    value={file.shareLink}
                    readOnly
                    className="text-xs bg-white border-r-0 rounded-r-none"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(file.shareLink)}
                    className="rounded-l-none border-l-0 px-3"
                  >
                    <ApperIcon name="Copy" className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bulk Actions */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
          <Button
            variant="primary"
            onClick={shareAllLinks}
            className="flex-1 sm:flex-initial"
          >
            <ApperIcon name="Copy" className="w-4 h-4 mr-2" />
            Copy All Links
          </Button>
          
          <Button
            variant="secondary"
            onClick={() => shareViaEmail(completedFiles.map(f => f.shareLink))}
            className="flex-1 sm:flex-initial"
          >
            <ApperIcon name="Mail" className="w-4 h-4 mr-2" />
            Share via Email
          </Button>
        </div>

        {/* Share Stats */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Total files shared:</span>
            <span className="font-medium">{completedFiles.length}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Total size:</span>
            <span className="font-medium">
              {(completedFiles.reduce((sum, file) => sum + file.size, 0) / 1024 / 1024).toFixed(1)} MB
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default SharePanel;