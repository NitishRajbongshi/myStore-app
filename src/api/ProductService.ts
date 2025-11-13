// src/api/ProductService.ts
import { AppConfig } from './config.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL: string = AppConfig.API_BASE_URL;

export interface Product {
  id: string;
  name: string;
  slug: string;
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
      'Content-Type': 'application/json',
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

  addProduct: async (
    name: string,
    description: string,
    price: string,
  ): Promise<Product> => {
    const header = await ProductService.getAuthHeader();
    console.log(name, description, price, header); // getting inputs successfully
    const res = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: header,
      body: JSON.stringify({ name, description, price }),
    });
    let data;
    try {
      data = await res.json();
    } catch {
      throw new Error('Invalid JSON response from server');
    }

    if (!res.ok || data.status === false) {
      throw new Error(data?.message || 'Failed to add product');
    }

    return data.data;
  },

  updateProduct: async (
    id: string,
    name: string,
    description: string,
    price: string
  ): Promise<Product> => {
    const headers = await ProductService.getAuthHeader();

    // Auto-generate slug from name
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ name, slug, description, price }),
    });

    let data;
    try {
      data = await res.json();
    } catch {
      throw new Error('Invalid JSON response from server');
    }

    if (!res.ok || data.status === false) {
      if (data?.errors) {
        throw new Error(data?.message || 'Failed to update product');
      }
      throw new Error(data?.message || 'Failed to update product');
    }

    return data.data;
  },

  deleteProduct: async (id: string): Promise<void> => {
    const headers = await ProductService.getAuthHeader();

    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers,
    });

    let data;
    try {
      data = await res.json();
    } catch {
      throw new Error('Invalid JSON response from server');
    }

    if (!res.ok || data.status === false) {
      throw new Error(data?.message || 'Failed to delete product');
    }

    return;
  },
};
export default ProductService;
