import { vars } from '~/styles/theme.css';
import { style, styleVariants } from '@vanilla-extract/css';

export const buttonBase = style({
  fontWeight: 500,
  borderRadius: '0.625rem',
  fontSize: '1rem',
  cursor: 'pointer',
  border: 'none',
  transition: 'background-color 0.2s, color 0.2s',
  selectors: {
    '&:disabled': {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
  },
});

export const buttonSize = styleVariants({
  sm: {
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
  },
  md: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
  },
  lg: {
    padding: '0.75rem 1.25rem',
    fontSize: '1.125rem',
  },
});

export const buttonVariant = styleVariants({
  primary: {
    backgroundColor: vars.color.blue[500],
    color: vars.color.white,
    selectors: {
      '&:hover:not(:disabled)': {
        backgroundColor: vars.color.blue[700],
      },
    },
  },
  success: {
    backgroundColor: vars.color.green[500],
    color: vars.color.white,
    selectors: {
      '&:hover:not(:disabled)': {
        backgroundColor: vars.color.green[600],
      },
    },
  },
  secondary: {
    backgroundColor: vars.color.gray[100],
    color: vars.color.gray[600],
    selectors: {
      '&:hover:not(:disabled)': {
        backgroundColor: vars.color.gray[200],
      },
    },
  },
});
