import { useCallback, useEffect, useRef, useState } from 'react';
import * as styles from './ThumbnailExtract.css';
import { CloseIcon, PlusIcon } from '~/components/icons';
import { formatTime, generateId } from '~/utils';
import type { ThumbnailData } from '~/types';

interface ThumbnailExtractProps {
  videoFile: File;
  onChange: (thumbnails: ThumbnailData[]) => void;
  maxThumbnails: number;
}

export const ThumbnailExtract = ({
  videoFile,
  onChange,
  maxThumbnails,
}: ThumbnailExtractProps) => {
  const [thumbnails, setThumbnails] = useState<ThumbnailData[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoUrlRef = useRef<string>('');
  const [videoUrl, setVideoUrl] = useState<string>('');

  const canExtractMore = thumbnails.length < maxThumbnails;

  useEffect(() => {
    const handleVideoKeyEvents = (e: KeyboardEvent) => {
      const video = videoRef.current;
      if (!video) return;
      if (
        document.activeElement === video ||
        ['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName ?? '')
      )
        return;

      switch (e.code) {
        case 'Space':
        case 'Enter':
          if (video.paused) {
            video.play();
          } else {
            video.pause();
          }
          break;
        case 'ArrowRight':
          video.currentTime += 5;
          break;
        case 'ArrowLeft':
          video.currentTime -= 5;
          break;
      }
    };

    document.addEventListener('keydown', handleVideoKeyEvents);
    return () => {
      document.removeEventListener('keydown', handleVideoKeyEvents);
    };
  }, []);

  useEffect(() => {
    onChange(thumbnails);
  }, [onChange, thumbnails]);

  useEffect(() => {
    if (videoUrlRef.current) {
      URL.revokeObjectURL(videoUrlRef.current);
    }

    const newUrl = URL.createObjectURL(videoFile);
    videoUrlRef.current = newUrl;
    setVideoUrl(newUrl);

    return () => {
      if (videoUrlRef.current) {
        URL.revokeObjectURL(videoUrlRef.current);
        videoUrlRef.current = '';
      }
    };
  }, [videoFile]);

  const handleExtractThumbnail = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    if (!video.paused) videoRef.current?.pause();

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL('image/webp', 0.8);
    const timestamp = video.currentTime;

    const newThumbnail: ThumbnailData = {
      id: generateId(),
      imageData,
      timestamp,
      formattedTime: formatTime(timestamp),
    };

    setThumbnails((prev) => [...prev, newThumbnail]);
  }, []);

  const handleRemoveThumbnail = (id: string) => {
    setThumbnails((prev) => prev.filter((thumb) => thumb.id !== id));
  };

  return (
    <div className={styles.thumbnailExtractWrap}>
      {/* Video Player */}
      {videoUrl && (
        <div className={styles.videoWrap}>
          <video
            ref={videoRef}
            src={videoUrl}
            controls
            className={styles.video}
          />
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}
      {/* Thumbnails */}
      <div
        className={styles.thumbnailsWrap({
          layout: thumbnails.length > 4 ? 'scrollable' : 'base',
        })}
      >
        {thumbnails.length > 0 &&
          thumbnails.map((thumbnail) => (
            <div
              key={thumbnail.id}
              className={`${styles.thumbnailChild} ${styles.thumbnail}`}
              onClick={() => handleRemoveThumbnail(thumbnail.id)}
            >
              <button className={styles.thumbnailRemoveButton}>
                <CloseIcon />
              </button>
              <img
                className={styles.thumbnailImage}
                src={thumbnail.imageData}
                alt={`썸네일 ${thumbnail.formattedTime}`}
              />
              <span className={styles.thumbnailTime}>
                {thumbnail.formattedTime}
              </span>
            </div>
          ))}
        {canExtractMore && (
          <button
            className={`${styles.thumbnailChild} ${styles.extractButton}`}
            onClick={handleExtractThumbnail}
          >
            <PlusIcon />
          </button>
        )}
      </div>
    </div>
  );
};
