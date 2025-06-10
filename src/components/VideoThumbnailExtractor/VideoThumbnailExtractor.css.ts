import { globalStyle, style } from '@vanilla-extract/css';

export const modal = style({});

export const buttonWrap = style({
  display: 'flex',
  gap: '0.625rem',
  flexShrink: '0',
  padding: '0.625rem 1.5rem 1rem',
});

globalStyle(`${buttonWrap} > *`, {
  flex: '1 1 0%',
  padding: '1rem',
  fontWeight: 700,
});
