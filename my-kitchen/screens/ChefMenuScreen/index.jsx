import React, { useState, useEffect } from "react";
import { Text, View, Image, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import styles from "./styles";
import { useNavigation } from '@react-navigation/native';
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';
import { Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Ionicons } from '@expo/vector-icons';
import { EXPO_PUBLIC_API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChefMenuScreen = () => {
    const navigation = useNavigation();
    const [fontsLoaded] = useFonts({
        Inter_400Regular, Pacifico_400Regular})
    if (!fontsLoaded) {
        return <Text>Loading...</Text>;
    }
    return (
      <ScrollView>

      </ScrollView>  
    );
};

export default ChefMenuScreen;