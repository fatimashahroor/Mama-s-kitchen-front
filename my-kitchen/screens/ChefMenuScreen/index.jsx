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
    const { chef } = route.params;
    const [chefMenu, setChefMenu] = useState([]);
    const [fontsLoaded] = useFonts({
        Inter_400Regular, Pacifico_400Regular})
    const StarRating = ({ rating }) => {
        const stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push(
                <FontAwesome5 key={i} name="star" solid size={13} 
                style={{ color: 'gold', marginRight: 4, marginTop: 10}} />
            );}
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {stars}
                {rating < 5 && Array.from({ length: 5 - rating }, (_, i) => (
                    <FontAwesome5 key={i + rating} name="star" size={13} 
                    style={{ color: 'lightgray', marginRight: 4, marginTop: 10}} />
                ))}
            </View>
        );};
    const getChefDishes = async () => {
        try {
            const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/dishes/${chef.id}`, {
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
        <View style={styles.container}>
            <FontAwesome5 name="chevron-left" size={20} style={styles.icon} onPress={() => navigation.goBack()} />
            <View style={styles.flexRow}>
                <Image style= {styles.imageStyle} source={{ uri: `${EXPO_PUBLIC_API_URL}/images/${chef.image_path}` }}></Image>
                <View style={styles.flexColumn}>
                    <Text style={styles.chefName}>{chef.full_name}</Text>
                    <StarRating rating={chef.rating} />
                </View>
                <View style={styles.verticalLine} />
                <View style={styles.flexColumn}>
                    <Text style={styles.chefAge}>{chef.age}  year old</Text>
                    <Text style={styles.chefPhone}>{chef.phone}</Text>
                </View>
                <Text style={styles.chefLocation}>{chef.located_in}</Text>
            </View>
            <Text style={styles.chefBio}>{chef.bio}</Text>
        </View>
      </ScrollView>  
    );
};

export default ChefMenuScreen;