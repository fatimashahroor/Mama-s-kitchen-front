import { useState, useEffect } from "react";
import { useFonts, Inter_400Regular, Inter_600SemiBold } from "@expo-google-fonts/inter";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, Alert } from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Ionicons } from '@expo/vector-icons';
import { EXPO_PUBLIC_API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DishScreen = ({ route, navigation }) => {
    const { dishId } = route.params;
    const [dishDetails, setDishDetails] = useState([]);
    const [dishRating, setDishRating] = useState({});
    const [userRating, setUserRating] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
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
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getDishDetails();
    }, []);
    if (!fontsLoaded) {
        return <Text>Loading Fonts...</Text>;
    }
    return (
        <ScrollView>
            <View style={styles.container}>
                <View styles={styles.imageContainer}>
                    <FontAwesome5 name="chevron-left" size={24} style={styles.icon} onPress={() => navigation.goBack()}/>
                    <Ionicons name="star-half" size={24} style={styles.star} onPress={() => setModalVisible(true)}/>
                    <Ionicons style={styles.cart} name='cart' size={27}></Ionicons>
                    <Image source={{ uri: `${EXPO_PUBLIC_API_URL}/images/${dishDetails.image_path}` }} style={styles.image} />
                </View>
            </View>
        </ScrollView>
    );
}

export default DishScreen;