import { createGlobalThemeContract, createTheme } from '@vanilla-extract/css';

export const vars = createGlobalThemeContract({
  color: {
    bgContrastFloor: 'bg-contrast-floor',
    bgContrastLowest: 'bg-contrast-lowest',
    bgContrastLow: 'bg-contrast-low',
    bgContrastMedium: 'bg-contrast-medium',
    bgContrastHigh: 'bg-contrast-high',
    textContrastLow: 'text-contrast-low',
    textContrastMedium: 'text-contrast-medium',
    textContrastHigh: 'text-contrast-high',
    primary: 'primary',
    highlight: 'highlight',
    disabledOverlay: 'disabled-overlay',
    tomato: 'tomato',
    red: 'red',
    crimson: 'crimson',
    pink: 'pink',
    plum: 'plum',
    purple: 'purple',
    aubergine: 'aubergine',
    violet: 'violet',
    indigo: 'indigo',
    blue: 'blue',
    cyan: 'cyan',
    teal: 'teal',
    green: 'green',
    grass: 'grass',
    brown: 'brown',
    orange: 'orange',
    sky: 'sky',
    mint: 'mint',
    lime: 'lime',
    yellow: 'yellow',
    amber: 'amber',
    ice: 'ice',
  },
  header: {
    backgroundColor: 'header-background-color',
    borderColor: 'header-border-color',
  },
});

export const dark = createTheme(vars, {
  color: {
    bgContrastFloor: '#1C1C1C',
    bgContrastLowest: '#222',
    bgContrastLow: '#2C2C2C',
    bgContrastMedium: '#3D3D3D',
    bgContrastHigh: '#4D4D4D',
    textContrastLow: '#999999',
    textContrastMedium: '#BBBBBB',
    textContrastHigh: '#F2F2F2',
    primary: '#ACEFDB',
    highlight: 'rgba(255, 255, 255, 0.06)',
    disabledOverlay: 'rgba(0, 0, 0, 0.7)',
    tomato: '#E06C51',
    red: '#E56865',
    crimson: '#E26389',
    pink: '#D560A5',
    plum: '#B064BD',
    purple: '#9669C9',
    aubergine: '#2E2739',
    violet: '#7A70D3',
    indigo: '#5779DF',
    blue: '#4DA0F9',
    cyan: '#43ACC6',
    teal: '#4AAB9F',
    green: '#5BA97D',
    grass: '#6CAC71',
    brown: '#B58C69',
    orange: '#F58947',
    sky: '#9FE7FD',
    mint: '#ACEFDB',
    lime: '#CCEB65',
    yellow: '#FFEE78',
    amber: '#FBCC64',
    ice: '#F0F4F8',
  },
  header: {
    backgroundColor: 'transparent',
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
});

export const light = createTheme(vars, {
  color: {
    bgContrastFloor: '#FFFFFF',
    bgContrastLowest: '#F6F6F6',
    bgContrastLow: '#F6F6F6',
    bgContrastMedium: '#EEEEEE',
    bgContrastHigh: '#DDDDDD',
    textContrastLow: '#A0A0A0',
    textContrastMedium: '#888888',
    textContrastHigh: '#222222',
    primary: '#ACEFDB',
    highlight: 'rgba(0, 0, 0, 0.04)',
    disabledOverlay: 'rgba(255, 255, 255, 0.7)',
    tomato: '#E06C51',
    red: '#E56865',
    crimson: '#E26389',
    pink: '#D560A5',
    plum: '#B064BD',
    purple: '#9669C9',
    aubergine: '#2E2739',
    violet: '#7A70D3',
    indigo: '#5779DF',
    blue: '#4DA0F9',
    cyan: '#43ACC6',
    teal: '#4AAB9F',
    green: '#5BA97D',
    grass: '#6CAC71',
    brown: '#B58C69',
    orange: '#F58947',
    sky: '#9FE7FD',
    mint: '#ACEFDB',
    lime: '#CCEB65',
    yellow: '#FFEE78',
    amber: '#FBCC64',
    ice: '#F0F4F8',
  },
  header: {
    backgroundColor: 'transparent',
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});
