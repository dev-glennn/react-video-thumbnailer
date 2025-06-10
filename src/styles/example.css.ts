import { style } from '@vanilla-extract/css';
import { vars } from './theme.css';

export const exampleWrap = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  padding: '2rem',
  minHeight: '100vh',
  alignItems: 'flex-start',
});

export const exampleImageWrap = style({
  width: '50rem',
  display: 'flex',
  flexDirection: 'column-reverse',
  gap: '1rem',
  padding: 0,
  margin: 0,
  listStyle: 'none',
});

export const imageListItem = style({
  display: 'flex',
  gap: '0.5rem',
  padding: '1rem',
  borderRadius: '0.5rem',
  backgroundColor: vars.color.white,
  height: '10rem',
  border: `2px dashed ${vars.color.gray[300]}`,
});

export const imageIndex = style({
  fontWeight: 'bold',
  fontSize: '1rem',
  color: vars.color.blue[500],
  width: '5rem',
});

export const imageGridWrap = style({
  flex: 1,
  display: 'flex',
});
