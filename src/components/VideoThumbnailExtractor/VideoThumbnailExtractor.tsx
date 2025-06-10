import { useCallback, useEffect, useState } from 'react';
import * as styles from './VideoThumbnailExtractor.css';
import { ThumbnailExtract, VideoFileDropzone } from '.';
import { Button, Modal, ModalBody, ModalHeader } from '../common';
import type { ThumbnailData } from '~/types';

interface VideoThumbnailExtractorProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (thumbnails: ThumbnailData[]) => void;
  maxThumbnails?: number;
}

const DEFAULT_MAX_THUMBNAILS = 4;
const STEP = {
  UPLOAD: 'upload',
  EXTRACT: 'extract',
} as const;
type Step = (typeof STEP)[keyof typeof STEP];

export const VideoThumbnailExtractor = ({
  isOpen,
  onClose,
  onSubmit,
  maxThumbnails = DEFAULT_MAX_THUMBNAILS,
}: VideoThumbnailExtractorProps) => {
  const [step, setStep] = useState<Step>(STEP.UPLOAD);
  const [file, setFile] = useState<File | null>(null);
  const [thumbnails, setThumbnails] = useState<ThumbnailData[]>([]);

  const stepIsUpload = step === STEP.UPLOAD;
  const stepIsExtract = step === STEP.EXTRACT;
  const title = stepIsUpload ? '동영상 업로드' : '사진 올리기';

  const handleFileSelect = (file: File) => {
    setFile(file);
    setStep('extract');
  };

  const handleInit = useCallback(() => {
    setStep('upload');
    setFile(null);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!thumbnails.length) {
      alert('추출된 썸네일이 없어요');
      return;
    }
    console.log(thumbnails);
    onSubmit(thumbnails);
    onClose();
  }, [onClose, onSubmit, thumbnails]);

  useEffect(() => {
    // 초기화
    if (!isOpen) {
      handleInit();
    }
  }, [handleInit, isOpen]);

  return (
    <Modal containerClassName={styles.modal} isOpen={isOpen} onClose={onClose}>
      <ModalHeader onClose={onClose}>{title}</ModalHeader>
      <ModalBody>
        {stepIsUpload && <VideoFileDropzone onFileSelect={handleFileSelect} />}
        {stepIsExtract && file && (
          <ThumbnailExtract
            videoFile={file}
            onChange={setThumbnails}
            maxThumbnails={maxThumbnails}
          />
        )}
      </ModalBody>
      {stepIsExtract && (
        <div className={styles.buttonWrap}>
          <Button variant="secondary" onClick={handleInit}>
            이전
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            확인
          </Button>
        </div>
      )}
    </Modal>
  );
};
