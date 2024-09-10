import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from "react-native";
import styles from "./styles";

const EditDishesScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>My Plates</Text>
        </View>
    );
};

export default EditDishesScreen;