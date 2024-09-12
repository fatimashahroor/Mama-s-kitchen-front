import { EXPO_PUBLIC_API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GET_INGREDIENTS = "GET_INGREDIENTS";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const UPDATE_INGREDIENT = "UPDATE_INGREDIENT";


export const getIngredients = () => async (dispatch) => {
    const chef = await AsyncStorage.getItem('user');
    const chefId = JSON.parse(chef).id;
    try {
        const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/additional_ing/${chefId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
            },
        });
        const data = await response.json();
        if (response.ok) {
            dispatch({type: GET_INGREDIENTS, ingredients: data});
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        throw new Error(error);
    }
}