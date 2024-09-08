import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View, Text } from 'react-native';
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import BoardingScreen1 from './screens/BoardingScreen1';
import HomeScreen from './screens/HomeScreen';
import ChefsScreen from './screens/ChefsScreen';
import ChefMenuScreen from './screens/ChefMenuScreen';
import DishScreen from './screens/DishScreen';

export default function App() {
  const Stack = createNativeStackNavigator();
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setUserToken(token);  
      } catch (error) {
        console.log('Error fetching token:', error);
      } finally {
        setIsLoading(false); 
      }
    };

    checkToken();  
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={userToken ? "Home" : "Login"} screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Boarding1" component={BoardingScreen1} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Chefs" component={ChefsScreen} />
            <Stack.Screen name="ChefMenu" component={ChefMenuScreen} />
            <Stack.Screen name="Dish" component={DishScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
