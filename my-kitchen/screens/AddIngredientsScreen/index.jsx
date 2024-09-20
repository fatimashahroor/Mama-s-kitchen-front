import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Modal, TextInput, ScrollView } from "react-native";
import styles from "./styles";
import SearchInput from "../../components/search/search";
import { Ionicons } from '@expo/vector-icons';
import { EXPO_PUBLIC_API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddIngredientsScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [ModalVisible, setModalVisible] = useState(false);
    const [currentIngredient, setCurrentIngredient] = useState(null);
    const getIngredients = async () => {
        const chef = await AsyncStorage.getItem('user');
        const chefId = JSON.parse(chef).id;
        try{
            const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/additional_ing/${chefId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            
            if (response.ok) {
                setIngredients(data);
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError(error);
            console.error(error);
        }
    };

    const createIngredient = async () => {
        const chef = await AsyncStorage.getItem('user');
        const chefId = JSON.parse(chef).id;
        try {
            const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/additional_ing/create/${chefId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
                },
                body: JSON.stringify({name: currentIngredient.name, cost: currentIngredient.cost})
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error("Failed to create ingredient");
            }
            getIngredients();
        } catch (error) {
            setError(error);
        }
    }

    const deleteIngredient = async () => {
        try {
            const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/additional_ing/delete/${currentIngredient.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
                }
            });
            if (!response.ok) {
                throw new Error("Failed to delete ingredient");
            }
            getIngredients();
        } catch (error) {
            setError(error);
        }
    }

    const updateIngredient = async () => {
        try {
            const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/additional_ing/update/${currentIngredient.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
                },
                body: JSON.stringify({name: currentIngredient.name, cost: currentIngredient.cost})
            });
            const data = await response.json();
            console.log(response);
            if (!response.ok) {
                throw new Error("Failed to update ingredient");
            }
            getIngredients();
        } catch (error) {
            setError(error);
        }
    }
    useEffect(() => {
        getIngredients();
    }, []);
    const filteredIngredients = ingredients.filter(ingredient => ingredient.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return (
        <TouchableWithoutFeedback onPress={() => {{Keyboard.dismiss()}}}>
            <View style={styles.container}>
                <Text style={styles.text}>My Ingredients</Text>
                <TouchableOpacity activeOpacity={1} >
                    <SearchInput placeholder="Search for your ingredients" value={searchQuery} 
                    onChangeText={setSearchQuery} width={'72%'}/>
                    <TouchableOpacity onPress={() => {setModalVisible(true); setCurrentIngredient({name : '', cost: ''})}}>
                        <Ionicons name='add-circle-outline' size={27} style={styles.menu} />
                    </TouchableOpacity>
                </TouchableOpacity>
                <View style={styles.scrollView}>
                    <ScrollView vertical={true} showsVerticalScrollIndicator={true}>
                        <View style={styles.IngContainer}>
                        {filteredIngredients.length > 0 ? filteredIngredients.map((item, index)=> (
                                    <View key={item.id || index} style={styles.ing}>
                                        <View style={[styles.flexRow, styles.space]}>
                                            <TextInput style={styles.name}>{item.name}</TextInput>
                                            <TextInput style={styles.cost}>{item.cost + "$"}</TextInput>
                                            <TouchableOpacity onPress={() => {setModalVisible(true); setCurrentIngredient(item)}}>
                                                <Ionicons style={styles.editButton} name="create-outline" size={20}/>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => {setModalVisible(false); setCurrentIngredient(item); deleteIngredient()}}>
                                                <Ionicons style={styles.trash} name="trash" size={20}/>
                                            </TouchableOpacity>
                                        </View>
                                    </View> 
                                )) : <Text style={styles.none}>No additional ingredients found</Text>}
                        </View>
                    </ScrollView>
                </View>
                <Modal
                    animationType="slide" transparent={true} visible={ModalVisible}
                    onRequestClose={() => {setModalVisible(!ModalVisible); setCurrentIngredient(null)}}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TextInput style={styles.modalText} placeholder="Ingredient name" value={ currentIngredient ? String(currentIngredient.name) : ''}
                            onChangeText={text => setCurrentIngredient({...currentIngredient, name: text})}/>
                            <TextInput style={styles.modalText} placeholder="cost" value={ currentIngredient ? String(currentIngredient.cost) : ''}
                            onChangeText={text => setCurrentIngredient({...currentIngredient, cost: text})}/>
                            <View style={styles.flexRow}>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(!ModalVisible)}>
                                    <Text style={styles.textStyle}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={() => {
                                    {if (currentIngredient && currentIngredient.id) {updateIngredient();} else {createIngredient();}  setModalVisible(false);} }}>
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
export default AddIngredientsScreen;