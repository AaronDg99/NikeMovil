import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Input, Button, Card } from 'react-native-elements';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import FlashMessage, { showMessage } from 'react-native-flash-message';

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: '',
    c_password: '',
  });

  const onChange = (name, value) => {
    setFormValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = () => {
    console.log('Registrando con:', formValue);

    const formData = new FormData();
    formData.append('name', formValue.name);
    formData.append('email', formValue.email);
    formData.append('password', formValue.password);
    formData.append('c_password', formValue.c_password);

    axios
      .post('http://192.168.1.80:8000/api/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      })
      .then((response) => {
        console.log('Respuesta del servidor:', response.data);
        const { name } = response.data.data;
        showMessage({
          message: 'Registrado',
          description: '¡Te has registrado!',
          type: 'success',
        });
        console.log('Registro exitoso para el usuario:', name);
        navigation.navigate('Home');
      })
      .catch((error) => {
        console.error('Error durante el registro:', error);
        showMessage({
          message: 'Error de registro',
          description: 'Verifica tus datos e intenta de nuevo.',
          type: 'danger',
        });
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: 'https://img.icons8.com/color/48/null/nike.png' }}
        style={styles.logo}
      />
      <Card.Title>Hazte Miembro de Nike</Card.Title>
      <Input
        placeholder="Nombre"
        value={formValue.name}
        onChangeText={(text) => onChange('name', text)}
      />
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
      <Input
        placeholder="Confirmar contraseña"
        secureTextEntry
        value={formValue.c_password}
        onChangeText={(text) => onChange('c_password', text)}
      />
      <Button title="Únete" onPress={handleRegister} />
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
    backgroundColor: 'white',
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 16,
  },
});

export default RegisterScreen;
