export const generateShareLink = (fileId) => {
  const baseUrl = 'https://quickdrop.com/share';
  const shareCode = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${baseUrl}/${shareCode}`;
};