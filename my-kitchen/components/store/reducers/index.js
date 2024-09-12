import { combineReducers } from "redux";
import dishesReducer from "./dishesReducer";
import ingredientsReducer from "./ingredientsReducer";

export default rootReducers = combineReducers({
    dishes: dishesReducer,
    ingredients: ingredientsReducer})