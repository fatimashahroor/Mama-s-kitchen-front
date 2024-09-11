import React from "react";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from "../../screens/HomeScreen";
import ChefProfileScreen from "../../screens/ChefProfileScreen";
import EditDishesScreen from "../../screens/EditDishesScreen";
import ChefOrdersScreen from "../../screens/ChefOrdersScreen";

const Tab = createBottomTabNavigator();

const ChefTabs = ({route}) => {
    const { streak } = route.params || {};
    return (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Orders') {
                iconName = focused ? 'cube' : 'cube-outline';
              } else if (route.name === 'My Dishes') {
                iconName = focused ? 'restaurant' : 'restaurant-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';  
              }
              return <Ionicons name={iconName} size={29} color={color} />;
            },
            tabBarActiveTintColor: '#FFCF0F',  
            tabBarInactiveTintColor: '#B20530', 
            tabBarStyle: {
                backgroundColor: '#fff', 
                paddingBottom: 8,
                height: 70, 
            },
            tabBarIconStyle: {
                marginTop: 2,
            },
            headerShown: false
          })}
            >
            <Tab.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{ 
                tabBarShowLabel: true
              }} 
              initialParams={{streak}} />          
            <Tab.Screen 
            name="Orders" 
            component={ChefOrdersScreen} 
            options={{ 
              tabBarShowLabel: true  
            }}
            initialParams={{streak}}/>
              <Tab.Screen name="My Dishes" 
              component={EditDishesScreen} 
              options={{ 
                tabBarShowLabel: true 
              }}
              initialParams={{streak}}/>
              <Tab.Screen name="Profile" 
              component={ChefProfileScreen} 
              options={{
                tabBarShowLabel: true 
              }}
              initialParams={{streak: streak}}/>
            </Tab.Navigator>
    );
}

export default ChefTabs;