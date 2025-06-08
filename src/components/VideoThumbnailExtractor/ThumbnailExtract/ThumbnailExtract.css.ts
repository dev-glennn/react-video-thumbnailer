import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '~/styles/theme.css';

export const thumbnailsWrap = style({
  marginTop: '1rem',
  overflowX: 'auto',
  display: 'flex',
  flexWrap: 'nowrap',
  gap: '0.3rem',
});

globalStyle(`${thumbnailsWrap} > *`, {
  width: '6.5rem',
  height: '6.5rem',
  borderRadius: '0.25rem',
  cursor: 'pointer',
  flexShrink: 0,
});

export const thumbnail = style({
  position: 'relative',
  backgroundColor: vars.color.black,
  color: vars.color.white,
  overflow: 'hidden',
});

export const thumbnailImage = style({
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
});

export const thumbnailRemoveButton = style({
  position: 'absolute',
  right: '0.5rem',
  top: '0.5rem',
  cursor: 'pointer',
  width: '1.4rem',
  height: '1.4rem',
  opacity: '0',
  zIndex: 1,
});

globalStyle(`${thumbnail}:hover > ${thumbnailRemoveButton}`, {
  opacity: '1',
});

globalStyle(`${thumbnailRemoveButton} > svg`, {
  stroke: vars.color.white,
});

export const thumbnailTime = style({
  position: 'absolute',
  fontSize: '0.825rem',
  right: '0.5rem',
  bottom: '0.5rem',
});

export const extractButton = style({
  backgroundColor: vars.color.gray[100],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
