import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { enviarDocumento } from '../../services/documentos';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';


export default function RgScreen() {
  const [frenteImage, setFrenteImage] = useState(null);
  const [versoImage, setVersoImage] = useState(null);
  const navigation = useNavigation()
  const route = useRoute()
  const pedidoCredencialId = route?.params?.pedidoCredencialId ?? null;

  // Pedir permissão ao carregar o componente
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar suas fotos!');
        }
      }
    })();
  }, []);

  const pickImageFrente = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setFrenteImage(result.assets[0]);
    }
  };

  const pickImageVerso = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setVersoImage(result.assets[0]);
    }
  };

  async function enviarAmbasImagens(pedidoCredencialId, imagemFrente, imagemVerso, navigation) {
    if (!imagemFrente || !imagemVerso) {
      Alert.alert('Erro', 'Selecione ambas as imagens antes de enviar.');
      return;
    }

    try {
      await enviarDocumento(pedidoCredencialId, 'RG Frente', 'Documento RG Frente', imagemFrente, navigation);
      await enviarDocumento(pedidoCredencialId, 'RG Verso', 'Documento RG Verso', imagemVerso, navigation);

      // Se tudo deu certo, redireciona
      alert('Seu documento foi enviado com sucesso! Dentro de alguns dias atualizaremos o status do seu pedido.')
      navigation.navigate('MainTabs');
    } catch (error) {
      console.error('Erro ao enviar documentos:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao enviar os documentos. Tente novamente.');
    }
  }

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
            <Image source={{ uri: frenteImage.uri }} style={styles.photo} />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>Frente</Text>
            </View>
          )}
          <TouchableOpacity style={styles.photoButton} onPress={pickImageFrente}>
            <Text style={styles.photoButtonText}>Selecionar Foto</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.photoBox}>
          {versoImage ? (
            <Image source={{ uri: versoImage.uri }} style={styles.photo} />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>Verso</Text>
            </View>
          )}
          <TouchableOpacity style={styles.photoButton} onPress={pickImageVerso}>
            <Text style={styles.photoButtonText}>Selecionar Foto</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.finalizeButton} onPress={() => enviarAmbasImagens(pedidoCredencialId, frenteImage, versoImage, navigation)}>
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
