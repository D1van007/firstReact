/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { IForm, IPerson } from '../types/type';

export interface FormState {
  newPersonList: IPerson[];
  fillForm: IForm;
}

const INIT_STATE: FormState = {
  newPersonList: [],
  fillForm: {
    fullName: '',
    birth: '',
    gender: '',
    homeworld: '',
    photo: '',
    checkbox: false,
    titlePhoto: '',
  },
};

const formSlice = createSlice({
  name: 'form',
  initialState: INIT_STATE,
  reducers: {
    createNewPerson(state, action) {
      state.newPersonList.push(action.payload);
    },
    addFullName(state, action) {
      state.fillForm.fullName = action.payload;
    },
    addBirth(state, action) {
      state.fillForm.birth = action.payload;
    },
    addGender(state, action) {
      state.fillForm.gender = action.payload;
    },
    addHomeworld(state, action) {
      state.fillForm.homeworld = action.payload;
    },
    addPhoto(state, action) {
      state.fillForm.photo = action.payload;
    },
    addCheckbox(state, action) {
      state.fillForm.checkbox = action.payload;
    },
    addTitlePhoto(state, action) {
      state.fillForm.titlePhoto = action.payload;
    },
  },
});

export const {
  createNewPerson,
  addFullName,
  addBirth,
  addGender,
  addHomeworld,
  addPhoto,
  addCheckbox,
  addTitlePhoto,
} = formSlice.actions;
export default formSlice.reducer;
