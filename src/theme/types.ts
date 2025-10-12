export type ColorTokens = {
  background: string;
  card: string;
  text: string;
  subText: string;
  border: string;
  primary: string;
  primaryTextOn: string;
  success: string;
  danger: string;
  warning: string;
  overlay: string;
};

export type ThemeTokens = {
  colors: ColorTokens;
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  radii: {
    sm: number;
    md: number;
    lg: number;
    round: number;
  };
  sizes: {
    avatar: number;
    inputHeight: number;
    icon: number;
  };
  zIndices: {
    modal: number;
    toast: number;
    nav: number;
  };
  fonts: {
    regular: string;
    medium: string;
    bold: string;
  };
};
