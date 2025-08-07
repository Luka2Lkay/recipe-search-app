import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slices/search/search_slice.js";
import ingredientsReducer from "./slices/ingredients/ingredients_slice.js";
import recipesReducer from "./slices/recipes/recipes_slice.js";

const store = configureStore({
  reducer: {
    search: searchReducer,
    ingredients: ingredientsReducer,
    recipes: recipesReducer
  },
});

export default store;
