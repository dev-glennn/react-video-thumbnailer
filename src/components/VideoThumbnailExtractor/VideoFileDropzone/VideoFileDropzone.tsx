import { useRef, type ChangeEvent } from 'react';
import * as styles from './VideoFileDropzone.css';
import { Button } from '~/components/common';
import videoImage from '~/assets/video.png';
import { useFileDrop, useVideoFileHandler } from '~/hooks';
import { VIDEO_ACCEPT } from '~/utils';

interface VideoFileDropzoneProps {
  onFileSelect: (file: File) => void;
}

export const VideoFileDropzone = ({ onFileSelect }: VideoFileDropzoneProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { error, handleFileSelect, clearError } = useVideoFileHandler({
    onFileSelect,
  });

  const { isDragging, handlers } = useFileDrop({
    onFileDrop: handleFileSelect,
    accept: [VIDEO_ACCEPT],
  });

  // file change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  // click
  const handleClick = () => {
    clearError();
    fileInputRef.current?.click();
  };

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
        accept={VIDEO_ACCEPT}
        onChange={handleInputChange}
        className="hidden"
      />
    </>
  );
};
