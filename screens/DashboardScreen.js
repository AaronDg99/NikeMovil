// Importa las bibliotecas necesarias
import React from "react";
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Card, Text, Button } from "react-native-paper";
import { Link } from "@react-navigation/native";
import Swiper from 'react-native-swiper';

const DashboardScreen = () => {
    const data = [
        { title: 'Item 1', image: 'https://static.nike.com/a/images/w_1920,h_400,c_fill,f_auto/b61e5a45-a839-44c8-9930-e4a9c8166933/image.jpg' },
        { title: 'Item 2', image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/9721505b-832e-4b27-9735-8d8e12b2e956/maleta-de-entrenamiento-gym-club-24l-7B6RDJ.png' },
        { title: 'Item 3', image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/6923f6fb-5346-4af3-92cf-f08d40d08579/sudadera-con-gorro-sin-cierre-de-french-terry-con-bloques-de-colores-club-fleece-3ts95P.png' },
        // Agrega más elementos según sea necesario
      ];
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
        <Text style={styles.title}>Adquiere los mejores productos aquí</Text>
        <Swiper style={styles.swiperContainer} showsButtons={false}>
          {data.map((item, index) => (
            <View key={index} style={styles.swiperItem}>
              <Image source={{ uri: item.image }} style={styles.swiperImage} />
            </View>
          ))}
        </Swiper>
        <View style={styles.spacing}>
        </View>
        <Card >
    <Card.Title />
    <Card.Content>
      <Text variant="titleLarge">Tshirt mujer</Text>
      <Text variant="bodyMedium">Ropa deportiva</Text>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a9edbab5-9956-46b8-8b4b-a439085cd835/top-de-tejido-de-punto-con-te%C3%B1ido-ondulado-sin-mangas-sportswear-P9pvx7.png' }} />
    <Card.Actions>
      <Button buttonColor="white" textColor="black">Comprar</Button>
    </Card.Actions>
  </Card>
  <View style={styles.spacing}>
        </View>
  <Card>
    <Card.Title/>
    <Card.Content>
      <Text variant="titleLarge">Chamarra Mujer</Text>
      <Text variant="bodyMedium">Ropa deportiva</Text>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/25cd0327-33c0-404b-90cd-e1af503ddecc/chamarra-dri-fit-one-f3Fz5z.png' }} />
    <Card.Actions>
      <Button buttonColor="white" textColor="black">Comprar</Button>
    </Card.Actions>
  </Card>
  <View style={styles.spacing}>
        </View>
  <Card>
    <Card.Title/>
    <Card.Content>
      <Text variant="titleLarge">Sudadera de hombre</Text>
      <Text variant="bodyMedium">Ropa deportiva</Text>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/9721505b-832e-4b27-9735-8d8e12b2e956/maleta-de-entrenamiento-gym-club-24l-7B6RDJ.png' }} />
    <Card.Actions>
      <Button buttonColor="white" textColor="black">Comprar</Button>
    </Card.Actions>
  </Card>
  </View>
  
  </ScrollView>
  );
};
const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
      },
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
      backgroundColor: 'white', // Fondo blanco
    },
    swiperContainer: {
      height: 200, // Ajusta la altura según sea necesario
    },
    swiperItem: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    swiperImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    spacing: {
      height: 16, // Ajusta la altura del espacio entre el carrusel y las tarjetas
    },
    title: {
      fontWeight: 'condensed',
      fontSize: 30,
      marginBottom: 10,
      textAlign: 'center',
      color: '#000',
    }
});
export default DashboardScreen;
