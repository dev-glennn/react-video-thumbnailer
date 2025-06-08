import React, { useEffect, useRef } from 'react';
import { Portal } from './Portal';
import * as styles from './Modal.css.ts';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  closeOnBackdropClick?: boolean; // background 클릭 시 닫힘
  closeOnEscape?: boolean; // ESC 클릭 시 닫힘
  containerClassName?: string;
  backdropClassName?: string;
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  containerClassName = '',
  backdropClassName = '',
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // ESC 클릭 시 창 닫기
    if (!closeOnEscape || !isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [closeOnEscape, isOpen, onClose]);

  useEffect(() => {
    // Modal 오픈 시 스크롤 제어
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) onClose();
  };

  return (
    <Portal>
      <div
        className={`${styles.backdrop} ${backdropClassName}`}
        onClick={handleBackdropClick}
      >
        <div
          ref={modalRef}
          className={`${styles.container} ${containerClassName}`}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
};
