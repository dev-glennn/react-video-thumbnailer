import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ThumbnailData } from '~/features/videoThumbnailExtractor/video';
import * as styles from './ThumbnailExtract.css';
import { CloseIcon, PlusIcon } from '~/components/icons';
import {
  formatTime,
  generateId,
} from '~/features/videoThumbnailExtractor/utils';

interface ThumbnailExtractProps {
  videoFile: File;
  onSubmit: (thumbnails: ThumbnailData[]) => void;
  onBack: () => void;
  maxThumbnails: number;
}

export const ThumbnailExtract = ({
  videoFile,
  onSubmit,
  onBack,
  maxThumbnails,
}: ThumbnailExtractProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbnails, setThumbnails] = useState<ThumbnailData[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const canExtractMore = thumbnails.length < maxThumbnails;

  const videoUrl = useMemo(() => {
    return URL.createObjectURL(videoFile);
  }, [videoFile]);

  useEffect(() => {
    return () => {
      // URL.revokeObjectURL(videoUrl);
    };
  }, [videoUrl]);

  const handleVideoPlay = () => {
    setIsPlaying(true);
  };
  const handleVideoPause = () => {
    setIsPlaying(false);
  };

  const handleExtractThumbnail = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    if (!video.paused) videoRef.current?.pause();

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    console.log(ctx);

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
    <div>
      {/* Video Player */}
      <div className="">
        <video
          ref={videoRef}
          src={videoUrl}
          controls
          className=""
          onPlay={handleVideoPlay}
          onPause={handleVideoPause}
        />
        <canvas ref={canvasRef} className="hidden" />
      </div>
      {/* Thumbnails */}
      <div className={styles.thumbnailsWrap}>
        {thumbnails.length > 0 &&
          thumbnails.map((thumbnail) => (
            <div
              className={styles.thumbnail}
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
            className={styles.extractButton}
            onClick={handleExtractThumbnail}
          >
            <PlusIcon />
          </button>
        )}
      </div>
    </div>
  );
};
