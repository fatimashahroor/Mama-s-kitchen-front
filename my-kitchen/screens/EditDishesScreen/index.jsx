import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Keyboard, Modal, TextInput } from "react-native";
import styles from "./styles";
import SearchInput from "../../components/search/search";
import { Ionicons } from '@expo/vector-icons';
import { EXPO_PUBLIC_API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
const EditDishesScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [dishes, setDishes] = useState([]);
    const [error, setError] = useState(null);
    const [ModalVisible, setModalVisible] = useState(false);
    const [currentDish, setCurrentDish] = useState(null);
    const [availableOn, setAvailableOn] = useState('');
    const [dietType, setDietType] = useState('');
    const [currentImage, setCurrentImage] = useState(null);
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
            if (response.ok) {
                setDishes(data);
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError(error);
            console.error(error);
        }
    };

    const deleteDish = async () => {
        console.log("currentDish.id", currentDish.id);
        try {
            const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/dish/delete/${currentDish.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
                },
            });
            if (!response.ok) {
                throw new Error("Failed to delete dish");
            }
            setDishes(prevDishes => prevDishes.filter(dish => dish.id !== currentDish.id));
            getDishes();
        } catch (error) {
            setError(error);
            console.error(error);
        }
    }

    const handleDelete = (item) => {
        deleteDish(item);
    };

    const updateDish = async () => {
        const form = new FormData();
        form.append('name', currentDish.name);
        form.append('main_ingredients', currentDish.main_ingredients);
        form.append('steps', currentDish.steps);
        form.append('price', currentDish.price);
        form.append('available_on', availableOn);
        form.append('diet_type', dietType);
        form.append('duration', `${duration.hours}:${duration.minutes}:${duration.seconds}`);
        if (currentImage) {
            const uriParts = currentImage.split('.');
            const fileType = uriParts[uriParts.length - 1];
            form.append('photo', {
                uri: currentImage,
                name: `photo.${fileType}`, 
                type: `image/${fileType}`
            });
        }
        try {
            const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/dish/update/${currentDish.id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
                },
                body: form            
            });
            const data = await response.json();
            if (response.ok) {
                getDishes(data);
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError(error);
            console.error(error);
        }
    };
    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true, aspect: [4, 3], quality: 1,
        });
        if (!result.canceled) {
            setCurrentImage(result.assets[0].uri);
        }
    };
    const createDish = async () => {
        const chef = await AsyncStorage.getItem('user');
        const chefId = JSON.parse(chef).id;
        const form = new FormData();
        form.append('user_id', chefId);
        form.append('name', currentDish.name);
        form.append('main_ingredients', currentDish.main_ingredients);
        form.append('steps', currentDish.steps);
        form.append('price', currentDish.price);
        form.append('available_on', availableOn);
        form.append('diet_type', dietType);
        form.append('duration', `${duration.hours}:${duration.minutes}:${duration.seconds}`);  
        if (currentImage) {
            const uriParts = currentImage.split('.');
            const fileType = uriParts.pop();
            form.append('photo', {
                uri: currentImage,
                name: `photo.${fileType}`,
                type: `image/${fileType}`
            });
        }
        try {
            const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/dish/create`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
                },
                body: form
            })
            const data = await response.json();
            if (data) {
                getDishes(data);
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError(error);
            console.error(error);
        }
    }
    const filteredDishes = dishes.filter(dish => dish.name.toLowerCase().includes(searchQuery.toLowerCase()));
    useEffect(() => {
        getDishes();
    }, []);
    useEffect(() => {
        if (currentDish) {
            setAvailableOn(currentDish.available_on || '');
            setDietType(currentDish.diet_type || '');
            if (currentDish.duration) {
                const parts = currentDish.duration.split(':');
                setDuration({
                    hours: parts[0],
                    minutes: parts[1],
                    seconds: parts[2]
                });
            }
            if (currentDish.image_path)
                setCurrentImage(`${EXPO_PUBLIC_API_URL}/images/${currentDish.image_path}`);
        }
    }, [currentDish]);    
    const updateDuration = (value, field) => {
        if (!isNaN(value) && value >= 0) {
            if ((field === 'minutes' || field === 'seconds') && value < 60) {
                setDuration({ ...duration, [field]: value });
            } else if (field === 'hours') {
                setDuration({ ...duration, [field]: value });
            }
        }
    };
    return (
        <TouchableWithoutFeedback onPress={() => {{Keyboard.dismiss()}}}>
            <View style={styles.container}>
                <Text style={styles.text}>My Plates</Text>
                <TouchableOpacity activeOpacity={1} >
                    <SearchInput placeholder=" Search for your dishes" value={searchQuery} onChangeText={setSearchQuery}/>
                    <TouchableOpacity onPress={() => { setCurrentDish({name: '', main_ingredients: '', steps: '', price: '', image_path: '', diet_type: '', 
                                available_on: 'Daily'}); setModalVisible(true); setAvailableOn('Daily'); setCurrentImage(null); 
                                setModalVisible(true); setDuration({ hours: '00', minutes: '00', seconds: '00' });}}>
                        <Ionicons name='add-circle-outline' size={27} style={styles.menu} />
                    </TouchableOpacity>
                </TouchableOpacity>
                <View style={styles.scrollView}>
                    <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
                        <View style={styles.dishesContainer}>
                        {filteredDishes.length > 0 ? filteredDishes.map((item, index)=> (
                                    <View key={item.id || index} style={styles.dish}>
                                        <Image style={styles.image} 
                                            source={{ uri: `${EXPO_PUBLIC_API_URL}/images/${item.image_path}`}}/>
                                        <View style={[styles.flexColumn, styles.space]}>
                                            <Text style={styles.dishName}>{item.name} </Text>
                                            <Text style={styles.dishPrice}>{item.price + "$"}</Text>
                                            <TouchableOpacity onPressIn={() => { setCurrentDish(item); setModalVisible(true);}}>
                                                <Ionicons style={styles.editButton} name="create-outline" size={22}/>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => { setCurrentDish(item); handleDelete(currentDish); 
                                                setModalVisible(false)}}>
                                                <Ionicons style={styles.trash} name="trash" size={20} />
                                            </TouchableOpacity>
                                        </View>
                                    </View> 
                                )) : <Text style={styles.none}>No dishes found</Text>}
                        </View>
                    </ScrollView>
                </View>
                <Modal
                    animationType="slide" transparent={true} visible={ModalVisible}
                    onRequestClose={() => {setModalVisible(!ModalVisible); setCurrentDish(null); setDuration({ hours: '', minutes: '', seconds: '' });
                    setAvailableOn(''); setDietType(''); }}>
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
                                    style={styles.durationInput} placeholder="hrs" keyboardType="numeric"
                                    value={duration.hours}
                                    onChangeText={(text) => updateDuration(text, 'hours')}
                                />
                                <TextInput
                                    style={styles.durationInput} placeholder="mins" keyboardType="numeric"
                                    value={duration.minutes}
                                    onChangeText={(text) => updateDuration(text, 'minutes')}
                                />
                                <TextInput
                                    style={styles.durationInput} placeholder="secs" keyboardType="numeric"
                                    value={duration.seconds}
                                    onChangeText={(text) => updateDuration(text, 'seconds')}
                                />
                            </View>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={dietType} onValueChange={(itemValue) => setDietType(itemValue)}
                                    style={[styles.picker]}>
                                    <Picker.Item label="Vegan" value="Vegan" />
                                    <Picker.Item label="Veggie" value="Veggie" />
                                    <Picker.Item label="Animal-based" value="Animal-based" />
                                    <Picker.Item label="Gluten-free" value="Gluten-free" />
                                </Picker>
                            </View>
                            <View style={[styles.pickerContainer, styles.marginTop]}>
                                <Picker
                                    selectedValue={availableOn} onValueChange={(itemValue) => setAvailableOn(itemValue)}
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
                            <Image source={{ uri: currentImage }} style={styles.modalImage} />
                            <TouchableOpacity onPress={pickImage} style={styles.imagePickerIcon}>
                                <Ionicons name="camera" size={24} color="#B20530" />
                            </TouchableOpacity>
                            <View style={styles.flexRow}>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(!ModalVisible)}>
                                    <Text style={styles.textStyle}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={() => 
                                    {if (currentDish && currentDish.id) {updateDish();} else {createDish();}  setModalVisible(false);}}>
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