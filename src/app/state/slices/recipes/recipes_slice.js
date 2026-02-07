import { createSlice } from "@reduxjs/toolkit";
import { fetchRecipesByKeyword } from "../../thunks/recipe_thunks";

const initialState = {
    recipes: [],
    recipeError: "",
    isLoading: false,
    offset: 0,
    totalResults: 0
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
        },
        setOffset: (state, action) => {
            state.offset = action.payload;
        },
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
                state.totalResults = action.payload[1]?.totalResults || 0;
            })
            .addCase(fetchRecipesByKeyword.rejected, (state, action) => {
                state.isLoading = false;
                state.recipeError = action.error.message || "Failed to fetch recipes";
            });
    }
});

export const { clearRecipes, setOffset, showRecipeError } = recipesSlice.actions;

export default recipesSlice.reducer;
