import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View, Alert } from 'react-native';
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
      setIsLoading(true);
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const decoded = jwtDecode(token);
          if (decoded.exp * 1000 < Date.now()) {
            const refreshedToken = await refreshToken();
            if (refreshedToken) {
              setUserToken(refreshedToken);
            } else {
              Alert.alert('Session expired', 'Please log in again');
              setUserToken(null); 
            }
          } else {
            setUserToken(token);
          }
        }
      } catch (error) {
        console.log('Error checking token:', error);
        setUserToken(null); 
      } finally {
        setIsLoading(false);
      }
    };
    checkToken();
  }, []);

  const refreshToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${EXPO_PUBLIC_API_URL}/refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken: token })
      });
      const data = await response.json();
      if (response.ok && data.token) {
        await AsyncStorage.setItem('token', data.token);
        return data.token;
      } else {
        throw new Error(data.error || 'Unable to refresh token');
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      return null;
    }
  };
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
