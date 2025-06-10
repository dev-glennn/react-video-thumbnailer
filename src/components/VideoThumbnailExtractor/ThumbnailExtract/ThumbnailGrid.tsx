import { PlusIcon } from '~/components/icons';
import { ThumbnailItem } from './ThumbnailItem';
import * as styles from './ThumbnailExtract.css';
import type { ThumbnailData } from '~/types';
import { memo } from 'react';

interface ThumbnailGridProps {
  thumbnails: ThumbnailData[];
  canExtractMore: boolean;
  onExtract: () => void;
  onRemove: (id: string) => void;
}

export const ThumbnailGrid = memo(
  ({ thumbnails, canExtractMore, onExtract, onRemove }: ThumbnailGridProps) => {
    const layout = thumbnails.length > 4 ? 'scrollable' : 'base';

    return (
      <div
        className={`${styles.thumbnailsWrap} ${styles.thumbnailLayoutVariants[layout]}`}
      >
        {thumbnails.map((thumbnail) => (
          <ThumbnailItem
            key={thumbnail.id}
            thumbnail={thumbnail}
            onRemove={onRemove}
          />
        ))}
        {canExtractMore && (
          <button
            className={`${styles.thumbnailChild} ${styles.extractButton}`}
            onClick={onExtract}
            aria-label="썸네일 추출"
          >
            <PlusIcon />
          </button>
        )}
      </div>
    );
  }
);

ThumbnailGrid.displayName = 'ThumbnailGrid';
