// SplashScreen.js
import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Agrega un temporizador para navegar a la siguiente pantalla después de 2000 milisegundos (2 segundos)
    const timer = setTimeout(() => {
      navigation.replace('Login'); // Cambia 'Login' por el nombre de la pantalla a la que deseas navegar
    }, 2000);

    // Limpia el temporizador si el componente se desmonta antes de que se complete
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Animatable.View animation="zoomIn" duration={2000} style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://logowik.com/content/uploads/images/260_nike.jpg' }}
          style={styles.image}
          resizeMode="contain"
        />
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  imageContainer: {
    width: '50%',
    height: '50%',
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
});
export default SplashScreen;
