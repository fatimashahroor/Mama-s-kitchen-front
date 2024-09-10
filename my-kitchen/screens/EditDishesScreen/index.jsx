import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from "react-native";
import styles from "./styles";
import SearchInput from "../../components/search/search";

const EditDishesScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>My Plates</Text>
            <View>
                <SearchInput placeholder=" Search for your dishes"/>
            </View>
        </View>
    );
};

export default EditDishesScreen;