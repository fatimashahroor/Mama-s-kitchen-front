import React, { useState, useEffect } from "react";
import { Text, View, Image, ScrollView, TouchableOpacity, Modal } from "react-native";
import styles from "./styles";
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';
import { Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Ionicons } from '@expo/vector-icons';
import { EXPO_PUBLIC_API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChefMenuScreen = ({ route, navigation }) => {
    const { chef } = route.params;
    const [chefMenu, setChefMenu] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);
    const [modalVisible, setModalVisible] = useState(false); 
    const [userRating, setUserRating] = useState(0);
    const [fontsLoaded] = useFonts({
        Inter_400Regular, Pacifico_400Regular})
    const days = ["Daily", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const handleDayPress = (day) => {
        setSelectedDay(day);}    
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

    const UserRatingInput = ({ userRating, setUserRating }) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {stars.push(
                <TouchableOpacity 
                    key={i} 
                    onPress={() => setUserRating(i)} onPressIn={() => setUserRating(i-1)}>
                    <FontAwesome5 name="star" solid={i <= userRating} size={30}
                        style={{ color: i <= userRating ? 'gold' : 'lightgray', margin: 4 }}/>
                </TouchableOpacity>
            );}
        return <View style={{ flexDirection: 'row', justifyContent: 'center' }}>{stars}</View>;
    };
    const handleRatingSubmit = () => {
        setModalVisible(false); 
    };
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
            if (data) {
                setChefMenu(data);
            }
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getChefDishes();
    }, []);
    const filteredDishes = chefMenu
    .filter(menu => menu.available_on === selectedDay)
    if (!fontsLoaded) {
        return <Text>Loading...</Text>;
    }
    return (
        <View style={styles.container}>
            <FontAwesome5 name="chevron-left" size={20} style={styles.icon} onPress={() => navigation.goBack()} />
            <Ionicons name="star-half" size={22} color="#B20530" style={styles.star} onPress={() => setModalVisible(true)} />
        <ScrollView showsVerticalScrollIndicator={false}>
        <View>
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
            <View style={styles.horizontalLine} />
            <Text style={styles.menuTitle}>Menu</Text>
            <View style={styles.scrollView}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {days.map((day, index) => (
                            <TouchableOpacity style={styles.dayButton} key={index} onPress={() => handleDayPress(day)}>
                                <Text style={styles.dayText}>{day}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            <View style={styles.dishesContainer}>
            {filteredDishes.length > 0 ? filteredDishes.map((item, index)=> (
                        <View key={item.id || index} style={styles.dish}>
                            <Image style={styles.image} 
                                source={{ uri: `${EXPO_PUBLIC_API_URL}/images/${item.image_path}`}}/>
                            <View style={[styles.flexColumn, styles.space]}>
                                <Text style={styles.dishName}>{item.name} </Text>
                                <Text style={styles.dishPrice}>{item.price + "$"}</Text>
                            </View>
                            <Ionicons style={styles.cart} name='cart' color={'black'} size={20}></Ionicons>
                        </View> 
                    )) : <Text style={styles.none}>No dishes found</Text>}
            </View>
        </View>
        </ScrollView>
        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Rate {chef.full_name}</Text>
                    <UserRatingInput userRating={userRating} setUserRating={setUserRating} />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={handleRatingSubmit}>
                            <Text style={styles.buttonText}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal> 
    </View> 
    );
};

export default ChefMenuScreen;