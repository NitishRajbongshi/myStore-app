import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProductListScreen from '../screens/products/ProductListScreen';
import ProductDetailScreen from '../screens/products/ProductDetailScreen';
import ProductCreateScreen from '../screens/products/ProductCreateScreen';
import ProductEditScreen from '../screens/products/ProductEditScreen';

export type AppStackParamList = {
  ProductsList: undefined;
  ProductDetail: { id: string };
  ProductCreate: undefined;
  ProductEdit: { id: string };
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="ProductsList"
      component={ProductListScreen}
      options={{ title: 'Products' }}
    />
    <Stack.Screen
      name="ProductDetail"
      component={ProductDetailScreen}
      options={{ title: 'Product Detail' }}
    />
    <Stack.Screen
      name="ProductCreate"
      component={ProductCreateScreen}
      options={{ title: 'Create Product' }}
    />
    <Stack.Screen
      name="ProductEdit"
      component={ProductEditScreen}
      options={{ title: 'Edit Product' }}
    />
  </Stack.Navigator>
);

export default AppStack;
