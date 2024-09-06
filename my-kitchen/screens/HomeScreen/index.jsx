import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableWithoutFeedback, TouchableOpacity, Keyboard } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';
import { Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import SearchInput from '../../components/search/search';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Ionicons } from '@expo/vector-icons';
import { EXPO_PUBLIC_API_URL } from '@env';
const HomeScreen = () => {
    const navigation = useNavigation();
    const [error, setError] = useState(null);
    const [dishes, setDishes] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [fontsLoaded] = useFonts({
        Pacifico_400Regular, Inter_400Regular});
    const days = ["Daily", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const handleDayPress = (day) => {
        setSelectedDay(day);    }
    const filteredDishes = dishes
    .filter(dish => dish.available_on === selectedDay)
    .filter(dish => dish.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const getDishes = async () => {
    try {
        const response = await fetch(`${EXPO_PUBLIC_API_URL}`+'/api/dish', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
            },
        });
        const data= await response.json();
        if (response.ok) {
            setDishes(data.data); 
        } else {
            setError(data.message);
        }
    } catch (error) {
        setError(error.toString());
        console.log(error);
    }
    };
    useEffect(() => {
        if (fontsLoaded) {
            getDishes();
        }
    }, [fontsLoaded]);
    if (!fontsLoaded) {
        return <Text>Loading Fonts...</Text>
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.flexRow}>
                    <Image source={require('../../assets/logo.png')} style={styles.logo}></Image>
                    <Text style={styles.appName}>Mama's Kitchen</Text>
                </View>
                <SearchInput placeholder={"Search for dishes"} value={searchQuery} onChangeText={setSearchQuery}/>
                <TouchableOpacity onPress={() => navigation.navigate('Chefs')}>
                <FontAwesome5 name="utensils" size={26} color={'#FFCF0F'} style={styles.icon}/>
                 </TouchableOpacity>
                <Text style={styles.error}>{error}</Text>
                <View style={styles.scrollView}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {days.map((day, index) => (
                            <TouchableOpacity key={index} style={styles.dayContainer} onPress={() => handleDayPress(day)}>
                                <Text style={styles.dayText}>{day}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
                <View>
                    <View style={[styles.flexRow, styles.justify]}>
                    {filteredDishes.length > 0 ? filteredDishes.map((data)=> (
                        <View key={data.id} style={styles.dish}>
                            <Image style={styles.image} 
                                source={{ uri: `${EXPO_PUBLIC_API_URL}/images/${data.image_path}` }}/>
                            <View style={[styles.flexRow, styles.space]}>
                                <Text style={styles.dishName}>{data.name} </Text>
                                <Text style={styles.dishPrice}>{data.price + "$"}</Text>
                            </View>
                            <Text style={styles.user}>{data.user_full_name}</Text>
                            <Ionicons style={styles.cart} name='cart' color={'black'} size={20}></Ionicons>
                        </View> 
                    )) : <Text style={styles.none}>No dishes found</Text>}
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default HomeScreen;