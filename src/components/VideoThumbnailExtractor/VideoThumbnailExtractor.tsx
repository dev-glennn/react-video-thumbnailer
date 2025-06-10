import { useCallback, useEffect, useMemo, useReducer } from 'react';
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

interface State {
  step: 'upload' | 'extract';
  file: File | null;
  thumbnails: ThumbnailData[];
}
type Action =
  | { type: 'RESET' }
  | { type: 'SET_FILE'; payload: File }
  | { type: 'SET_THUMBNAILS'; payload: ThumbnailData[] };
const initialState: State = {
  step: 'upload',
  file: null,
  thumbnails: [],
};
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'RESET':
      return initialState;
    case 'SET_FILE':
      return {
        ...state,
        file: action.payload,
        step: 'extract',
        thumbnails: [],
      };
    case 'SET_THUMBNAILS':
      return {
        ...state,
        thumbnails: action.payload,
      };
    default:
      return state;
  }
};

const STEP_TITLES = {
  upload: '동영상 업로드',
  extract: '사진 올리기',
} as const;

export const VideoThumbnailExtractor = ({
  isOpen,
  onClose,
  onSubmit,
  maxThumbnails = DEFAULT_MAX_THUMBNAILS,
}: VideoThumbnailExtractorProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { step, file, thumbnails } = state;

  const stepIsUpload = useMemo(() => step === 'upload', [step]);
  const stepIsExtract = useMemo(() => step === 'extract', [step]);
  const title = useMemo(() => STEP_TITLES[step], [step]);
  const hasNoThumbnails = useMemo(
    () => thumbnails.length === 0,
    [thumbnails.length]
  );

  const handleFileSelect = useCallback((file: File) => {
    dispatch({ type: 'SET_FILE', payload: file });
  }, []);

  const handleInit = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const handleThumbnailsChange = useCallback((thumbnails: ThumbnailData[]) => {
    dispatch({ type: 'SET_THUMBNAILS', payload: thumbnails });
  }, []);

  const handleSubmit = useCallback(() => {
    if (hasNoThumbnails) {
      alert('추출된 썸네일이 없어요');
      return;
    }
    console.log(thumbnails);
    onSubmit(thumbnails);
    onClose();
  }, [hasNoThumbnails, onClose, onSubmit, thumbnails]);

  const handleClose = useCallback(() => {
    dispatch({ type: 'RESET' });
    onClose();
  }, [onClose]);

  useEffect(() => {
    // 초기화
    if (!isOpen) {
      dispatch({ type: 'RESET' });
    }
  }, [isOpen]);

  return (
    <Modal
      containerClassName={styles.modal}
      isOpen={isOpen}
      onClose={handleClose}
    >
      <ModalHeader onClose={onClose}>{title}</ModalHeader>
      <ModalBody>
        {stepIsUpload && <VideoFileDropzone onFileSelect={handleFileSelect} />}
        {stepIsExtract && file && (
          <ThumbnailExtract
            videoFile={file}
            onChange={handleThumbnailsChange}
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
