import type { ReactNode } from 'react';
import * as styles from './Modal.css';

interface ModalBodyProps {
  children: ReactNode;
  className?: string;
}

export const ModalBody = ({ children, className = '' }: ModalBodyProps) => (
  <div className={`${styles.modalBody} ${className}`}>{children}</div>
);
