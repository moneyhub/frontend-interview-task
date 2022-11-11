import Color from "color"

export const generateShades = (hex) => ({
  default: hex,
  contrast: Color(hex).negate().hex(),
  dark: Color(hex).darken(0.3).hex(),
  light: Color(hex).lighten(0.8).hex(),
})

export const theme = {
  fonts: {
    body: `"sans-serif"`,
  },
  colors: {
    primary: generateShades("#01a5b8"),
    neutral: {
      default: "#9e9e9e",
      100: "#f7f7f7",
      200: "#e1e1e1",
      300: "#cfcfcf",
      400: "#b1b1b1",
      500: "#9e9e9e",
      600: "#7e7e7e",
      700: "#626262",
      800: "#515151",
      900: "#3b3b3b",
      1000: "#222222",
    },
    white: {
      default: "#fff",
    },
    success: {
      default: "#c2f7e1",
      700: "#006b57",
    },
  },
  typography: {
    xs: {
      fontSize: "12px",
      lineHeight: 1.7,
    },
    s: {
      fontSize: "14px",
      lineHeight: 1.6,
    },
    m: {
      fontSize: "16px",
      lineHeight: 1.6,
    },
    l: {
      fontSize: "18px",
      lineHeight: 1.5,
    },
    xl: {
      fontSize: "20px",
      lineHeight: 1.4,
    },
    "2xl": {
      fontSize: "24px",
      lineHeight: 1.3,
    },
    "3xl": {
      fontSize: "30px",
      lineHeight: 1.2,
    },
    "4xl": {
      fontSize: "36px",
      lineHeight: 1.2,
    },
    "5xl": {
      fontSize: "48px",
      lineHeight: 1.1,
    },
  },
  space: {
    xs: "4px",
    s: "8px",
    m: "16px",
    l: "32px",
    xl: "64px",
  },
  breakpoints: {
    xxs: 375,
    xs: 425,
    s: 768,
    m: 900,
    l: 1024,
    xl: 1300,
    xxl: 1400,
    xxxl: 1600,
  },
}
