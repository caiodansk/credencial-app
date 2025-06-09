// MainTabs.js (NOVA ABA COM A TABBAR)
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MenuScreen from '../screens/Menu/MenuScreen';
import ConsultarCredencial from '../screens/cosulta_credencial/cosultaScreen';
import InfopersonScreen from '../screens/Credencial/InfopersonScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import LoginScreen from '../screens/Login/LoginScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Início') iconName = 'home-outline';
          else if (route.name === 'Consultar') iconName = 'search-outline';
          else if (route.name === 'Perfil') iconName = 'person-outline';
          else iconName = 'apps-outline';

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Início" component={MenuScreen} />
      <Tab.Screen name="Consultar" component={ConsultarCredencial} />
      <Tab.Screen name="Perfil" component={InfopersonScreen} />
    </Tab.Navigator>
  );
}
