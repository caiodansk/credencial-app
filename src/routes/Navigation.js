import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/Login/LoginScreen";
import RegisterScreen from "../screens/register/RegisterScreen";


const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} screenOptions={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} screenOptions={{ headerShown: false }} />
     
      </Stack.Navigator>
    </NavigationContainer>
  );
}
