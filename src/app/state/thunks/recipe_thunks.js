import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setKeyWord, showKeywordError } from "../slices/search/search_slice";
//import { showRecipeError } from "../slices/recipes/recipes_slice";

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
        : `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(keyword)}&number=${resultsPerPage}`;
      let newNextPageUrl = null;

      if (cachedKey) {
        const { hits, nextPageUrl: cachedNextPageUrl } = JSON.parse(cachedKey);

        dispatch(setKeyWord(keyword));
        return { hits, nextPageUrl: cachedNextPageUrl };
      }

      // do {
      const response = await axios.get(apiUrl, { params: { apiKey: appKey } });
      const hits = response.data.results;
      newNextPageUrl = response.data;

      const totalPages = Math.floor(newNextPageUrl.totalResults / resultsPerPage);

      console.log(totalPages);

      // if (ingredients && ingredients.length > 0) {
      //   hits = hits.filter((hit) =>
      //     ingredients.every((ingredient) =>
      //       hit.recipe.ingredientLines.some((line) =>
      //         line.toLowerCase().includes(ingredient.toLowerCase()),
      //       ),
      //     ),
      //   );
      // }

      // } while (allHits < hitLength && newNextPageUrl);

      // localStorage.setItem(uniqueCacheKey, JSON.stringify({ hits: hitsToReturn, nextPageUrl: newNextPageUrl }));

      dispatch(setKeyWord(keyword));
console.log(hits);
      //  return { hits: hitsToReturn, nextPageUrl: newNextPageUrl };
      return hits;
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
