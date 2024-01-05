import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import { Card, Button, Text } from "react-native-elements";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import FlashMessage, { showMessage } from "react-native-flash-message";
import AsyncStorage from '@react-native-async-storage/async-storage';

function CategoryWomen() {
  const category = 2;
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    console.log('Fetching products...');
    const axiosInstance = axios.create({
      baseURL: "http://192.168.1.80:8000/api", // Reemplaza con la URL correcta de tu API
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    axiosInstance
      .get(`product/category/${category}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [category]);

  const handleBuy = async (productId) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const axiosInstance = axios.create({
          baseURL: "http://192.168.1.80:8000/api",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`, // Asegúrate de incluir el token en el encabezado
          },
        });
  
        const response = await axiosInstance.post(`cartCreate`, {
          product_id: productId,
          quantity: 1,
        });
  
        console.log("Respuesta del servidor:", response.data);
        showMessage({
          message: "Agregado al carrito",
          description: "Se ha agregado al carrito",
          type: "success",
        });
      } else {
        console.log("Token no disponible");
      }
    } catch (error) {
      console.log("Error durante la compra:", error);
    }
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: "https://img.icons8.com/color/48/null/nike.png" }}
            style={styles.logo}
          />
        </View>
        <Text h3>Productos</Text>
        {products.map((product) => (
          <Card key={product.id} containerStyle={styles.card}>
            <Card.Image source={{ uri: product.image }} />
            <Card.Divider />
            <Card.Title>{product.name}</Card.Title>
            <Text>{product.description}</Text>
            <Text>{`Precio: ${product.price}`}</Text>
            <Button
              title="Comprar"
              buttonStyle={styles.buyButton}
              onPress={() => handleBuy(product.id)}
            />
          </Card>
        ))}
      </ScrollView>
      <FlashMessage position="top" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "white",
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
  },
  buyButton: {
    backgroundColor: "green",
  },
});

export default CategoryWomen;
