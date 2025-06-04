import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MaskInput from 'react-native-mask-input';

export default function InfoProf({ navigation }) {
  const [cnpj, setCnpj] = useState('');
  const [telefone, setTelefone] = useState('');
  const [ctps, setCtps] = useState('');
  const [pis, setPis] = useState('');

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      extraHeight={150}
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Informações Profissionais</Text>
      <Text style={styles.subtitle}>Preencha seus dados profissionais</Text>

      <Text style={styles.label}>Razão Social</Text>
      <TextInput style={styles.input} placeholder="Nome da empresa" />

      <Text style={styles.label}>CNPJ</Text>
      <MaskInput
        style={styles.input}
        value={cnpj}
        onChangeText={(masked, unmasked) => setCnpj(unmasked)}
        mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
        keyboardType="numeric"
        placeholder="CNPJ (somente números)"
      />

      <Text style={styles.label}>Cargo</Text>
      <TextInput style={styles.input} placeholder="Seu cargo na empresa" />

      <Text style={styles.label}>Data de Admissão</Text>
      <MaskInput
        style={styles.input}
        mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
        placeholder="DD/MM/AAAA"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Data de Desligamento (se aplicável)</Text>
      <MaskInput
        style={styles.input}
        mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
        placeholder="DD/MM/AAAA"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Renda Mensal</Text>
      <TextInput
        style={styles.input}
        placeholder="R$ 0,00"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Carteira de Trabalho (CTPS)</Text>
      <MaskInput
        style={styles.input}
        value={ctps}
        onChangeText={(masked, unmasked) => setCtps(unmasked)}
        mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
        placeholder="Número da CTPS"
        keyboardType="numeric"
      />

      <Text style={styles.label}>PIS/PASEP</Text>
      <MaskInput
        style={styles.input}
        value={pis}
        onChangeText={(masked, unmasked) => setPis(unmasked)}
        mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
        placeholder="Número do PIS/PASEP"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Telefone Comercial</Text>
      <MaskInput
        style={styles.input}
        value={telefone}
        onChangeText={(masked, unmasked) => setTelefone(unmasked)}
        mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        placeholder="(00) 0000-0000"
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>E-mail Comercial</Text>
      <TextInput
        style={styles.input}
        placeholder="email@empresa.com"
        keyboardType="email-address"
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate('Infoperson')}>
          <Text style={styles.cancelButtonText}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Infoend')}>
          <Text style={styles.nextButtonText}>Próximo</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F9FCF9',
    paddingBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#AAA',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    backgroundColor: '#FFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  cancelButton: {
    borderColor: '#2F6DB5',
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  cancelButtonText: {
    color: '#2F6DB5',
    fontWeight: '600',
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: '#2F6DB5',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
