import { generateId } from '@/utils/generateId';
import { generateShareLink } from '@/utils/generateShareLink';
import mockFiles from '@/services/mockData/files.json';
// Mock upload service
export const uploadFile = async (file, password = null) => {
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
    shareLink: generateShareLink(fileId, password),
    thumbnailUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
    progress: 100,
    isPasswordProtected: !!password
  };
};

export const updateFilePassword = async (fileId, password) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return {
    Id: fileId,
    shareLink: generateShareLink(fileId, password),
    isPasswordProtected: !!password,
    success: true
  };
};
// Mock upload service
export const uploadFile = async (file, password = null) => {
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
    shareLink: generateShareLink(fileId, password),
    thumbnailUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
    progress: 100,
    isPasswordProtected: !!password
  };
};

export const updateFilePassword = async (fileId, password) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return {
    Id: fileId,
    shareLink: generateShareLink(fileId, password),
    isPasswordProtected: !!password,
    success: true
  };
};
// Mock upload service
export const uploadFile = async (file, password = null) => {
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
    shareLink: generateShareLink(fileId, password),
    thumbnailUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
    progress: 100,
    isPasswordProtected: !!password
  };
};

export const updateFilePassword = async (fileId, password) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return {
    Id: fileId,
    shareLink: generateShareLink(fileId, password),
    isPasswordProtected: !!password,
    success: true
  };
};
// Mock upload service
export const uploadFile = async (file, password = null) => {
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
    shareLink: generateShareLink(fileId, password),
    thumbnailUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
    progress: 100,
    isPasswordProtected: !!password
  };
};

export const updateFilePassword = async (fileId, password) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return {
    Id: fileId,
    shareLink: generateShareLink(fileId, password),
    isPasswordProtected: !!password,
    success: true
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

// History service methods
export const getFileHistory = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Return copy of mock data
  return [...mockFiles];
};

export const searchFiles = async (files, query) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const searchTerm = query.toLowerCase();
  return files.filter(file => 
    file.name.toLowerCase().includes(searchTerm) ||
    file.type.toLowerCase().includes(searchTerm)
  );
};

export const filterByType = async (files, typeFilter) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  if (typeFilter === 'all') return [...files];
  
  return files.filter(file => file.type.startsWith(typeFilter));
};

export const filterByDate = async (files, dateFilter) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  if (dateFilter === 'all') return [...files];
  
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  return files.filter(file => {
    const fileDate = new Date(file.uploadDate);
    
    switch (dateFilter) {
      case 'today':
        return fileDate >= today;
      case 'week':
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        return fileDate >= weekAgo;
      case 'month':
        const monthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
        return fileDate >= monthAgo;
      case 'year':
        const yearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
        return fileDate >= yearAgo;
      default:
        return true;
    }
  });
};