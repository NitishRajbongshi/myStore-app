// src/api/AuthService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
const API_BASE_URL = 'http://192.168.29.213:8000/api';

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export const AuthService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const res = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    let data;
    try {
      data = await res.json();
    } catch {
      throw new Error('Invalid server response');
    }

    // Laravel might send { message: "Already logged in" } or similar
    if (!res.ok) {
      const message =
        data?.message || data?.error || 'Login failed. Please try again.';
      throw new Error(message);
    }

    // Handle Laravel “already login” or other soft errors even if 200
    if (data?.message?.toLowerCase().includes('already')) {
      throw new Error(data.message);
    }

    return data;
  },

  register: async (
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
  ): Promise<LoginResponse> => {
    const res = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, password_confirmation }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || 'Registration failed');
    }

    return res.json();
  },

  logout: async () => {
    await AsyncStorage.removeItem('authToken');
  },

  saveToken: async (token: string) => {
    await AsyncStorage.setItem('authToken', token);
  },

  getToken: async () => {
    return AsyncStorage.getItem('authToken');
  },
};
