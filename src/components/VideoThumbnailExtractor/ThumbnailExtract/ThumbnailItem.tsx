import { memo } from 'react';
import * as styles from './ThumbnailExtract.css';
import type { ThumbnailData } from '~/types';
import { CloseIcon } from '~/components/icons';

interface ThumbnailItemProps {
  thumbnail: ThumbnailData;
  onRemove: (id: string) => void;
}

export const ThumbnailItem = memo(
  ({ thumbnail, onRemove }: ThumbnailItemProps) => {
    return (
      <div
        className={`${styles.thumbnailChild} ${styles.thumbnail}`}
        onClick={() => onRemove(thumbnail.id)}
      >
        <button className={styles.thumbnailRemoveButton}>
          <CloseIcon />
        </button>
        <img
          className={styles.thumbnailImage}
          src={thumbnail.imageData}
          alt={`썸네일 ${thumbnail.formattedTime}`}
        />
        <span className={styles.thumbnailTime}>{thumbnail.formattedTime}</span>
      </div>
    );
  }
);

ThumbnailItem.displayName = 'ThumbnailItem';
