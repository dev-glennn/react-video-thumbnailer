import { style } from '@vanilla-extract/css';
import { vars } from '~/styles/theme.css';

export const backdrop = style({
  position: 'fixed',
  inset: 0,
  zIndex: 50,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0,0,0,0.5)',
});

export const modal = style({
  position: 'relative',
  backgroundColor: vars.color.white,
  borderRadius: '1.25rem',
  boxShadow: 'rgba(0, 27, 55, 0.1) 0px 2px 30px 0px',
  maxWidth: '28rem',
  width: '100%',
  maxHeight: '90vh',
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
});

export const modalBody = style({
  padding: '0 1.5rem',
  overflowY: 'auto',
  selectors: {
    '&:last-child': {
      paddingBottom: '1.5rem',
    },
  },
});
