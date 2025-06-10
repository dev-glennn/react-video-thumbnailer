import { useCallback } from 'react';
import { useDragAndDrop } from './useDragAndDrop';

interface useFileDropOptions {
  onFileDrop: (files: File) => void;
  accept?: string[];
}

// 드래그 & 드롭 + 단건 파일 추출
export const useFileDrop = ({ onFileDrop, accept }: useFileDropOptions) => {
  const handleDrop = useCallback(
    (dataTransfer: DataTransfer) => {
      if (!dataTransfer) return;
      const files = Array.from(dataTransfer.files);
      const filterFiles =
        accept && files.length > 1
          ? files.filter((file) =>
              accept.some(
                (acceptType) =>
                  file.type.includes(acceptType) ||
                  file.type.includes(acceptType.replace('/*', ''))
              )
            )
          : files;
      onFileDrop(filterFiles[0]);
    },
    [accept, onFileDrop]
  );

  const { isDragging, handlers, resetDragState } = useDragAndDrop({
    onDrop: handleDrop,
  });

  return {
    isDragging,
    handlers,
    resetDragState,
  };
};
