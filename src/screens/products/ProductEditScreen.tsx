import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { AppStackParamList } from '../../navigation/AppStack.tsx';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ProductService from '../../api/ProductService.ts';
import { AppConfig } from '../../api/config.ts';

type Props = NativeStackScreenProps<AppStackParamList, 'ProductEdit'>;

const ProductEditScreen: React.FC<Props> = ({ route, navigation }) => {
  const { id } = route.params;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const headers = await ProductService.getAuthHeader();
        const res = await fetch(`${AppConfig.API_BASE_URL}/products/${id}`, {
          headers,
        });
        const data = await res.json();
        console.log(data);
        setName(data.data.name);
        setDescription(data.data.description || '');
        setPrice(data.data.price.toString());
      } catch (error) {
        Alert.alert('Error', 'Failed to load product');
        console.error(error);
      } finally {
        setInitialLoading(false);
      }
    };
    fetchProduct();
  }, [id]);
  const handleUpdate = async () => {
    if (!name || !price) {
      Alert.alert('Error', 'Name and price are required');
      return;
    }

    try {
      setLoading(true);
      await ProductService.updateProduct(id, name, description, price);
      Alert.alert('Success', 'Product updated successfully');
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };
  if (initialLoading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Product Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        value={description}
        multiline
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        value={price}
        keyboardType="decimal-pad"
        onChangeText={setPrice}
      />

      {loading ? (
        <ActivityIndicator size="small" />
      ) : (
        <Button title="Update Product" onPress={handleUpdate} />
      )}
    </View>
  );
};

export default ProductEditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginTop: 4,
  },
});
