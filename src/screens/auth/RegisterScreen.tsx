// src/screens/Auth/RegisterScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '../../theme';
import { useAuth } from '../../context/AuthContext';

type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      await register(name, email, password, confirmPassword);
      Alert.alert('Success', 'Account created successfully!');
    } catch (err: any) {
      Alert.alert('Registration failed', err.message || 'Please try again later');
      console.log(err.message[0]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        paddingHorizontal: theme.spacing.lg,
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View>
        <Text
          style={{
            color: theme.colors.text,
            fontSize: 28,
            fontWeight: '700',
            marginBottom: theme.spacing.xl,
            textAlign: 'center',
          }}
        >
          Create Account ✨
        </Text>

        <TextInput
          placeholder="Full Name"
          placeholderTextColor={theme.colors.subText}
          value={name}
          onChangeText={setName}
          style={{
            borderWidth: 1,
            borderColor: theme.colors.border,
            backgroundColor: theme.colors.card,
            color: theme.colors.text,
            borderRadius: theme.radii.md,
            paddingHorizontal: theme.spacing.md,
            paddingVertical: theme.spacing.sm,
            marginBottom: theme.spacing.md,
          }}
        />

        <TextInput
          placeholder="Email"
          placeholderTextColor={theme.colors.subText}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={{
            borderWidth: 1,
            borderColor: theme.colors.border,
            backgroundColor: theme.colors.card,
            color: theme.colors.text,
            borderRadius: theme.radii.md,
            paddingHorizontal: theme.spacing.md,
            paddingVertical: theme.spacing.sm,
            marginBottom: theme.spacing.md,
          }}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor={theme.colors.subText}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={{
            borderWidth: 1,
            borderColor: theme.colors.border,
            backgroundColor: theme.colors.card,
            color: theme.colors.text,
            borderRadius: theme.radii.md,
            paddingHorizontal: theme.spacing.md,
            paddingVertical: theme.spacing.sm,
            marginBottom: theme.spacing.md,
          }}
        />

        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor={theme.colors.subText}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={{
            borderWidth: 1,
            borderColor: theme.colors.border,
            backgroundColor: theme.colors.card,
            color: theme.colors.text,
            borderRadius: theme.radii.md,
            paddingHorizontal: theme.spacing.md,
            paddingVertical: theme.spacing.sm,
            marginBottom: theme.spacing.lg,
          }}
        />

        <TouchableOpacity
          onPress={handleRegister}
          disabled={loading}
          style={{
            backgroundColor: theme.colors.primary,
            paddingVertical: theme.spacing.md,
            borderRadius: theme.radii.md,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {loading ? (
            <ActivityIndicator color={theme.colors.primaryTextOn} />
          ) : (
            <Text
              style={{
                color: theme.colors.primaryTextOn,
                fontWeight: '600',
                fontSize: 16,
              }}
            >
              Register
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={{ marginTop: theme.spacing.lg, alignItems: 'center' }}
        >
          <Text
            style={{
              color: theme.colors.primary,
              fontWeight: '500',
            }}
          >
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
