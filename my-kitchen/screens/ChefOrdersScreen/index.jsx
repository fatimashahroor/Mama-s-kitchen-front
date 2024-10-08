import React, { useState, useEffect } from "react";
import { View, Image , Text, FlatList, TouchableOpacity} from "react-native";
import styles from "./styles";
import { EXPO_PUBLIC_API_URL } from "@env";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChefOrdersScreen = () => {
    const [orders, setOrders] = useState([]);
    const [parsedUser, setParsedUser] = useState(null);
    const [filter, setFilter] = useState('pending');
    const handlePending = () => setFilter('pending');    
    const handleCompleted = () => setFilter('completed');
    const getOrders = async () => {
        try {
            const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/order`, {
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
            console.log(error);
        }
    }
   
    useEffect(() => { const fetchAndProcessOrders = async () => {
            const fetchedOrders = await getOrders();
            const ordersWithUsers = await getUsers(fetchedOrders);
            const ordersWithLocations = await getLocation(ordersWithUsers);
            const user = await AsyncStorage.getItem('user');
            setParsedUser(JSON.parse(user));
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
            console.log(error);
            return order;
        }
    })); }
    const getLocation = async (orders) => {
        const flattenedOrders = orders.flat();
        return Promise.all(flattenedOrders.map(async (order) => {
            try {
                const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/user/location/${order.location_id}`, {
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
                console.log(error);
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
                        order.order_id === orderId ? {...order, order_status: 'completed'} : order
                    ));
                    alert('Order updated successfully!');
                }
            } catch (error) {
                console.log(error);
            }
        }
    const renderItem = ({ item }) => 
        (
        <View style={styles.flexRow}>
            <View style={[styles.cards, {flex: 1}]}>
            {item.dishes.map(dish => (
                <View key={dish.id} style={[styles.flexRow, { marginBottom: 20 }]}>
                    <View style={{ width: 120 }}>
                        <Image 
                            source={{ uri: `${EXPO_PUBLIC_API_URL}/images/${dish.image_path}`}} 
                            style={styles.orderImage}/>
                    </View>
                    <View style={{ flex: 1, marginLeft: -10 }}>
                        <Text style={styles.orderName}>{dish.name}</Text>
                        {parsedUser.roles === 3 && (
                        <Text style={styles.orderedBy}>Ordered by: {item.user_full_name}</Text>
                        )}
                        <Text style={styles.quantity}>Quantity: {dish.quantity}</Text>
                        <Text style={styles.comment}>Comment: {dish.comment || 'No comments'}</Text>
                        <Text style={styles.ingredients}>Added ingredients: {
                            dish.additional_ings.map(ing => `${ing.name}: ${ing.quantity}`).join(', ') || 'none'
                        }</Text>
                    </View>
                </View>
            ))}
            <Text style={styles.date}>Delivery time: {item.order_date}</Text>
            <Text style={styles.comment}>Location: {item.location_city}, {item.location_region}, {item.location_building} bldng, 
                    {item.location_street} str, {item.location_floor}th floor, {item.location_near}</Text>
            {parsedUser.roles[0] === 2 &&
            <Text style={styles.comment}>Phone nb: {item.user_phone}</Text>}
            {parsedUser.roles[0] === 2 &&
            <TouchableOpacity  onPress={() => updateStatus(item.order_id)} disabled={item.order_status === 'completed'}
                style={item.order_status === 'completed' ? styles.disabledButton : styles.enabledButton}>
                <Ionicons name="checkmark-circle-outline" color={'#B20530'} size={24}/>
            </TouchableOpacity>
            }   
            </View>
        </View>
    );
    const filteredOrders = orders.filter(order => order.order_status === filter);
    return (
        <View style={styles.container}>
            <Text style={styles.text}>My Orders</Text>
            <View style={styles.flexRow}>
            <TouchableOpacity style={[styles.filterButton]} onPress={handlePending}>
                <Text style={styles.filterText}>Pending</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.filterButton]} onPress={handleCompleted}>
                <Text style={styles.filterText}>Completed</Text>
            </TouchableOpacity>
            </View>
            {filteredOrders.length > 0 ? (
                <FlatList
                    data={filteredOrders}
                    renderItem={renderItem}
                    keyExtractor={item => item.order_id.toString()}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <Text style={styles.noOrdersText}>No {filter} orders</Text>
            )}
        </View>
    );
}

export default ChefOrdersScreen;