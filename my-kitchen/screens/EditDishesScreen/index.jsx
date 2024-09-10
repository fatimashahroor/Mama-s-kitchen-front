import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from "react-native";
import styles from "./styles";
import SearchInput from "../../components/search/search";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Ionicons } from '@expo/vector-icons';

const EditDishesScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>My Plates</Text>
            <View>
                <SearchInput placeholder=" Search for your dishes"/>
                <Ionicons style={styles.menu} name='menu' size={27}></Ionicons>
            </View>
        </View>
    );
};

export default EditDishesScreen;