// screens/HomeScreen.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MainTabNavigator from './MainTabNavigator';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
 <MainTabNavigator />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
