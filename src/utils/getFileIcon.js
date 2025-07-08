export const getFileIcon = (mimeType) => {
  if (mimeType.startsWith('image/')) {
    return 'Image';
  }
  
  if (mimeType.startsWith('video/')) {
    return 'Video';
  }
  
  if (mimeType.startsWith('audio/')) {
    return 'Music';
  }
  
  if (mimeType.includes('pdf')) {
    return 'FileText';
  }
  
  if (mimeType.includes('word') || mimeType.includes('document')) {
    return 'FileText';
  }
  
  if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) {
    return 'FileSpreadsheet';
  }
  
  if (mimeType.includes('powerpoint') || mimeType.includes('presentation')) {
    return 'Presentation';
  }
  
  if (mimeType.includes('zip') || mimeType.includes('archive')) {
    return 'Archive';
  }
  
  if (mimeType.includes('text')) {
    return 'FileText';
  }
  
  return 'File';
};