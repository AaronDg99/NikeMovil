  import React, { useState, useRef } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const navigation = useNavigation();
  const logoRef = useRef(null);

  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });

  const onChange = (name, value) => {
    setFormValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    console.log('Iniciando sesión con:', formValue);

    const formData = new FormData();
    formData.append('email', formValue.email);
    formData.append('password', formValue.password);

    axios
      .post('http://192.168.1.80:8000/api/login', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      })
      .then((response) => {
        console.log('Respuesta del servidor:', response.data);
        const { name } = response.data.data;
        showMessage({
          message: 'Inicio de sesión exitoso',
          type: 'success',
        });
        console.log('Inicio de sesión exitoso para el usuario:', name);
        navigation.navigate('Home');
        const { token } = response.data.data;
        AsyncStorage.setItem('token', token);
        
        // Animación del logo al iniciar sesión
        if (logoRef.current) {
          logoRef.current.fadeOut(500);
        }
      })
      .catch((error) => {
        console.error('Error durante el inicio de sesión:', error);
        showMessage({
          message: 'Error de inicio de sesión',
          description: 'Verifica tus credenciales e intenta de nuevo.',
          type: 'danger',
        });
      });
  };

  const goToRegister = () => {
    navigation.navigate('Register'); // Asegúrate de que la ruta 'Register' coincida con el nombre de la pantalla en tu archivo de navegación
    
    // Animación del logo al ir a la pantalla de registro
    if (logoRef.current) {
      logoRef.current.tada(500);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animatable.Image
        ref={logoRef}
        animation="fadeIn"
        duration={1000}
        source={{ uri: 'https://img.icons8.com/color/48/null/nike.png' }}
        style={styles.logo}
      />
      <Animatable.Text animation="fadeIn" duration={1000} h3>
        Iniciar Sesión
      </Animatable.Text>
      <Input
        placeholder="Correo electrónico"
        value={formValue.email}
        onChangeText={(text) => onChange('email', text)}
      />
      <Input
        placeholder="Contraseña"
        secureTextEntry
        value={formValue.password}
        onChangeText={(text) => onChange('password', text)}
      />
      <Button title="Iniciar Sesión" onPress={handleLogin} />
      <Button
        title="¿No tienes cuenta? Regístrate"
        type="clear"
        onPress={goToRegister}
      />
      <FlashMessage position="top" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white', // Fondo blanco
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 16,
  },
});
 
export default LoginScreen;
