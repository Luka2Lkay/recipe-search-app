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
            state.showRecipeError = "";
        },
        showRecipeError: (state, action) => {
            state.recipeError = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecipesByKeyword.pending, (state) => {
                state.isLoading = true;
                state.showRecipeError = "";
            })
            .addCase(fetchRecipesByKeyword.fulfilled, (state, action) => {
                state.recipes = action.payload.hits;
                state.nextPageUrl = action.payload.nextPageUrl;
                state.isLoading = false;
                state.showRecipeError = state.recipes.length === 0 ? "No recipes found" : "";
            })
            .addCase(fetchRecipesByKeyword.rejected, (state, action) => {
                state.isLoading = false;
                state.showRecipeError = action.error.message || "Failed to fetch recipes";
            });
    }
});

export const { clearRecipes, showRecipeError } = recipesSlice.actions;

export default recipesSlice.reducer;
