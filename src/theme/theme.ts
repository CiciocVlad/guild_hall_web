import React from 'react';
import { createTheme as createMuiTheme, PaletteMode } from '@mui/material';
import { getCssVar } from '../utils/css-vars-to-js';

declare module '@mui/material/styles' {
  interface Palette {
    general: {
      frame: React.CSSProperties['color'];
      background: React.CSSProperties['color'];
      text: React.CSSProperties['color'];
      employeeCard: React.CSSProperties['color'];
      employeeCardLeft: React.CSSProperties['color'];
      standardText: React.CSSProperties['color'];
      shareButton: React.CSSProperties['color'];
      logoBgColor: React.CSSProperties['color'];
      header: React.CSSProperties['color'];
      tehnicalProfile: React.CSSProperties['color'];
    };
    status: {
      online: React.CSSProperties['color'];
      offline: React.CSSProperties['color'];
      border: React.CSSProperties['color'];
      background: React.CSSProperties['color'];
      text: React.CSSProperties['color'];
    };
    time_off: {
      time_off_background: React.CSSProperties['color'];
      taken_days_background: React.CSSProperties['color'];
      font: React.CSSProperties['color'];
    };
    technical_profile: {
      primary: React.CSSProperties['color'];
    };
    badge: {
      text: React.CSSProperties['color'];
      accent: React.CSSProperties['color'];
    };
    project: {
      background: React.CSSProperties['color'];
      edit: React.CSSProperties['color'];
      add: React.CSSProperties['color'];
      cancel: React.CSSProperties['color'];
      input: React.CSSProperties['color'];
    };
    filters: {
      checked: React.CSSProperties['color'];
      background: React.CSSProperties['color'];
      puller: React.CSSProperties['color'];
      expandListButton: {
        hoverBackground: React.CSSProperties['color'];
      };
    };
    button: {
      primary: {
        background: React.CSSProperties['color'];
        text: React.CSSProperties['color'];
        hoverBackground: React.CSSProperties['color'];
      };
      secondary: {
        background: React.CSSProperties['color'];
        text: React.CSSProperties['color'];
        hoverBackground: React.CSSProperties['color'];
      };
      expandList: {
        hoverBackground: React.CSSProperties['color'];
      };
    };
    chip: {
      background: React.CSSProperties['color'];
    };
  }
}

export const lightPalette = {
  mode: 'light' as PaletteMode,
  primary: {
    main: getCssVar('--color-purple900'),
    light: getCssVar('--color-purple900'),
    dark: getCssVar('--color-white200'),
    contrastText: getCssVar('--color-white800'),
  },
  secondary: {
    main: getCssVar('--color-green300'),
    light: getCssVar('--color-green300'),
    dark: getCssVar('--color-green400'),
    contrastText: getCssVar('--color-black700'),
  },
  warning: {
    main: getCssVar('--color-pink700'),
  },
  text: {
    primary: getCssVar('--color-blue500'),
    secondary: getCssVar('--color-black700'),
  },
  error: {
    main: getCssVar('--color-red500'),
    light: getCssVar('--color-red500'),
    dark: getCssVar('--color-red200'),
    contrastText: getCssVar('--color-black'),
  },
  background: {
    default: getCssVar('--color-whiteI'),
    main: getCssVar('--color-white087'),
    paper: getCssVar('--color-white200'),
  },
  info: {
    main: getCssVar('--color-orange'),
  },
  general: {
    frame: getCssVar('--color-white'),
    background: getCssVar('--color-white100'),
    text: getCssVar('--color-black'),
    employeeCard: getCssVar('--color-white'),
    employeeCardLeft: getCssVar('--light-black'),
    standardText: getCssVar('--color-black100'),
    shareButton: getCssVar('--color-green700'),
    logoBgColor: getCssVar('--color-white'),
    header: getCssVar('--color-purple900'),
  },
  status: {
    online: getCssVar('--color-green500'),
    offline: getCssVar('--color-yellow500'),
    border: getCssVar('--color-white'),
    background: getCssVar('--color-purple700'),
    text: getCssVar('--color-purple900'),
  },
  time_off: {
    time_off_background: getCssVar('--color-white700'),
    taken_days_background: getCssVar('--color-yellow100'),
    font: getCssVar('--color-black100'),
  },
  technical_profile: {
    primary: getCssVar('--color-purple100'),
  },
  badge: {
    text: getCssVar('--color-white'),
    accent: getCssVar('--color-pink700'),
  },
  project: {
    background: getCssVar('--color-white'),
    edit: getCssVar('--color-purple900'),
    add: getCssVar('--color-black100'),
    cancel: getCssVar('--color-black500'),
    input: getCssVar('--color-white200'),
  },
  filters: {
    checked: getCssVar('--color-black700'),
    background: getCssVar('--color-blue508'),
    puller: getCssVar('--color-black'),
    expandListButton: {
      hoverBackground: getCssVar('--color-black200'),
    },
  },
  button: {
    primary: {
      background: getCssVar('--color-green300'),
      text: getCssVar('--color-black700'),
      hoverBackground: getCssVar('--color-green400'),
    },
    secondary: {
      background: getCssVar('--color-black500'),
      text: getCssVar('--color-white'),
      hoverBackground: getCssVar('--color-black700'),
    },
  },
  chip: {
    background: getCssVar('--color-white024'),
  },
};

