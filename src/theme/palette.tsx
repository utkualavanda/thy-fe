import type { ThemeOptions } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary'];
    white: Palette['primary'];
    slategray: Palette['primary'];
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
    white?: PaletteOptions['primary'];
    slategray?: PaletteOptions['primary'];
  }
}

export const palette: ThemeOptions['palette'] = {
  mode: 'light',
  primary: {
    main: '#2196f3',
    light: '#64b5f6',
    dark: '#1976d2',
  },
  secondary: {
    main: '#e81932',
    light: '#f14b60',
    dark: '#b01022',
  },
  tertiary: {
    main: '#063048',
    light: '#1a5a7d',
    dark: '#031c28',
  },
  error: {
    main: '#d32f2f',
  },
  warning: {
    main: '#ed6c02',
  },
  info: {
    main: '#0288d1',
  },
  success: {
    main: '#2e7d32',
  },
  background: {
    default: '#f5f5f5',
    paper: '#fff',
  },
  text: {
    primary: '#333',
    secondary: '#666',
  },
  white: {
    main: '#ffffff',
  },
  slategray: {
    main: '#606977',
  },
};
