import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MaskInput, { Masks } from 'react-native-mask-input';

export default function Infoperson({ navigation }) {
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [sexo, setSexo] = useState('');
  const [estadoCivil, setEstadoCivil] = useState('');
  const [rg, setRg] = useState('');
  const [cpf, setCpf] = useState('');
  const [orgaoEmissor, setOrgaoEmissor] = useState('');
  const [nacionalidade, setNacionalidade] = useState('');

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      extraHeight={150}
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Informações Pessoais</Text>
      <Text style={styles.subtitle}>
        Preencha seus dados pessoais para criar uma nova credencial
      </Text>

      <Text style={styles.label}>Nome Completo</Text>
      <MaskInput
        style={styles.input}
        placeholder="Digite seu nome completo"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>Data de Nascimento</Text>
      <MaskInput
        style={styles.input}
        placeholder="DD/MM/AAAA"
        value={dataNascimento}
        onChangeText={setDataNascimento}
        mask={Masks.DATE_DDMMYYYY}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Sexo</Text>
      <MaskInput
        style={styles.input}
        placeholder="Masculino / Feminino / Outro"
        value={sexo}
        onChangeText={setSexo}
      />

      <Text style={styles.label}>Estado Civil</Text>
      <MaskInput
        style={styles.input}
        placeholder="Solteiro(a), Casado(a), etc."
        value={estadoCivil}
        onChangeText={setEstadoCivil}
      />

      <Text style={styles.label}>Documentos (RG)</Text>
      <MaskInput
        style={styles.input}
        placeholder="Somente números"
        value={rg}
        onChangeText={setRg}
        mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
        keyboardType="numeric"
      />

      <Text style={styles.label}>CPF</Text>
      <MaskInput
        style={styles.input}
        placeholder="000.000.000-00"
        value={cpf}
        onChangeText={setCpf}
        mask={Masks.BRL_CPF}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Órgão Emissor</Text>
      <MaskInput
        style={styles.input}
        placeholder="Ex: SSP/SP"
        value={orgaoEmissor}
        onChangeText={setOrgaoEmissor}
      />

      <Text style={styles.label}>Nacionalidade</Text>
      <MaskInput
        style={styles.input}
        placeholder="Brasileira"
        value={nacionalidade}
        onChangeText={setNacionalidade}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate('MenuBar')}>
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Infoprof')}>
          <Text style={styles.nextButtonText}>Próximo</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    minHeight: '100%',
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#F9FCF9',
    paddingBottom: 120,
      alignItems: 'stretch',
      },
      title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 6,
      textAlign: 'center',
      },
      subtitle: {
      fontSize: 15,
      color: '#555',
      marginBottom: 18,
      textAlign: 'center',
      },
      label: {
      fontSize: 15,
      fontWeight: '500',
      marginBottom: 2,
      color: '#333',
      },
      input: {
      borderWidth: 1,
      borderColor: '#DDD',
      borderRadius: 10,
      padding: 12,
      fontSize: 15,
      backgroundColor: '#FFF',
      marginBottom: 6,
      },
      buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 3,
      marginBottom: 30, 
  },
  cancelButton: {
    borderColor: '#2F6DB5',
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginRight: 8,
  },
  cancelButtonText: {
    color: '#2F6DB5',
    fontWeight: '600',
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: '#2F6DB5',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginLeft: 8,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});