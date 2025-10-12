import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import { Routes } from '../constants';
import RegisterScreen from '../screens/auth/RegisterScreen';

export type AuthStackParamList = {
  [Routes.Login]: undefined;
  [Routes.Register]: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name={Routes.Login} component={LoginScreen} options={{ title: 'Login' }} />
    <Stack.Screen name={Routes.Register} component={RegisterScreen} options={{ title: 'Register' }} />
  </Stack.Navigator>
);

export default AuthStack;
