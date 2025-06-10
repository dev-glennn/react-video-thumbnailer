import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '~/styles/theme.css';

export const dragBase = style({
  borderWidth: '2px',
  borderStyle: 'dashed',
  borderRadius: '0.5rem',
  padding: '2rem',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.65rem',
  cursor: 'pointer',
});

export const dragVariants = styleVariants({
  true: {
    borderColor: vars.color.blue[500],
    backgroundColor: vars.color.blue[100],
  },
  false: {
    borderColor: vars.color.gray[300],
    selectors: {
      '&:hover': {
        borderColor: vars.color.gray[400],
      },
    },
  },
});

export const icon = style({
  width: '5rem',
  height: '5rem',
});

export const title = style({
  fontSize: '1rem',
  fontWeight: 500,
});

export const description = style({
  fontSize: '0.75rem',
  color: vars.color.gray[500],
  marginTop: '0.25rem',
});

export const error = style({
  fontSize: '0.875rem',
  color: vars.color.red[600],
  fontWeight: 600,
});
