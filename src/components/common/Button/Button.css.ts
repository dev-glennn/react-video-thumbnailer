import { vars } from '~/styles/theme.css';
import { style, styleVariants } from '@vanilla-extract/css';

export const buttonBase = style({
  padding: '0.5rem 1rem',
  fontWeight: 500,
  borderRadius: '0.375rem',
  fontSize: '0.875rem',
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

export const buttonVariant = styleVariants({
  primary: [
    buttonBase,
    {
      backgroundColor: vars.color.blue[500],
      color: vars.color.white,
      selectors: {
        '&:hover:not(:disabled)': {
          backgroundColor: vars.color.blue[600],
        },
      },
    },
  ],
  success: [
    buttonBase,
    {
      backgroundColor: vars.color.green[500],
      color: vars.color.white,
      selectors: {
        '&:hover:not(:disabled)': {
          backgroundColor: vars.color.green[600],
        },
      },
    },
  ],
  text: [
    buttonBase,
    {
      backgroundColor: vars.color.white,
      color: vars.color.black,
      selectors: {
        '&:hover:not(:disabled)': {
          backgroundColor: vars.color.gray[100],
        },
      },
    },
  ],
  textSuccess: [
    buttonBase,
    {
      backgroundColor: vars.color.white,
      color: vars.color.green[600],
      selectors: {
        '&:hover:not(:disabled)': {
          backgroundColor: vars.color.green[100],
        },
      },
    },
  ],
});
