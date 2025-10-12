// src/components/ThemeToggleButton.tsx
import React from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../theme';

interface ThemeToggleButtonProps {
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({ style, textStyle }) => {
  const { theme, colorScheme, toggleScheme } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={toggleScheme}
      style={[
        {
          backgroundColor: theme.colors.primary,
          paddingVertical: theme.spacing.sm,
          paddingHorizontal: theme.spacing.lg,
          borderRadius: theme.radii.md,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
    >
      <Text
        style={[
          {
            color: theme.colors.primaryTextOn,
            fontWeight: '600',
          },
          textStyle,
        ]}
      >
        {colorScheme === 'dark' ? 'Switch to Light Mode 🌞' : 'Switch to Dark Mode 🌙'}
      </Text>
    </TouchableOpacity>
  );
};

export default ThemeToggleButton;
