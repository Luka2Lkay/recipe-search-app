import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ingredients: [],
  ingredient: "",
  ingredientError: "",
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient !== action.payload
      );
    },
    setNewIngredient: (state, action) => {
      state.ingredient = action.payload;
    },
    addIngredient: (state, action) => {
      state.ingredients.push(action.payload);
    },
    resetIngredientState: () => initialState,
    showIngredientError: (state, action) => {
      state.ingredientError = action.payload;
    }
  },
});

export const {
  removeIngredient,
  setNewIngredient,
  addIngredient,
  showIngredientError,
  resetIngredientState
} = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
