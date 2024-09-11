import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View, Alert, Platform } from 'react-native';
import { PermissionsProvider } from './components/PermissionsContext';
import * as ImagePicker from 'expo-image-picker';
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import BoardingScreen1 from './screens/BoardingScreen1';
import HomeScreen from './screens/HomeScreen';
import ChefsScreen from './screens/ChefsScreen';
import ChefMenuScreen from './screens/ChefMenuScreen';
import DishScreen from './screens/DishScreen';
import ChefProfileScreen from './screens/ChefProfileScreen';
import EditDishesScreen from './screens/EditDishesScreen';
import ChefOrdersScreen from './screens/ChefOrdersScreen';
import ChefTabs from './components/ChefTabs';
import CartScreen from './screens/CartScreen';
import MyOrdersScreen from './screens/MyOrdersScreen';
import CustomerTabs from './components/CustomerTabs';
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
              Alert.alert('Session expired', 'Please log in again');
              setUserToken(null); 
              AsyncStorage.clear();
          }
        }
      } catch (error) {
        console.log('Error checking token:', error);
        //setUserToken(null); 
      } finally {
        setIsLoading(false);
      }
    };
    checkToken();
  }, []);
  useEffect(() => {
    (async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('We need camera roll permissions to access your photos!');
            }
        }
    })();
    }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <PermissionsProvider>
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
            <Stack.Screen name="ChefProfile" component={ChefProfileScreen} />
            <Stack.Screen name="EditDishes" component={EditDishesScreen} />
            <Stack.Screen name="ChefOrders" component={ChefOrdersScreen} />
            <Stack.Screen name="ChefTabs" component={ChefTabs} />
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="MyOrders" component={MyOrdersScreen} />
            <Stack.Screen name="CustomerTabs" component={CustomerTabs} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
    </PermissionsProvider>
  );
}
