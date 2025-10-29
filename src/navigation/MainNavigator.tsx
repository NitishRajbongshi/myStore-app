// src/navigation/MainNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useTheme } from '../theme';
import AppStack from './AppStack';
import AuthStack from './AuthStack';


const MainNavigator = () => {
  const { token, loading } = useAuth();
  const { theme } = useTheme();

  if (loading) {
    return (
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {token ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default MainNavigator;
