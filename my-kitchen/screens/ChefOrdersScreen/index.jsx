import React, { useState, useEffect } from "react";
import { View, ScrollView, Image , Text, FlatList, TouchableOpacity} from "react-native";
import styles from "./styles";
import { EXPO_PUBLIC_API_URL } from "@env";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChefTabs = () => {
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState('pending');
    const handlePending = () => setFilter('pending');    
    const handleCompleted = () => setFilter('completed');
    const getOrders = async () => {
        const user = await AsyncStorage.getItem('user');
        const userId = JSON.parse(user).id;
        try {
            const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/order/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
                    'Content-type' : 'application/json'
                }
            });
            const data = await response.json();
            if (data)
                return data;
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => { const fetchAndProcessOrders = async () => {
            const fetchedOrders = await getOrders();
            const ordersWithUsers = await getUsers(fetchedOrders);
            const ordersWithLocations = await getLocation(ordersWithUsers);
            setOrders(ordersWithLocations);
        };
        fetchAndProcessOrders();
    }, []);
    const getUsers = async (orders) => {
        const flattenedOrders = orders.flat();
        return Promise.all(flattenedOrders.map(async (order) => {
        try {
            const response = await fetch(`${ EXPO_PUBLIC_API_URL }/api/user/${order.user_id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
                    'Content-type' : 'application/json'
                }
            });
            const data = await response.json();
            if (data) {
                return order = { ...order, user_full_name: data.user.full_name, user_phone: data.user.phone };
            }
        } catch (error) {
            console.error(error);
            return order;
        }
    })); }
    const getLocation = async (orders) => {
        const flattenedOrders = orders.flat();
        return Promise.all(flattenedOrders.map(async (order) => {
            try {
                const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/location/${order.location_id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
                        'Content-type' : 'application/json'
                    }
                });
                const data = await response.json();
                if (data) {
                    return order = { ...order, location_city: data.location.city, location_region: data.location.region,
                        location_building: data.location.building, location_street: data.location.street, location_floor: data.location.floor_nb,
                        location_near: data.location.near };
                }
            } catch (error) {
                console.error(error);
                return order;
            }
        }))
    }
    const updateStatus = async (orderId) => {
            try {
                const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/order/update/${orderId}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
                        'Content-type' : 'application/json'
                    },
                    body: JSON.stringify({ status: 'completed' })
                });
                const data = await response.json();
                if (data) {
                    setOrders(orders.map(order => 
                        order.id === orderId ? {...order, status: 'completed'} : order
                    ));
                    alert('Order updated successfully!');
                }
            } catch (error) {
                console.error(error);
            }
        }
    const renderItem = ({ item }) => (
        <View style={styles.flexRow}>
            <View style={[styles.cards, {flex: 1}]}>
            {item.dishes.map(dish => (
                <View key={dish.id} style={[styles.flexRow, { marginBottom: 20 }]}>
                    <View style={{ width: 120 }}>
                        <Image 
                            source={{ uri: `${EXPO_PUBLIC_API_URL}/images/${dish.image_path}`}} 
                            style={styles.orderImage}/>
                        <Text style={styles.date}>Delivery time: {item.order_date}</Text>
                    </View>
                    <View style={{ flex: 1, marginLeft: -10 }}>
                        <Text style={styles.orderName}>{dish.name}</Text>
                        <Text style={styles.orderedBy}>Ordered by: {item.user_full_name}</Text>
                        <Text style={styles.quantity}>Quantity: {dish.quantity}</Text>
                        <Text style={styles.comment}>Comment: {dish.comment || 'No comments'}</Text>
                        <Text style={styles.ingredients}>Added ingredients: {
                            dish.additional_ingredients.map(ing => `${ing.name}: ${ing.quantity}`).join(', ') || 'none'
                        }</Text>
                        <Text style={styles.comment}>Location: {item.location_city}, {item.location_region}, {item.location_building} bldng, 
                             {item.location_street} str, {item.location_floor}th floor, {item.location_near}</Text>
                        <Text style={styles.comment}>Phone nb: {item.user_phone}</Text>
                    </View>
                    <TouchableOpacity  onPress={() => updateStatus(item.id)} disabled={item.status === 'completed'}
                        style={item.status === 'completed' ? styles.disabledButton : styles.enabledButton}>
                        <Ionicons name="checkmark-circle-outline" color={'#B20530'} size={24}/>
                    </TouchableOpacity>
                </View>
            ))}
            </View>
        </View>
    );
    return (
        <View style={styles.container}>
            <Text style={styles.text}>My Orders</Text>
            <View style={styles.flexRow}>
            <TouchableOpacity style={[styles.filterButton, filter === 'pending' ? styles.activeFilter : {}]} onPress={handlePending}>
                <Text style={styles.filterText}>Pending</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.filterButton, filter === 'completed' ? styles.activeFilter : {}]} onPress={handleCompleted}>
                <Text style={styles.filterText}>Completed</Text>
            </TouchableOpacity>
            </View>
            <FlatList
                data={orders.filter(order => order.status === filter)}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

export default ChefTabs;