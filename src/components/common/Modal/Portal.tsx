import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
  containerId?: string;
}

export const Portal = ({
  children,
  containerId = 'modal-root',
}: PortalProps) => {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let container = document.getElementById(containerId);
    if (!container) {
      container = document.createElement('div');
      container.id = containerId;
      document.body.appendChild(container);
    }

    containerRef.current = container;
    setMounted(true);

    return () => {
      if (container && container.children.length === 0) {
        document.body.removeChild(container);
      }
    };
  }, [containerId]);

  // SSR 방지
  if (!mounted || !containerRef.current) return null;
  return createPortal(children, containerRef.current);
};
