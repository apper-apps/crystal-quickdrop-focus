import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import Input from '@/components/atoms/Input';
import Label from '@/components/atoms/Label';

const SharePanel = ({ files, className, onUpdateFilePassword }) => {
  const completedFiles = files.filter(file => file.progress === 100 && file.shareLink);
  const [filePasswords, setFilePasswords] = useState({});
  const [showPasswords, setShowPasswords] = useState({});
  const [passwordProtected, setPasswordProtected] = useState({});
  
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Link copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

const shareViaEmail = (linksWithPasswords) => {
    const subject = encodeURIComponent('Files shared via QuickDrop');
    let bodyContent = 'Here are the files I wanted to share:\n\n';
    
    linksWithPasswords.forEach(({ link, fileName, password }) => {
      bodyContent += `${fileName}:\n${link}`;
      if (password) {
        bodyContent += `\nPassword: ${password}`;
      }
      bodyContent += '\n\n';
    });
    
    const body = encodeURIComponent(bodyContent);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const shareAllLinks = () => {
    const allLinksWithPasswords = completedFiles.map(file => {
      const password = passwordProtected[file.Id] ? filePasswords[file.Id] : '';
      return {
        link: file.shareLink,
        fileName: file.name,
        password
      };
    });
    
    let linksText = '';
    allLinksWithPasswords.forEach(({ link, fileName, password }) => {
      linksText += `${fileName}: ${link}`;
      if (password) {
        linksText += ` (Password: ${password})`;
      }
      linksText += '\n';
    });
    
    copyToClipboard(linksText);
  };

  const togglePasswordProtection = (fileId) => {
    setPasswordProtected(prev => ({
      ...prev,
      [fileId]: !prev[fileId]
    }));
    
    if (passwordProtected[fileId]) {
      // Remove password when disabling protection
      setFilePasswords(prev => {
        const updated = { ...prev };
        delete updated[fileId];
        return updated;
      });
    }
  };

  const handlePasswordChange = (fileId, password) => {
    setFilePasswords(prev => ({
      ...prev,
      [fileId]: password
    }));
    
    // Call parent component to update the file with password
    if (onUpdateFilePassword) {
      onUpdateFilePassword(fileId, password);
    }
  };

  const togglePasswordVisibility = (fileId) => {
    setShowPasswords(prev => ({
      ...prev,
      [fileId]: !prev[fileId]
    }));
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
        <div className="space-y-4 mb-6">
          {completedFiles.map((file) => (
            <div key={file.Id} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <Label className="text-sm font-medium text-gray-900 flex items-center">
                  {file.name}
                  {passwordProtected[file.Id] && (
                    <ApperIcon name="Lock" className="w-4 h-4 ml-2 text-amber-500" />
                  )}
                </Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => togglePasswordProtection(file.Id)}
                  className={`text-xs ${
                    passwordProtected[file.Id]
                      ? 'text-amber-600 hover:text-amber-700'
                      : 'text-gray-500 hover:text-gray-600'
                  }`}
                >
                  <ApperIcon 
                    name={passwordProtected[file.Id] ? "Lock" : "Unlock"} 
                    className="w-3 h-3 mr-1" 
                  />
                  {passwordProtected[file.Id] ? 'Protected' : 'Add Password'}
                </Button>
              </div>
              
              {passwordProtected[file.Id] && (
                <div className="mb-3">
                  <Label className="text-xs text-gray-600 mb-1">
                    Password
                  </Label>
                  <div className="flex">
                    <Input
                      type={showPasswords[file.Id] ? "text" : "password"}
                      value={filePasswords[file.Id] || ''}
                      onChange={(e) => handlePasswordChange(file.Id, e.target.value)}
                      placeholder="Enter password for this file"
                      className="text-xs border-r-0 rounded-r-none"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => togglePasswordVisibility(file.Id)}
                      className="rounded-none border-l-0 border-r-0 px-3"
                    >
                      <ApperIcon 
                        name={showPasswords[file.Id] ? "EyeOff" : "Eye"} 
                        className="w-3 h-3" 
                      />
                    </Button>
                  </div>
                </div>
              )}
              
              <div className="flex">
                <Input
                  value={file.shareLink}
                  readOnly
                  className="text-xs bg-gray-50 border-r-0 rounded-r-none"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const linkText = passwordProtected[file.Id] && filePasswords[file.Id]
                      ? `${file.shareLink}\nPassword: ${filePasswords[file.Id]}`
                      : file.shareLink;
                    copyToClipboard(linkText);
                  }}
                  className="rounded-l-none border-l-0 px-3"
                >
                  <ApperIcon name="Copy" className="w-3 h-3" />
                </Button>
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