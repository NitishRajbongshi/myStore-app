import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Routes } from '../constants';
import ProductListScreen from '../screens/products/ProductListScreen';
import ProductDetailScreen from '../screens/products/ProductDetailScreen';
import ProductCreateScreen from '../screens/products/ProductCreateScreen';
import ProductEditScreen from '../screens/products/ProductEditScreen';

export type AppStackParamList = {
  [Routes.ProductsList]: undefined;
  [Routes.ProductDetail]: { id: string };
  [Routes.ProductCreate]: undefined;
  [Routes.ProductEdit]: { id: string };
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen name={Routes.ProductsList} component={ProductListScreen} options={{ title: 'Products' }} />
    <Stack.Screen name={Routes.ProductDetail} component={ProductDetailScreen} options={{ title: 'Product Detail' }} />
    <Stack.Screen name={Routes.ProductCreate} component={ProductCreateScreen} options={{ title: 'Create Product' }} />
    <Stack.Screen name={Routes.ProductEdit} component={ProductEditScreen} options={{ title: 'Edit Product' }} />
  </Stack.Navigator>
);

export default AppStack;
