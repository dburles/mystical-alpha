const theme = {
  global: {
    html: { height: '100%' },
    body: {
      display: 'block',
      height: '100%',
    },
    '#root': {
      display: 'block',
      height: '100%',
    },
  },
  space: [
    '0px',
    '4px',
    '8px',
    '16px',
    '32px',
    '64px',
    '128px',
    '256px',
    '512px',
  ],
  breakpoints: ['640px', '768px', '1024px', '1280px'],
  colors: {
    white: '#fff',
    black: '#000',
    // body color
    text: '#222',
    // body background color
    background: '#fff',
    // primary button and link color
    primary: '#07c',
    // secondary color - can be used for hover states
    secondary: '#05a',
    // a contrast color for emphasizing UI
    accent: '#08d',
    // a background color for highlighting text
    highlight: '#ffff00',
    // a gray or subdued color for decorative purposes
    muted: '#f6f6f6',
    modes: {
      dark: {
        text: '#fff',
        background: '#000',
        primary: '#0cf',
      },
    },
    reds: {
      100: '#fff5f5',
      200: '#fed7d7',
      300: '#feb2b2',
      400: '#fc8181',
      500: '#f56565',
      600: '#e53e3e',
      700: '#c53030',
      800: '#9b2c2c',
      900: '#742a2a',
    },
    yellows: {
      100: '#fffff0',
      200: '#fefcbf',
      300: '#faf089',
      400: '#f6e05e',
      500: '#ecc94b',
      600: '#d69e2e',
      700: '#b7791f',
      800: '#975a16',
      900: '#744210',
    },
    blues: {
      100: '#ebf8ff',
      200: '#bee3f8',
      300: '#90cdf4',
      400: '#63b3ed',
      500: '#4299e1',
      600: '#3182ce',
      700: '#2b6cb0',
      800: '#2c5282',
      900: '#2a4365',
    },
    greens: {
      100: '#f0fff4',
      200: '#c6f6d5',
      300: '#9ae6b4',
      400: '#68d391',
      500: '#48bb78',
      600: '#38a169',
      700: '#2f855a',
      800: '#276749',
      900: '#22543d',
    },
    grays: {
      100: '#f7fafc',
      200: '#edf2f7',
      300: '#e2e8f0',
      400: '#cbd5e0',
      500: '#a0aec0',
      600: '#718096',
      700: '#4a5568',
      800: '#2d3748',
      900: '#1a202c',
    },
  },
  fonts: {
    serif: 'Georgia, Cambria, "Times New Roman", Times, serif',
    mono: 'Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace',
    sans:
      'Inter, system-ui, -apple-system, BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
  },
  fontSizes: [
    '14px',
    '16px',
    '20px',
    '24px',
    '30px',
    '36px',
    '48px',
    '64px',
    '72px',
  ],
  fontWeights: {
    thin: '200',
    normal: '400',
    medium: '500',
    bold: '700',
  },
  lineHeights: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    body: '1.5',
    heading: '1.5',
    loose: '2',
  },
  letterSpacings: {
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
  sizes: {
    '0': '0',
    '1': '4px',
    '2': '8px',
    '3': '12px',
    '4': '16px',
    '5': '20px',
    '6': '24px',
    '8': '32px',
    '10': '40px',
    '12': '48px',
    '16': '64px',
    '20': '80px',
    '24': '96px',
    '32': '128px',
    '38': '152px',
    '40': '160px',
    '48': '192px',
    '56': '224px',
    '64': '256px',
    px: '1px',
    xs: '320px',
    sm: '384px',
    md: '448px',
    lg: '512px',
    xl: '576px',
    '2xl': '672px',
    '3xl': '768px',
    '4xl': '896px',
    '5xl': '1024px',
    '6xl': '1152px',
    full: '100%',
  },
  borderWidths: ['0px', '1px', '2px', '4px', '8px'],
  borderStyles: {
    normal: 'solid',
  },
  radii: ['0', '2px', '4px', '8px', '16px', '9999px'],
  shadows: {
    default: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg:
      '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl:
      '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
    none: 'none',
  },
  zIndices: {
    '0': '0',
    '10': '10',
    '20': '20',
    '30': '30',
    '40': '40',
    '50': '50',
    auto: 'auto',
  },
};

export default theme;