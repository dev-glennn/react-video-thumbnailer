import { useEffect, type RefObject } from 'react';

export const useVideoKeyControls = (
  videoRef: RefObject<HTMLVideoElement | null>
) => {
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
  }, [videoRef]);
};
