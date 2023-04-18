import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import personListAPISliceReducer from './personListSlice';
import formSliceReducer from './formSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    personList: personListAPISliceReducer,
    form: formSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
