import { memo } from 'react';

export const BackIcon = memo(({ className = '' }: { className?: string }) => {
  return (
    <svg className={className} fill="none" stroke="current" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );
});

BackIcon.displayName = 'BackIcon';
