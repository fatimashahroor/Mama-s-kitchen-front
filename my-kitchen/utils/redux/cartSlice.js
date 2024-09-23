import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: {
      reducer(state, action) {
        state.cart.push(action.payload);
      },
      prepare(dish) {
        return { payload: dish };
      },
    },
    removeFromCart(state, action) {
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },
    emptyingCart(state) {
      state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, emptyingCart } = cartSlice.actions;
export default cartSlice.reducer;