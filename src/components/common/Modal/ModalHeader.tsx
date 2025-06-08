import type { ReactNode } from 'react';
import * as styles from './ModalHeader.css';
import { CloseIcon, BackIcon } from '~/components/icons';

interface ModalHeaderProps {
  children: ReactNode;
  onBack?: () => void;
  onClose?: () => void;
  className?: string;
}

export const ModalHeader = ({
  children,
  onBack,
  onClose,
  className = '',
}: ModalHeaderProps) => {
  return (
    <div className={`${styles.header} ${className}`}>
      {onBack && (
        <button
          className={styles.button({ position: 'left' })}
          onClick={onBack}
          aria-label="뒤로가기"
        >
          <BackIcon />
        </button>
      )}
      <div className={styles.title}>{children}</div>
      {onClose && (
        <button
          className={styles.button({ position: 'right' })}
          onClick={onClose}
          aria-label="닫기"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
};
