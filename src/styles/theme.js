import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const fontWeights = {
  light: 300,
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  extraBold: 800,
};

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 735,
      md: 1060,
      lg: 1440,
      xl: 1630,
    },
  },

  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },

  typography: {
    htmlFontSize: 16,
    fontFamily: '"Pretendard Variable", "Arial", sans-serif',
    fontSize: 14,
    fontWeights,
    // H1
    h1: {
      fontSize: '34px',
      lineHeight: 1.2,
      fontWeight: fontWeights.semiBold, // SemiBold
      '@media (min-width:1060px)': {
        fontSize: '26px',
        lineHeight: 1.23,
      },
    },

    // H2
    h2: {
      fontSize: '28px',
      lineHeight: 1.21,
      fontWeight: fontWeights.semiBold, // SemiBold
      '@media (min-width:1060px)': {
        fontSize: '22px',
        lineHeight: 1.18,
      },
    },

    // H3
    h3: {
      fontSize: '22px',
      lineHeight: 1.27,
      fontWeight: fontWeights.semiBold, // SemiBold
      '@media (min-width:1060px)': {
        fontSize: '17px',
        lineHeight: 1.29,
      },
    },

    // H4
    h4: {
      fontSize: '20px',
      lineHeight: 1.3,
      fontWeight: fontWeights.semiBold, // SemiBold
      '@media (min-width:1060px)': {
        fontSize: '15px',
        lineHeight: 1.33,
      },
    },

    // Headline
    headline: {
      fontSize: '17px',
      lineHeight: 1.4,
      fontWeight: fontWeights.medium,
      '@media (min-width:1060px)': {
        fontSize: '13px',
        lineHeight: 1.4,
      },
    },

    // Body1
    body1: {
      fontSize: '17px',
      lineHeight: 1.41,
      fontWeight: fontWeights.regular,
      '@media (min-width:1060px)': {
        fontSize: '14px',
        lineHeight: 1.57,
      },
    },

    // Body2
    body2: {
      fontSize: '16px',
      lineHeight: 1.38,
      fontWeight: fontWeights.regular,
      '@media (min-width:1060px)': {
        fontSize: '14px',
        lineHeight: 1.43,
      },
    },

    // Body3
    body3: {
      fontSize: '15px',
      lineHeight: 1.33,
      fontWeight: fontWeights.regular,
      '@media (min-width:1060px)': {
        fontSize: '13px',
        lineHeight: 1.38,
      },
    },

    // Subhead
    subhead: {
      fontSize: '15px',
      lineHeight: 1.33,
      fontWeight: fontWeights.regular,
      '@media (min-width:1060px)': {
        fontSize: '14px',
        lineHeight: 1.29,
      },
    },

    // Footnote
    footnote: {
      fontSize: '13px',
      lineHeight: 1.38,
      fontWeight: fontWeights.medium,
      '@media (min-width:1060px)': {
        fontSize: '12px',
        lineHeight: 1.33,
      },
    },

    // Caption1
    caption1: {
      fontSize: '12px',
      lineHeight: 1.33,
      fontWeight: fontWeights.medium,
      '@media (min-width:1060px)': {
        fontSize: '11px',
        lineHeight: 1.27,
      },
    },

    // Caption2
    caption2: {
      fontSize: '11px',
      lineHeight: 1.27,
      fontWeight: fontWeights.regular,
      '@media (min-width:1060px)': {
        fontSize: '10px',
        lineHeight: 1.2,
      },
    },
  },
});

export default theme;
