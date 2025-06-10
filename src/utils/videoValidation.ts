export const VIDEO_SUPPORTED_FORMATS = [
  'video/mp4',
  'video/avi',
  'video/quicktime',
  'video/x-msvideo',
  'video/webm',
];

export const isVideoFile = (file: File): boolean => {
  return VIDEO_SUPPORTED_FORMATS.some((type) => file.type === type);
};
