import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../navigation/AppStack';
import ProductService from '../../api/ProductService';
import { AppConfig } from '../../api/config.ts';

type Props = NativeStackScreenProps<AppStackParamList, 'ProductDetail'>;

const ProductDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { id } = route.params;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const headers = await ProductService.getAuthHeader();
        const res = await fetch(`${AppConfig.API_BASE_URL}/products/${id}`, {
          headers,
        });
        const data = await res.json();
        setProduct(data.data);
      } catch {
        Alert.alert('Error', 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this product?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              setDeleting(true);
              await ProductService.deleteProduct(id);
              Alert.alert('Deleted', 'Product deleted successfully');
              navigation.goBack();
            } catch (error: any) {
              Alert.alert('Error', error.message || 'Failed to delete product');
            } finally {
              setDeleting(false);
            }
          },
        },
      ],
    );
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;

  if (!product) return <Text style={styles.notFound}>Product not found</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>

      <View style={styles.actions}>
        <Button
          title="Edit"
          onPress={() =>
            navigation.navigate('ProductEdit', { id: product.id.toString() })
          }
        />
        <View style={{ height: 10 }} />
        {deleting ? (
          <ActivityIndicator />
        ) : (
          <Button title="Delete" color="red" onPress={handleDelete} />
        )}
      </View>
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  price: { fontSize: 18, color: '#555', marginBottom: 8 },
  description: { fontSize: 16, color: '#666' },
  actions: { marginTop: 20 },
  notFound: { textAlign: 'center', marginTop: 40, fontSize: 18 },
});
