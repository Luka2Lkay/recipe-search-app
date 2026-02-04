import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setKeyWord, showKeywordError } from "../slices/search/search_slice";

export const fetchRecipesByKeyword = createAsyncThunk(
  "search/fetchRecipesByKeyword",
  async ({ keyword, ingredients, nextPageUrl = null }, { dispatch }) => {
    try {
      const appKey = import.meta.env.VITE_SPOONACULAR_APP_KEY;
      const uniqueCacheKey = `recipes_${keyword}_${ingredients ? ingredients.join(",") : ""}_${nextPageUrl || "first"}`;
      const cachedKey = localStorage.getItem(uniqueCacheKey);
      const resultsPerPage = 20;
      let apiUrl = nextPageUrl
        ? nextPageUrl
        : `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(keyword)}&includeIngredients=${encodeURIComponent(ingredients)}&fillIngredients=true&number=${resultsPerPage}`;
      let newNextPageUrl = null;

      if (cachedKey) {
        const { hits, nextPageUrl: cachedNextPageUrl } = JSON.parse(cachedKey);

        dispatch(setKeyWord(keyword));
        return { hits, nextPageUrl: cachedNextPageUrl };
      }

      const response = await axios.get(apiUrl, { params: { apiKey: appKey } });
      let hits = response.data;
      newNextPageUrl = response.data;

      const totalPages = Math.floor(hits.totalResults / resultsPerPage);

      if (ingredients && ingredients.length > 0) {

        // work on an algorithm that helps filter ingredients by "original name"
        hits = hits.filter((hit) => console.log(hit));
      }

      dispatch(setKeyWord(keyword));

      return hits.results;
    } catch (error) {
      if (error.response && error.response.status === 429) {
        console.warn("Rate limit exceeded, retrying after 2 seconds...");
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } else {
        dispatch(showKeywordError("Failed to fetch recipes"));
        throw error;
      }
    }
  },
);
