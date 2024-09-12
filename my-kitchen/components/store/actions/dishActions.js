import {EXPO_PUBLIC_API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const GET_DISHES = "GET_DISHES";
export const ADD_DISH = "ADD_DISH";
export const DELETE_DISH = "DELETE_DISH";
export const UPDATE_DISH = "UPDATE_DISH";


export const getDishes = () => async (dispatch) => {
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
        dispatch({type: GET_DISHES, dishes: data});
    } catch (error) {
        throw new Error(error);
    }
}
export const addDish = (dish) => async (dispatch) => {
    const chef = await AsyncStorage.getItem('user');
    const chefId = JSON.parse(chef).id;
    let additionalIngsString = dish.additional_ings.join(',');
    let form = new FormData();
    form.append('user_id', chefId);
    form.append('name', dish.name);
    form.append('main_ingredients', dish.main_ingredients);
    form.append('steps', dish.steps);
    form.append('price', parseInt(dish.price));
    form.append('available_on', dish.available_on);
    form.append('diet_type', dish.diet_type);
    form.append(`additional_ings`, additionalIngsString);
    form.append('duration', dish.duration);
    console.log(form._parts[7]);
    if (dish.currentImage) {
        const uriParts = dish.currentImage.split('.');
        const fileType = uriParts[uriParts.length - 1];
        form.append('photo', {
            uri: dish.currentImage,
            name: `image.${fileType}`, 
            type: `image/${fileType}`
        });
    }
    try {
        const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/dish/create`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
                'Accept': 'application/json',
            },
            body: form
        });
        if (!response.ok) throw new Error("Non-200 HTTP status code");
        const data = await response.json(); 
        dispatch({ type: ADD_DISH, dishes: [state.dishes, data] });
    } catch (error) {
        console.error("Error parsing JSON or network error", error);
    }
};

export const deleteDish = (dishId) => async (dispatch) => {
    try {
        const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/dish/delete/${dishId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
            },
        });
        if (!response.ok) {
            throw new Error("Failed to delete dish");
        }
        dispatch({type: DELETE_DISH, dishId});
    } catch (error) {
        console.error(error);
    }
};
export const updateDish = (dish) => async (dispatch) => {
    const form = new FormData();
    form.append('name', dish.name);
    form.append('main_ingredients', dish.main_ingredients);
    form.append('steps', dish.steps);
    form.append('price', dish.price);
    form.append('available_on', dish.available_on);
    form.append('diet_type', dish.diet_type);
    form.append('additional_ings', dish.additional_ings);
    form.append('duration', `${dish.duration.hours}:${dish.duration.minutes}:${dish.duration.seconds}`);
    if (dish.currentImage) {
        const uriParts = dish.currentImage.split('.');
        const fileType = uriParts[uriParts.length - 1];
        form.append('photo', {
            uri: dish.currentImage,
            name: `photo.${fileType}`, 
            type: `image/${fileType}`
        });
    }
    try {
        const response = await fetch(`${EXPO_PUBLIC_API_URL}/api/dish/update/${dish.id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${await AsyncStorage.getItem('token')}`,
            },
            body: form
        });
        if (response.ok) {
            dispatch({type: UPDATE_DISH, dish});
        } else {
            console.log("Non-200 response", await response.text());
        }    
    } catch (error) {
        console.log(error);
    }
}