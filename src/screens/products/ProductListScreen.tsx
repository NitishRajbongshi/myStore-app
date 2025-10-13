import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../theme';

const ProductListScreen = () => {
  const { logout, user } = useAuth();
  const { theme } = useTheme();
  return (
    <View>
      <Text>ProductListScreen</Text>
      <TouchableOpacity
        onPress={logout}
        style={{
          marginTop: 30,
          backgroundColor: theme.colors.primary,
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.spacing.lg,
          borderRadius: theme.radii.md,
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

const styles = StyleSheet.create({});
