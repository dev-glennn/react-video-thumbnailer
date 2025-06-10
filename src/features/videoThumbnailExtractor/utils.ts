export const isVideoFile = (file: File): boolean => {
  return [
    'video/mp4',
    'video/avi',
    'video/quicktime',
    'video/x-msvideo',
    'video/webm',
  ].some((type) => file.type === type);
};

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
