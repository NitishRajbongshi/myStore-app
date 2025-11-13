import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../theme';
import ProductService from '../../api/ProductService';

const ProductCreateScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddProduct = async () => {
    if (!name || !description || !price) {
      Alert.alert('Validation Error', 'All fields are required.');
      return;
    }

    setLoading(true);
    try {
      await ProductService.addProduct(name, description, price);
      Alert.alert('Success', 'Product added successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to add product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: theme.colors.background,
        padding: theme.spacing.lg,
      }}
      keyboardShouldPersistTaps="handled"
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: theme.colors.text,
          marginBottom: theme.spacing.lg,
        }}
      >
        Add New Product
      </Text>

      <Text style={{ color: theme.colors.text }}>Name</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.card,
          color: theme.colors.text,
          borderRadius: theme.radii.md,
          padding: theme.spacing.md,
          marginBottom: theme.spacing.md,
        }}
        placeholder="Enter product name"
        placeholderTextColor={theme.colors.subText}
        value={name}
        onChangeText={setName}
      />

      <Text style={{ color: theme.colors.text }}>Description</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.card,
          color: theme.colors.text,
          borderRadius: theme.radii.md,
          padding: theme.spacing.md,
          marginBottom: theme.spacing.md,
          height: 100,
          textAlignVertical: 'top',
        }}
        placeholder="Enter product description"
        placeholderTextColor={theme.colors.subText}
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <Text style={{ color: theme.colors.text }}>Price (₹)</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.card,
          color: theme.colors.text,
          borderRadius: theme.radii.md,
          padding: theme.spacing.md,
          marginBottom: theme.spacing.lg,
        }}
        placeholder="Enter price"
        placeholderTextColor={theme.colors.subText}
        keyboardType="decimal-pad"
        value={price}
        onChangeText={setPrice}
      />

      <TouchableOpacity
        onPress={handleAddProduct}
        disabled={loading}
        style={{
          backgroundColor: loading
            ? theme.colors.warning
            : theme.colors.primary,
          paddingVertical: theme.spacing.md,
          alignItems: 'center',
          borderRadius: theme.radii.md,
        }}
      >
        {loading ? (
          <ActivityIndicator color={theme.colors.primaryTextOn} />
        ) : (
          <Text
            style={{ color: theme.colors.primaryTextOn, fontWeight: '600' }}
          >
            Add Product
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProductCreateScreen;
