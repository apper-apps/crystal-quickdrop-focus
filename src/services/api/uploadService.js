import { generateId } from '@/utils/generateId';
import { generateShareLink } from '@/utils/generateShareLink';

// Mock upload service
export const uploadFile = async (file) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  // Simulate occasional failures (10% chance)
  if (Math.random() < 0.1) {
    throw new Error('Upload failed - network error');
  }
  
  const fileId = generateId();
  
  return {
    Id: fileId,
    name: file.name,
    size: file.size,
    type: file.type,
    uploadDate: new Date().toISOString(),
    shareLink: generateShareLink(fileId),
    thumbnailUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
    progress: 100
  };
};

export const deleteFile = async (fileId) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return {
    success: true,
    message: 'File deleted successfully'
  };
};

export const getFileInfo = async (fileId) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  // Mock file info
  return {
    Id: fileId,
    name: 'example-file.pdf',
    size: 1024576,
    type: 'application/pdf',
    uploadDate: new Date().toISOString(),
    shareLink: generateShareLink(fileId),
    downloads: Math.floor(Math.random() * 100)
  };
};