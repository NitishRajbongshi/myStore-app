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

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
    } catch (err: any) {
      console.log(err.message);
      Alert.alert('Login failed', err.message || 'Invalid credentials');
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
              marginBottom: theme.spacing.xl,
              fontSize: theme.fontSizes.xl,
            },
            styles.headingText,
          ]}
        >
          Welcome Back 👋
        </Text>

        <TextInput
          placeholder="Enter Email"
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
          placeholder="Enter password"
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

        <TouchableOpacity
          onPress={handleLogin}
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
              Login
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
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
            Don’t have an account? Register
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
  headingText: {
    fontWeight: '700',
    textAlign: 'center',
  },
  textInput: {
    borderWidth: 1,
  },
  btnContainer: { alignItems: 'center', justifyContent: 'center' },
  btnText: {
    fontWeight: '500',
  },
});

export default LoginScreen;
