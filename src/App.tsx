import React from 'react';
import { ThemeProvider, useTheme } from './theme';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainNavigator from './navigation/MainNavigator';
import { AuthProvider } from './context/AuthContext';

const AppInner = () => {
  const { theme, colorScheme, isReady } = useTheme();

  // show loading screen
  if (!isReady) {
    return (
      <View
        style={[
          {
            backgroundColor: theme.colors.background,
          },
          styles.container,
        ]}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <SafeAreaView
        style={[styles.statusBar, { backgroundColor: theme.colors.background }]}
      >
        <MainNavigator />
      </SafeAreaView>
    </>
  );
};

const App = () => (
  <ThemeProvider>
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  </ThemeProvider>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBar: {
    flex: 1,
  },
});
export default App;
