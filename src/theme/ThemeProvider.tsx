import React, { createContext, useContext, useMemo, useState } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import { ThemeTokens, ColorTokens } from './types';
import { lightColors, darkColors } from './colors';

const defaultSpacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 };
const defaultRadii = { sm: 6, md: 10, lg: 16, round: 9999 };
const defaultSizes = { avatar: 48, inputHeight: 48, icon: 20 };
const defaultZ = { modal: 1000, toast: 1100, nav: 900 };
const defaultFonts = { regular: 'System', medium: 'System', bold: 'System' };

export const buildTheme = (colors: ColorTokens): ThemeTokens => ({
  colors,
  spacing: defaultSpacing,
  radii: defaultRadii,
  sizes: defaultSizes,
  zIndices: defaultZ,
  fonts: defaultFonts,
});

type ThemeContextValue = {
  theme: ThemeTokens;
  colorScheme: ColorSchemeName;
  setScheme: (scheme: ColorSchemeName) => void;
  toggleScheme: () => void;
};

const preferredScheme = Appearance.getColorScheme();
const initialScheme: ColorSchemeName = preferredScheme ?? 'light';

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode; initial?: ColorSchemeName }> = ({
  children,
  initial,
}) => {
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>(initial ?? initialScheme);

  const colors = useMemo(() => (colorScheme === 'dark' ? darkColors : lightColors), [colorScheme]);
  const theme = useMemo(() => buildTheme(colors), [colors]);

  const setScheme = (scheme: ColorSchemeName) => setColorScheme(scheme);
  const toggleScheme = () => setColorScheme((s) => (s === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, colorScheme, setScheme, toggleScheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
