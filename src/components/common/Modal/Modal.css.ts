import { style } from '@vanilla-extract/css';

export const backdrop = style({
  position: 'fixed',
  inset: 0,
  zIndex: 50,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0,0,0,0.5)',
});

export const container = style({
  position: 'relative',
  backgroundColor: '#fff',
  borderRadius: '0.8rem',
  boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
  maxWidth: '28rem',
  width: '100%',
  maxHeight: '100vh',
  overflow: 'auto',
});
