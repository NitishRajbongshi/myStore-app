import React from 'react';
import { ThemeProvider, useTheme } from './theme';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainNavigator from './navigation/MainNavigator';

const AppInner = () => {
  const { theme, colorScheme } = useTheme();
  return (
    <>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <MainNavigator />
      </SafeAreaView>
    </>
  );
};

const App = () => (
  <ThemeProvider>
    <AppInner />
  </ThemeProvider>
);

export default App;
