import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setKeyWord, showKeywordError } from "../slices/search/search_slice";
import { showRecipeError } from "../slices/recipes/recipes_slice";

export const fetchRecipesByKeyword = createAsyncThunk(
  "search/fetchRecipesByKeyword",
  async ({ keyword, ingredients, nextPageUrl = null }, { dispatch }) => {
    try {
      const appId = import.meta.env.VITE_EDAMAM_APP_ID
      const appKey = import.meta.env.VITE_EDAMAM_APP_KEY
      const uniqueCacheKey = `recipes_${keyword}_${ingredients ? ingredients.join(",") : ""}_${nextPageUrl || "first"}`;
      const cachedKey = localStorage.getItem(uniqueCacheKey);
      let apiUrl = nextPageUrl ? nextPageUrl : `https://api.edamam.com/api/recipes/v2?type=public&q=${encodeURIComponent(keyword)}&app_id=${appId}&app_key=${appKey}`;

      let allHits = [];
      let newNextPageUrl = null;
      const hitLength = 20

      if (cachedKey) {
        const { hits, nextPageUrl: cachedNextPageUrl } = JSON.parse(cachedKey);

        dispatch(setKeyWord(keyword));
        return { hits, nextPageUrl: cachedNextPageUrl };
      }

      do {
        const response = await axios.get(apiUrl);
        let hits = response.data.hits;
        newNextPageUrl = response.data._links?.next?.href

        if (ingredients && ingredients.length > 0) {
          hits = hits.filter(hit =>
            ingredients.every(ingredient =>
              hit.recipe.ingredientLines.some(line => line.toLowerCase().includes(ingredient.toLowerCase()))
            )
          )
        };

        allHits = [...allHits, ...hits];

        if (allHits.length >= hitLength || !newNextPageUrl) break;

        apiUrl = newNextPageUrl;
      } while (allHits.length < hitLength && newNextPageUrl);

      const hitsToReturn = allHits.slice(0, hitLength);

      localStorage.setItem(uniqueCacheKey, JSON.stringify({ hits: hitsToReturn, nextPageUrl: newNextPageUrl }));

      dispatch(setKeyWord(keyword));
      return { hits: hitsToReturn, nextPageUrl: newNextPageUrl };
    } catch (error) {

      if (error.response && error.response.status === 429) {
        console.warn("Rate limit exceeded, retrying after 2 seconds...");
        await new Promise(resolve => setTimeout(resolve, 2000));
      } else {
        dispatch(showKeywordError("Failed to fetch recipes"));
        throw error;
      }
    }
  }
);
