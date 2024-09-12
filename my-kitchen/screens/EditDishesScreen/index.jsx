import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDish, getDishes, updateDish , deleteDish} from "../../components/store/actions/dishActions";
import { View, Text, Image, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Keyboard, Modal, TextInput } from "react-native";
import styles from "./styles";
import SearchInput from "../../components/search/search";
import { Ionicons } from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
const EditDishesScreen = () => {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');
    const { dishes } = useSelector(state => state.dishes);
    const [ModalVisible, setModalVisible] = useState(false);
    const [currentDish, setCurrentDish] = useState({
        name: '', main_ingredients: '', steps: '', price: '', available_on: 'Daily', diet_type: '', duration: { hours: '00', minutes: '30', seconds: '00' }, 
        currentImage: null, diet_type: '', additional_ings: []});

    useEffect(() => {
        dispatch(getDishes());
    }, [dispatch]);
    const handleDelete = (dishId) => {
        dispatch(deleteDish(dishId));};

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
            if (response.ok) {
                const data = await response.json(); 
                getDishes();
            } else {
                console.log("Non-200 response", await response.text());
            }
        } catch (error) {
            setError(error);
        }
    };
    const updateDuration = (field, value) => {
        setCurrentDish(prev => ({
            ...prev,
            duration: { ...prev.duration, [field]: value }
        }));
    };
    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true, aspect: [4, 3], quality: 1,
        });
        if (!result.canceled) {
            setCurrentImage(prev => ({...prev, currentImage: result.assets[0].uri}));
        }
    };
    const filteredDishes = dishes.filter(dish => dish.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const handleInputChange = (field, value) => {
        setCurrentDish(prev => ({ ...prev, [field]: value }));
    };
    const handleConfirm = () => { if (currentDish.id) { updateDish(currentDish);
        } else  dispatch(addDish(currentDish));
        setModalVisible(false); setCurrentDish({id: null, name: '', main_ingredients: '', steps: '', price: '', available_on: 'Daily',
            diet_type: '', duration: { hours: '00', minutes: '30', seconds: '00' }, currentImage: null, additional_ings: []});};

    const handleCancel = () => {
        setModalVisible(false); setCurrentDish({id: null, name: '', main_ingredients: '', steps: '', price: '', available_on: 'Daily',
            diet_type: '', duration: { hours: '00', minutes: '30', seconds: '00' }, currentImage: null, additional_ings: []});};
    return (
        <TouchableWithoutFeedback onPress={() => {{Keyboard.dismiss()}}}>
            <View style={styles.container}>
                <Text style={styles.text}>My Plates</Text>
                <TouchableOpacity activeOpacity={1} >
                    <SearchInput placeholder=" Search for your dishes" value={searchQuery} onChangeText={setSearchQuery}/>
                    <TouchableOpacity onPress={() => { setCurrentDish({name: '', main_ingredients: '', steps: '', price: '', image_path: '', diet_type: '', 
                                available_on: 'Daily', additional_ings: [], duration: '00:30:00'}); setModalVisible(true);}}>
                        <Ionicons name='add-circle-outline' size={27} style={styles.menu} />
                    </TouchableOpacity>
                </TouchableOpacity>
                <View style={styles.scrollView}>
                    <ScrollView vertical={true} showsVerticalScrollIndicator={true}>
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
                                            <TouchableOpacity onPress={() => {handleDelete(item.id);}}>
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
                    onRequestClose={() => {setModalVisible(!ModalVisible); setCurrentDish(null);}}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TextInput style={styles.modalText} placeholder="Plate's Name" value={currentDish.name}
                                onChangeText={(text) => handleInputChange('name', text)}/>
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
                                    value={currentDish.duration.hours}  onChangeText={(text) => updateDuration(text, 'hours')}/>
                                <TextInput
                                    style={styles.durationInput} placeholder="mins" keyboardType="numeric"
                                    value={currentDish.duration.minutes} onChangeText={(text) => updateDuration(text, 'minutes')}/>
                                <TextInput
                                    style={styles.durationInput} placeholder="secs" keyboardType="numeric"
                                    value={currentDish.duration.seconds} onChangeText={(text) => updateDuration(text, 'seconds')}/>
                            </View>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={currentDish.diet_type} onValueChange={(itemValue) => setDietType(itemValue)}
                                    style={[styles.picker]}>
                                    <Picker.Item label="Vegan" value="Vegan" />
                                    <Picker.Item label="Veggie" value="Veggie" />
                                    <Picker.Item label="Animal-based" value="Animal-based" />
                                    <Picker.Item label="Gluten-free" value="Gluten-free" />
                                </Picker>
                            </View>
                            <View style={[styles.pickerContainer, styles.marginTop]}>
                                <Picker
                                    selectedValue={currentDish.available_on} onValueChange={(itemValue) => setAvailableOn(itemValue)}
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
                            {/* <View style={[styles.pickerContainer, styles.marginTop]}>
                                <Picker
                                    selectedValue={currentDish.additional_ings} onValueChange={(itemValue) => setAdditionalIngs(itemValue)}
                                    style={[styles.picker]}>
                                    {AdditionalIngs.map((ingredient) => (
                                        <Picker.Item key={ingredient} label={ingredient.name} value={ingredient.id}/>
                                    ))}
                                </Picker>
                            </View> */}
                            <Image source={{ uri: currentDish.currentImage }} style={styles.modalImage} />
                            <TouchableOpacity onPress={pickImage} style={styles.imagePickerIcon}>
                                <Ionicons name="camera" size={24} color="#B20530" />
                            </TouchableOpacity>
                            <View style={styles.flexRow}>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonClose]} onPress={() => handleCancel()}>
                                    <Text style={styles.textStyle}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={() => handleConfirm()}>
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