import React, { useState, useEffect } from "react";
import { Text, View, Image, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { useFonts, Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { EXPO_PUBLIC_API_URL } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "./styles";

const ChefProfileScreen = ({route,navigation}) => {
    const {chef} = route.params;
    const [details, setDetails] = useState([]);
    const [fontsLoaded] = useFonts({
        Inter_400Regular, Inter_600SemiBold
    });

    const getCookDetails = async () => {
        try {
            const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/user/${chef}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`
                },
            });
            const data = await response.json();
            if (response.ok) {
                setDetails(data);
            } else {
                throw new Error('Failed to fetch cook details');
            } 
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getCookDetails();
    }, []);
    if (!fontsLoaded) {
        return <Text>Loading Fonts...</Text>;
    }
     
    return (
        <View style={styles.container}>
        </View>
    );
};

export default ChefProfileScreen;