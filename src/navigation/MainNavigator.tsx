import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../theme';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

const RootStack = createNativeStackNavigator();

const MainNavigator = () => {
  const { colorScheme, theme } = useTheme();

  // TODO: Replace this with actual auth state from context or redux
  const isAuthenticated = false;

  const navigationTheme = {
    dark: colorScheme === 'dark',
    colors: {
      ...((colorScheme === 'dark' ? DarkTheme.colors : DefaultTheme.colors) as any),
      background: theme.colors.background,
      card: theme.colors.card,
      text: theme.colors.text,
      border: theme.colors.border,
      primary: theme.colors.primary,
    },
  };

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <RootStack.Screen name="AppStack" component={AppStack} />
        ) : (
          <RootStack.Screen name="AuthStack" component={AuthStack} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
