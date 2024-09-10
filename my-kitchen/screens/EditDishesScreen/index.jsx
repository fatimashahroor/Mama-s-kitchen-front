import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Keyboard, Modal, TextInput } from "react-native";
import styles from "./styles";
import SearchInput from "../../components/search/search";
import { Ionicons } from '@expo/vector-icons';
import { EXPO_PUBLIC_API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';

const EditDishesScreen = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [dishes, setDishes] = useState([]);
    const [error, setError] = useState(null);
    const [ModalVisible, setModalVisible] = useState(false);
    const [currentDish, setCurrentDish] = useState(null);
    const [availableOn, setAvailableOn] = useState('');
    const [duration, setDuration] = useState({
        hours: '', minutes: '', seconds: ''});
    const getDishes = async () => {
        const chef = await AsyncStorage.getItem('user');
        const chefId = JSON.parse(chef).id;
        try {
            const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/dishes/${chefId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                setDishes(data);
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
    useEffect(() => {
        if (currentDish) {
            setAvailableOn(currentDish.available_on || '');
            if (currentDish.duration) {
                const parts = currentDish.duration.split(':');
                setDuration({
                    hours: parts[0],
                    minutes: parts[1],
                    seconds: parts[2]
                });
            } else {
                setDuration({ hours: '', minutes: '', seconds: '' });
            }
        }
    }, [currentDish]);    
    
    return (
        <TouchableWithoutFeedback onPress={() => {setMenuVisible(false); {Keyboard.dismiss()}}}>
            <View style={styles.container}>
                <Text style={styles.text}>My Plates</Text>
                <TouchableOpacity activeOpacity={1} >
                    <SearchInput placeholder=" Search for your dishes" value={searchQuery} onChangeText={setSearchQuery}/>
                    <TouchableOpacity onPress={() => { setCurrentDish(item); setModalVisible(true); }}>
                        <Ionicons name='add-circle-outline' size={27} style={styles.menu} />
                    </TouchableOpacity>
                    {menuVisible && (
                        <View style={styles.dropdownMenu}>
                            <TouchableOpacity onPress={() => {setModalVisible(true); setMenuVisible(!menuVisible)}} >
                                <Text style={styles.dropdownItem}>Create dish</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </TouchableOpacity>
                <View style={styles.scrollView}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={styles.dishesContainer}>
                        {filteredDishes.length > 0 ? filteredDishes.map((item, index)=> (
                                    <View key={item.id || index} style={styles.dish}>
                                        <Image style={styles.image} 
                                            source={{ uri: `${EXPO_PUBLIC_API_URL}/images/${item.image_path}`}}/>
                                        <View style={[styles.flexColumn, styles.space]}>
                                            <Text style={styles.dishName}>{item.name} </Text>
                                            <Text style={styles.dishPrice}>{item.price + "$"}</Text>
                                            <TouchableOpacity onPress={() => { setCurrentDish(item); setModalVisible(true); }}>
                                                <Ionicons style={styles.editButton} name="create-outline" size={22}/>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => { setCurrentDish(item); setModalVisible(true); }}>
                                                <Ionicons style={styles.trash} name="trash" size={20} />
                                            </TouchableOpacity>
                                        </View>
                                    </View> 
                                )) : <Text style={styles.none}>No dishes found</Text>}
                        </View>
                        {error && <Text style={styles.none}>{error}</Text>}
                    </ScrollView>
                </View>
                <Modal
                    animationType="slide" transparent={true} visible={ModalVisible}
                    onRequestClose={() => {setModalVisible(!ModalVisible); setCurrentDish(null); setDuration({ hours: '', minutes: '', seconds: '' });
                    setAvailableOn('');}}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TextInput style={styles.modalText} placeholder="Plate's Name" value={currentDish ? currentDish.name : ''}
                                onChangeText={(text) => setCurrentDish({...currentDish, name: text})}/>
                            <TextInput style={styles.modalText} placeholder="Price" value={currentDish ? String(currentDish.price) : ''}
                                onChangeText={(text) => setCurrentDish({...currentDish, price: text})}/>
                            <TextInput style={styles.modalText} placeholder="Main ingredients" value={currentDish ? String(currentDish.main_ingredients) : ''}
                                onChangeText={(text) => setCurrentDish({...currentDish, main_ingredients: text})}/>
                            <TextInput style={styles.modalText} placeholder="Steps" optional value={currentDish ? String(currentDish.steps) : ''}
                                onChangeText={(text) => setCurrentDish({...currentDish, steps: text})}/>
                            <View style={[styles.modalText, styles.durationContainer]}>
                                <Text style={styles.text1}>Duration:</Text>
                                <TextInput
                                    style={styles.durationInput} placeholder="hrs" keyboardType="numeric" value={duration.hours}
                                    onChangeText={(text) => setDuration({...duration, hours: text})}/>
                                <Text>:</Text>
                                <TextInput
                                    style={styles.durationInput} placeholder="mins" keyboardType="numeric"
                                    value={duration.minutes} onChangeText={(text) => setDuration({...duration, minutes: text})}/>
                                <Text>:</Text>
                                <TextInput
                                    style={styles.durationInput} placeholder="secs" keyboardType="numeric"
                                    value={duration.seconds} onChangeText={(text) => setDuration({...duration, seconds: text})}/>
                            </View>
                            <TextInput style={styles.modalText} placeholder="Diet type" value={currentDish ? String(currentDish.diet_type) : ''}
                                onChangeText={(text) => setCurrentDish({...currentDish, diet_type: text})}/>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={availableOn} onValueChange={(itemValue, itemIndex) => setAvailableOn(itemValue)}
                                    style={[styles.picker]}>
                                    <Picker.Item label="Daily" value="Daily" />
                                    <Picker.Item label="Monday" value="Monday" />
                                    <Picker.Item label="Tuesday" value="Tuesday" />
                                    <Picker.Item label="Wednesday" value="Wednesday" />
                                    <Picker.Item label="Thursday" value="Thursday" />
                                    <Picker.Item label="Friday" value="Friday" />
                                    <Picker.Item label="Saturday" value="Saturday" />
                                    <Picker.Item label="Sunday" value="Sunday" />
                                </Picker>
                            </View>
                            <Ionicons color='#B20503' name='image' size={100}></Ionicons>
                            <View style={styles.flexRow}>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(!ModalVisible)}>
                                    <Text style={styles.textStyle}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(!ModalVisible)}>
                                    <Text style={styles.textStyle}>Confirm</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default EditDishesScreen;