export const generateId = () => {
  return Math.floor(Date.now() + Math.random() * 1000);
};