import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/Login/LoginScreen";
import RegisterScreen from "../screens/register/RegisterScreen";
import MenuScreen from "../screens/Menu/MenuScreen";
import InfopersonScreen from "../screens/Credencial/InfopersonScreen";
import InfoprofScreen from "../screens/Credencial/InfoprofScreen";
import InfoendScreen from "../screens/Credencial/InfoendScreen"
import ConsultarCredencial from "../screens/cosulta_credencial/cosultaScreen"
import MainTabs from "../components/tabBar";

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MainTabs"screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} screenOptions={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} screenOptions={{ headerShown: false }} />
        <Stack.Screen name="MenuBar" component={MenuScreen} screenOptions={{ headerShown: false }} />
        <Stack.Screen name="Infoperson" component={InfopersonScreen} screenOptions={{ headerShown: false }} />
        <Stack.Screen name="Infoprof" component={InfoprofScreen} screenOptions={{ headerShown: false }} />
        <Stack.Screen name="Infoend" component={InfoendScreen} screenOptions={{ headerShown: false }} />
        <Stack.Screen name="Consultar" component={ConsultarCredencial} screenOptions={{ headerShown: false }} />
          <Stack.Screen name="MainTabs" component={MainTabs} />
     
     
      </Stack.Navigator>
    </NavigationContainer>
  );
}
