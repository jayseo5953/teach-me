import { createTheme } from '@mui/material/styles';

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

  workspaces: {
    sm: '390px',
    md: '834px',
    lg: '1366px',
    xl: '1630px',
  },

  /**
   * Once brand is determined, use colors from here
   * https://mui.com/material-ui/customization/color/#color-palette
   * */
  palette: {
    background: '#F5F5F8',
    primary: {
      main: '#28ABC7',
      light: '#61D5F2',
      dark: '#004E5C',
      contrastText: '#FFFFFF',
      100: '#FFFFFF',
      99: '#F8FDFF',
      98: '#F0FBFF',
      95: '#D8F6FF',
      90: '#ACECFF',
      80: '#61D5F2',
      70: '#3EB9D5',
      60: '#029EB9',
      50: '#008399',
      40: '#00687A',
      35: '#005B6B',
      30: '#004E5C',
      25: '#00424E',
      20: '#003640',
      15: '#002A33',
      10: '#001F26',
      5: '#001419',
      0: '#000000',
    },
  },

  typography: {
    htmlFontSize: 16,
    fontFamily: '"Pretendard", "Arial", sans-serif',
    fontSize: 14,
    fontWeights,
    // H1
    h1: {
      fontSize: '34px',
      lineHeight: 1.2,
      fontWeight: fontWeights.semiBold,
      '@media (min-width:1060px)': {
        fontSize: '26px',
        lineHeight: 1.23,
      },
    },

    // H2
    h2: {
      fontSize: '28px',
      lineHeight: 1.21,
      fontWeight: fontWeights.semiBold,
      '@media (min-width:1060px)': {
        fontSize: '22px',
        lineHeight: 1.18,
      },
    },

    // H3
    h3: {
      fontSize: '22px',
      lineHeight: 1.27,
      fontWeight: fontWeights.semiBold,
      '@media (min-width:1060px)': {
        fontSize: '17px',
        lineHeight: 1.29,
      },
    },

    // H4
    h4: {
      fontSize: '20px',
      lineHeight: 1.3,
      fontWeight: fontWeights.semiBold,
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

console.log(theme);
export default theme;
