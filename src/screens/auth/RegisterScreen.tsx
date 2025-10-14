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
  StyleSheet,
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
      Alert.alert(
        'Registration failed',
        err.message || 'Please try again later',
      );
      console.log(err.message[0]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[
        {
          backgroundColor: theme.colors.background,
          paddingHorizontal: theme.spacing.lg,
        },
        styles.container,
      ]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View>
        <Text
          style={[
            {
              color: theme.colors.text,
              fontSize: theme.fontSizes.lg,
              marginBottom: theme.spacing.xl,
            },
            styles.headerText,
          ]}
        >
          Create Account ✨
        </Text>

        <TextInput
          placeholder="Full Name"
          placeholderTextColor={theme.colors.subText}
          value={name}
          onChangeText={setName}
          style={[
            {
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.card,
              color: theme.colors.text,
              borderRadius: theme.radii.md,
              padding: theme.spacing.md,
              marginBottom: theme.spacing.md,
            },
            styles.textInput,
          ]}
        />

        <TextInput
          placeholder="Valid Email"
          placeholderTextColor={theme.colors.subText}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={[
            {
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.card,
              color: theme.colors.text,
              borderRadius: theme.radii.md,
              padding: theme.spacing.md,
              marginBottom: theme.spacing.md,
            },
            styles.textInput,
          ]}
        />

        <TextInput
          placeholder="Strong Password"
          placeholderTextColor={theme.colors.subText}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={[
            {
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.card,
              color: theme.colors.text,
              borderRadius: theme.radii.md,
              padding: theme.spacing.md,
              marginBottom: theme.spacing.md,
            },
            styles.textInput,
          ]}
        />

        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor={theme.colors.subText}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={[
            {
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.card,
              color: theme.colors.text,
              borderRadius: theme.radii.md,
              padding: theme.spacing.md,
              marginBottom: theme.spacing.md,
            },
            styles.textInput,
          ]}
        />

        <TouchableOpacity
          onPress={handleRegister}
          disabled={loading}
          style={[
            {
              backgroundColor: theme.colors.primary,
              paddingVertical: theme.spacing.md,
              borderRadius: theme.radii.md,
            },
            styles.btnContainer,
          ]}
        >
          {loading ? (
            <ActivityIndicator color={theme.colors.primaryTextOn} />
          ) : (
            <Text
              style={[
                {
                  color: theme.colors.primaryTextOn,
                  fontSize: theme.fontSizes.md,
                },
                styles.btnText,
              ]}
            >
              Register
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[{ marginTop: theme.spacing.lg }, styles.btnContainer]}
        >
          <Text
            style={[
              {
                color: theme.colors.primary,
              },
              styles.btnText,
            ]}
          >
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: '700',
    textAlign: 'center',
  },
  textInput: {
    borderWidth: 1,
  },
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontWeight: '500',
  },
});

export default RegisterScreen;
