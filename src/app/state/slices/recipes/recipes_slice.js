import { createSlice } from "@reduxjs/toolkit";
import { fetchRecipesByKeyword } from "../../thunks/recipe_thunks";

const initialState = {
    recipes: [],
    nextPageUrl: null,
    recipeError: "",
    isLoading: false,
};

const recipesSlice = createSlice({
    name: "recipes",
    initialState,
    reducers: {
        clearRecipes: (state) => {
            state.recipes = [];
            state.recipeError = "";
        },
        showRecipeError: (state, action) => {
            state.recipeError = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecipesByKeyword.pending, (state) => {
                state.isLoading = true;
                state.recipeError = "";
            })
            .addCase(fetchRecipesByKeyword.fulfilled, (state, action) => {
                state.recipes = action.payload;
                state.isLoading = false;
                state.recipeError = state.recipes.length === 0 ? "No recipes found" : "";
            })
            .addCase(fetchRecipesByKeyword.rejected, (state, action) => {
                state.isLoading = false;
                state.recipeError = action.error.message || "Failed to fetch recipes";
            });
    }
});

export const { clearRecipes, recipeError } = recipesSlice.actions;

export default recipesSlice.reducer;
