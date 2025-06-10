import * as styles from './ThumbnailExtract.css';
import type { ThumbnailData } from '~/types';
import { useThumbnailExtract, useVideoKeyControls } from '~/hooks';
import { VideoPlayer } from './VideoPlayer';
import { ThumbnailGrid } from './ThumbnailGrid';

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
      <ThumbnailGrid
        thumbnails={thumbnails}
        canExtractMore={canExtractMore}
        onExtract={handleExtractThumbnail}
        onRemove={handleRemoveThumbnail}
      />
    </div>
  );
};
