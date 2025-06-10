import { useCallback, useState } from 'react';
import { isVideoFile } from '~/utils';

// 비디오 파일 validation
export const useVideoFileHandler = ({
  onFileSelect,
}: {
  onFileSelect: (file: File) => void;
}) => {
  const [error, setError] = useState<string>('');

  const handleFileSelect = useCallback(
    (file: File) => {
      if (!isVideoFile(file)) {
        setError('동영상 파일만 선택할 수 있습니다.');
        return;
      }
      setError('');
      onFileSelect(file);
    },
    [onFileSelect]
  );

  const clearError = useCallback(() => {
    setError('');
  }, []);

  return {
    error,
    handleFileSelect,
    clearError,
  };
};
