import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';
import { Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import SearchInput from '../../components/search/search';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Ionicons } from '@expo/vector-icons';
import { EXPO_PUBLIC_API_URL } from '@env';
const HomeScreen = () => {
    const [error, setError] = useState(null);
    const [dishes, setDishes] = useState([]);
    const [fontsLoaded] = useFonts({
        Pacifico_400Regular, Inter_400Regular});
    const ImageDisplay = ($image_path) => {
        return  imageUrl = `${EXPO_PUBLIC_API_URL}/images/${$image_path}`;
    }
        
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
                <SearchInput placeholder={"Search for dishes"}/>
                <FontAwesome5 name="utensils" size={26} color={'#FFCF0F'} style={styles.icon}/>
                <Text style={styles.error}>{error}</Text>
                <View>
                    <View style= {[styles.flexRow, styles.justify]}>{dishes.map((data) => (
                            <View key={data.id} style={styles.dish}>
                                <Image style={[styles.image]} 
                                source={{uri: `${EXPO_PUBLIC_API_URL}`+`/images/${data.image_path}`}}/>
                                <View style={[styles.flexRow, styles.space]}>
                                <Text style={styles.dishName}>{data.name} </Text>
                                <Text style={styles.dishPrice}>{data.price+"$"}</Text>
                                </View>
                                <Text style={styles.user}>{data.user_full_name}</Text>
                                <Ionicons style={styles.cart} name='cart' color={'black'} size={20}></Ionicons>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default HomeScreen;