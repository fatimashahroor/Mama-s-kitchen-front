import React, { useState, useEffect } from "react";
import { Text, View, Image, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import styles from "./styles";
import { useNavigation } from '@react-navigation/native';
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';
import { Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Ionicons } from '@expo/vector-icons';
import { EXPO_PUBLIC_API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChefMenuScreen = ({ route, navigation }) => {
    const { chefId } = route.params;
    const [chefMenu, setChefMenu] = useState([]);
    const [fontsLoaded] = useFonts({
        Inter_400Regular, Pacifico_400Regular})
    const getChefDishes = async () => {
        try {
            const response = await fetch(`${EXPO_PUBLIC_API_URL}/dishes/${chefId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`
                },
            });
            const data = await response.json();
            console.log(data);
            // setChefMenu(data);
        } catch (error) {
            console.error(error);
        }
    }

    if (!fontsLoaded) {
        return <Text>Loading...</Text>;
    }
    return (
      <ScrollView>

      </ScrollView>  
    );
};

export default ChefMenuScreen;