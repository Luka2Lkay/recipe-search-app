import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setKeyWord, showKeywordError } from "../slices/search/search_slice";

export const fetchRecipesByKeyword = createAsyncThunk(
  "search/fetchRecipesByKeyword",
  async ({ keyword, ingredients, offset = 0 }, { dispatch }) => {
    const appKey = import.meta.env.VITE_SPOONACULAR_APP_KEY;
    const resultsPerPage = 10;
    const pageNumber = Math.floor(offset / resultsPerPage);
    const maxRetries = 3;

    const sortedIngredients =
      ingredients && ingredients.length > 0
        ? ingredients.slice().sort().join(",")
        : "";

    const cacheKey = `recipes_${keyword.toLowerCase()}_${sortedIngredients.toLowerCase()}_page_${pageNumber}`;

    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      try {
        const parsedData = JSON.parse(cachedData);
        const results = Array.isArray(parsedData)
          ? {
              recipes: parsedData[0] || [],
              totalResults: parsedData[1]?.totalResults || 0,
              offset: parsedData[2]?.offset ?? offset,
              number: parsedData[3]?.number || resultsPerPage,
            }
          : parsedData;

        dispatch(setKeyWord(keyword));
        console.log("cached results:", results);
        return results;
      } catch (parseError) {
        console.warn("Failed to parse cached data, fetching fresh data");
        localStorage.removeItem(cacheKey);
      }
    }

    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(keyword)}&includeIngredients=${encodeURIComponent(ingredients)}&fillIngredients=true&number=${resultsPerPage}&offset=${offset}`;

    for (let attempt = 0; attempt < maxRetries; attempt += 1) {
      try {
        const response = await axios.get(apiUrl, {
          params: { apiKey: appKey },
        });
        const hits = response.data;

        const results = {
          recipes: hits.results || [],
          totalResults: hits.totalResults || 0,
          offset: hits.offset ?? offset,
          number: hits.number || resultsPerPage,
        };

        localStorage.setItem(cacheKey, JSON.stringify(results));

        dispatch(setKeyWord(keyword));
        return results;
      } catch (error) {
        if (
          error.response &&
          error.response.status === 429 &&
          attempt < maxRetries - 1
        ) {
          console.warn("Rate limit exceeded, retrying after 2 seconds...");
          await new Promise((resolve) => setTimeout(resolve, 2000));
          continue;
        }

        dispatch(showKeywordError("Failed to fetch recipes"));
        throw error;
      }
    }
  },
);
