import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      // Limpiar información de autenticación
      await AsyncStorage.clear();
      // Redirige al usuario a la pantalla de inicio de sesión
      navigation.replace('Login'); // Asegúrate de tener la pantalla de inicio de sesión con el nombre 'Login'
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/26cd6642-c022-47d3-a1ce-96a3c5ff05ff/sudadera-con-gorro-sin-cierre-de-tejido-fleece-oversized-sportswear-air-4rZxXH.png' }} // Sustituye con la URL de la foto de perfil del usuario
        style={styles.profileImage}
      />
      <Button title="Cerrar Sesión" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  userEmail: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
});

export default ProfileScreen;
