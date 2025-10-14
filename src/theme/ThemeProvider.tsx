// src/theme/themeProvider.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeTokens, ColorTokens } from './types';
import { lightColors, darkColors } from './colors';
import {
  defaultSpacing,
  defaultRadii,
  defaultSizes,
  defaultZ,
  defaultFonts,
  defaultFontSizes,
} from './constants';

const STORAGE_KEY = '@theme:colorScheme';

export const buildTheme = (colors: ColorTokens): ThemeTokens => ({
  colors,
  spacing: defaultSpacing,
  radii: defaultRadii,
  sizes: defaultSizes,
  zIndices: defaultZ,
  fonts: defaultFonts,
  fontSizes: defaultFontSizes,
});

type ThemeContextValue = {
  theme: ThemeTokens;
  colorScheme: ColorSchemeName;
  setScheme: (scheme: ColorSchemeName) => void;
  toggleScheme: () => void;
  isReady: boolean;
};

const preferredScheme = Appearance.getColorScheme();
const initialScheme: ColorSchemeName = preferredScheme ?? 'light';

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode; initial?: ColorSchemeName }> = ({
  children,
  initial,
}) => {
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>(initial ?? initialScheme);
  const [isReady, setIsReady] = useState(false);

  // Load saved scheme from AsyncStorage
  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored === 'light' || stored === 'dark') {
          setColorScheme(stored);
        }
      } catch (error) {
        console.warn('Failed to load theme from storage:', error);
      } finally {
        setIsReady(true);
      }
    })();
  }, []);

  // Save scheme whenever it changes
  useEffect(() => {
    if (isReady) {
      AsyncStorage.setItem(STORAGE_KEY, colorScheme ?? 'light').catch((err) =>
        console.warn('Failed to save theme:', err)
      );
    }
  }, [colorScheme, isReady]);

  const colors = useMemo(() => (colorScheme === 'dark' ? darkColors : lightColors), [colorScheme]);
  const theme = useMemo(() => buildTheme(colors), [colors]);

  const setScheme = (scheme: ColorSchemeName) => setColorScheme(scheme);
  const toggleScheme = () => setColorScheme((s) => (s === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, colorScheme, setScheme, toggleScheme, isReady }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};
