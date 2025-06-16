import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../../services/api';

export default function RegisterScreen({ navigation }) {
  // Estados do formulário
  const [form, setForm] = useState({
    full_name: '',  // Alterado para full_name para corresponder ao backend
    email: '',
    password: '',
    password_confirmation: ''  // Alterado para corresponder ao backend
  });
  
  // Estados de UI
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({
    full_name: false,
    email: false,
    password: false,
    password_confirmation: false
  });

  // Validação em tempo real
  useEffect(() => {
    Object.keys(touched).forEach(field => {
      if (touched[field]) {
        validateField(field, form[field]);
      }
    });
  }, [form, touched]);

  // Funções de validação
  const validateField = (field, value) => {
    let error = '';
    
    switch(field) {
      case 'full_name':
        if (!value.trim()) error = 'Por favor, insira seu nome completo';
        else if (!value.includes(' ')) error = 'Insira nome e sobrenome';
        else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(value)) error = 'Use apenas letras e espaços';
        break;
        
      case 'email':
        if (!value) error = 'Por favor, insira um email';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Email inválido';
        break;
        
      case 'password':
        if (!value) error = 'Por favor, insira uma senha';
        else if (value.length < 8) error = 'Mínimo 8 caracteres';
        else if (!/\d/.test(value) || !/[a-zA-Z]/.test(value)) error = 'Letras e números';
        break;
        
      case 'password_confirmation':
        if (value !== form.password) error = 'As senhas não coincidem';
        break;
    }
    
    setErrors(prev => ({ ...prev, [field]: error }));
    return !error;
  };

  const handleChange = (field, value) => {
    // Filtra caracteres para o nome completo
    if (field === 'full_name') {
      value = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
    }
    
    setForm(prev => ({ ...prev, [field]: value }));
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async () => {
    // Marca todos os campos como tocados para mostrar erros
    const newTouched = {};
    Object.keys(form).forEach(field => {
      newTouched[field] = true;
    });
    setTouched(newTouched);

    // Valida todos os campos
    const isFormValid = Object.keys(form).every(field => 
      validateField(field, form[field])
    );

    if (!isFormValid) {
      Alert.alert('Erro', 'Por favor, corrija os campos destacados');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/register/', {
        full_name: form.full_name.trim(),
        email: form.email.toLowerCase().trim(),
        password: form.password,
        password_confirmation: form.password_confirmation
      });

      Alert.alert('Sucesso', 'Conta criada com sucesso!', [
        { text: 'OK', onPress: () => navigation.replace('Login') }
      ]);
      
    } catch (error) {
      console.log('Erro completo:', error.response?.data);
      
      let errorMessage = 'Erro ao registrar. Tente novamente.';
      const backendErrors = error.response?.data?.errors || {};
      
      // Atualiza erros do frontend com os do backend
      setErrors(prev => ({
        ...prev,
        ...Object.entries(backendErrors).reduce((acc, [key, value]) => {
          // Mapeia campos do backend para o frontend se necessário
          const fieldMap = {
            'full_name': 'full_name',
            'email': 'email',
            'password': 'password',
            'password2': 'password_confirmation'
          };
          const fieldName = fieldMap[key] || key;
          acc[fieldName] = Array.isArray(value) ? value[0] : value;
          return acc;
        }, {})
      }));
      
      // Mostra o primeiro erro encontrado
      const firstError = backendErrors 
        ? Object.values(backendErrors)[0][0] 
        : errorMessage;
      
      Alert.alert('Erro', firstError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Criar Conta</Text>
        <Text style={styles.subtitle}>Crie sua conta para acessar os serviços SESC</Text>

        {/* Campo Nome */}
        <Text style={styles.label}>Nome completo</Text>
        <TextInput
          style={[styles.input, errors.full_name && styles.inputError]}
          placeholder="Digite seu nome completo (ex: João Silva)"
          value={form.full_name}
          onChangeText={text => handleChange('full_name', text)}
          autoCapitalize="words"
          editable={!loading}
        />
        {errors.full_name && <Text style={styles.errorText}>{errors.full_name}</Text>}

        {/* Campo Email */}
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          placeholder="Digite seu email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={form.email}
          onChangeText={text => handleChange('email', text)}
          editable={!loading}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        <Text style={styles.exampleText}>Exemplo: exemplo@email.com</Text>

        {/* Campo Senha */}
        <Text style={styles.label}>Senha</Text>
        <View style={[styles.passwordContainer, errors.password && styles.inputError]}>
          <TextInput
            style={styles.inputSenha}
            placeholder="Digite sua senha (8 caracteres)"
            secureTextEntry={!showPassword}
            value={form.password}
            onChangeText={text => handleChange('password', text)}
            maxLength={8}
            editable={!loading}
          />
          <TouchableOpacity 
            onPress={() => setShowPassword(!showPassword)}
            disabled={loading}
          >
            <Icon 
              name={showPassword ? 'eye-off' : 'eye'} 
              size={22} 
              color={loading ? '#ccc' : '#777'} 
            />
          </TouchableOpacity>
        </View>
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
        <Text style={styles.hintText}>Mínimo de 8 caracteres (letras e números)</Text>

        {/* Campo Confirmar Senha */}
        <Text style={styles.label}>Confirmar senha</Text>
        <View style={[styles.passwordContainer, errors.password_confirmation && styles.inputError]}>
          <TextInput
            style={styles.inputSenha}
            placeholder="Confirme sua senha"
            secureTextEntry={!showPassword}
            value={form.password_confirmation}
            onChangeText={text => handleChange('password_confirmation', text)}
            maxLength={8}
            editable={!loading}
          />
          <TouchableOpacity 
            onPress={() => setShowPassword(!showPassword)}
            disabled={loading}
          >
            <Icon 
              name={showPassword ? 'eye-off' : 'eye'} 
              size={22} 
              color={loading ? '#ccc' : '#777'} 
            />
          </TouchableOpacity>
        </View>
        {errors.password_confirmation && (
          <Text style={styles.errorText}>{errors.password_confirmation}</Text>
        )}

        {/* Botão de Registro */}
        <TouchableOpacity 
          style={[
            styles.registerButton, 
            (loading || Object.values(errors).some(Boolean)) && styles.buttonDisabled
          ]} 
          onPress={handleSubmit}
          disabled={loading || Object.values(errors).some(Boolean)}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Criar conta</Text>
          )}
        </TouchableOpacity>

        {/* Link para Login */}
        <View style={styles.loginLink}>
          <Text style={styles.loginText}>Já tem uma conta? </Text>
          <TouchableOpacity 
            onPress={() => navigation.navigate('Login')}
            disabled={loading}
          >
            <Text style={styles.linkText}>Faça login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  scrollContainer: {
    paddingHorizontal: 30,
    paddingTop: 100,
    paddingBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  inputError: {
    borderColor: '#FF3B30',
    backgroundColor: '#FFF5F5',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  inputSenha: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginBottom: 16,
  },
  exampleText: {
    color: '#888',
    fontSize: 12,
    marginBottom: 16,
  },
  hintText: {
    color: '#888',
    fontSize: 12,
    marginBottom: 16,
  },
  registerButton: {
    backgroundColor: '#2F6DB5',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: '#A0B9D9',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loginLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  loginText: {
    color: '#666',
    fontSize: 14,
  },
  linkText: {
    color: '#2F6DB5',
    fontSize: 14,
    fontWeight: '600',
  },
});