import { useRef, useState, type ChangeEvent } from 'react';
import * as styles from './VideoFileDropzone.css';
import { Button } from '~/components/common';
import { isVideoFile } from '~/utils';
import videoImage from '~/assets/video.png';
import { useDragAndDrop } from '~/hooks';

interface VideoFileDropzoneProps {
  onFileSelect: (file: File) => void;
}

export const VideoFileDropzone = ({ onFileSelect }: VideoFileDropzoneProps) => {
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (dataTransfer: DataTransfer | null) => {
    if (!dataTransfer) return;
    const files = Array.from(dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const { isDragging, handlers } = useDragAndDrop({
    onDrop: handleDrop,
  });

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

  // click
  const handleClick = () => fileInputRef.current?.click();

  return (
    <>
      <div
        className={styles.drag({
          isDragging,
        })}
        onClick={handleClick}
        {...handlers}
      >
        <div className={styles.icon}>
          <img src={videoImage} />
        </div>
        <div>
          <p className={styles.title}>동영상 파일을 선택하세요</p>
          <p className={styles.description}>
            파일을 드래그하거나 클릭하여 업로드해주세요
          </p>
        </div>
        <Button size="sm">파일 선택</Button>
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
