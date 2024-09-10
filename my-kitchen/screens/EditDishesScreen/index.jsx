import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Keyboard } from "react-native";
import styles from "./styles";
import SearchInput from "../../components/search/search";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Ionicons } from '@expo/vector-icons';
import { EXPO_PUBLIC_API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditDishesScreen = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [dishes, setDishes] = useState([]);
    const [error, setError] = useState(null);

    const getDishes = async () => {
        const chef = await AsyncStorage.getItem('user');
        const chefId = JSON.parse(chef)._id;
        try {
            const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/dishes/${chefId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setDishes(data.data);
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError(error);
            console.log(error);
        }
    };
    const filteredDishes = dishes.filter(dish => dish.name.toLowerCase().includes(searchQuery.toLowerCase()));
    useEffect(() => {
        getDishes();
    }, []);
    return (
        <TouchableWithoutFeedback onPress={() => {setMenuVisible(false); {Keyboard.dismiss()}}}>
            <View style={styles.container}>
                <Text style={styles.text}>My Plates</Text>
                <TouchableOpacity activeOpacity={1} >
                    <SearchInput placeholder=" Search for your dishes"/>
                    <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
                        <Ionicons name='menu' size={27} style={styles.menu} />
                    </TouchableOpacity>
                    {menuVisible && (
                        <View style={styles.dropdownMenu}>
                            <Text style={styles.dropdownItem}>Create dish</Text>
                            <Text style={styles.dropdownItem}>Edit dish</Text>
                            <Text style={styles.dropdownItem}>Delete dish</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default EditDishesScreen;