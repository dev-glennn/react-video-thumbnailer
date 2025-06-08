import { useRef, useState, type ChangeEvent, type DragEvent } from 'react';
import * as styles from './VideoFileDropzone.css';
import { Button } from '~/components/common';
import { isVideoFile } from '~/features/videoThumbnailExtractor/utils';

interface VideoFileDropzoneProps {
  onFileSelect: (file: File) => void;
}

export const VideoFileDropzone = ({ onFileSelect }: VideoFileDropzoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounterRef = useRef(0);

  // file select
  const handleFileSelect = (file: File) => {
    if (!isVideoFile(file)) {
      setError('동영상 파일만 선택할 수 있습니다.');
      return;
    }
    setError('');
    onFileSelect(file);
  };

  // file change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  // drag
  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    dragCounterRef.current++;
    if (dragCounterRef.current === 1) {
      setIsDragging(true);
    }
  };
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };
  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    dragCounterRef.current--;
    if (dragCounterRef.current === 0) {
      setIsDragging(false);
    }
  };
  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    dragCounterRef.current = 0;
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  // click
  const handleClick = () => fileInputRef.current?.click();

  return (
    <>
      <div
        className={styles.drag({
          isDragging,
        })}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <div className={styles.icon}>📹</div>
        <div>
          <p className={styles.title}>동영상 파일을 선택하세요</p>
          <p className={styles.description}>
            파일을 드래그하거나 클릭하여 업로드해주세요
          </p>
        </div>
        <Button>파일 선택</Button>
        {error && <div className={styles.error}>⚠️ {error}</div>}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        onChange={handleInputChange}
        className="hidden"
      />
    </>
  );
};
