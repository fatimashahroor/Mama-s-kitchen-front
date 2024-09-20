import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dishesList: [],
};

export const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {
    addDish: {
      reducer(state, action) {
        state.dishesList.push(action.payload);
      }
    },
    initiateDishes: {
      reducer(state, action) {
          state.dishesList = action.payload;
      },
      prepare(data) {
        return { payload: data};
      }
    },
    removeDish(state, action) {
      state.dishesList = state.dishesList.filter(dish => dish.id !== action.payload);
    },
    updateDish(state, action) {
      const { id, name, price, steps, main_ingredients, duration, rating, image_path, available_on, diet_type } = action.payload;
      const existingDish = state.dishesList.find(dish => dish.id === id);
      if (existingDish) {
        existingDish.name = name;
        existingDish.price = price;
        existingDish.steps = steps;
        existingDish.main_ingredients = main_ingredients;
        existingDish.duration = duration;
        existingDish.rating = rating;
        existingDish.image_path = image_path;
        existingDish.available_on = available_on;
        existingDish.diet_type = diet_type;
      }
    },
  },
});

export const { addDish, removeDish, updateDish, initiateDishes } = dishesSlice.actions;
export default dishesSlice.reducer;