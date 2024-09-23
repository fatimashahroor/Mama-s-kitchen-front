import React, { useState , useEffect} from "react";
import { View, Text, TouchableOpacity, Modal, TextInput, FlatList, Alert } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EXPO_PUBLIC_API_URL } from "@env";
import { useDispatch } from "react-redux";
import { emptyingCart } from "../../utils/redux/cartSlice";
const CheckoutScreen = ({route, navigation}) => {
    const { cart } = route.params;
    const dispatch = useDispatch();
    const [isChecked, setIsChecked] = useState(false);
    const [selectedLocationId, setSelectedLocationId] = useState(null);
    const [locations, setLocations] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [displayDate, setDisplayDate] = useState("");
    const [apiDate, setApiDate] = useState(""); 
    const [newlocation, setNewLocation] = useState({
        city: '', region: '', street: '', building: '', floor_nb: '',
        near: ''});
    const toggleCheckbox = () => {
        setIsChecked(!isChecked);
    };
    const ordersMap = {};
    cart.forEach(dish => {
        const cook_id = dish.user.id;
        if (!ordersMap[cook_id]) {
            ordersMap[cook_id] = {
                cook_id: cook_id,
                order_price: 0,
                dishes: []
            };
        }
        let tmpDish = {};
            tmpDish = {
                dish_id: dish.id,
                quantity: dish.quantity,
                comment: dish.comment || null,
                price : dish.price,
                additional_ings: dish.additional_ings || []
             }          
        ordersMap[cook_id].dishes.push(tmpDish);
        ordersMap[cook_id].order_price = ordersMap[cook_id].dishes.reduce((acc, dish) => {
            dishTotal = parseFloat(dish.price * dish.quantity);
            if (dish.additional_ings) {
                const additionalCost = dish.additional_ings.reduce((addAcc, add) => {
                    return addAcc + parseFloat(add.quantity * add.cost);
                }, 0);
        
                dishTotal += additionalCost;
            }
        
            return acc + dishTotal;
        }, 0);
    });
    const orders = Object.keys(ordersMap).map(cook_id => ordersMap[cook_id]);
    const createOrder = async () => {
        const user = await AsyncStorage.getItem("user");
        const parsedUser = JSON.parse(user);
        const token = await AsyncStorage.getItem("token");

        try {
            const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/order/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    user_id: parsedUser.id,
                    status: "pending",
                    order_date: apiDate,
                    location_id: selectedLocationId,
                    orders: orders    
                }),
            });
            const data = await response.json();
            if(!response.ok) {
                throw new Error(data.errors);
            }
            alert("Order created successfully");
            setTimeout(() => {
                navigation.navigate('CustomerTabs', { screen: 'Home' });
            }, 1000);
            dispatch(emptyingCart());
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0'); 
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        setApiDate(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);
        setDisplayDate(`${day}-${month}-${year} ${hours}:${minutes}:${seconds}`);
    };
    
    const onDateChange = (event, selectedDate) => {
        setShowDatePicker(false);  
    if (event.type == "set" && selectedDate) {
        const currentDate = new Date(selectedDate);  
        setDate(currentDate);
        setShowTimePicker(true);  
    } else {
        setShowDatePicker(false);
    } 
    };

    const onTimeChange = (event, selectedTime) => {
        setShowTimePicker(false);
        if (event.type == "set") {
            const currentTime = selectedTime || date;
            setShowTimePicker(false); 
            const updatedDate = new Date(date.setHours(currentTime.getHours(), currentTime.getMinutes()));
            formatDate(updatedDate);
        } else {
            setShowTimePicker(false);
        }
    };
    const addLocation = async () => {
        const user = await AsyncStorage.getItem("user");
        const parsedUser = JSON.parse(user).id;
        const token = await AsyncStorage.getItem("token");
        try {
            const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/location/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ ...newlocation, user_id: parsedUser }), 
            });
            const data = await response.json();
            if (data) {
                setLocations([...locations, data.location]);
                setNewLocation({ city: '', region: '', street: '', building: '', floor_nb: '', near: '' });
                setSelectedLocationId(data.location.id);
            } 
        } catch (error) {
            console.error(error);
        }
    };
    const getUserLocation = async () => {
        const user = await AsyncStorage.getItem("user");
        const parsedUser = JSON.parse(user).id;
        const token = await AsyncStorage.getItem("token");
        try {
            const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/location/${parsedUser}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (data) {
                setLocations(data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getUserLocation();
    },[]);
    const resetModalState = () => {
        setModalVisible(false);
        addLocation();
    };
    const toggleLocationSelection = (id) => {
        setSelectedLocationId(prevSelectedId => {
            if (prevSelectedId == id) {
                return null;
            } else {
                return id;
            }
        });
    };
    const handleLocationChange = (fieldName) => (text) => {
        setNewLocation(prevState => ({
            ...prevState,
            [fieldName]: text
        }));
    };
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Checkout</Text>
            <Text style={styles.text2}>Select Order Date and Location</Text>
            <FlatList data={locations} keyExtractor={item => item.id.toString()}
                ListHeaderComponent={
                    <>
                        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                            <View>
                                <TextInput placeholder="Select Order Date"
                                    style={styles.date} value={displayDate}
                                    editable={false} />
                                <Ionicons name="calendar-outline" size={20} color="#FFD21C" style={styles.icon} />
                            </View>
                        </TouchableOpacity>
                        {showDatePicker && (
                            <DateTimePicker value={date} mode="date" display="default" onChange={onDateChange}/>
                        )}
                        {showTimePicker && (
                            <DateTimePicker value={date} mode="time" display="default" onChange={onTimeChange}/>
                        )}
                        <TouchableOpacity onPress={() => {setModalVisible(true)}}>
                            <Ionicons name="add-circle-outline" size={20} color="#B20530" style={styles.add} />
                        </TouchableOpacity>
                    </>}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[styles.locationItem, selectedLocationId == item.id ? styles.selectedLocation : styles.unselectedLocation]}
                        onPress={() => toggleLocationSelection(item.id)}>
                        <Text style={styles.locationText}>{` ${item.city}, ${item.region}, ${item.street} street, ${item.building} bldg, ${item.floor_nb} th floor, near ${item.near}`}</Text>
                        {selectedLocationId == item.id && (
                            <Ionicons name="checkmark-circle" size={24} color="#B20530" />
                        )}
                    </TouchableOpacity>
                )}
                ListFooterComponent={
                    <View>
                        <View style={styles.paymentContainer}>
                            <Text style={styles.paymentText}>Payment Method</Text>
                            <TouchableOpacity onPress={toggleCheckbox} style={styles.payment}>
                                <View style={[styles.checkbox, isChecked ? styles.checked : null]}>
                                {isChecked && <Text style={styles.checkmark}>✓</Text>}
                                </View>
                                <Text style={styles.label}>Cash on delivery</Text>
                            </TouchableOpacity>
                        </View> 
                        <TouchableOpacity onPress={() => createOrder()} style={styles.addLocationButton}>
                            <Text style={styles.addLocationText}>Place Order</Text>
                        </TouchableOpacity>
                    </View>
                }/>
            <Modal
                animationType="slide" transparent={true}
                visible={modalVisible} onRequestClose={resetModalState}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TextInput style={styles.modalText} placeholder="City" value={newlocation.city} onChangeText={handleLocationChange('city')}/>
                        <TextInput style={styles.modalText} placeholder="Region" value={newlocation.region} onChangeText={handleLocationChange('region')}/>
                        <TextInput style={styles.modalText} placeholder="Street" value={newlocation.street} onChangeText={handleLocationChange('street')}/>
                        <TextInput style={styles.modalText} placeholder="Building" value={newlocation.building} onChangeText={handleLocationChange('building')}/>
                        <TextInput style={styles.modalText} placeholder="Floor number" value= {newlocation.floor_nb} onChangeText={handleLocationChange('floor_nb')}/>
                        <TextInput style={styles.modalText} placeholder="Near somewhere famous" value={newlocation.near} onChangeText={handleLocationChange('near')}/>
                        <View style={styles.flexRow}>
                            <TouchableOpacity style={[styles.button, styles.buttonClose]}
                                onPress={() => {setModalVisible(false); setNewLocation({ city: '', region: '', street: '', building: '', floor_nb: '', near: '' });}}>
                                <Text style={[styles.textStyle]}>Close</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={() => resetModalState()}>
                                <Text style={[styles.textStyle]}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};


export default CheckoutScreen;