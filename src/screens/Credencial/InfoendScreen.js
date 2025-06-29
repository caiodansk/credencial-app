import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MaskInput from 'react-native-mask-input';

export default function Infoend({ navigation }) {
  const route = useRoute()
  const dadosEtapa1 = route?.params?.dadosEtapa1 ?? null

  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('')
  const [numero, setNumero] = useState('')
  const [complemento, setComplemento] = useState('')
  const [bairro, setBairro] = useState('')
  const [cidade, setCidade] = useState('')
  const [uf, setUf] = useState('')
  const [telResidencial, setTelResidencial] = useState('');
  const [telCelular, setTelCelular] = useState('');
  const [emailPessoal, setEmailPessoal] = useState('')

  useEffect(() => {
    console.log(dadosEtapa1)
  }, [])

  const handleNext = () => {
      Keyboard.dismiss(); // Fecha o teclado ao navegar

      const dadosEtapa2 = {
        logradouro: logradouro,
        numero: numero,
        complemento: complemento,
        bairro: bairro,
        cep: cep,
        fone_residencial: telResidencial,
        fone_celular: telCelular,
        email: emailPessoal,
        municipio: 1,
        estado: 1,
      }

      const dadosPessoaFisica = {
        ...dadosEtapa1,
        ...dadosEtapa2
      }

      navigation.navigate('Infoprof', {dadosPessoaFisica});
    };
  
    const handleCancel = () => {
      Keyboard.dismiss(); // Fecha o teclado ao navegar
      navigation.navigate('Infoperson');
    };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      extraHeight={150}
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Endereço Residencial</Text>
      <Text style={styles.subtitle}>Preencha os dados do seu endereço</Text>

      <Text style={styles.label}>CEP</Text>
      <MaskInput
        style={styles.input}
        value={cep}
        onChangeText={(masked, unmasked) => setCep(unmasked)}
        mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
        placeholder="00000-000"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Logradouro</Text>
      <TextInput
      style={styles.input}
      placeholder="Rua, Avenida, etc."
      onChangeText={setLogradouro}
      />

      <Text style={styles.label}>Número</Text>
      <TextInput
        style={styles.input}
        placeholder="123"
        keyboardType="numeric"
        onChangeText={setNumero}
      />

      <Text style={styles.label}>Complemento</Text>
      <TextInput
      style={styles.input}
      placeholder="Apto, Bloco, etc."
      onChangeText={setComplemento}
      />

      <Text style={styles.label}>Bairro</Text>
      <TextInput style={styles.input}
      placeholder="Seu bairro"
      onChangeText={setBairro}
      />

      <View style={{ flexDirection: 'row', gap: 8 }}>
        <View style={{ flex: 3 }}>
          <Text style={styles.label}>Cidade</Text>
          <TextInput
          style={styles.input}
          placeholder="Sua cidade"
          onChangeText={setCidade}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>UF</Text>
          <TextInput
          style={styles.input}
          onChangeText={setUf}
          placeholder="SP"
          maxLength={2}
          />
        </View>
      </View>

      <Text style={styles.label}>Telefone Residencial</Text>
      <MaskInput
        style={styles.input}
        value={telResidencial}
        onChangeText={(masked, unmasked) => setTelResidencial(unmasked)}
        mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        placeholder="(00) 0000-0000"
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Telefone Celular</Text>
      <MaskInput
        style={styles.input}
        value={telCelular}
        onChangeText={(masked, unmasked) => setTelCelular(unmasked)}
        mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        placeholder="(00) 00000-0000"
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>E-mail Pessoal</Text>
      <TextInput
        style={styles.input}
        placeholder="seu@email.com"
        keyboardType="email-address"
        onChangeText={setEmailPessoal}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={handleCancel}
        >
          <Text style={styles.cancelButtonText}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNext}>
          <Text style={styles.nextButtonText}>Próximo</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#F9FCF9',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#555',
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
    marginBottom: 70,
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