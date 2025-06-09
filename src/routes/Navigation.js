import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/Login/LoginScreen';
import RegisterScreen from '../screens/register/RegisterScreen';
import MenuScreen from '../screens/Menu/MenuScreen';
import InfopersonScreen from '../screens/Credencial/InfopersonScreen';
import InfoprofScreen from '../screens/Credencial/InfoprofScreen';
import InfoendScreen from '../screens/Credencial/InfoendScreen';
import cosultaScreen from '../screens/cosulta_credencial/cosultaScreen';
import MainTabs from '../components/tabBar';
import RgScreen from '../screens/Rg/RgScreen';

const Stack = createStackNavigator();

export default function Routes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="MainTabs">
              {(props) => <MainTabs {...props} setIsLoggedIn={setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen name="MenuBar" component={MenuScreen} />
            <Stack.Screen name="Infoperson" component={InfopersonScreen} />
            <Stack.Screen name="Infoprof" component={InfoprofScreen} />
            <Stack.Screen name="Infoend" component={InfoendScreen} />
            <Stack.Screen name="Rg" component={RgScreen}/>
            <Stack.Screen name="Consultar" component={cosultaScreen} />
            </>) : (<><Stack.Screen name="Login">
              {(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
