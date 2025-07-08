import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { getFileHistory, searchFiles, filterByDate, filterByType } from '@/services/api/uploadService';
import FileCard from '@/components/molecules/FileCard';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import Loading from '@/components/ui/Loading';
import Empty from '@/components/ui/Empty';
import Error from '@/components/ui/Error';

const HistoryPanel = ({ onPreview, onCopyLink }) => {
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [fileTypeFilter, setFileTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');

  useEffect(() => {
    loadFileHistory();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [files, searchQuery, fileTypeFilter, dateFilter, sortBy]);

  const loadFileHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      const historyData = await getFileHistory();
      setFiles(historyData);
    } catch (err) {
      setError('Failed to load file history');
      toast.error('Failed to load file history');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = async () => {
    try {
      let result = [...files];

      // Apply search filter
      if (searchQuery.trim()) {
        result = await searchFiles(result, searchQuery);
      }

      // Apply file type filter
      if (fileTypeFilter !== 'all') {
        result = await filterByType(result, fileTypeFilter);
      }

      // Apply date filter
      if (dateFilter !== 'all') {
        result = await filterByDate(result, dateFilter);
      }

      // Apply sorting
      result.sort((a, b) => {
        switch (sortBy) {
          case 'name-asc':
            return a.name.localeCompare(b.name);
          case 'name-desc':
            return b.name.localeCompare(a.name);
          case 'size-asc':
            return a.size - b.size;
          case 'size-desc':
            return b.size - a.size;
          case 'date-asc':
            return new Date(a.uploadDate) - new Date(b.uploadDate);
          case 'date-desc':
          default:
            return new Date(b.uploadDate) - new Date(a.uploadDate);
        }
      });

      setFilteredFiles(result);
    } catch (err) {
      toast.error('Failed to apply filters');
    }
  };

  const handleDeleteFile = async (fileId) => {
    try {
      setFiles(prev => prev.filter(f => f.Id !== fileId));
      toast.success('File removed from history');
    } catch (err) {
      toast.error('Failed to remove file');
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setFileTypeFilter('all');
    setDateFilter('all');
    setSortBy('date-desc');
  };

  const getFileTypeOptions = () => {
    const types = [...new Set(files.map(file => {
      const mainType = file.type.split('/')[0];
      return mainType;
    }))];
    return types.sort();
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadFileHistory} />;

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search files by name or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12"
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              {/* File Type Filter */}
              <select
                value={fileTypeFilter}
                onChange={(e) => setFileTypeFilter(e.target.value)}
                className="px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
              >
                <option value="all">All Types</option>
                {getFileTypeOptions().map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>

              {/* Date Filter */}
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="name-asc">Name A-Z</option>
                <option value="name-desc">Name Z-A</option>
                <option value="size-asc">Smallest First</option>
                <option value="size-desc">Largest First</option>
              </select>
            </div>

            {/* Clear Filters */}
            {(searchQuery || fileTypeFilter !== 'all' || dateFilter !== 'all' || sortBy !== 'date-desc') && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="flex items-center space-x-2"
              >
                <ApperIcon name="X" className="w-4 h-4" />
                <span>Clear Filters</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>
          {filteredFiles.length} of {files.length} files
          {searchQuery && ` matching "${searchQuery}"`}
        </span>
        {filteredFiles.length > 0 && (
          <span className="text-xs">
            {filteredFiles.length === 1 ? '1 file' : `${filteredFiles.length} files`}
          </span>
        )}
      </div>

      {/* File Grid */}
      <AnimatePresence mode="wait">
        {filteredFiles.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Empty 
              message={searchQuery || fileTypeFilter !== 'all' || dateFilter !== 'all' 
                ? "No files match your filters" 
                : "No files uploaded yet"
              }
              actionText={searchQuery || fileTypeFilter !== 'all' || dateFilter !== 'all' ? "Clear Filters" : undefined}
              onAction={searchQuery || fileTypeFilter !== 'all' || dateFilter !== 'all' ? clearFilters : undefined}
            />
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 gap-4"
          >
            {filteredFiles.map((file) => (
              <FileCard
                key={file.Id}
                file={file}
                onDelete={handleDeleteFile}
                onCopyLink={onCopyLink}
                onPreview={onPreview}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HistoryPanel;