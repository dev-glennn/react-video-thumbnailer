import { useCallback, useEffect, useRef, useState } from 'react';
import type { ThumbnailData } from '~/types';
import { formatTime, generateId } from '~/utils';

interface UseThumbnailExtractOptions {
  videoFile: File;
  onChange: (thumbnails: ThumbnailData[]) => void;
  maxThumbnails: number;
}

// 썸네일 추출 관련 훅
export const useThumbnailExtract = ({
  videoFile,
  onChange,
  maxThumbnails,
}: UseThumbnailExtractOptions) => {
  const [thumbnails, setThumbnails] = useState<ThumbnailData[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoUrlRef = useRef<string>('');
  const [videoUrl, setVideoUrl] = useState<string>('');

  const canExtractMore = thumbnails.length < maxThumbnails;

  // 썸네일 추출
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

  // 썸네일 제거
  const handleRemoveThumbnail = useCallback((id: string) => {
    setThumbnails((prev) => prev.filter((thumb) => thumb.id !== id));
  }, []);

  // Video URL
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

  // 썸네일 변경 시
  useEffect(() => {
    onChange(thumbnails);
  }, [onChange, thumbnails]);

  return {
    thumbnails,
    videoRef,
    canvasRef,
    videoUrl,
    canExtractMore,
    handleExtractThumbnail,
    handleRemoveThumbnail,
  };
};
