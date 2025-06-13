import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { validarCliente } from '../../services/validarCliente'; 

export default function ConsultarCredencial() {
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');

  // Máscara para CPF
  const handleCpfChange = (text) => {
    // Remove tudo que não for número
    let cleaned = text.replace(/\D/g, '');

    // Limita a 11 dígitos (CPF sem formatação)
    cleaned = cleaned.substring(0, 11);

    // Aplica máscara: 000.000.000-00
    let formatted = cleaned;
    if (cleaned.length > 9) {
      formatted = cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    } else if (cleaned.length > 6) {
      formatted = cleaned.replace(/(\d{3})(\d{3})(\d{0,3})/, "$1.$2.$3");
    } else if (cleaned.length > 3) {
      formatted = cleaned.replace(/(\d{3})(\d{0,3})/, "$1.$2");
    }

    setCpf(formatted);
  };

  // Máscara para data (DD/MM/AAAA)
  const handleDataNascimentoChange = (text) => {
    // Remove tudo que não for número
    let cleaned = text.replace(/\D/g, '');

    // Limita a 8 dígitos (DDMMAAAA)
    cleaned = cleaned.substring(0, 8);

    // Aplica máscara DD/MM/AAAA
    let formatted = cleaned;
    if (cleaned.length > 4) {
      formatted = cleaned.replace(/(\d{2})(\d{2})(\d{0,4})/, "$1/$2/$3");
    } else if (cleaned.length > 2) {
      formatted = cleaned.replace(/(\d{2})(\d{0,2})/, "$1/$2");
    }

    setDataNascimento(formatted);
  };

  const handleConsultar = async () => {
    // Remove formatação para enviar na API
    const cpfLimpo = cpf.replace(/\D/g, '');
    // Converte DD/MM/AAAA para AAAA-MM-DD para a API
    const partesData = dataNascimento.split('/');
    if (partesData.length !== 3) {
      Alert.alert('Erro', 'Data de nascimento inválida');
      return;
    }
    const dataFormatada = `${partesData[2]}-${partesData[1]}-${partesData[0]}`;

    try {
      const resultado = await validarCliente(cpfLimpo, dataFormatada);

      if (resultado === true) {
        Alert.alert('Sucesso', 'Cliente encontrado!');
      } else {
        Alert.alert('Aviso', 'Cliente não encontrado.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao consultar credencial. Tente novamente.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Consultar Credencial</Text>
      <Text style={styles.description}>
        Preencha os campos abaixo para consultar o status da sua credencial SESC
      </Text>

      <TextInput
        style={styles.input}
        placeholder="000.000.000-00"
        value={cpf}
        onChangeText={handleCpfChange}
        keyboardType="numeric"
        maxLength={14} // 11 dígitos + pontos e traço
      />

      <TextInput
        style={styles.input}
        placeholder="DD/MM/AAAA"
        value={dataNascimento}
        onChangeText={handleDataNascimentoChange}
        keyboardType="numeric"
        maxLength={10} // 8 dígitos + 2 barras
      />

      <TouchableOpacity style={styles.button} onPress={handleConsultar}>
        <Text style={styles.buttonText}>Consultar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F9FA',
    marginTop: 60,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    alignSelf: 'center',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#005EB8',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
