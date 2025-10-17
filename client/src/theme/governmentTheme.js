import { createTheme } from '@mui/material/styles';

// Government of India Official Color Scheme
export const governmentColors = {
  // Primary Colors
  saffron: '#FF9933',      // Indian Flag Saffron
  white: '#FFFFFF',        // Indian Flag White
  green: '#138808',        // Indian Flag Green
  navy: '#000080',         // Deep Navy Blue
  
  // Extended Government Colors
  primaryBlue: '#1565C0',   // Government Portal Blue
  secondaryBlue: '#0D47A1', // Deep Blue
  lightBlue: '#E3F2FD',    // Light Blue Background
  
  primaryGreen: '#2E7D32',  // Forest Green
  lightGreen: '#E8F5E8',   // Light Green Background
  darkGreen: '#1B5E20',    // Dark Forest Green
  
  primaryOrange: '#FF7043', // Accent Orange
  lightOrange: '#FFF3E0',  // Light Orange Background
  
  // Functional Colors
  success: '#4CAF50',      // Success Green
  warning: '#FF9800',      // Warning Orange
  error: '#F44336',        // Error Red
  info: '#2196F3',         // Info Blue
  
  // Neutral Colors
  grey: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  
  // Government Specific
  ashokChakra: '#000080',  // Ashok Chakra Blue
  goldAccent: '#FFD700',   // Gold for special elements
  silverAccent: '#C0C0C0', // Silver for secondary elements
};

// Government Theme
export const governmentTheme = createTheme({
  palette: {
    primary: {
      main: governmentColors.primaryBlue,
      light: governmentColors.lightBlue,
      dark: governmentColors.secondaryBlue,
      contrastText: governmentColors.white,
    },
    secondary: {
      main: governmentColors.primaryGreen,
      light: governmentColors.lightGreen,
      dark: governmentColors.darkGreen,
      contrastText: governmentColors.white,
    },
    error: {
      main: governmentColors.error,
    },
    warning: {
      main: governmentColors.warning,
    },
    info: {
      main: governmentColors.info,
    },
    success: {
      main: governmentColors.success,
    },
    background: {
      default: '#FAFAFA',
      paper: governmentColors.white,
    },
    text: {
      primary: governmentColors.grey[900],
      secondary: governmentColors.grey[700],
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 0, 0, 0.05)',
    '0px 4px 8px rgba(0, 0, 0, 0.08)',
    '0px 8px 16px rgba(0, 0, 0, 0.1)',
    '0px 12px 24px rgba(0, 0, 0, 0.12)',
    '0px 16px 32px rgba(0, 0, 0, 0.15)',
    '0px 20px 40px rgba(0, 0, 0, 0.18)',
    '0px 24px 48px rgba(0, 0, 0, 0.2)',
    '0px 32px 64px rgba(0, 0, 0, 0.24)',
    '0px 40px 80px rgba(0, 0, 0, 0.28)',
    '0px 48px 96px rgba(0, 0, 0, 0.32)',
    '0px 56px 112px rgba(0, 0, 0, 0.36)',
    '0px 64px 128px rgba(0, 0, 0, 0.4)',
    '0px 72px 144px rgba(0, 0, 0, 0.44)',
    '0px 80px 160px rgba(0, 0, 0, 0.48)',
    '0px 88px 176px rgba(0, 0, 0, 0.52)',
    '0px 96px 192px rgba(0, 0, 0, 0.56)',
    '0px 104px 208px rgba(0, 0, 0, 0.6)',
    '0px 112px 224px rgba(0, 0, 0, 0.64)',
    '0px 120px 240px rgba(0, 0, 0, 0.68)',
    '0px 128px 256px rgba(0, 0, 0, 0.72)',
    '0px 136px 272px rgba(0, 0, 0, 0.76)',
    '0px 144px 288px rgba(0, 0, 0, 0.8)',
    '0px 152px 304px rgba(0, 0, 0, 0.84)',
    '0px 160px 320px rgba(0, 0, 0, 0.88)'
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
          padding: '10px 24px',
        },
        contained: {
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
          '&:hover': {
            boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: '1px solid rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0px 12px 32px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

export default governmentTheme;