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
              } else if (route.name === 'ChefOrders') {
                iconName = focused ? 'cube' : 'cube-outline';
              } else if (route.name === 'EditDishes') {
                iconName = focused ? 'restaurant' : 'restaurant-outline';
              } else if (route.name === 'ChefProfile') {
                iconName = focused ? 'person' : 'person-outline';  
              }
              return <Ionicons name={iconName} size={29} color={color} />;
            },
            tabBarActiveTintColor: '#FFCF0F',  
            tabBarInactiveTintColor: '#B20530', 
            tabBarStyle: {
                backgroundColor: '#fff', 
                paddingBottom: 5,
                height: 65, 
            },
            tabBarIconStyle: {
                marginTop: 6,
            },
            headerShown: false
          })}
            >
            <Tab.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{ 
                tabBarShowLabel: false  
              }} 
              initialParams={{streak}} />          
            <Tab.Screen 
            name="ChefOrders" 
            component={ChefOrdersScreen} 
            options={{ 
              tabBarShowLabel: false  
            }}
            initialParams={{streak}}/>
              <Tab.Screen name="EditDishes" 
              component={EditDishesScreen} 
              options={{ 
                tabBarShowLabel: false 
              }}
              initialParams={{streak}}/>
              <Tab.Screen name="ChefProfile" 
              component={ChefProfileScreen} 
              options={{
                tabBarShowLabel: false 
              }}
              initialParams={{streak: streak}}/>
            </Tab.Navigator>
    );
}

export default ChefTabs;