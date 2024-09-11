import React from "react";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from "../../screens/HomeScreen";
import ChefsScreen from "../../screens/ChefsScreen";
import CartScreen from "../../screens/CartScreen";
import MyOrdersScreen from "../../screens/MyOrdersScreen";

const Tab = createBottomTabNavigator();

const CustomerTabs = ({route}) => {
    const { streak } = route.params || {};
    return (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home';
              } else if (route.name === 'Chefs') {
                iconName = focused ? 'restaurant-menu' : 'local-dining';
              } else if (route.name === 'Cart') {
                iconName = focused ? 'shopping-cart' : 'shopping-cart';
              } else if (route.name === 'My Orders') {
                iconName = focused ? 'archive' : 'archive';
              }
              return <MaterialIcons name={iconName} size={29} color={color} />;
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
              component={MyOrdersScreen}
              options={{
                tabBarShowLabel: true
              }}
              initialParams={{streak}}
            />
          </Tab.Navigator>
    );

}

export default CustomerTabs;


