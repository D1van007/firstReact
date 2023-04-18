/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export interface SearchTextState {
  searchText: string;
}

const searchTextSlice = createSlice({
  name: 'search',
  initialState: {
    searchText: '',
  },
  reducers: {
    searchText(state, action) {
      state.searchText = action.payload;
    },
  },
});

export const { searchText } = searchTextSlice.actions;
export default searchTextSlice.reducer;
