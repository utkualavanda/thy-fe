import { type ThemeOptions } from '@mui/material';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true;
    desktop: true;
  }
}

export const breakpoints: ThemeOptions['breakpoints'] = {
  values: {
    mobile: 0,
    desktop: 1024,
  },
};
