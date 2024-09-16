import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, FlatList, TouchableWithoutFeedback, TouchableOpacity, Keyboard, Modal } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts, Inter_400Regular, Inter_600SemiBold  } from '@expo-google-fonts/inter';
import { Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import SearchInput from '../../components/search/search';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Ionicons } from '@expo/vector-icons';
import { EXPO_PUBLIC_API_URL, OPENAI_URL } from '@env';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [error, setError] = useState(null);
    const [role, setRole] = useState(null);
    const [dishes, setDishes] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedDay, setSelectedDay] = useState('Daily');
    const [searchQuery, setSearchQuery] = useState('');
    const [lastFetchedDishIndex, setLastFetchedDishIndex] = useState(0); 
    const intervalRef = useRef(null);
    const [fontsLoaded] = useFonts({
        Pacifico_400Regular, Inter_400Regular, Inter_600SemiBold
    });
    const days = ["Daily", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const handleDayPress = (day) => {
        setSelectedDay(day);
    };

    const filteredDishes = dishes
        .filter(dish => dish.available_on === selectedDay)
        .filter(dish => dish.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const getRole = async () => {
        const user = await AsyncStorage.getItem('user');
        const user_info = JSON.parse(user).roles;
        setRole(user_info);
    };

    const getDishes = async () => {
        try {
            const response = await fetch(`${EXPO_PUBLIC_API_URL}`+'/api/dish', {
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
            setError(error.toString());
            console.log(error);
        }
    };

    const getDishReviews = async (dishId) => {
        try {
            const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/review/${dishId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                const commentsArray = data.map(element => element.comment);
                setReviews(commentsArray);
                processReviewsThroughAPI(commentsArray); 
            }
        } catch (error) {
            console.error(error);
        }
    };

    const processReviewsThroughAPI = async (reviews) => {
        try {
            const response = await fetch(`${OPENAI_URL}/process_reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
                },
                body: JSON.stringify({ reviews })
            });
            console.log(response);
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                setSuggestions(data.suggestions);  
                setShowModal(true);
            }
        } catch (error) {
            console.error('Error processing reviews:', error);
        }
    };

    const fetchDishEvery1Minute = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }    
        intervalRef.current = setInterval(async () => {
            const nextDishIndex = (lastFetchedDishIndex + 1) % dishes.length;
            const nextDishId = dishes[nextDishIndex].id;
            await getDishReviews(nextDishId);
            setLastFetchedDishIndex(nextDishIndex);

        }, 60000); 
    };

    useEffect(() => {
        if (fontsLoaded) {
            getDishes();
            getRole();
        }
    }, [fontsLoaded]);

    const renderDish = ({ item }) => (
        <TouchableOpacity key={item.id} onPress={() => {
            navigation.navigate('Dish', {'dishId': item.id, 'cook': item.user_full_name});
        }}>
            <View style={styles.dish}>
                <Image style={styles.image} 
                    source={{ uri: `${EXPO_PUBLIC_API_URL}/images/${item.image_path}` }}/>
                <View style={[styles.flexRow, styles.space]}>
                    <Text style={styles.dishName}>{item.name}</Text>
                    <Text style={styles.dishPrice}>{item.price + "$"}</Text>
                </View>
                <Text style={styles.user}>{item.user_full_name}</Text>
                <Ionicons style={styles.cart} name='cart' color={'black'} size={20}></Ionicons>
            </View>
        </TouchableOpacity>
    );

    if (!fontsLoaded) {
        return <Text>Loading Fonts...</Text>;
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.flexedByRow}>
                    <Image source={require('../../assets/logo.png')} style={styles.logo}></Image>
                    <Text style={styles.appName}>Mama's Kitchen</Text>
                </View>
                <SearchInput placeholder={"Search for dishes"} value={searchQuery} onChangeText={setSearchQuery} />
                {role == 2 && (
                    <TouchableOpacity onPress={() => setShowModal(true)}>
                        <FontAwesome5 name="robot" size={24} color={'#f5c502'} style={styles.icon} />
                    </TouchableOpacity>
                )}
                <Text style={styles.error}>{error}</Text>
                <View style={styles.scrollView}>
                    <FlatList
                        data={days}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.day} onPress={() => handleDayPress(item)}>
                                <Text style={styles.dayText}>{item}</Text>
                            </TouchableOpacity>
                        )}/>
                </View>
                <FlatList numColumns={2} showsVerticalScrollIndicator={false} style={{flex: 1}}
                    data={filteredDishes} keyExtractor={(item) => item.id.toString()}
                    renderItem={renderDish} columnWrapperStyle={styles.flexRow} 
                    ListEmptyComponent={<Text style={styles.none}>No dishes found</Text>}/>
                <Modal
                    visible={showModal} transparent={true} animationType="slide"
                    onRequestClose={() => setShowModal(false)}>
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalView}>
                            <FontAwesome5 name="robot" size={18} color={'#FFCF0F'} style={styles.robot} />
                            <Text style={styles.modalText}>Hey there, it's me! Your AI assistant.</Text>
                            <Text style={styles.modalText}>Here are some suggestions to improve:</Text>
                            <Text></Text>
                            {/* <Text style={styles.suggestions}>{suggestions}</Text> */}
                            <TouchableOpacity onPress={() => setShowModal(false)}>
                                <Text style={styles.closeText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default HomeScreen;
