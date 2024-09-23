import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDish, initiateDishes, updateDish , removeDish} from "../../utils/redux/dishesSlice";
import { View, Text, Image, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Keyboard, Modal, TextInput } from "react-native";
import styles from "./styles";
import SearchInput from "../../components/search/search";
import { Ionicons } from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { EXPO_PUBLIC_API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
const EditDishesScreen = () => {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');
    const dishes = useSelector(state => state.dishes.dishesList);
    const [ingredients, setIngredients] = useState([]); 
    const [ModalVisible, setModalVisible] = useState(false);
    const [currentDish, setCurrentDish] = useState({
        name: '', main_ingredients: '', steps: '', price: '', available_on: 'Daily', diet_type: '', duration: { hours: '00', minutes: '00', seconds: '00' }, 
        currentImage: '', diet_type: '', selectedIngredients: []});

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
            dispatch(initiateDishes(data));
        } catch (error) {
            throw new Error(error);
        }
    }

    const createDish = async (dish) => {
        const chef = await AsyncStorage.getItem('user');
        const chefId = JSON.parse(chef).id;
        let additionalIngsString = dish.additional_ings.join(',');
        let form = new FormData();
        form.append('user_id', chefId);
        form.append('name', dish.name);
        form.append('main_ingredients', dish.main_ingredients);
        form.append('steps', dish.steps);
        form.append('price', parseInt(dish.price));
        form.append('available_on', dish.available_on);
        form.append('diet_type', dish.diet_type);
        form.append(`additional_ings`, additionalIngsString);
        form.append('duration', dish.duration);
        if (dish.currentImage) {
            const uriParts = dish.currentImage.split('.');
            const fileType = uriParts[uriParts.length - 1];
            form.append('photo', {
                uri: dish.currentImage,
                name: `image.${fileType}`,
                type: `image/${fileType}`
            });
        }
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/dish/create`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
                body: form
            });
            dispatch(addDish( await response.json()));
        } catch (error) {
            console.log("Error parsing JSON or network error", error);
            getDishes();
        }
    };

    const editDish = async (dish) => {
        let form1 = new FormData();
        form1.append('name', dish.name);
        form1.append('main_ingredients', dish.main_ingredients);
        form1.append('steps', dish.steps);
        form1.append('price', parseInt(dish.price));
        form1.append('available_on', dish.available_on);
        form1.append('diet_type', dish.diet_type);
        form1.append('duration', dish.duration);
        if (dish.currentImage !== dishes.find( d => d.id === dish.id).image_path) {
            const uriParts = dish.currentImage.split('.');
            const fileType = uriParts[uriParts.length - 1];
            form1.append('photo', {
                uri: dish.currentImage,
                name: `image.${fileType}`, 
                type: `image/${fileType}`
            });
        }
        try {
            const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/dish/update/${dish.id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
                    'Accept': 'application/json',
                },
                body: form1
            });
            const data = await response.json();
            if (response.ok) {
                dispatch(updateDish(data));
                getDishes();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteDish = async (dishId) => {
        try {
            const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/dish/delete/${dishId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
                },
            });
            if (!response.ok) {
                throw new Error("Failed to delete dish");
            }
            const data = await response.json();
            dispatch(removeDish(dishId));
        } catch (error) {
            console.error(error);
        }
    };

    const getIngredients = async () => {
        const chef = await AsyncStorage.getItem('user');
        const chefId = JSON.parse(chef).id;
        try {
            const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/additional_ing/${chefId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            setIngredients(data);
        } catch (error) {
            throw new Error(error);
        }
    };

    useEffect(() => {
        getDishes();
        getIngredients();
    }, []);
    const handleDelete = (dishId) => {
        deleteDish(dishId);
    };

    const updateDuration = (field, value) => {
        setCurrentDish(dish => ({
            ...dish,
            duration: {... dish.duration, [field]: value}
        }));
    };
    const handleDishSelect = (dish) => {
        const timeDuration = dish.duration.split(":");
        setCurrentDish({
            ...dish,
            selectedIngredients: dish.additional_ings || [],
            currentImage: dish.image_path,
            duration: { hours: timeDuration[0], minutes: timeDuration[1], seconds: timeDuration[2] }
        });
        setModalVisible(true);
    };
    const toggleIngredientSelection = (id) => {
        setCurrentDish(prevDish => ({
            ...prevDish,
            selectedIngredients: prevDish.selectedIngredients.includes(id) ?
                prevDish.selectedIngredients.filter(item => item !== id) :
                [...prevDish.selectedIngredients, id]
        }));
    };
    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true, aspect: [4, 3], quality: 1,
        });
        if (!result.canceled) {
            setCurrentDish(dish => ({ ...dish, currentImage: result.assets[0].uri }));
        }
    };
    const filteredDishes = dishes.filter(dish => dish.name &&  dish.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const handleInputChange = (field, value) => {
        setCurrentDish(prev => ({ ...prev, [field]: value }));
    };
    const handleConfirm = () => { if (currentDish.id) {
        editDish({
            ...currentDish,
            duration: `${currentDish.duration.hours}:${currentDish.duration.minutes}:${currentDish.duration.seconds}`
        });
    } else {
        createDish({
            ...currentDish,
            duration: `${currentDish.duration.hours}:${currentDish.duration.minutes}:${currentDish.duration.seconds}`,
            additional_ings: currentDish.selectedIngredients
        });
    }; setModalVisible(false); 
        setCurrentDish({id: null, name: '', main_ingredients: '', steps: '', price: '', available_on: 'Daily', diet_type: '', 
            duration: { hours: '00', minutes: '00', seconds: '00' }, currentImage: '', selectedIngredients: []});};
    const handleCancel = () => {
        setModalVisible(false); setCurrentDish({id: null, name: '', main_ingredients: '', steps: '', price: '', available_on: 'Daily',
            diet_type: '', duration: { hours: '00', minutes: '00', seconds: '00' }, currentImage: '', selectedIngredients: []});};
    return (
        <TouchableWithoutFeedback onPress={() => {{Keyboard.dismiss()}}}>
            <View style={styles.container}>
                <Text style={styles.text}>My Plates</Text>
                <TouchableOpacity activeOpacity={1} >
                    <SearchInput placeholder=" Search for your dishes" value={searchQuery} onChangeText={setSearchQuery}
                        width={'72%'}/>
                    <TouchableOpacity onPress={() => { setCurrentDish({name: '', main_ingredients: '', steps: '', price: '', currentImage: '', diet_type: '', 
                                available_on: 'Daily', selectedIngredients: [], duration: { hours: '00', minutes: '00', seconds: '00' }}); setModalVisible(true);}}>
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
                                            <View style={styles.editButton} >
                                            <TouchableOpacity onPressIn={() => { setCurrentDish(item); setModalVisible(true); 
                                                handleDishSelect(item)}}>
                                                <Ionicons name="create-outline" size={17}/>
                                            </TouchableOpacity>
                                            </View>
                                            <TouchableOpacity onPress={() => {handleDelete(item.id); setModalVisible(false);}}>
                                                <Ionicons style={styles.trash} name="trash" size={17} />
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
                                    value={currentDish.duration.hours}  onChangeText={(text) => updateDuration('hours', text)}/>
                                <TextInput
                                    style={styles.durationInput} placeholder="mins" keyboardType="numeric"
                                    value={currentDish.duration.minutes} onChangeText={(text) => updateDuration('minutes', text)}/>
                                <TextInput
                                    style={styles.durationInput} placeholder="secs" keyboardType="numeric"
                                    value={currentDish.duration.seconds} onChangeText={(text) => updateDuration('seconds', text)}/>
                            </View>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={currentDish.diet_type} onValueChange={(itemValue) => setCurrentDish({...currentDish, diet_type: itemValue})}
                                    style={[styles.picker]}>
                                    <Picker.Item label="Vegan" value="Vegan" />
                                    <Picker.Item label="Veggie" value="Veggie" />
                                    <Picker.Item label="Animal-based" value="Animal-based" />
                                    <Picker.Item label="Gluten-free" value="Gluten-free" />
                                </Picker>
                            </View>
                            <View style={[styles.pickerContainer, styles.marginTop]}>
                                <Picker
                                    selectedValue={currentDish.available_on} onValueChange={(itemValue) => setCurrentDish({...currentDish, available_on: itemValue})}
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
                            {!currentDish.id ? (
                                <View style={[styles.checkbox, styles.marginTop]}>
                                <Text style={styles.checkboxLabel}>Choose additional ingredients:</Text>
                                {ingredients.length > 0 ? (ingredients.map(ingredient => (
                                        <TouchableOpacity key={ingredient.id} style={styles.checkboxContainer}
                                            onPress={() => toggleIngredientSelection(ingredient.id)}>
                                            <View style={currentDish.selectedIngredients.includes(ingredient.id) ? 
                                            styles.checkboxSelected : styles.checkboxUnselected} />
                                            <Text style={styles.checkboxLabel}>{ingredient.name}</Text>
                                        </TouchableOpacity>
                                    ))
                                ) : (
                                    <Text>No ingredients found</Text>
                                )}
                                </View>   
                            ): null}
                            {currentDish.id && currentDish.currentImage === dishes.find( d => d.id === currentDish.id).image_path? (
                            <Image
                                source={{ uri: `${EXPO_PUBLIC_API_URL}/images/${currentDish.currentImage}` }}
                                style={styles.modalImage}
                            />
                            ) : currentDish.currentImage ? (
                            <Image
                                source={{ uri: `${currentDish.currentImage}` }}
                                style={styles.modalImage}
                            />
                            ) : (
                            <View style={{ width: '100%', height: 100, backgroundColor: 'white' }} />
                            )}
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