export const darkPalette = {
  mode: 'dark' as PaletteMode,
  primary: {
    main: getCssVar('--color-purple500'),
    light: getCssVar('--color-purple300'),
    dark: getCssVar('--color-purple500'),
    contrastText: getCssVar('--color-white800'),
  },
  secondary: {
    main: getCssVar('--color-green700'),
    light: getCssVar('--color-green300'),
    dark: getCssVar('--color-black300'),
    contrastText: getCssVar('--color-black'),
  },
  warning: {
    main: getCssVar('--color-pink200'),
  },
  text: {
    primary: getCssVar('--color-blue200'),
    secondary: getCssVar('--color-white800'),
  },
  error: {
    main: getCssVar('--color-red200'),
    light: getCssVar('--color-red500'),
    dark: getCssVar('--color-red200'),
    contrastText: getCssVar('--color-black'),
  },
  background: {
    default: getCssVar('--color-whiteI'),
    paper: getCssVar('--color-purple600'),
  },
  info: {
    main: getCssVar('--color-orange'),
  },
  general: {
    frame: getCssVar('--color-black400'),
    background: getCssVar('--color-black700'),
    text: getCssVar('--color-white'),
    employeeCard: getCssVar('--color-purple500'),
    employeeCardLeft: getCssVar('--dark-white'),
    standardText: getCssVar('--color-black600'),
    logoBgColor: getCssVar('--color-grey100'),
    header: getCssVar('--color-purple800'),
    shareButton: getCssVar('--color-green700'),
    tehnicalProfile: getCssVar('--color-purple400'),
  },
  status: {
    online: getCssVar('--color-green700'),
    offline: getCssVar('--color-yellow700'),
    border: getCssVar('--color-black'),
    background: getCssVar('--color-purple500'),
    text: getCssVar('--color-purple900'),
  },
  time_off: {
    time_off_background: getCssVar('--color-purple300'),
    taken_days_background: getCssVar('--color-purple300'),
    font: getCssVar('--color-black600'),
  },
  technical_profile: {
    primary: getCssVar('--color-white'),
  },
  badge: {
    text: getCssVar('--color-black700'),
    accent: getCssVar('--color-pink200'),
  },
  project: {
    background: getCssVar('--color-grey'),
    edit: getCssVar('--color-white200'),
    add: getCssVar('--color-black100'),
    cancel: getCssVar('--color-black300'),
    input: getCssVar('--color-black500'),
  },
  filters: {
    checked: getCssVar('--color-white'),
    background: getCssVar('--color-blue208'),
    puller: getCssVar('--color-white'),
    expandListButton: {
      hoverBackground: getCssVar('--color-black700'),
    },
  },
  button: {
    primary: {
      background: getCssVar('--color-green700'),
      text: getCssVar('--color-black700'),
      hoverBackground: getCssVar('--color-green800'),
    },
    secondary: {
      background: getCssVar('--color-grey'),
      text: getCssVar('--color-white'),
      hoverBackground: getCssVar('--color-grey100'),
    },
  },
  chip: {
    background: getCssVar('--color-white024'),
  },
};

const typography = {
  h1: {
    fontFamily: 'Roboto Slab',
    fontSize: '1.25rem',
    fontWeight: 500,
  },
  subtitle1: {
    fontFamily: 'Roboto Slab',
    fontSize: '1.25rem',
    fontWeight: 400,
  },
  subtitle2: {
    fontFamily: 'Lato',
    fontSize: '1rem',
    fontWeight: 700,
  },
  body1: {
    fontFamily: 'Lato',
    fontSize: '1rem',
    fontWeight: 400,
  },
  body2: {
    fontFamily: 'Lato',
    fontSize: '0.875rem',
    fontWeight: 400,
  },
  caption: {
    fontFamily: 'Lato',
    fontSize: '0.75rem',
    fontWeight: 400,
  },
  h2: {
    fontFamily: 'Lato',
    fontSize: '0.875rem',
    fontWeight: 500,
  },
  button: {
    fontFamily: 'Lato',
    fontSize: '1.25rem',
    fontWeight: 600,
  },
  h3: {
    fontFamily: 'Lato',
    fontSize: '1.125rem',
    fontWeight: 800,
  },
  h4: {
    FontFamily: 'Lato',
    fontSize: '2.5rem',
    fontWeight: 900,
  },
};

export const createTheme = (mode: PaletteMode = 'light') =>
  createMuiTheme({
    typography,
    palette: mode === 'dark' ? darkPalette : lightPalette,
  });
