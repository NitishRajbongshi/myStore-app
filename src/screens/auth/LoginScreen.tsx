import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme';
import { Routes } from '../../constants';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthStack';
import ThemeToggleButton from '../../components/ThemeToggleButton';

type Props = NativeStackScreenProps<AuthStackParamList, Routes.Login>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
      }}
    >
      <Text style={{ color: theme.colors.text, fontSize: 18 }}>
        Login Screen
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate(Routes.Register)}
        style={{
          marginTop: theme.spacing.md,
          backgroundColor: theme.colors.primary,
          paddingHorizontal: theme.spacing.lg,
          paddingVertical: theme.spacing.sm,
          borderRadius: theme.radii.md,
        }}
      >
        <Text style={{ color: theme.colors.primaryTextOn }}>
          Go to Register
        </Text>
      </TouchableOpacity>
      <ThemeToggleButton />
    </View>
  );
};

export default LoginScreen;
