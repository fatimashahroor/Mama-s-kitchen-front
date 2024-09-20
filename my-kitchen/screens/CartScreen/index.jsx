import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../utils/redux/cartSlice";
import { EXPO_PUBLIC_API_URL } from "@env";
import { Ionicons } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
const CartScreen = () => {
    const navigate = useNavigation();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    const total = cart.reduce((acc, item) => {
        if(item.additional_ings)
            return acc + parseFloat((item.price*item.quantity) + (item.additional_ings.reduce((acc, add)=> acc + parseFloat(add.quantity*add.cost), 0)))
        return acc + parseFloat(item.price*item.quantity);
        }, 0);
    const renderItem = ({ item }) => (
    <View style={styles.dish}>
        <View>
        <Image source={{ uri: `${EXPO_PUBLIC_API_URL}/images/${item.image_path}` }} style={styles.dishImage} />
        </View>
        <View style= {{flex: 1}}>
            <Text style={styles.dishName}>{item.name}</Text>
            <Text style={styles.chef}>quantity: {item.quantity}</Text>
            <Text style={styles.chef}>Added: 
            {item.additional_ings && item.additional_ings.map((ing, index) => {
            return (index === 0 ? ` ${ing.name}-${ing.quantity},\n` : ` ${ing.name}-${ing.quantity}`)}) || 'None'}</Text>
        </View>
        <View style={styles.dishPriceContainer}>
            <Ionicons name="trash-outline" size={17} color="black" onPress={() => dispatch(removeFromCart(item.id))} />
            <Text style={styles.dishPrice}>{item.price + "$"}</Text>
        </View>
    </View>
    );
    return (
        <View style={styles.container}>
            <Text style={styles.text}>My Cart</Text>
            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total: {total}$</Text>
            </View>
            {cart.length > 0 ? (
                <>
                    <Text style={styles.text1}>Selected Dishes</Text>
                    <FlatList
                        data={cart}
                        renderItem={renderItem}
                        keyExtractor={item => item.id.toString()}
                        contentContainerStyle={[styles.dishesContainer,{ flexGrow: 1, paddingBottom: 50 }]}
                        showsVerticalScrollIndicator={false}
                    />
                    <TouchableOpacity style={styles.checkoutButton} onPress={() => navigate.navigate("Checkout", { cart: cart , total: total })}>
                        <Text style={styles.checkoutText}>Checkout</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <Text style={styles.emptyCartText}>No selected dishes</Text> 
            )}
        </View>
    );
};

export default CartScreen;
