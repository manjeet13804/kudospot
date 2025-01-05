import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2D3250',
      light: '#424769',
      dark: '#1B1F3B',
    },
    secondary: {
      main: '#F6B17A',
      light: '#FFD4B2',
      dark: '#E68A4E',
    },
    success: {
      main: '#7DB9B6',
      light: '#96C7C5',
      dark: '#5A8B89',
    },
    background: {
      default: '#F6F6F6',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 500,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 24px',
        },
        containedPrimary: {
          '&:hover': {
            boxShadow: '0 8px 16px rgba(45, 50, 80, 0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});

export default theme;
