import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Keyboard } from "react-native";
import styles from "./styles";
import SearchInput from "../../components/search/search";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Ionicons } from '@expo/vector-icons';

const EditDishesScreen = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    return (
        <TouchableWithoutFeedback onPress={() => {setMenuVisible(false); {Keyboard.dismiss()}}}>
            <View style={styles.container}>
                <Text style={styles.text}>My Plates</Text>
                <TouchableOpacity activeOpacity={1} >
                    <SearchInput placeholder=" Search for your dishes"/>
                    <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
                        <Ionicons name='menu' size={27} style={styles.menu} />
                    </TouchableOpacity>
                    {menuVisible && (
                        <View style={styles.dropdownMenu}>
                            <Text style={styles.dropdownItem}>Create dish</Text>
                            <Text style={styles.dropdownItem}>Edit dish</Text>
                            <Text style={styles.dropdownItem}>Delete dish</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default EditDishesScreen;