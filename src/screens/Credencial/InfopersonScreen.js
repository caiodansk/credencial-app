import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Keyboard,Platform} from 'react-native';
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

  const handleNext = () => {
    Keyboard.dismiss(); // Fecha o teclado ao navegar

    const dadosEtapa1 = {
      nome: nome,
      data_nascimento: dataNascimento.split('/').reverse().join('-'),
      sexo: 1,
      estado_civil: 2,
      cpf: cpf.replace(/\D/g, ""),
      rg: rg,
      org_emissor_rg: orgaoEmissor,
      nacionalidade: nacionalidade,
    }

    navigation.navigate('Infoend', {dadosEtapa1});
  };

  const handleCancel = () => {
    Keyboard.dismiss(); // Fecha o teclado ao navegar
    navigation.navigate('MainTabs');
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      extraHeight={Platform.select({ ios: 150, android: 200 })}
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      enableResetScrollToCoords={false}
      extraScrollHeight={20}
    >
      <View style={styles.content}>
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
          returnKeyType="next"
          blurOnSubmit={false}
        />

        <Text style={styles.label}>Data de Nascimento</Text>
        <MaskInput
          style={styles.input}
          placeholder="DD/MM/AAAA"
          value={dataNascimento}
          onChangeText={setDataNascimento}
          mask={Masks.DATE_DDMMYYYY}
          keyboardType="numeric"
          returnKeyType="next"
        />

        <Text style={styles.label}>Sexo</Text>
        <MaskInput
          style={styles.input}
          placeholder="Masculino / Feminino / Outro"
          value={sexo}
          onChangeText={setSexo}
          returnKeyType="next"
        />

        <Text style={styles.label}>Estado Civil</Text>
        <MaskInput
          style={styles.input}
          placeholder="Solteiro(a), Casado(a), etc."
          value={estadoCivil}
          onChangeText={setEstadoCivil}
          returnKeyType="next"
        />

        <Text style={styles.label}>RG</Text>
        <MaskInput
          style={styles.input}
          placeholder="Somente números"
          value={rg}
          onChangeText={setRg}
          mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
          keyboardType="numeric"
          returnKeyType="next"
        />

        <Text style={styles.label}>CPF</Text>
        <MaskInput
          style={styles.input}
          placeholder="000.000.000-00"
          value={cpf}
          onChangeText={setCpf}
          mask={Masks.BRL_CPF}
          keyboardType="numeric"
          returnKeyType="next"
        />

        <Text style={styles.label}>Órgão Emissor</Text>
        <MaskInput
          style={styles.input}
          placeholder="Ex: SSP/SP"
          value={orgaoEmissor}
          onChangeText={setOrgaoEmissor}
          returnKeyType="next"
        />

        <Text style={styles.label}>Nacionalidade</Text>
        <MaskInput
          style={styles.input}
          placeholder="Brasileira"
          value={nacionalidade}
          onChangeText={setNacionalidade}
          returnKeyType="done"
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.cancelButton} 
            onPress={handleCancel}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.nextButton} 
            onPress={handleNext}
          >
            <Text style={styles.nextButtonText}>Próximo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F9FCF9',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: Platform.select({ ios: 40, android: 60 }),
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 15,
    color: '#555',

    textAlign: 'center',
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    marginTop: 12,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: Platform.select({ ios: 14, android: 12 }),
    fontSize: 15,
    backgroundColor: '#FFF',
    minHeight: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 20,
  },
  cancelButton: {
    flex: 1,
    borderColor: '#2F6DB5',
    borderWidth: 1,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginRight: 100,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#2F6DB5',
    fontWeight: '600',
    fontSize: 16,
  },
  nextButton: {
    flex: 1,
    backgroundColor: '#2F6DB5',
    paddingVertical: 14,
    borderRadius: 8,
    marginLeft: 40,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});