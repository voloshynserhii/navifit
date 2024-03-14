import { PALETTE_COLORS } from './colors';

/**
 * MUI theme options for "Dark Mode"
 */
export const DARK_THEME = {
  palette: {
    mode: 'dark',
    // background: {
    //   paper: '#424242', // Gray 800 - Background of "Paper" based component
    //   default: '#121212',
    // },
    ...PALETTE_COLORS,
  },
  typography: {
    h1: {
      fontSize: 40,
      fontFamily: 'unset',
      fontWeight: 600,
      lineHeight: '60px',
      color: PALETTE_COLORS.primary.contrastText
    },
    span: {
      fontSize: 16,
      lineHeight: '24px',
      fontFamily: 'unset',
      fontWeight: 500
    },
    h3: {
      fontSize: 18,
      fontFamily: 'unset',
      fontWeight: 400,
      lineHeight: '27px',
      color: PALETTE_COLORS.primary.contrastText
    }
  }
};

export default DARK_THEME;
