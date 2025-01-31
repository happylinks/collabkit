import { fallbackVar } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../theme/index.css';

export const iconButtonWidth = fallbackVar(vars.iconButton.width, '24px');
export const iconButtonHeight = fallbackVar(vars.iconButton.height, '24px');

export const iconColor = fallbackVar(vars.iconButton.color, vars.color.icon);

export const button = recipe({
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: iconButtonHeight,
    width: iconButtonWidth,
    cursor: 'pointer',
    userSelect: 'none',
    pointerEvents: 'all',
    borderRadius: fallbackVar(vars.iconButton.borderRadius, '4px'),
    color: fallbackVar(vars.iconButton.color, vars.color.icon),
    background: fallbackVar(vars.iconButton.background, 'transparent'),
    fontFamily: vars.fontFamily,

    selectors: {
      '&:active': {
        background: fallbackVar(vars.iconButton.active.background, vars.color.surfaceOverlay),
      },
      '&:hover': {
        background: fallbackVar(vars.iconButton.hover.background, vars.color.surfaceOverlay),
      },
    },
  },
  variants: {
    disabled: {
      true: {
        color: fallbackVar(vars.iconButton.color, vars.color.iconSecondary),
      },
    },
    active: {
      true: {
        background: fallbackVar(vars.iconButton.active.background, vars.color.surfaceOverlay),
      },
    },
    small: {
      true: {
        height: fallbackVar(vars.iconButton.small.height, '20px'),
        width: fallbackVar(vars.iconButton.small.width, '20px'),
      },
    },
  },
});
