import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Platform
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useRoute } from '@react-navigation/native';
import MaskInput from 'react-native-mask-input';
import { Ionicons } from '@expo/vector-icons';
import { postInfoPessoais } from '../../services/infoPessoais';
import { useNavigation } from '@react-navigation/native';

export default function InfoProf({ navigation }) {
  const route = useRoute()
  const { dadosPessoaFisica } = route.params

  useEffect(() => {
    console.log(dadosPessoaFisica)
  }, [])


  const [cnpj, setCnpj] = useState('');
  const [nomeResponsavel, setNomeResponsavel] = useState('')
  const [telefone, setTelefone] = useState('');
  const [ctps, setCtps] = useState('');
  const [pis, setPis] = useState('');
  const [razaoSocial, setRazaoSocial] = useState('');
  const [cargo, setCargo] = useState('');
  const [dataAdmissao, setDataAdmissao] = useState('');
  const [dataDesligamento, setDataDesligamento] = useState('');
  const [renda, setRenda] = useState('');
  const [email, setEmail] = useState('');
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('')
  const [numero, setNumero] = useState('')
  const [complemento, setComplemento] = useState('')
  const [bairro, setBairro] = useState('')

  const handleNext = () => {
    Keyboard.dismiss();

    const dadosPessoaJuridica = {
      nome_fantasia: razaoSocial,
      razao_social: razaoSocial,
      cnpj: cnpj,
      logradouro: logradouro,
      numero: numero,
      complemento: complemento,
      bairro: bairro,
      cep: cep,
      nome_responsavel: nomeResponsavel,
      email: email,
      municipio: 1,
      estado: 1,
    }

    console.log(dadosPessoaJuridica)
    const dataFormatada = dataAdmissao.split('/').reverse().join('-');
    const rendaFinal = renda.replace(',', '.')
    postInfoPessoais(dadosPessoaFisica, dadosPessoaJuridica, cargo, dataFormatada, rendaFinal, ctps, pis, telefone, navigation)
  };

  const handleBack = () => {
    Keyboard.dismiss();
    navigation.navigate('Infoend');
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      extraHeight={Platform.select({ ios: 100, android: 150 })}
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      enableResetScrollToCoords={false}
      extraScrollHeight={50}
    >
      <Text style={styles.title}>Informações Profissionais</Text>
      <Text style={styles.subtitle}>Preencha seus dados profissionais</Text>

      {/* Seta indicativa no TOPO da tela */}
      <View style={styles.topScrollIndicator}>
        <Text style={styles.scrollIndicatorText}>Deslize para ver mais campos</Text>
        <Ionicons name="chevron-down-circle" size={28} color="#333" />
      </View>

      <Text style={styles.label}>Razão Social</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome da empresa"
        value={razaoSocial}
        onChangeText={setRazaoSocial}
        returnKeyType="next"
      />

      <Text style={styles.label}>Nome do resposável</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do responsável"
        onChangeText={setNomeResponsavel}
        returnKeyType="next"
      />

      <Text style={styles.label}>CNPJ</Text>
      <MaskInput
        style={styles.input}
        value={cnpj}
        onChangeText={(masked, unmasked) => setCnpj(unmasked)}
        mask={[/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
        keyboardType="numeric"
        placeholder="00.000.000/0000-00"
        returnKeyType="next"
      />

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

      <Text style={styles.label}>Cargo</Text>
      <TextInput
        style={styles.input}
        placeholder="Seu cargo na empresa"
        value={cargo}
        onChangeText={setCargo}
        returnKeyType="next"
      />

      <Text style={styles.label}>Data de Admissão</Text>
      <MaskInput
        style={styles.input}
        value={dataAdmissao}
        onChangeText={setDataAdmissao}
        mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
        placeholder="DD/MM/AAAA"
        keyboardType="numeric"
        returnKeyType="next"
      />

      <Text style={styles.label}>Data de Desligamento (se aplicável)</Text>
      <MaskInput
        style={styles.input}
        value={dataDesligamento}
        onChangeText={setDataDesligamento}
        mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
        placeholder="DD/MM/AAAA"
        keyboardType="numeric"
        returnKeyType="next"
      />

      <Text style={styles.label}>Renda Mensal</Text>
      <TextInput
        style={styles.input}
        placeholder="R$ 0,00"
        value={renda}
        onChangeText={setRenda}
        keyboardType="numeric"
        returnKeyType="next"
      />

      <Text style={styles.label}>Carteira de Trabalho (CTPS)</Text>
      <MaskInput
        style={styles.input}
        value={ctps}
        onChangeText={(masked, unmasked) => setCtps(unmasked)}
        mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
        placeholder="Número da CTPS"
        keyboardType="numeric"
        returnKeyType="next"
      />

      <Text style={styles.label}>PIS/PASEP</Text>
      <MaskInput
        style={styles.input}
        value={pis}
        onChangeText={(masked, unmasked) => setPis(unmasked)}
        mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/, '.', /\d/, /\d/, '-', /\d/]}
        placeholder="000.00000.00-0"
        keyboardType="numeric"
        returnKeyType="next"
      />

      <Text style={styles.label}>Telefone Comercial</Text>
      <MaskInput
        style={styles.input}
        value={telefone}
        onChangeText={(masked, unmasked) => setTelefone(unmasked)}
        mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        placeholder="(00) 00000-0000"
        keyboardType="phone-pad"
        returnKeyType="next"
      />

      <Text style={styles.label}>E-mail Comercial</Text>
      <TextInput
        style={styles.input}
        placeholder="email@empresa.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        returnKeyType="done"
        onSubmitEditing={Keyboard.dismiss}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={handleBack}
        >
          <Text style={styles.cancelButtonText}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>Próximo</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 100,
    backgroundColor: '#F9FCF9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 15,
    color: '#555',
    marginBottom: 10,
    textAlign: 'center',
  },
  topScrollIndicator: {
    alignItems: 'center',
    marginBottom: 15,
    padding: 8,
  },
  scrollIndicatorText: {
    color: '#555',
    fontSize: 13,
    marginTop: 5,
    fontWeight: '500',
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: Platform.select({ ios: 14, android: 12 }),
    fontSize: 15,
    backgroundColor: '#FFF',
    marginBottom: 15,
    minHeight: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 30,
  },
  cancelButton: {
    borderColor: '#2F6DB5',
    borderWidth: 1,
    paddingVertical: 14,
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
    paddingVertical: 14,
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