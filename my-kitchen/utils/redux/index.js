import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import dishesReducer from './dishesSlice';
import thunk from "redux-thunk";

export const Store = configureStore({
  reducer: {
    cart: cartReducer,
    dishes: dishesReducer
  },
  applyMiddleware: applyMiddleware(thunk),
});