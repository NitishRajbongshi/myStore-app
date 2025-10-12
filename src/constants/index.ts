// src/constants/index.ts
export const API = {
  BASE_URL: 'https://api.yourserver.com/v1', // <-- replace with your server
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
  },
  PRODUCTS: {
    ROOT: '/products',
    CREATE: '/products',
    GET: (id: string | number) => `/products/${id}`,
    UPDATE: (id: string | number) => `/products/${id}`,
    DELETE: (id: string | number) => `/products/${id}`,
    LIST: '/products',
  },
};

export const STORAGE_KEYS = {
  TOKEN: '@app:token',
  REFRESH: '@app:refresh',
  USER: '@app:user',
};

export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_STRONG: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/, // at least 8 chars + letter + digit
};

export const APP = {
  NAME: 'MyProductsApp',
  VERSION: '0.1.0',
  SUPPORT_EMAIL: 'support@yourserver.com',
};

export enum Routes {
  AuthStack = 'AuthStack',
  AppStack = 'AppStack',
  Login = 'Login',
  Register = 'Register',
  ProductsList = 'ProductsList',
  ProductDetail = 'ProductDetail',
  ProductCreate = 'ProductCreate',
  ProductEdit = 'ProductEdit',
}
