import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image, SafeAreaView } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function CredencialScreen({ navigation }) {
  // Dados do cliente
  const cliente = {
    nome: 'Francisco Edimar Furtado Melo Filho',
    dataNascimento: '12/05/1986',
    tipoCredencial: 'Credencial Plena',
    cargo: 'Funcionario',
    validade: '00/09/2025',
    departamento: 'Departamento Regional/PI',
    foto: require('../../assets/foto-cliente.jpeg'),
    matricula: 'SESC-00790651731' // Adicionado campo matrícula para o QR Code
  };

  const handleGerarImprimir = () => {
    // Lógica para gerar/imprimir
    alert('Funcionalidade de impressão será implementada aqui');
  };

  const handleVoltar = () => {
    navigation.goBack();
  };

  // Dados para o QR Code (pode ser um JSON com todas as informações)
  const qrCodeValue = JSON.stringify({
    nome: cliente.nome,
    matricula: cliente.matricula,
    validade: cliente.validade
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Container principal com fundo branco */}
      <View style={styles.mainContainer}>
        
        {/* Container das informações com imagem de fundo */}
        <ImageBackground 
          source={require('../../assets/backCliente.jpeg')}
          style={styles.credencialBackground}
          resizeMode="cover"
        >
          <View style={styles.credencialContainer}>
            <Image 
              source={require('../../assets/sesc.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            
            {/* Foto do cliente */}
            <View style={styles.fotoContainer}>
              <Image
                source={cliente.foto}
                style={styles.foto}
                resizeMode="cover"
              />
            </View>
            
            {/* Informações do cliente */}
            <Text style={styles.nome}>{cliente.nome}</Text>
            <Text style={styles.dado}>Nascimento: {cliente.dataNascimento}</Text>
            
            <View style={styles.divider} />
            
            <Text style={styles.tipoCredencial}>{cliente.tipoCredencial}</Text>
            <Text style={styles.cargo}>{cliente.cargo}</Text>
            
            <View style={styles.divider} />
            
            <Text style={styles.dado}>Validade: {cliente.validade}</Text>
            <Text style={styles.departamento}>{cliente.departamento}</Text>

            {/* QR Code */}
            <View style={styles.qrCodeContainer}>
              <QRCode
                value={qrCodeValue}
                size={120}
                color="#2F6DB5"
                backgroundColor="white"
              />
              <Text style={styles.qrCodeText}>Matrícula: {cliente.matricula}</Text>
            </View>
          </View>
        </ImageBackground>

        {/* Botões de ação (fora do container com imagem) */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={handleGerarImprimir}
          >
            <Text style={styles.primaryButtonText}>GERAR/IMPRIMIR</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={handleVoltar}
          >
            <Text style={styles.secondaryButtonText}>VOLTAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 30,
  },
  mainContainer: {
    flex: 1,
    padding: 20,
  },
  credencialBackground: {
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom:15,
    height: 665,
  },
  credencialContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    padding: 25,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 60,
    marginBottom: 20,
  },
  fotoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#EEE',
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#555',
  },
  foto: {
    width: '100%',
    height: '100%',
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  dado: {
    fontSize: 15,
    marginBottom: 8,
    color: '#555',
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#DDD',
    width: '80%',
    marginVertical: 15,
  },
  tipoCredencial: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  cargo: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  departamento: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    marginBottom: 15,
  },
  qrCodeContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  qrCodeText: {
    fontSize: 14,
    marginTop: 8,
    color: '#333',
  },
  buttonsContainer: {
    paddingHorizontal: 50,
  },
  primaryButton: {
    backgroundColor: '#2F6DB5',
    paddingVertical: 14,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#2F6DB5',
    paddingVertical: 14,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#2F6DB5',
    fontSize: 16,
    fontWeight: 'bold',
  },
});