// src/api/AuthService.ts
import {AppConfig} from './config.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Get the base url
const API_BASE_URL:string = AppConfig.API_BASE_URL;

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
    let data;
    try {
      data = await res.json();
    } catch {
      throw new Error('Invalid server response');
    }

    if (!res.ok) {
      // Handle Laravel validation errors
      if (data?.errors?.email) {
        throw new Error(data.errors.email[0]);
      } else if (data?.message) {
        throw new Error(data.message);
      } else {
        throw new Error('Registration failed. Please try again.');
      }
    }

    return data;
  },

  logout: async (token: string): Promise<void> => {
    try {
      await fetch(`${API_BASE_URL}/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });
    } catch (err) {
      console.log('Logout request failed:', err);
    }
  },

  getProfile: async (token: string) => {
    const res = await fetch(`${API_BASE_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    if (!res.ok) throw new Error('Failed to fetch profile');
    return res.json();
  },

  saveToken: async (token: string) => {
    await AsyncStorage.setItem('authToken', token);
  },

  getToken: async () => {
    return AsyncStorage.getItem('authToken');
  },
  removeToken: () => AsyncStorage.removeItem('authToken'),
};
