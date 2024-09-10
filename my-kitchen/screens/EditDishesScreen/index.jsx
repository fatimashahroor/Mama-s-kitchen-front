import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Keyboard, Modal, TextInput } from "react-native";
import styles from "./styles";
import SearchInput from "../../components/search/search";
import { Ionicons } from '@expo/vector-icons';
import { EXPO_PUBLIC_API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditDishesScreen = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [dishes, setDishes] = useState([]);
    const [error, setError] = useState(null);
    const [ModalVisible, setModalVisible] = useState(false);

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
            console.log(error);
        }
    };
    const filteredDishes = dishes.filter(dish => dish.name.toLowerCase().includes(searchQuery.toLowerCase()));
    useEffect(() => {
        getDishes();
    }, []);
    return (
        <TouchableWithoutFeedback onPress={() => {setMenuVisible(false); {Keyboard.dismiss()}}}>
            <View style={styles.container}>
                <Text style={styles.text}>My Plates</Text>
                <TouchableOpacity activeOpacity={1} >
                    <SearchInput placeholder=" Search for your dishes" value={searchQuery} onChangeText={setSearchQuery}/>
                    <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
                        <Ionicons name='menu' size={27} style={styles.menu} />
                    </TouchableOpacity>
                    {menuVisible && (
                        <View style={styles.dropdownMenu}>
                            <TouchableOpacity onPress={() => setModalVisible(true)}>
                                <Text style={styles.dropdownItem}>Create dish</Text>
                            </TouchableOpacity>
                            <Text style={styles.dropdownItem}>Edit dish</Text>
                            <Text style={styles.dropdownItem}>Delete dish</Text>
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
                                        </View>
                                    </View> 
                                )) : <Text style={styles.none}>No dishes found</Text>}
                        </View>
                        {error && <Text style={styles.none}>{error}</Text>}
                    </ScrollView>
                </View>
                <Modal
                    animationType="slide" transparent={true} visible={ModalVisible}
                    onRequestClose={() => {setModalVisible(!ModalVisible);}}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TextInput style={styles.modalText} placeholder="Plate's Name" />
                            <TextInput style={styles.modalText} placeholder="Price" />
                            <TextInput style={styles.modalText} placeholder="Main ingredients" />
                            <TextInput style={styles.modalText} placeholder="Steps" optional />
                            <TextInput style={styles.modalText} placeholder="Duration to be cooked" />
                            <TextInput style={styles.modalText} placeholder="Diet type" />
                            <TextInput style={styles.modalText} placeholder="Available on" />
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