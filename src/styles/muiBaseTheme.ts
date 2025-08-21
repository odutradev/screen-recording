import { createTheme } from '@mui/material/styles';

import type { ThemeOptions } from '@mui/material/styles';

export const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: { main: '#0499C8' },
    secondary: { main: '#024FF0' },
    background: { default: '#262626', paper: '#363636' }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: '#262626' }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundColor: '#363636 !important' }
      }
    }
  }
};

export const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: { main: '#0499C8' },
    secondary: { main: '#024FF0' },
    background: { default: '#fafafa', paper: '#ffffff' }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: '#fafafa' }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundColor: '#ffffff !important' }
      }
    }
  }
};

export const lightTheme = createTheme(lightThemeOptions);
export const darkTheme = createTheme(darkThemeOptions);
