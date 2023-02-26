import { ThemeOptions } from '@mui/material/styles';


// #f1802d - orange
// #f6f6f6 - white
// #b0d7e1 - light gray
// #549aab - dark gray
// #123740 - black


export const mainThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#f1802d',          // orange
      light: '#f1802d',         // orange
      dark: '#000000',          // uber black
      contrastText: '#f6f6f6',  // white
    },
    secondary: {
      main: '#f1802d',          // orange
      contrastText: '#123740',  // white
    },
    background: {
      default: '#b0d7e1',       // light gray
      paper: '#f6f6f6',         // white
    },
    text: {
      primary: '#123740',       // black
      secondary: '#549aab',     // dark gray
      disabled: '#b0d7e1',      // light gray
    },
    divider: '#123740',         // black
  },
  typography: {
    fontSize: 14,
    fontWeightLight: 200,
    htmlFontSize: 16,
    fontFamily: 'Noto Sans',
    h1: {
      fontSize: '6rem',
    },
    h3: {
      fontSize: '3rem',
    },
    h6: {
        color: '#f6f6f6'
    }
  },
  transitions: {
    easing: {
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)'
    }
  }
};