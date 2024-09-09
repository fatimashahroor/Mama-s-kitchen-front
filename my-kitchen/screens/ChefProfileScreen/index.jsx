import React, { useState, useEffect } from "react";
import { Text, View, Image, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { useFonts, Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { EXPO_PUBLIC_API_URL } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChefMenu from "../../components/menu";

const ChefProfileScreen = ({route,navigation}) => {
    const {chef} = route.params;
    const [fontsLoaded] = useFonts({
        Inter_400Regular, Inter_600SemiBold
    });
    
    if (!fontsLoaded) {
        return <Text>Loading Fonts...</Text>;
    }
     
    return (
        <ChefMenu 
        chef={chef}
        ChefMenu= {dish}
        selectedDay={selectedDay}
        handleDayPress={handleDayPress}/>
    );
};

export default ChefProfileScreen;