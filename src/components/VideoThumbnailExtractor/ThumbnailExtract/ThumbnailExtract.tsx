import { useEffect } from 'react';
import * as styles from './ThumbnailExtract.css';
import { CloseIcon, PlusIcon } from '~/components/icons';
import type { ThumbnailData } from '~/types';
import { useThumbnailExtract } from '~/hooks';

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
  const {
    thumbnails,
    videoRef,
    canvasRef,
    videoUrl,
    canExtractMore,
    handleExtractThumbnail,
    handleRemoveThumbnail,
  } = useThumbnailExtract({
    videoFile,
    onChange,
    maxThumbnails,
  });

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
