import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';

// border color rgb(231, 235, 240);
declare module '@mui/material/styles/createPalette' {
  interface Palette {
    olive: {
      50: string;
    };
  }
  // allow configuration using `createTheme`
  interface PaletteOptions {
    olive: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
  }
}

// '#00cc8b'  blue - '#3d72a4', green - '#42692f', purple - '#64485c'
let theme = createTheme({
  palette: {
    primary: {
      main: '#64485c',
    },
    secondary: {
      main: '#b7d150',
    },
    olive: {
      50: '#f4f8e9',
      100: '#e4ecc9',
      200: '#d2e0a7',
      300: '#c0d384',
      400: '#b2ca6a',
      500: '#a4c150',
      600: '#94b148',
      700: '#7f9d3e',
      800: '#6c8a36',
      900: '#4a6826',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          textTransform: 'initial',
          ':hover': {
            boxShadow: 'none',
          },
        },
      },
    },
  },
});

console.log({ theme });

export { theme };
