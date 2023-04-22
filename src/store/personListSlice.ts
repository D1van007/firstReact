/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_PERSON } from '../constants/api';
import { IPerson, ISwapi } from '../types/type';

export const fetchPersonList = createAsyncThunk<IPerson[], string>(
  'personList/fetchPersonList',
  async (url, { rejectWithValue }) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Server error!');
      }
      const data = ((await response.json()) as ISwapi).results;
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const personListAPISlice = createSlice({
  name: 'personList',
  initialState: {
    personListResult: [],
    personListAPI: [],
    personListFilm: [],
    statusPersonList: null,
    error: null,
  },
  reducers: {
    personListAPI(state, action) {
      state.personListAPI = action.payload;
    },
    personListResult(state, action) {
      state.personListResult = action.payload;
    },
    personListFilm(state, action) {
      state.personListFilm = action.payload;
    },
  },
  extraReducers: {
    [fetchPersonList.pending]: (state) => {
      state.statusPersonList = 'loading';
      state.error = null;
    },
    [fetchPersonList.fulfilled]: (state, action) => {
      state.statusPersonList = 'resolved';
      state.personListAPI = action.payload;
    },
    [fetchPersonList.rejected]: (state, action) => {
      state.statusPersonList = 'rejected';
      state.error = action.payload;
    },
  },
});

export const { personListResult, personListAPI, personListFilm } =
  personListAPISlice.actions;
export default personListAPISlice.reducer;
