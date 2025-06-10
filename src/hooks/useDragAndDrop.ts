import { useCallback, useRef, useState, type DragEvent } from 'react';

interface UseDragAndDropOptions {
  onDrop: (data: DataTransfer) => void;
  onDragEnter?: (e: DragEvent) => void;
  onDragLeave?: (e: DragEvent) => void;
}

// 드래그 & 드롭 핸들러를 관리할 수 있는 훅
export const useDragAndDrop = ({
  onDrop,
  onDragEnter,
  onDragLeave,
}: UseDragAndDropOptions) => {
  const [isDragging, setIsDragging] = useState(false);
  const dragCounterRef = useRef(0);

  const handleDragEnter = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      dragCounterRef.current++;

      if (dragCounterRef.current === 1) {
        setIsDragging(true);
        onDragEnter?.(e);
      }
    },
    [onDragEnter]
  );

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDragLeave = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      dragCounterRef.current--;

      if (dragCounterRef.current === 0) {
        setIsDragging(false);
        onDragLeave?.(e);
      }
    },
    [onDragLeave]
  );

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      dragCounterRef.current = 0;
      setIsDragging(false);

      onDrop(e.dataTransfer);
    },
    [onDrop]
  );

  const resetDragState = useCallback(() => {
    setIsDragging(false);
    dragCounterRef.current = 0;
  }, []);

  return {
    isDragging,
    handlers: {
      onDragEnter: handleDragEnter,
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop,
    },
    resetDragState,
  };
};
