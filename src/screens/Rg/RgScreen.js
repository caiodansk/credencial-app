import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function RgScreen() {
  const navigation = useNavigation();

  const handleTakePhoto = () => {
    navigation.navigate('CameraScreen'); 
  };

  const handleSkip = () => {
    navigation.navigate('MainTabs');
  };

  return (
    <View style={styles.container}>

      <Image
        source={require('../../assets/sesc.png')} // coloque a imagem na pasta assets
        style={styles.image}
      />

      {/* Título */}
      <Text style={styles.title}>Envie seu RG</Text>

      {/* Subtítulo */}
      <Text style={styles.subtitle}>
        Tire uma foto da frente e outra do verso de um dos documentos.
      </Text>

      {/* Botão Tirar foto */}
      <TouchableOpacity style={styles.photoButton} onPress={handleTakePhoto}>
        <Text style={styles.photoButtonText}>Tirar foto</Text>
      </TouchableOpacity>

      {/* Fazer depois */}
      <TouchableOpacity onPress={handleSkip}>
        <Text style={styles.skipText}>FAZER DEPOIS</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FCFA',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 32,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginBottom: 32,
  },
  photoButton: {
    backgroundColor: '#2F6DB5',
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 8,
    marginBottom: 16,
  },
  photoButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  skipText: {
    color: '#2F6DB5',
    fontSize: 14,
    fontWeight: '500',
  },
});
