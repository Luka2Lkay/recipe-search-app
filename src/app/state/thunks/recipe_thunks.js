import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setKeyWord, showKeywordError } from "../slices/search/search_slice";

export const fetchRecipesByKeyword = createAsyncThunk(
  "search/fetchRecipesByKeyword",
  async ({ keyword, ingredients, page = 1, offset = 0 }, { dispatch }) => {
    try {
      const appKey = import.meta.env.VITE_SPOONACULAR_APP_KEY;
      const uniqueCacheKey = `recipes_${keyword}_${ingredients ? ingredients.join(",") : ""}_${page || "first"}`;
      const resultsPerPage = 10;

      const cachedData = localStorage.getItem(uniqueCacheKey);

      if (cachedData) {
        try {
          const results = JSON.parse(cachedData);
          console.log("Using cached data:", results);
          dispatch(setKeyWord(keyword));
          return results;
        } catch (parseError) {
          console.warn("Failed to parse cached data, fetching fresh data");
          localStorage.removeItem(uniqueCacheKey);
        }
      }

      let apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(keyword)}&includeIngredients=${encodeURIComponent(ingredients)}&fillIngredients=true&number=${resultsPerPage}&offset=${offset}`;

      const response = await axios.get(apiUrl, { params: { apiKey: appKey } });
      const hits = response.data;

      const results = [
        hits.results,
        { totalResults: hits.totalResults },
        { offset: hits.offset },
        { number: hits.number },
      ];

      localStorage.setItem(uniqueCacheKey, JSON.stringify(results));

      dispatch(setKeyWord(keyword));
      return results;
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
