export const isVideoFile = (file: File): boolean => {
  return [
    'video/mp4',
    'video/avi',
    'video/quicktime',
    'video/x-msvideo',
    'video/webm',
  ].some((type) => file.type === type);
};
