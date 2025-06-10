import { globalStyle, style, styleVariants } from '@vanilla-extract/css';
import { vars } from '~/styles/theme.css';

export const thumbnailExtractWrap = style({
  display: 'flex',
  flexDirection: 'column',
});

export const videoWrap = style({
  background: vars.color.black,
  borderRadius: '0.5rem',
  overflow: 'hidden',
  maxHeight: '40vh',
  display: 'flex',
  justifyContent: 'center',
});

export const video = style({
  width: '100%',
});

export const thumbnailsWrap = style({
  marginTop: '0.65rem',
  gap: '0.3rem',
});

export const thumbnailLayoutVariants = styleVariants({
  scrollable: {
    overflowX: 'auto',
    display: 'flex',
    flexWrap: 'nowrap',
  },
  base: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
  },
});

globalStyle(`.${thumbnailLayoutVariants['scrollable']} > *`, {
  width: '6.5rem',
  height: '6.5rem',
});

export const thumbnailChild = style({
  borderRadius: '0.25rem',
  cursor: 'pointer',
  flexShrink: 0,
  aspectRatio: '1 / 1',
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
  width: '100%',
  height: '100%',
  objectFit: 'contain',
});

export const thumbnailRemoveButton = style({
  position: 'absolute',
  right: '0.5rem',
  top: '0.5rem',
  cursor: 'pointer',
  width: '1.2rem',
  height: '1.2rem',
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
  fontSize: '0.75rem',
  right: '0.5rem',
  bottom: '0.5rem',
});

export const extractButton = style({
  backgroundColor: vars.color.gray[100],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

globalStyle(`${extractButton} > svg`, {
  stroke: vars.color.gray[500],
});
