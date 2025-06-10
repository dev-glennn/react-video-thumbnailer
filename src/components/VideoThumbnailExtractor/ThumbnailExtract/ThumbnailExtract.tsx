import * as styles from './ThumbnailExtract.css';
import { CloseIcon, PlusIcon } from '~/components/icons';
import type { ThumbnailData } from '~/types';
import { useThumbnailExtract, useVideoKeyControls } from '~/hooks';
import { VideoPlayer } from './VideoPlayer';

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

  useVideoKeyControls(videoRef);

  return (
    <div className={styles.thumbnailExtractWrap}>
      {/* Video Player */}
      {videoUrl && (
        <VideoPlayer
          videoRef={videoRef}
          canvasRef={canvasRef}
          videoUrl={videoUrl}
        />
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
