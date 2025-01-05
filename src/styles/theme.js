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

  sizes: { headerHeight: ' 57px', fullHeight: 'calc(100vh - 57px)' },

  /**
   * Once brand is determined, use colors from here
   * https://mui.com/material-ui/customization/color/#color-palette
   * */
  palette: {
    background: '#F5F5F8',
    chatBubbles: {
      textColor: 'rgba(60, 60, 67, 1)',
      receiver: {
        backgroundColor: '#FFEA80',
      },
      sender: {
        backgroundColor: '#E1E8F0',
      },
    },
    primary: {
      main: '#477BFF',
      light: '#8CA8FF',
      dark: '#0048C1',
      100: '#FFFFFF',
      99: '#FEFBFF',
      98: '#FAF8FF',
      95: '#EEF0FF',
      90: '#DBE1FF',
      80: '#B4C5FF',
      70: '#8CA8FF',
      60: '#618BFF',
      50: '#477BFF',
      40: '#386EF2',
      35: '#0048C1',
      30: '#003EA7',
      25: '#00348F',
      20: '#002A77',
      15: '#002061',
      10: '#00174B',
      5: '#000E34',
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

export default theme;
