import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import Routes from '../../routes/Navigation';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadApp = async () => {
      // Simula carregamento (ex.: API, banco local, assets, etc.)
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsLoading(false);
    };

    loadApp();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../../src/assets/sesc.png')} 
          style={styles.logo}
        />
        <Text style={styles.title}>Credencial App</Text>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return <Routes />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Fundo da splash
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#333333',
    fontWeight: 'bold',
  },
});
