import React, { useState, useEffect } from "react";
import { Text, View, Image, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { useFonts, Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { Ionicons } from '@expo/vector-icons';
import { EXPO_PUBLIC_API_URL } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "./styles";

const ChefProfileScreen = () => {
    const [details, setDetails] = useState([]);
    const [fontsLoaded] = useFonts({
        Inter_400Regular, Inter_600SemiBold});

    const getCookDetails = async () => {
        const chef = await AsyncStorage.getItem('user');
        const chefId = JSON.parse(chef);
        const token= await AsyncStorage.getItem('token');
        if (!chefId?.id || !token) {
            throw new Error('Invalid chef data or missing token');
        }
        try {
            const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/user/${chefId.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            const data = await response.json();
            if (data) {
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
            <Text style={styles.title}>My Profile</Text>
            <View style={styles.profileContainer}>
                <View style={styles.avatarContainer}>
                    <View style={styles.avatarCircle}>
                        <Ionicons name="person-outline" size={50} color="gray" />
                    </View>
                    <TouchableOpacity style={styles.cameraIcon}>
                        <Ionicons name="camera" size={24} color="#B20530" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default ChefProfileScreen;