/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const personListAPISlice = createSlice({
  name: 'personListAPI',
  initialState: {
    personListResults: [],
    personListFilm: [],
  },
  reducers: {
    personListResults(state, action) {
      state.personListResults = action.payload;
    },
    personListFilm(state, action) {
      state.personListFilm = action.payload;
    },
  },
});

export const { personListResults, personListFilm } = personListAPISlice.actions;
export default personListAPISlice.reducer;
