import { memo } from 'react';
import * as styles from './ThumbnailExtract.css';

interface VideoPlayerProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  videoUrl: string;
}

export const VideoPlayer = memo(
  ({ videoRef, canvasRef, videoUrl }: VideoPlayerProps) => {
    return (
      <div className={styles.videoWrap}>
        <video
          ref={videoRef}
          src={videoUrl}
          controls
          className={styles.video}
        />
        <canvas ref={canvasRef} className="hidden" />
      </div>
    );
  }
);

VideoPlayer.displayName = 'VideoPlayer';
