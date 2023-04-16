/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const searchTextSlice = createSlice({
  name: 'search',
  initialState: {
    searchText: '',
    searchResults: [],
  },
  reducers: {
    searchText(state, action) {
      state.searchText = action.payload;
    },
    searchResults(state, action) {
      state.searchResults = action.payload;
    },
  },
});

export const { searchText, searchResults } = searchTextSlice.actions;
export default searchTextSlice.reducer;
