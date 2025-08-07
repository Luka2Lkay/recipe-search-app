import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  keyword: "",
  keywordError: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setKeyWord: (state, action) => {
      state.keyword = action.payload;
    },
    showKeywordError: (state, action) => {
      state.keywordError = action.payload;
    }
  },
});

export const { setKeyWord, showKeywordError } = searchSlice.actions;
export default searchSlice.reducer;
