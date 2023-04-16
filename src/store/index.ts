import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';

export default configureStore({
  reducer: {
    searchText: searchReducer,
    searchResults: searchReducer,
  },
});
