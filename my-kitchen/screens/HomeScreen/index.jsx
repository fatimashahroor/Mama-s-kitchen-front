import React, { useState, useEffect} from 'react';
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
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../utils/redux/cartSlice";
const HomeScreen = () => {
    const dispatch = useDispatch();
    const [cookId, setCookId] = useState(null);
    const navigation = useNavigation();
    const [error, setError] = useState(null);
    const [role, setRole] = useState(null);
    const [dishes, setDishes] = useState([]);
    const [lastFetchedDishIndex, setLastFetchedDishIndex] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedDay, setSelectedDay] = useState('Daily');
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentDishName, setCurrentDishName] = useState('');
    const [fontsLoaded] = useFonts({
        Pacifico_400Regular, Inter_400Regular, Inter_600SemiBold
    });
    const days = ["Daily", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const cart = useSelector((state) => state.cart.cart);
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
        setCookId(JSON.parse(user).id);
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
        }
    };
    const getDishReviews = async (dishId, dishName) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/review/${dishId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            const commentsArray = data.map(element => element.comment);
            setReviews(commentsArray);
            processReviewsThroughAPI(commentsArray, dishName); 
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);  
        }
    };

    const processReviewsThroughAPI = async (reviews, dishName) => {
        try {
            const response = await fetch(`${OPENAI_URL}/process_reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
                },
                body: JSON.stringify({ reviews })
            });
            const data = await response.json();
            if (data.suggestions && data.suggestions.length > 0) {
                setSuggestions(data.suggestions);
                setCurrentDishName(dishName);
            } else {
                setSuggestions(["No suggestions to improve the dish."]);
            }
        } catch (error) {
            console.error('Error processing reviews:', error);
        }
    };

    const handleOpenModal = async () => {
        setShowModal(true);
        cookDishes = dishes.filter (dish => dish.user_id == cookId);
        const currentDishIndex = lastFetchedDishIndex % cookDishes.length; 
        const currentDish = cookDishes[currentDishIndex];
        await getDishReviews(currentDish.id, currentDish.name);
        setLastFetchedDishIndex(currentDishIndex + 1);
    };

    const addDishToCart = (item) => {
        for(let i=0; i<cart.length; i++){
            if(cart[i].id == item.id)
                alert("Dish already in cart");
                return;
        }
        dispatch(addToCart({...item, quantity:1}));
        alert("Dish added to cart");
    }

    useEffect(() => {
            getDishes();
            getRole();
        }, []);

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
                <Ionicons style={styles.cart} name='cart' color={'black'} size={20} 
                onPress={() => {addDishToCart(item)}}></Ionicons>
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
                <SearchInput placeholder={"Search for dishes"} value={searchQuery} onChangeText={setSearchQuery}
                   width={role == 2 ? '72%' : '84%'} />
                {role == 2 && (
                    <TouchableOpacity onPress={handleOpenModal}>
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
                            <FontAwesome5 name="robot" size={15} color={'#FFCF0F'} style={styles.robot} />
                            <Text style={styles.modalText}>Hey there, it's me! Your AI assistant. 
                                Here are some suggestions to improve your:</Text>
                            {isLoading ? (
                                <Text style={styles.text}>Loading suggestions...</Text>
                            ) : (<>
                                    <Text style={styles.suggestions}>{currentDishName} dish: {"\n"}{suggestions}</Text>
                                </>)}
                            <TouchableOpacity onPress={() => {setShowModal(false); setSuggestions([]); setIsLoading(false)
                                setCurrentDishName(''); }}>
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
