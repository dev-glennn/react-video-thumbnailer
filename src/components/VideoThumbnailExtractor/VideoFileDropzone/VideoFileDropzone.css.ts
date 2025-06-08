import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '~/styles/theme.css';

export const drag = recipe({
  base: {
    borderWidth: '2px',
    borderStyle: 'dashed',
    borderRadius: '0.5rem',
    padding: '2rem',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    cursor: 'pointer',
  },
  variants: {
    isDragging: {
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
    },
  },
});

export const icon = style({
  fontSize: '2.25rem',
});

export const title = style({
  fontSize: '1.125rem',
  fontWeight: 500,
});

export const description = style({
  fontSize: '0.875rem',
  color: vars.color.gray[500],
  marginTop: '0.25rem',
});

export const error = style({
  fontSize: '0.875rem',
  color: vars.color.red[600],
  fontWeight: 600,
});
