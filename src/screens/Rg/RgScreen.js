import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';

export default function RgScreen() {
  const [frenteImage, setFrenteImage] = useState(null);
  const [versoImage, setVersoImage] = useState(null);

  const handleSelectFrente = () => {
    Alert.alert('Selecionar Foto', 'Botão para selecionar foto da frente clicado!');
  };

  const handleSelectVerso = () => {
    Alert.alert('Selecionar Foto', 'Botão para selecionar foto do verso clicado!');
  };

  const handleFinalize = () => {
    Alert.alert('Finalizar', 'Botão Finalizar clicado!');
  };

  const handleBack = () => {
    Alert.alert('Voltar', 'Botão Voltar clicado!');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/sesc.png')} style={styles.logo} />

      <Text style={styles.title}>Envie seu RG</Text>
      <Text style={styles.subtitle}>
        Tire uma foto da frente e outra do verso de um dos documentos.
      </Text>

      <View style={styles.photoContainer}>
        <View style={styles.photoBox}>
          {frenteImage ? (
            <Image source={{ uri: frenteImage }} style={styles.photo} />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>Frente</Text>
            </View>
          )}
          <TouchableOpacity style={styles.photoButton} onPress={handleSelectFrente}>
            <Text style={styles.photoButtonText}>Selecionar Foto</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.photoBox}>
          {versoImage ? (
            <Image source={{ uri: versoImage }} style={styles.photo} />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>Verso</Text>
            </View>
          )}
          <TouchableOpacity style={styles.photoButton} onPress={handleSelectVerso}>
            <Text style={styles.photoButtonText}>Selecionar Foto</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.finalizeButton} onPress={handleFinalize}>
        <Text style={styles.finalizeButtonText}>FINALIZAR</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleBack}>
        <Text style={styles.skipText}>VOLTAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FCFA',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  logo: {
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
    marginBottom: 24,
  },
  photoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 32,
  },
  photoBox: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  placeholder: {
    width: 140,
    height: 180,
    backgroundColor: '#D9E4F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 12,
  },
  placeholderText: {
    color: '#2F6DB5',
    fontSize: 18,
    fontWeight: 'bold',
  },
  photo: {
    width: 140,
    height: 180,
    borderRadius: 10,
    marginBottom: 12,
  },
  photoButton: {
    backgroundColor: '#2F6DB5',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    width: '100%',
  },
  photoButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  finalizeButton: {
    backgroundColor: '#2F6DB5',
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 8,
    width: '100%',
    marginBottom: 16,
  },
  finalizeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  skipText: {
    color: '#2F6DB5',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 20,
    textAlign: 'center',
  },
});
