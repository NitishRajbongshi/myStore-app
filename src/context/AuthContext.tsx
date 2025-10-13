// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthService } from '../api/AuthService';

type User = {
  id: number;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, password_confirmation: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Restore token on app start
  useEffect(() => {
    (async () => {
      const storedToken = await AuthService.getToken();
      if (storedToken) {
        setToken(storedToken);
        try {
          const profile = await AuthService.getProfile(storedToken);
          setUser(profile);
        } catch {
          await AuthService.removeToken();
        }
      }
    })();
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
    try {
      if (token) {
        await AuthService.logout(token); // optional API call
      }
    } catch (err) {
      console.log('Logout API failed:', err);
    } finally {
      setUser(null);
      setToken(null);
      await AuthService.removeToken();
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
