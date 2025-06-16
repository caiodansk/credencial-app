import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';

export default function ProfileScreen({ navigation,}) {
  const handleLogout = () => {
    // Implementar lógica de logout aqui
    navigation.navigate('Login');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Seção do cabeçalho do perfil */}
      <View style={styles.profileHeader}>
        <View style={styles.profileIcon}>
          <MaterialIcons name="account-circle" size={80} color="#2F6DB5" />
        </View>
        <Text style={styles.profileName}>USEF</Text>
        <Text style={styles.profileEmail}>admin@admin.com</Text>
        <Text style={styles.memberSince}>Membro desde 2025</Text>
      </View>

      {/* Divisor */}
      <View style={styles.divider} />

 
      <Text style={styles.sectionTitle}>Configurações da conta</Text>
      
      <TouchableOpacity style={styles.menuItem}>
        <Feather name="user" size={24} color="#2F6DB5" />
        <Text style={styles.menuItemText}>Informações Pessoais</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.menuItem}>
        <Feather name="lock" size={24} color="#2F6DB5" />
        <Text style={styles.menuItemText}>Segurança</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.menuItem}>
        <Feather name="bell" size={24} color="#2F6DB5" />
        <Text style={styles.menuItemText}>Notificações</Text>
      </TouchableOpacity>


      <View style={styles.divider} />

      <Text style={styles.sectionTitle}>Suporte</Text>
      
      <TouchableOpacity style={styles.menuItem}>
        <Feather name="help-circle" size={24} color="#2F6DB5" />
        <Text style={styles.menuItemText}>Central de Ajuda</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.menuItem}>
        <Feather name="file-text" size={24} color="#2F6DB5" />
        <Text style={styles.menuItemText}>Termos de uso</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.menuItem}>
        <Feather name="log-out" size={24} color="#FF3B30" />
        <Text style={[styles.menuItemText, { color: '#FF3B30' }]}>Sair da Conta</Text>
      </TouchableOpacity>


      <View style={styles.footer}>
        <Text style={styles.footerText}>Versão U.O.</Text>
        <Text style={styles.footerText}>2025 SEC - Todos os direitos reservados.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  profileIcon: {
    marginBottom: 15,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  memberSince: {
    fontSize: 14,
    color: '#999',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  footer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#999',

  },
});