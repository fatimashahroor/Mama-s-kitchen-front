const initialState = {
    ingredients: [],
    isLoading: false
};

const ingredientsReducer = function(state = initialState, action) {
    switch (action.type) {
        case "GET_INGREDIENTS":
            return {...state,  ingredients: action.ingredients, isLoading: true};
        case "ADD_INGREDIENT":
            return {...state,  ingredients: [...state.ingredients, ...action.ingredient], isLoading: true};
        case "DELETE_INGREDIENT":
            return {...state,  ingredients: state.ingredients.filter(ingredient => ingredient.id !== action.ingredientId), isLoading: true};
        case "UPDATE_INGREDIENT":
            return {...state,  ingredients: state.ingredients.map(ingredient => 
                ingredient.id === action.ingredient.id ? { ...ingredient, ...action.ingredient } : ingredient ), isLoading: true};
        default:
            return state;
    }
}

export default ingredientsReducer;