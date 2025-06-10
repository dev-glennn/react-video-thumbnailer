import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const IconSize = '2rem';

export const header = style({
  height: '3.5rem',
  display: 'grid',
  gridTemplateColumns: `${IconSize} auto ${IconSize}`,
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0 1rem',
  flexShrink: '0',
});

export const title = style({
  gridColumn: '2/3',
  fontSize: '1.2rem',
  fontWeight: 700,
  textAlign: 'center',
});

export const button = recipe({
  base: {
    width: IconSize,
    height: IconSize,
    cursor: 'pointer',
  },
  variants: {
    position: {
      left: {
        gridColumn: '1/2',
      },
      right: {
        gridColumn: '3/4',
      },
    },
  },
});
