import { useState, useEffect } from "react";
import { useFonts, Inter_400Regular, Inter_600SemiBold } from "@expo-google-fonts/inter";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, Alert } from "react-native";
import styles from "./styles";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Ionicons } from '@expo/vector-icons';
import { EXPO_PUBLIC_API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DishScreen = ({ route, navigation }) => {
    const { dishId, cook } = route.params;
    const [dishDetails, setDishDetails] = useState([]);
    const [dishRating, setDishRating] = useState({});
    const [fontsLoaded] = useFonts({
        Inter_400Regular, Inter_600SemiBold});
    const getDishDetails = async () => {
        try {
            const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/dish/${dishId}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch dish details');
            }
            const data = await response.json();
            setDishDetails(data);
        } catch (error) {
            console.error(error);
        }
    };
    const getDishReviews = async () => {
        try {
            const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/review/${dishId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch dish reviews');
            }
            const data = await response.json();
            setDishRating(data);
        } catch (error) {
            console.error(error);
        }
    }
    const totalRatings = dishRating.length > 0 ? dishRating.reduce((sum, review) => sum + parseInt(review.rating), 0) : 0;
    const overallRating = dishRating.length > 0 ? Math.round(totalRatings / dishRating.length).toFixed(1) : 'No ratings yet';
    const StarRating = ({ overallRating }) => {
        const stars = [];
        for (let i = 0; i < overallRating; i++) {
            stars.push(
                <FontAwesome5 key={i} name="star" solid size={8} 
                style={{ color: 'white', marginRight: 4, marginTop: -4}} />
            );}
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                {stars}
                {overallRating < 5 && Array.from({ length: 5 - overallRating }, (_, i) => (
                    <FontAwesome5 key={i + overallRating} name="star" size={8} 
                    style={{ color: 'lightgray', marginRight: 4, marginTop: -4}} />
                ))}
            </View>
    );};
    useEffect(() => {
        getDishDetails();
        getDishReviews();
    }, []);
    if (!fontsLoaded) {
        return <Text>Loading Fonts...</Text>;
    }
    return (
        <ScrollView>
            <View style={styles.container}>
                <View styles={styles.imageContainer}>
                    <FontAwesome5 name="chevron-left" size={24} style={styles.icon} onPress={() => navigation.goBack()}/>
                    <Ionicons style={styles.cart} name='cart' size={27}></Ionicons>
                    <Image source={{ uri: `${EXPO_PUBLIC_API_URL}/images/${dishDetails.image_path}` }} style={styles.image} />
                </View>
                <View style={styles.flexRow}>
                    <View>
                        <Text style={styles.name}>{dishDetails.name}</Text>
                        <Text style={styles.cookName}>{cook}</Text>
                    </View>
                    <Text style={styles.price}>{dishDetails.price}$</Text>
                </View>
                <View style={styles.flexContainer}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.text}>Duration</Text>
                        <Text style={styles.text1}>{dishDetails.duration}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.text}>Diet-Type</Text> 
                        <Text style={styles.text1}>{dishDetails.diet_type}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.text}>Rating</Text>
                        <StarRating overallRating={overallRating}/>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

export default DishScreen;