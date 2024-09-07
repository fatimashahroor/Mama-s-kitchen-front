import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import BoardingScreen1 from './screens/BoardingScreen1';
import HomeScreen from './screens/HomeScreen';
import ChefsScreen from './screens/ChefsScreen';
import ChefMenuScreen from './screens/ChefMenuScreen';
import DishScreen from './screens/DishScreen';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1}}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login" screenOptions={{ headerShown: false }}>
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

