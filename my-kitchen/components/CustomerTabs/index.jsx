import React from "react";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from "../../screens/HomeScreen";
import ChefsScreen from "../../screens/ChefsScreen";
import CartScreen from "../../screens/CartScreen";
import ChefOrdersScreen from "../../screens/ChefOrdersScreen";

const Tab = createBottomTabNavigator();

const CustomerTabs = ({route}) => {
    const { streak } = route.params || {};
    return (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = focused ? 'house' : 'house';
              } else if (route.name === 'Chefs') {
                iconName = focused ? 'restaurant' : 'restaurant';
              } else if (route.name === 'Cart') {
                iconName = focused ? 'shopping-cart' : 'shopping-cart';
              } else if (route.name === 'My Orders') {
                iconName = focused ? 'archive' : 'archive';
              }
              return <MaterialIcons name={iconName} size={27} color={color} />;
            },
            tabBarActiveTintColor: '#FFCF0F',
            tabBarInactiveTintColor: '#B20530',
            tabBarStyle: {
                backgroundColor: '#fff',
                paddingBottom: 12,
                height: 70,
                marginLeft: -11
            },
            tabBarIconStyle: {
                marginTop: 7,
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
              initialParams={{streak}}
            />
            <Tab.Screen
              name="Chefs"
              component={ChefsScreen}
              options={{
                tabBarShowLabel: true
              }}
              initialParams={{streak}}
            />
            <Tab.Screen
              name="Cart"
              component={CartScreen}
              options={{
                tabBarShowLabel: true
              }}
              initialParams={{streak}}
            />
            <Tab.Screen
              name="My Orders"
              component={ChefOrdersScreen}
              options={{
                tabBarShowLabel: true
              }}
              initialParams={{streak}}
            />
          </Tab.Navigator>
    );

}

export default CustomerTabs;


