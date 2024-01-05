import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import axiosInstance from './axiosInstance'; // Asegúrate de importar tu instancia de axios

const CartScreen = ({ navigation }) => {
  const [purchases, setPurchases] = useState([]);

  const fetchPurchases = async () => {
    try {
      const response = await axiosInstance.get('cart');
      console.log('Cart Data:', response.data);
      setPurchases(response.data.purchases);
    } catch (error) {
      console.log('Error fetching cart:', error);
    }
  };

  const removeFromCart = async (purchaseId) => {
    try {
      await axiosInstance.delete(`cart/${purchaseId}`);
      setPurchases((prevPurchases) =>
        prevPurchases.filter((purchase) => purchase.id !== purchaseId)
      );
    } catch (error) {
      console.log('Error removing from cart:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // Fetch purchases when the screen is focused
      fetchPurchases();
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Carrito</Text>
      {purchases.map((purchase) => (
        <View key={purchase.id} style={styles.purchaseContainer}>
          <Image
            source={{ uri: purchase.product.image }}
            style={styles.productImage}
          />
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{purchase.product.name}</Text>
            <Text style={styles.productDescription}>{purchase.product.description}</Text>
            <Text style={styles.productPrice}>{`Precio: ${purchase.price}`}</Text>
            <TouchableOpacity onPress={() => removeFromCart(purchase.id)}>
              <Text style={styles.removeButton}>Quitar</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  purchaseContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  removeButton: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default CartScreen;
