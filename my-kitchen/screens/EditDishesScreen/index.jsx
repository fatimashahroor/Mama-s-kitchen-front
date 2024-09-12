import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDish, getDishes, updateDish , deleteDish} from "../../components/store/actions/dishActions";
import { getIngredients } from "../../components/store/actions/ingredientsActions";
import { View, Text, Image, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Keyboard, Modal, TextInput } from "react-native";
import styles from "./styles";
import SearchInput from "../../components/search/search";
import { Ionicons } from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { EXPO_PUBLIC_API_URL } from '@env';
const EditDishesScreen = () => {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');
    let { dishes } = useSelector(state => state.dishes);
    let {ingredients} = useSelector(state => state.ingredients);
    const [ModalVisible, setModalVisible] = useState(false);
    const [currentDish, setCurrentDish] = useState({
        name: '', main_ingredients: '', steps: '', price: '', available_on: 'Daily', diet_type: '', duration: { hours: '00', minutes: '00', seconds: '00' }, 
        currentImage: '', diet_type: '', selectedIngredients: []});
    useEffect(() => {
        dispatch(getDishes());
    }, []);

    useEffect(() => {
        dispatch(getIngredients());
    }, []);
    const handleDelete = (dishId) => {
        dispatch(deleteDish(dishId));};

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
    const filteredDishes = dishes.filter(dish => dish.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const handleInputChange = (field, value) => {
        setCurrentDish(prev => ({ ...prev, [field]: value }));
    };
    const handleConfirm = () => { if (currentDish.id) {
        dispatch(updateDish({
            ...currentDish,
            duration: `${currentDish.duration.hours}:${currentDish.duration.minutes}:${currentDish.duration.seconds}`,
            additional_ings: currentDish.selectedIngredients
        }));
    } else {
        dispatch(addDish({
            ...currentDish,
            duration: `${currentDish.duration.hours}:${currentDish.duration.minutes}:${currentDish.duration.seconds}`,
            additional_ings: currentDish.selectedIngredients
        }));
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
                    <SearchInput placeholder=" Search for your dishes" value={searchQuery} onChangeText={setSearchQuery}/>
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
                            <Image source={{ uri: `${EXPO_PUBLIC_API_URL}/images/${currentDish.currentImage}` }} style={styles.modalImage} />
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