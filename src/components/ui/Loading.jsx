import React from 'react';
import { motion } from 'framer-motion';

const Loading = ({ className = "" }) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header Skeleton */}
      <div className="shimmer-loading h-8 w-64 rounded-lg"></div>
      
      {/* Drop Zone Skeleton */}
      <div className="shimmer-loading h-64 w-full rounded-xl"></div>
      
      {/* File Cards Skeleton */}
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 border border-gray-200 rounded-xl">
            <div className="flex items-start space-x-4">
              <div className="shimmer-loading w-12 h-12 rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="shimmer-loading h-4 w-48 rounded"></div>
                <div className="shimmer-loading h-3 w-24 rounded"></div>
                <div className="shimmer-loading h-2 w-full rounded"></div>
                <div className="flex space-x-2">
                  <div className="shimmer-loading h-6 w-16 rounded"></div>
                  <div className="shimmer-loading h-6 w-16 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Share Panel Skeleton */}
      <div className="p-6 border border-gray-200 rounded-xl">
        <div className="flex items-center space-x-3 mb-4">
          <div className="shimmer-loading w-10 h-10 rounded-full"></div>
          <div className="space-y-2">
            <div className="shimmer-loading h-4 w-32 rounded"></div>
            <div className="shimmer-loading h-3 w-24 rounded"></div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="shimmer-loading h-10 w-full rounded-lg"></div>
          <div className="shimmer-loading h-10 w-full rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;