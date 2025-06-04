import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Menubar({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>SESC Credenciais</Text>
          <Icon name="bell-outline" size={24} color="#000" />
        </View>

        {/* Boas-vindas */}
        <View style={styles.welcomeBox}>
          <Image 
            source={require('../../assets/sesc.png')}
            style={styles.logo} 
          />
          <View>
            <Text style={styles.welcomeTitle}>Olá, Usuário</Text>
            <Text>Bem-vindo ao SESC Credenciais</Text>
          </View>
        </View>

        {/* Novidades */}
        <View style={styles.newsBox}>
          <Text style={styles.newsTitle}>Novidades</Text>
          <Text>Confira as novas funcionalidades do SESC Credenciais!</Text>
        </View>

        {/* Serviços */}
        <Text style={styles.sectionTitle}>Serviços</Text>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Infoperson')}>
          <View style={styles.cardContent}>
            <Icon name="card-account-details-outline" size={30} color="#007bff" />
            <View>
              <Text style={styles.cardTitle}>Solicitar Credencial</Text>
              <Text>Solicite sua credencial SESC</Text>
            </View>
          </View>
          <Icon name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <View style={styles.cardContent}>
            <Icon name="magnify" size={30} color="#f4a300" />
            <View>
              <Text style={styles.cardTitle}>Consultar</Text>
              <Text>Consulte sua credencial SESC</Text>
            </View>
          </View>
          <Icon name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <View style={styles.cardContent}>
            <Icon name="account-circle-outline" size={30} color="#28a745" />
            <View>
              <Text style={styles.cardTitle}>Meu Perfil</Text>
              <Text>Acesse seu perfil</Text>
            </View>
          </View>
          <Icon name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    paddingHorizontal: 16,
    paddingTop: 40,
    
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  welcomeBox: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
    elevation: 2,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  newsBox: {
    borderLeftWidth: 4,
    borderLeftColor: '#007BFF', 
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    elevation: 2,
  },
  newsTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop:10,
  },
  card: {
    borderLeftWidth: 1,
    borderLeftColor: '#77777',
    backgroundColor: '#fff',
    padding: '10%',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
     marginTop:12,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
