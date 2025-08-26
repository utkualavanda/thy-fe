import type { ThemeOptions } from '@mui/material';

export const palette: ThemeOptions['palette'] = {
  mode: 'light',
  primary: {
    main: '#e81932',
    light: '#f14b60',
    dark: '#b01022',
  },
  secondary: {
    main: '#232b38',
    light: '#3a4658',
    dark: '#1a2029',
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
};
