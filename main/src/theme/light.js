import { PALETTE_COLORS } from './colors';

/**
 * MUI theme options for "Light Mode"
 */
export const LIGHT_THEME = {
  palette: {
    mode: 'light',
    // background: {
    //   paper: '#f5f5f5', // Gray 100 - Background of "Paper" based component
    //   default: '#FFFFFF',
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
    h2: {
      fontSize: 30,
      fontFamily: 'unset',
      fontWeight: 600,
      lineHeight: '45px',
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
    },
    h3semi: {
      fontSize: 18,
      fontFamily: 'unset',
      fontWeight: 600,
      lineHeight: '27px',
      color: PALETTE_COLORS.primary.contrastText
    },
    body16: {
      fontWeight: 400,
      fontFamily: 'unset',
      fontSize: '1rem',
      lineHeight: '1.5rem',
      color: PALETTE_COLORS.primary.bodyGrey,
    //   [breakpoints.down("md")]: {
    //     fontSize: '12px',
    // },
    },
    body14: {
      fontWeight: 400,
      fontFamily: 'unset',
      fontSize: 14,
      lineHeight: '21px',
      color: PALETTE_COLORS.primary.grey2,
    },
    medium14: {
      fontWeight: 500,
      fontFamily: 'unset',
      fontSize: 14,
      lineHeight: '21px',
      color: PALETTE_COLORS.primary.contrastText,
    },
    medium16: {
      fontWeight: 500,
      fontFamily: 'unset',
      fontSize: 16,
      lineHeight: '24px',
      color: PALETTE_COLORS.primary.contrastText,
    }
  }
};

export default LIGHT_THEME;
