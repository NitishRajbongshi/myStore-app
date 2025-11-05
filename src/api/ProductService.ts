// src/api/ProductService.ts
import { AppConfig } from './config.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL: string = AppConfig.API_BASE_URL;

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  created_at: string;
  updated_at: string;
}

const ProductService = {
  getAuthHeader: async () => {
    const token: string | null = await AsyncStorage.getItem('authToken');
    if (!token) {
      throw new Error('No auth token found!!');
    }
    return {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    };
  },
  getProducts: async () => {
    const headers = await ProductService.getAuthHeader();
    const res = await fetch(`${API_BASE_URL}/products`, {
      method: 'GET',
      headers: headers,
    });

    let data;
    try {
      data = await res.json();
    } catch {
      throw new Error('Invalid server response');
    }

    if (!res.ok || data.status === false) {
      throw new Error(data?.message || 'Failed to fetch products');
    }

    return data.data;
  },
};
export default ProductService;
