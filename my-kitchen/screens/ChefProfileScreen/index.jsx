import React, { useState, useEffect } from "react";
import { Text, View, Image, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { useFonts, Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { EXPO_PUBLIC_API_URL } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "./styles";

const ChefProfileScreen = () => {
    const [details, setDetails] = useState([]);
    const [profileImage, setProfileImage] = useState(null);
    const [fontsLoaded] = useFonts({
        Inter_400Regular, Inter_600SemiBold});

    const StarRating = ({ rating }) => {
        const stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push(
                <FontAwesome5 key={i} name="star" solid size={14} style={{ color: 'gold', marginRight: 4}} />
            );
        }
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {stars}
                {rating < 5 && Array.from({ length: 5 - rating }, (_, i) => (
                    <FontAwesome5 key={i + rating} name="star" size={14} style={{ color: 'lightgray', marginRight: 4 }} />
                ))}
            </View>
        );
    };
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
                setDetails(data.user);
                setProfileImage(data.user.image_path && data.user.image_path !== "" ? data.user.image_path : null);
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
                    {profileImage ? (
                            <Image
                                source={{ uri: `${EXPO_PUBLIC_API_URL}/images/${profileImage}`}} style={styles.avatarCircle}/>
                        ) : (
                            <Ionicons name="person-outline" size={50} color="gray" />
                        )}
                    </View>
                    <TouchableOpacity style={styles.cameraIcon}>
                        <Ionicons name="camera" size={24} color="#B20530" />
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.name}>{details.full_name}</Text>
            <View style={styles.rating}>
                <StarRating rating={Math.round(details.overall_rating)}/>
            </View>
        </View>
    );
};

export default ChefProfileScreen;