const initialState = {
    dishes: [],
    isLoading: false
};

const dishesReducer = function(state = initialState, action) {
    switch (action.type) {
        case "GET_DISHES":
            return {...state,  dishes: action.dishes,  isLoading: true};
        case "ADD_DISH":
            return {...state,  dishes: [...state.dishes, ...action.dish],  isLoading: true};
        case "DELETE_DISH":
            return {...state,  dishes: state.dishes.filter(dish => dish.id != action.dishId),  isLoading: true};
        case "UPDATE_DISH":
            return {...state,  dishes: state.dishes.map(dish => dish.id == action.dish.id ? { ...dish, ...action.dish } : dish ),  isLoading: true};
        default:
            return state;
    }
}

export default dishesReducer;

