// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthService, LoginResponse } from '../api/AuthService';

interface AuthContextProps {
  user: LoginResponse['user'] | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, password_confirmation:string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<LoginResponse['user'] | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const savedToken = await AuthService.getToken();
      if (savedToken) {
        setToken(savedToken);
        // Optionally fetch user profile here if needed
      }
      setLoading(false);
    };
    loadToken();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await AuthService.login(email, password);
      setUser(response.user);
      setToken(response.token);
      await AuthService.saveToken(response.token);
    } finally {
      setLoading(false);
    }
  };

  const register = async (
  name: string,
  email: string,
  password: string,
  password_confirmation: string
) => {
  setLoading(true);
  try {
    const response = await AuthService.register(name, email, password, password_confirmation);
    setUser(response.user);
    setToken(response.token);
    await AuthService.saveToken(response.token);
  } finally {
    setLoading(false);
  }
};

  const logout = async () => {
    setUser(null);
    setToken(null);
    await AuthService.logout();
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
