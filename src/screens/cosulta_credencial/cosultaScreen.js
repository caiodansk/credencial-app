import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  Keyboard 
} from 'react-native';

export default function ConsultarCredencial({ navigation }) {
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  // Formata o CPF (XXX.XXX.XXX-XX)
  const handleCpfChange = (text) => {
    setErro('');
    let cleaned = text.replace(/\D/g, '');
    cleaned = cleaned.substring(0, 11);

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

  // Formata a data (DD/MM/AAAA)
  const handleDataNascimentoChange = (text) => {
    setErro('');
    let cleaned = text.replace(/\D/g, '');
    cleaned = cleaned.substring(0, 8);

    let formatted = cleaned;
    if (cleaned.length > 4) {
      formatted = cleaned.replace(/(\d{2})(\d{2})(\d{0,4})/, "$1/$2/$3");
    } else if (cleaned.length > 2) {
      formatted = cleaned.replace(/(\d{2})(\d{0,2})/, "$1/$2");
    }

    setDataNascimento(formatted);
  };

  const handleConsultar = async () => {
    Keyboard.dismiss();

    // Validações
    if (!cpf || !dataNascimento) {
      setErro('Preencha todos os campos');
      return;
    }

    const cpfLimpo = cpf.replace(/\D/g, '');
    const dataLimpa = dataNascimento.replace(/\D/g, '');

    // Validação específica
    if (cpfLimpo !== '00790651731') {
      setErro('CPF não cadastrado');
      return;
    }

    if (dataLimpa !== '12051986') {
      setErro('Data de nascimento incorreta');
      return;
    }

    setLoading(true);
    
    try {
      // Simula consulta à API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      navigation.navigate('Cliente', {
        cpf: cpfLimpo,
        dataNascimento: dataLimpa,
        cpfFormatado: cpf,
        dataFormatada: dataNascimento
      });
      
    } catch (error) {
      setErro('Erro na consulta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Consultar Credencial</Text>
      <Text style={styles.subtitle}>Preencha seus dados para consulta</Text>

      {erro ? (
        <View style={styles.erroContainer}>
          <Text style={styles.erroText}>{erro}</Text>
        </View>
      ) : null}

      <Text style={styles.label}>CPF</Text>
      <TextInput
        style={styles.input}
        placeholder="000.000.000-00"
        value={cpf}
        onChangeText={handleCpfChange}
        keyboardType="numeric"
        maxLength={14}
      />

      <Text style={styles.label}>Data de Nascimento</Text>
      <TextInput
        style={styles.input}
        placeholder="DD/MM/AAAA"
        value={dataNascimento}
        onChangeText={handleDataNascimentoChange}
        keyboardType="numeric"
        maxLength={10}
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleConsultar}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Verificando...' : 'Consultar'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#F5F7FA'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 60,
    color: '#333'
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333'
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    backgroundColor: '#FFF',
    marginBottom: 20
  },
  button: {
    backgroundColor: '#2F6DB5',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },
  buttonDisabled: {
    backgroundColor: '#A0C4FF'
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600'
  },
  erroContainer: {
    backgroundColor: '#FFEBEE',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#F44336'
  },
  erroText: {
    color: '#F44336',
    fontSize: 14
  }
});