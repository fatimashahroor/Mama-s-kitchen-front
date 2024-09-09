import { useState, useEffect } from "react";
import { useFonts, Inter_400Regular, Inter_600SemiBold } from "@expo-google-fonts/inter";
import { View, Text, Image, FlatList, TouchableOpacity, TextInput } from "react-native";
import styles from "./styles";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Ionicons } from '@expo/vector-icons';
import { EXPO_PUBLIC_API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';


const UserRating = ({ userRating, setUserRating }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {stars.push(
            <TouchableOpacity 
                key={i} 
                onPress={() => setUserRating(i)} onPressOut={() => setUserRating(i-1)}>
                <FontAwesome5 name="star" solid={i <= userRating} size={23}
                    style={{ color: i <= userRating ? 'gold' : 'lightgray', margin: 2, marginTop: 5 }}/>
            </TouchableOpacity>
        );}
    return <View style={{ flexDirection: 'row', justifyContent: 'center' }}>{stars}</View>;
};


const DishScreen = ({ route, navigation }) => {
    const { dishId, cook } = route.params;
    const [dishDetails, setDishDetails] = useState([]);
    const [additionalIngredients, setAdditionalIngredients] = useState([]);
    const [userRating, setUserRating] = useState(0);
    const [quantities, setQuantities] = useState([]);
    const [dishRating, setDishRating] = useState([]);
    const [fontsLoaded] = useFonts({
        Inter_400Regular, Inter_600SemiBold});
    
    const getDishDetails = async () => {
        try {
            const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/dish/${dishId}`, {
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
    };
    const totalRatings = dishRating.length > 0 ? dishRating.reduce((sum, review) => 
        sum + parseInt(review.rating), 0) : 0;
    const overallRating = dishRating.length > 0 ? 
    Math.round(totalRatings / dishRating.length).toFixed(1) : 'No ratings yet';

    const getAdditionalIngredients = async () => {
        try {
            const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/dish/ingredients/${dishId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch additional ingredients');
            }
            const data = await response.json();
            setAdditionalIngredients(data);
            setQuantities(data.map(() => 0));
        } catch (error) {
            console.error(error);
        }
    };

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
    
    const handleIncrement = (index) => {
        const updatedQuantities = [...quantities];
        updatedQuantities[index] += 1;
        setQuantities(updatedQuantities);
    };

    const handleDecrement = (index) => {
        const updatedQuantities = [...quantities];
        if (updatedQuantities[index] > 0) {
            updatedQuantities[index] -= 1;
        }
        setQuantities(updatedQuantities);
    };

    useEffect(() => {
        getDishDetails();
        getDishReviews();
        getAdditionalIngredients();
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return <Text>Loading Fonts...</Text>;
    }
    const renderReview = ({ item }) => (
        <View style={styles.reviewContainer}>
            <View style={styles.reviewList}>             
                <Text style={styles.reviewName}>{item.full_name}</Text>
                <Text style={styles.reviewText}>{item.comment}</Text>
            </View>
        </View>
    );
    const renderItem = ({ item }) => {
        if (item.type === 'details') {
            return (
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
                    <Text style={styles.text2}>Steps</Text>
                    <Text style={styles.text3}>{dishDetails.steps}</Text>
                    <Text style={styles.text2}>Main Ingredients</Text>
                    <Text style={styles.text3}>{dishDetails.main_ingredients}</Text>
                    <Text style={styles.text2}>Additional Ingredients</Text>
                    <Text style={styles.text3}>Choose your preferred ingredients to add.</Text>
                    <View style={styles.ingredientList}>
                        {additionalIngredients.map((ingredient, index) => (
                            <View key={index} style={styles.ingredientContainer}>
                                <Text style={styles.ingredientText}>
                                    {ingredient.name} ({ingredient.cost}$)
                                </Text>
                                <View style={styles.controlsContainer}>
                                    <TouchableOpacity
                                        onPress={() => handleDecrement(index)}
                                        style={styles.controlButton}>
                                        <Text style={styles.controlText}>-</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.quantityText}>{quantities[index]}</Text>
                                    <TouchableOpacity
                                        onPress={() => handleIncrement(index)}
                                        style={styles.controlButton}>
                                        <Text style={styles.controlText}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                        <TouchableOpacity style={[styles.ingredientContainer, styles.comment]}>
                            <TextInput placeholder="Any special instructions?" style={styles.commentText}></TextInput>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.text2}>Reviews</Text>
                    <View style={[styles.flexColumn]}>
                        <View style={styles.addReview}>
                            <Text style={[styles.placeholder, styles.rate]}>Rate this dish</Text>
                            <UserRating userRating={userRating} setUserRating={setUserRating} />
                            </View>
                        <View style={styles.addReview}>
                            <TextInput placeholder="Add a review" style={styles.placeholder}></TextInput>
                            <Ionicons name="paper-plane" size={24} style={styles.sendIcon} />
                        </View>
                    </View>   
                </View>
            );
        } else if (item.type === 'review') {
            return renderReview({ item: item.review });
        }
        return null;};

    const flatListData = [
        { type: 'details' }, 
        ...dishRating.map(review => ({ type: 'review', review }))
    ];
    return (
        <FlatList
            data={flatListData} renderItem={renderItem} keyExtractor={(item, index) => index.toString()}/>
    );
}

export default DishScreen;

