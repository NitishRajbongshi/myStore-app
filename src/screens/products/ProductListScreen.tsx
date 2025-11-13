import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  Button,
} from 'react-native';
import ProductService, { Product } from '../../api/ProductService';
import { useTheme } from '../../theme';
import { useAuth } from '../../context/AuthContext';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '../../navigation/AppStack.tsx';

const ProductListScreen = () => {
  const { theme } = useTheme();
  const { logout } = useAuth();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // const navigation = useNavigation();
  type ProductListScreenNavigationProp = NativeStackNavigationProp<
    AppStackParamList,
    'ProductCreate'
  >;

  const navigation = useNavigation<ProductListScreenNavigationProp>();

  const fetchProducts = async () => {
    try {
      setError(null);
      const data = await ProductService.getProducts();
      setProducts(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Auto-refresh when screen focuses
  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [])
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchProducts();
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.colors.background,
        }}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={{ color: theme.colors.text, marginTop: 10 }}>
          Loading products...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.colors.background,
        }}
      >
        <Text style={{ color: theme.colors.danger, marginBottom: 16 }}>
          {error}
        </Text>
        <TouchableOpacity
          onPress={fetchProducts}
          style={{
            backgroundColor: theme.colors.primary,
            paddingVertical: theme.spacing.md,
            paddingHorizontal: theme.spacing.lg,
            borderRadius: theme.radii.md,
          }}
        >
          <Text
            style={{ color: theme.colors.primaryTextOn, fontWeight: '600' }}
          >
            Retry
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: theme.spacing.md,
      }}
    >
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: theme.colors.card,
              padding: theme.spacing.md,
              marginBottom: theme.spacing.sm,
              borderRadius: theme.radii.md,
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowRadius: 3,
              elevation: 2,
            }}
          >
            <Text
              style={{
                color: theme.colors.text,
                fontWeight: '600',
                fontSize: 16,
              }}
            >
              {item.name}
            </Text>
            <Text style={{ color: theme.colors.subText, marginVertical: 4 }}>
              {item.description}
            </Text>
            <Text style={{ color: theme.colors.primary, fontWeight: 'bold' }}>
              ₹{item.price}
            </Text>
            <Button
              title={'edit'}
              onPress={() =>
                navigation.navigate('ProductEdit', { id: item.id.toString() })
              }
            />
            <Button
              title={'view'}
              onPress={() =>
                navigation.navigate('ProductDetail', { id: item.id.toString() })
              }
            />
          </View>
        )}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductCreate')}
        style={{
          backgroundColor: theme.colors.primary,
          paddingVertical: theme.spacing.md,
          alignItems: 'center',
          borderRadius: theme.radii.md,
          marginTop: theme.spacing.md,
        }}
      >
        <Text style={{ color: theme.colors.primaryTextOn, fontWeight: '600' }}>
          Add New Product
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={logout}
        style={{
          backgroundColor: theme.colors.danger,
          paddingVertical: theme.spacing.md,
          alignItems: 'center',
          borderRadius: theme.radii.md,
          marginTop: theme.spacing.lg,
        }}
      >
        <Text style={{ color: theme.colors.primaryTextOn, fontWeight: '600' }}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductListScreen;
